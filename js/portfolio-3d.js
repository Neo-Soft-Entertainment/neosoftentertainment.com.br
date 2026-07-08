(function () {
  function isWebGLAvailable() {
    try {
      const testCanvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  function initPortfolioDeck(section) {
    const allProjects = window.NEO_PORTFOLIO_PROJECTS || [];
    if (!allProjects.length) return;

    const groupFilter = section.dataset.portfolioGroup || '';
    const projects = groupFilter
      ? allProjects.filter((project) => project.group === groupFilter)
      : allProjects;
    if (!projects.length) return;

    const canvas = section.querySelector('.neo-portfolio-3d__canvas');
    const canvasWrap = section.querySelector('.neo-portfolio-3d__canvas-wrap');
    const fallback = section.querySelector('.neo-portfolio-3d__fallback');
    const title = section.querySelector('.neo-portfolio-3d__title');
    const tagline = section.querySelector('.neo-portfolio-3d__tagline');
    const description = section.querySelector('.neo-portfolio-3d__description');
    const category = section.querySelector('.neo-portfolio-3d__category');
    const status = section.querySelector('.neo-portfolio-3d__status');
    const cta = section.querySelector('.neo-portfolio-3d__button');
    const prevButton = section.querySelector('.neo-portfolio-3d__control--prev');
    const nextButton = section.querySelector('.neo-portfolio-3d__control--next');
    const currentCount = section.querySelector('.neo-portfolio-3d__current');
    const totalCount = section.querySelector('.neo-portfolio-3d__total');
    const overlayNodes = [title, tagline, description, category, status, cta].filter(Boolean);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const lowPowerDevice = navigator.deviceMemory && navigator.deviceMemory <= 1;

    if (projects.length < 2) {
      if (prevButton) prevButton.hidden = true;
      if (nextButton) nextButton.hidden = true;
    }

    let renderer;
    let scene;
    let camera;
    let stageGroup;
    let fragmentGroup;
    let particleMaterial;
    let animationFrame = 0;
    let activeIndex = 0;
    let hoveredIndex = -1;
    let scrollProgress = 0;
    let dragOffset = 0;
    let isDragging = false;
    let dragExceededThreshold = false;
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let resizeFrame = 0;
    let hasInitialized = false;
    let isVisible = true;
    let scrollTrigger;
    let lazyObserver;
    let visibilityObserver;
    let themeObserver;
    let raycaster;
    let pointer;
    let mouse = { x: 0, y: 0 };
    let cards = [];
    let textures = [];
    let geometries = [];
    let materials = [];

    function renderFallback() {
      if (!fallback) return;
      fallback.replaceChildren();

      projects.forEach((project) => {
        const article = document.createElement('article');
        article.className = 'neo-portfolio-3d__fallback-card';

        const image = document.createElement('img');
        image.src = project.thumbnail;
        image.alt = `${project.title} project artwork`;
        image.loading = 'lazy';

        const copy = document.createElement('div');
        copy.className = 'neo-portfolio-3d__fallback-copy';

        const heading = document.createElement('h3');
        heading.textContent = project.title;

        const text = document.createElement('p');
        text.textContent = project.description;

        copy.append(heading, text);

        if (project.href) {
          const link = document.createElement('a');
          link.href = project.href;
          link.textContent = 'View details';
          if (/^https?:\/\//.test(project.href)) {
            link.target = '_blank';
            link.rel = 'noopener';
          }
          copy.append(link);
        }
        article.append(image, copy);
        fallback.append(article);
      });
    }

    function showFallback() {
      renderFallback();
      section.classList.add('is-fallback');
      section.classList.remove('is-ready', 'is-dragging', 'is-hovering-card');
      if (fallback) fallback.hidden = false;
      if (canvasWrap) canvasWrap.setAttribute('aria-hidden', 'true');
    }

    function updateOverlay(project, instant) {
      if (!project) return;

      const applyProject = function () {
        if (title) title.textContent = project.title;
        if (tagline) tagline.textContent = project.tagline;
        if (description) description.textContent = project.description;
        if (category) category.textContent = project.category;
        if (status) status.textContent = project.status;
        if (cta) {
          cta.hidden = !project.href;
          if (project.href) {
            cta.href = project.href;
            cta.textContent = 'View details';
            if (/^https?:\/\//.test(project.href)) {
              cta.target = '_blank';
              cta.rel = 'noopener';
            } else {
              cta.removeAttribute('target');
              cta.removeAttribute('rel');
            }
          }
        }
        if (currentCount) currentCount.textContent = String(activeIndex + 1).padStart(2, '0');
        if (totalCount) totalCount.textContent = String(projects.length).padStart(2, '0');
      };

      if (instant || !window.gsap || reduceMotion) {
        applyProject();
        return;
      }

      gsap.to(overlayNodes, {
        opacity: 0,
        y: 8,
        duration: .16,
        ease: 'power2.out',
        onComplete: function OnPortfolioOverlayFadeOutCallback() {
          applyProject();
          gsap.to(overlayNodes, {
            opacity: 1,
            y: 0,
            duration: .28,
            stagger: .025,
            ease: 'power2.out'
          });
        }
      });
    }

    function getWrappedOffset(index) {
      let offset = index - activeIndex;
      if (offset > projects.length / 2) offset -= projects.length;
      if (offset < -projects.length / 2) offset += projects.length;
      return offset;
    }

    function layoutCards() {
      const lightTheme = document.documentElement.getAttribute('data-theme') === 'light';
      cards.forEach((card, index) => {
        const offset = getWrappedOffset(index);
        const distance = Math.abs(offset);
        card.offset = offset;
        card.targetX = offset * (isMobile ? 1.75 : 2.65);
        card.targetY = offset === 0 ? 0 : -0.08 * distance;
        card.targetZ = offset === 0 ? 0 : -1.2 - distance * .32;
        card.targetRotationY = -offset * .2;
        card.targetRotationZ = offset * .025;
        card.targetOpacity = offset === 0 ? 1 : Math.max(lightTheme ? .36 : .18, (lightTheme ? .72 : .54) - distance * .1);
      });
    }

    function goToProject(index) {
      activeIndex = (index + projects.length) % projects.length;
      hoveredIndex = -1;
      section.classList.remove('is-hovering-card');
      layoutCards();
      updateOverlay(projects[activeIndex], false);
      if (window.NeoSoftExperience) window.NeoSoftExperience.setActiveProject(activeIndex);
    }

    function nextProject() {
      goToProject(activeIndex + 1);
    }

    function previousProject() {
      goToProject(activeIndex - 1);
    }

    function setScrollProgress(progress) {
      scrollProgress = progress;
    }

    function OnPointerDownCallback(event) {
      if (!hasInitialized || event.target.closest('a, button')) return;
      isDragging = true;
      dragExceededThreshold = false;
      startX = event.clientX;
      lastX = event.clientX;
      lastTime = performance.now();
      velocity = 0;
      section.classList.add('is-dragging');
      section.setPointerCapture(event.pointerId);
    }

    function OnPointerMoveCallback(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (pointer && rect.width && rect.height) {
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }

      if (!isDragging) {
        updateHover();
        return;
      }

      const now = performance.now();
      const elapsed = Math.max(16, now - lastTime);
      dragOffset = event.clientX - startX;
      velocity = (event.clientX - lastX) / elapsed;
      lastX = event.clientX;
      lastTime = now;

      if (Math.abs(dragOffset) > 8) {
        dragExceededThreshold = true;
      }
    }

    function OnPointerUpCallback(event) {
      if (!isDragging) return;
      isDragging = false;
      section.classList.remove('is-dragging');
      section.releasePointerCapture(event.pointerId);

      const projectedDrag = dragOffset + velocity * 160;
      if (projectedDrag < -70) nextProject();
      if (projectedDrag > 70) previousProject();

      if (!dragExceededThreshold && hoveredIndex === activeIndex && projects[activeIndex].href) {
        window.location.href = projects[activeIndex].href;
        return;
      }

      if (!dragExceededThreshold && hoveredIndex !== -1) {
        goToProject(hoveredIndex);
      }

      dragOffset = 0;
      velocity = 0;
    }

    function OnPointerCancelCallback(event) {
      if (!isDragging) return;
      isDragging = false;
      dragOffset = 0;
      section.classList.remove('is-dragging');
      section.releasePointerCapture(event.pointerId);
    }

    function OnPointerLeaveCallback() {
      if (isDragging) return;
      hoveredIndex = -1;
      section.classList.remove('is-hovering-card');
    }

    function OnKeyDownCallback(event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextProject();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousProject();
      }
    }

    function OnResizeCallback() {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resizeScene);
    }

    function resizeScene() {
      if (!renderer || !camera || !canvasWrap) return;
      const width = canvasWrap.clientWidth;
      const height = canvasWrap.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function fitImageMeshToTexture(mesh, texture, planeWidth, planeHeight) {
      const image = texture.image || {};
      const imageWidth = image.naturalWidth || image.videoWidth || image.width || 0;
      const imageHeight = image.naturalHeight || image.videoHeight || image.height || 0;
      if (!imageWidth || !imageHeight) return;

      const textureAspect = imageWidth / imageHeight;
      const planeAspect = planeWidth / planeHeight;
      mesh.scale.set(1, 1, 1);

      if (textureAspect > planeAspect) {
        mesh.scale.y = planeAspect / textureAspect;
        return;
      }

      mesh.scale.x = textureAspect / planeAspect;
    }

    function updateHover() {
      if (!raycaster || !pointer || !camera || !cards.length || !isFinePointer) return;

      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects(cards.map((card) => card.mesh), false);
      const nextHover = intersections.length ? intersections[0].object.userData.index : -1;
      if (nextHover === hoveredIndex) return;

      hoveredIndex = nextHover;
      section.classList.toggle('is-hovering-card', hoveredIndex !== -1);
    }

    function createScene() {
      const width = canvasWrap.clientWidth;
      const height = canvasWrap.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 8);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2(2, 2);
      stageGroup = new THREE.Group();
      fragmentGroup = new THREE.Group();
      stageGroup.position.set(isMobile ? .18 : 1.55, isMobile ? -.42 : 0, 0);
      scene.add(stageGroup, fragmentGroup);

      const textureLoader = new THREE.TextureLoader();
      const cardWidth = isMobile ? 2.35 : 3.35;
      const cardHeight = isMobile ? 1.42 : 1.9;
      const frameWidth = isMobile ? 2.52 : 3.55;
      const frameHeight = isMobile ? 1.58 : 2.08;
      const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 20, 12);
      const frameGeometry = new THREE.PlaneGeometry(frameWidth, frameHeight);
      const rimGeometry = new THREE.EdgesGeometry(cardGeometry);
      geometries.push(cardGeometry, frameGeometry, rimGeometry);

      projects.forEach((project, index) => {
        const group = new THREE.Group();
        const frameMaterial = new THREE.MeshBasicMaterial({
          color: 0x69b7ff,
          transparent: true,
          opacity: .18,
          depthWrite: false
        });
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: index === 0 ? 1 : .42
        });
        const hitMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          depthWrite: false
        });
        const rimMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: index === 0 ? .54 : .16
        });
        materials.push(frameMaterial, material, hitMaterial, rimMaterial);

        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.z = -.04;

        const imageMesh = new THREE.Mesh(cardGeometry, material);
        imageMesh.position.z = .015;

        const hitMesh = new THREE.Mesh(cardGeometry, hitMaterial);
        hitMesh.position.z = .05;
        hitMesh.userData.index = index;

        const rim = new THREE.LineSegments(rimGeometry, rimMaterial);
        rim.position.z = .03;

        textureLoader.load(
          project.thumbnail,
          function OnPortfolioTextureLoadedCallback(texture) {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            material.map = texture;
            material.needsUpdate = true;
            fitImageMeshToTexture(imageMesh, texture, cardWidth, cardHeight);
            textures.push(texture);
          },
          undefined,
          function OnPortfolioTextureErrorCallback() {
            material.color.set(0x111827);
          }
        );

        group.add(frame, imageMesh, rim, hitMesh);
        stageGroup.add(group);
        cards.push({
          group: group,
          mesh: hitMesh,
          imageMesh: imageMesh,
          material: material,
          frameMaterial: frameMaterial,
          rimMaterial: rimMaterial,
          offset: 0,
          targetX: 0,
          targetY: 0,
          targetZ: 0,
          targetRotationY: 0,
          targetRotationZ: 0,
          targetOpacity: index === 0 ? 1 : .42
        });
      });

      const fragmentGeometry = new THREE.BufferGeometry();
      fragmentGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
        0, .12, 0,
        -.22, -.14, 0,
        .22, -.1, 0
      ], 3));
      const fragmentMaterial = new THREE.MeshBasicMaterial({
        color: 0x69b7ff,
        transparent: true,
        opacity: .12,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      geometries.push(fragmentGeometry);
      materials.push(fragmentMaterial);

      const fragmentCount = isMobile ? 16 : 34;
      for (let i = 0; i < fragmentCount; i++) {
        const fragment = new THREE.Mesh(fragmentGeometry, fragmentMaterial);
        fragment.position.set((Math.random() - .5) * 12, (Math.random() - .5) * 6, -2 - Math.random() * 6);
        fragment.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        fragment.scale.setScalar(.35 + Math.random() * 1.15);
        fragment.userData.speed = .18 + Math.random() * .32;
        fragmentGroup.add(fragment);
      }

      const particleCount = isMobile ? 58 : 120;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - .5) * 12;
        particlePositions[i * 3 + 1] = (Math.random() - .5) * 6;
        particlePositions[i * 3 + 2] = -2 - Math.random() * 8;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleMaterial = new THREE.PointsMaterial({
        color: 0x22c55e,
        size: isMobile ? .018 : .026,
        transparent: true,
        opacity: .44,
        depthWrite: false
      });
      geometries.push(particleGeometry);
      materials.push(particleMaterial);
      fragmentGroup.add(new THREE.Points(particleGeometry, particleMaterial));

      layoutCards();
      section.classList.add('is-ready');
      if (fallback) fallback.hidden = true;
    }

    function setupScrollAnimation() {
      if (!window.gsap || !window.ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: function OnPortfolioScrollCallback(self) {
          setScrollProgress(self.progress);
        }
      });

      gsap.fromTo(
        section.querySelectorAll('.neo-portfolio-3d__eyebrow, .neo-portfolio-3d__title, .neo-portfolio-3d__tagline, .neo-portfolio-3d__description, .neo-portfolio-3d__meta, .neo-portfolio-3d__actions, .neo-portfolio-3d__footer'),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: .72,
          stagger: .055,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 64%'
          }
        }
      );
    }

    function renderScene(time) {
      const elapsed = time * .001;
      const targetCameraZ = isMobile ? 7.6 - scrollProgress * 1.3 : 9.4 - scrollProgress * 3.2;
      const targetCameraX = mouse.x * (isMobile ? .12 : .28);
      const targetCameraY = mouse.y * (isMobile ? .08 : .18) + .34 - scrollProgress * .38;

      camera.position.x += (targetCameraX - camera.position.x) * .045;
      camera.position.y += (targetCameraY - camera.position.y) * .045;
      camera.position.z += (targetCameraZ - camera.position.z) * .05;
      camera.lookAt(0, 0, 0);

      stageGroup.rotation.y += ((mouse.x * .035) + (dragOffset * .0009) - stageGroup.rotation.y) * .08;
      stageGroup.rotation.x += ((-mouse.y * .025) - stageGroup.rotation.x) * .08;

      cards.forEach((card, index) => {
        const dragInfluence = isDragging ? dragOffset * .004 * Math.max(.25, 1 - Math.abs(card.offset) * .18) : 0;
        const hoverLift = hoveredIndex === index ? .08 : 0;
        const activeScale = index === activeIndex ? 1 : .82;
        const targetScale = activeScale + (hoveredIndex === index ? .045 : 0);

        card.group.position.x += (card.targetX + dragInfluence - card.group.position.x) * .09;
        card.group.position.y += (card.targetY + hoverLift - card.group.position.y) * .09;
        card.group.position.z += (card.targetZ - card.group.position.z) * .09;
        card.group.rotation.y += (card.targetRotationY + mouse.x * .045 - card.group.rotation.y) * .08;
        card.group.rotation.z += (card.targetRotationZ - card.group.rotation.z) * .08;
        card.group.scale.x += (targetScale - card.group.scale.x) * .08;
        card.group.scale.y += (targetScale - card.group.scale.y) * .08;
        card.group.scale.z += (targetScale - card.group.scale.z) * .08;
        card.material.opacity += (card.targetOpacity - card.material.opacity) * .08;
        card.frameMaterial.opacity += ((index === activeIndex ? .26 : .08) - card.frameMaterial.opacity) * .08;
        card.rimMaterial.opacity += ((index === activeIndex ? .48 : .12) - card.rimMaterial.opacity) * .08;
      });

      fragmentGroup.rotation.y = elapsed * .03 + mouse.x * .025;
      fragmentGroup.position.y = scrollProgress * .48;
      if (particleMaterial) {
        particleMaterial.opacity = .28 + Math.sin(elapsed * .9) * .08;
      }

      fragmentGroup.children.forEach((child) => {
        if (!child.userData.speed) return;
        child.rotation.x += .002 * child.userData.speed;
        child.rotation.z += .003 * child.userData.speed;
      });

      renderer.render(scene, camera);
      animationFrame = isVisible ? requestAnimationFrame(renderScene) : 0;
    }

    function initPortfolio() {
      if (hasInitialized) return;
      hasInitialized = true;

      if (!canvas || !canvasWrap || !window.THREE || !isWebGLAvailable()) {
        showFallback();
        return;
      }

      try {
        renderFallback();
        createScene();
        setupScrollAnimation();
        updateOverlay(projects[0], true);
        themeObserver = new MutationObserver(function OnPortfolioThemeChangedCallback(mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.attributeName !== 'data-theme') return;
            layoutCards();
          });
        });
        themeObserver.observe(document.documentElement, { attributes: true });

        if ('IntersectionObserver' in window) {
          visibilityObserver = new IntersectionObserver(function OnPortfolioVisibilityCallback(entries) {
            entries.forEach((entry) => {
              isVisible = entry.isIntersecting;
              if (isVisible && !animationFrame) {
                animationFrame = requestAnimationFrame(renderScene);
              }
            });
          }, { rootMargin: '200px 0px' });
          visibilityObserver.observe(section);
        }

        section.addEventListener('pointerdown', OnPointerDownCallback);
        section.addEventListener('pointermove', OnPointerMoveCallback);
        section.addEventListener('pointerup', OnPointerUpCallback);
        section.addEventListener('pointercancel', OnPointerCancelCallback);
        section.addEventListener('pointerleave', OnPointerLeaveCallback);
        window.addEventListener('resize', OnResizeCallback);

        animationFrame = requestAnimationFrame(renderScene);
      } catch (e) {
        console.warn('Neo Portfolio 3D unavailable.', e);
        showFallback();
      }
    }

    function disposePortfolio() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (scrollTrigger) scrollTrigger.kill();
      if (lazyObserver) lazyObserver.disconnect();
      if (visibilityObserver) visibilityObserver.disconnect();
      if (themeObserver) themeObserver.disconnect();

      section.removeEventListener('pointerdown', OnPointerDownCallback);
      section.removeEventListener('pointermove', OnPointerMoveCallback);
      section.removeEventListener('pointerup', OnPointerUpCallback);
      section.removeEventListener('pointercancel', OnPointerCancelCallback);
      section.removeEventListener('pointerleave', OnPointerLeaveCallback);
      section.removeEventListener('keydown', OnKeyDownCallback);
      prevButton && prevButton.removeEventListener('click', previousProject);
      nextButton && nextButton.removeEventListener('click', nextProject);
      window.removeEventListener('resize', OnResizeCallback);

      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      if (renderer) renderer.dispose();
    }

    function OnPortfolioIntersectionCallback(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        initPortfolio();
        lazyObserver.disconnect();
      });
    }

    renderFallback();
    updateOverlay(projects[0], true);
    if (window.NeoSoftExperience) window.NeoSoftExperience.setActiveProject(0);
    section.addEventListener('keydown', OnKeyDownCallback);
    prevButton && prevButton.addEventListener('click', previousProject);
    nextButton && nextButton.addEventListener('click', nextProject);

    if (reduceMotion || lowPowerDevice) {
      showFallback();
    } else if ('IntersectionObserver' in window) {
      lazyObserver = new IntersectionObserver(OnPortfolioIntersectionCallback, { rootMargin: '420px 0px' });
      lazyObserver.observe(section);
    } else {
      initPortfolio();
    }

    window.addEventListener('pagehide', disposePortfolio);

    window.NeoPortfolio3D = window.NeoPortfolio3D || [];
    window.NeoPortfolio3D.push({
      section: section,
      next: nextProject,
      prev: previousProject,
      goTo: goToProject,
      setScrollProgress: setScrollProgress,
      dispose: disposePortfolio
    });
  }

  document.querySelectorAll('.neo-portfolio-3d').forEach(initPortfolioDeck);
})();
