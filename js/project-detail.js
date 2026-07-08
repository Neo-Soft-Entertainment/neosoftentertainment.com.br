(function () {
  const root = document.querySelector('[data-project-detail]');
  if (!root) return;

  const projects = window.NEO_PORTFOLIO_PROJECTS || [];
  if (!projects.length) return;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id') || params.get('project') || 'frontline';
  const project = projects.find((item) => item.id === projectId) || projects[0];
  const canvas = document.getElementById('projectDetailCanvas');
  const title = document.getElementById('projectDetailTitle');
  const category = document.getElementById('projectDetailCategory');
  const status = document.getElementById('projectDetailStatus');
  const tagline = document.getElementById('projectDetailTagline');
  const description = document.getElementById('projectDetailDescription');
  const chips = document.getElementById('projectDetailChips');
  const back = document.getElementById('projectDetailBack');
  const allProjects = document.getElementById('projectDetailAll');
  const external = document.getElementById('projectDetailExternal');
  const fallbackImage = document.getElementById('projectDetailImage');
  const overviewSection = document.getElementById('projectOverviewSection');
  const overviewTitle = document.getElementById('projectOverviewTitle');
  const overviewIntro = document.getElementById('projectOverviewIntro');
  const overviewContent = document.getElementById('projectOverviewContent');
  const legalSection = document.getElementById('projectLegalSection');
  const legalTitle = document.getElementById('projectLegalTitle');
  const legalIntro = document.getElementById('projectLegalIntro');
  const legalContent = document.getElementById('projectLegalContent');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;

  let renderer;
  let scene;
  let camera;
  let projectGroup;
  let orbitGroup;
  let animationFrame = 0;
  let resizeFrame = 0;
  let mouseX = 0;
  let mouseY = 0;
  let particleMaterial;

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

  function setPageContent() {
    document.title = project.title + ' - Neo Soft Project';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', project.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', project.title + ' - Neo Soft');

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', project.description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', project.title + ' - Neo Soft');

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', project.description);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', project.thumbnail);

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', project.thumbnail);

    if (title) title.textContent = project.title;
    if (category) category.textContent = project.category;
    if (status) status.textContent = project.status;
    if (tagline) tagline.textContent = project.tagline;
    if (description) description.textContent = project.description;
    if (fallbackImage) fallbackImage.src = project.thumbnail;

    const isPlugin = project.externalLabel === 'Open on Fab';
    if (back) {
      back.href = isPlugin ? 'plugins.html' : 'products.html';
      back.textContent = isPlugin ? 'Back to plugins' : 'Back to products';
    }
    if (allProjects) {
      allProjects.href = isPlugin ? 'plugins.html' : 'products.html';
      allProjects.textContent = isPlugin ? 'All plugins' : 'All products';
    }

    if (chips) {
      chips.replaceChildren();
      (project.details || []).forEach((detail) => {
        const chip = document.createElement('span');
        chip.textContent = detail;
        chips.append(chip);
      });
    }

    if (overviewSection && overviewTitle && overviewIntro && overviewContent) {
      overviewContent.replaceChildren();
      overviewTitle.textContent = project.overviewTitle || 'Project description';
      overviewIntro.textContent = project.overviewIntro || 'System and project overview.';

      const overviewSections = project.overviewSections && project.overviewSections.length
        ? project.overviewSections
        : [{ title: 'Overview', paragraphs: [project.description] }];

      overviewSections.forEach((section) => {
        const article = document.createElement('article');
        article.className = 'project-overview__block';

        const heading = document.createElement('h3');
        heading.textContent = section.title;
        article.append(heading);

        (section.paragraphs || []).forEach((text) => {
          const paragraph = document.createElement('p');
          paragraph.textContent = text;
          article.append(paragraph);
        });

        if (section.items && section.items.length) {
          const list = document.createElement('ul');
          section.items.forEach((text) => {
            const li = document.createElement('li');
            li.textContent = text;
            list.append(li);
          });
          article.append(list);
        }

        overviewContent.append(article);
      });
    }

    if (legalSection && legalTitle && legalIntro && legalContent) {
      legalContent.replaceChildren();

      if (!project.legalSections || !project.legalSections.length) {
        legalSection.classList.add('hidden');
      }

      if (project.legalSections && project.legalSections.length) {
        legalSection.classList.remove('hidden');
        legalTitle.textContent = project.legalTitle || 'Privacy Policy';
        legalIntro.textContent = project.legalIntro || 'Project-specific legal notes.';

        (project.legalPreamble || []).forEach((text) => {
          const paragraph = document.createElement('p');
          paragraph.className = 'project-legal__preamble';
          paragraph.textContent = text;
          legalContent.append(paragraph);
        });

        project.legalSections.forEach((section) => {
          const article = document.createElement('article');
          article.className = 'project-legal__block';

          const heading = document.createElement('h3');
          heading.textContent = section.title;
          article.append(heading);

          (section.paragraphs || []).forEach((text) => {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            article.append(paragraph);
          });

          if (section.items && section.items.length) {
            const list = document.createElement('ul');
            section.items.forEach((item) => {
              const li = document.createElement('li');
              if (typeof item === 'string') {
                li.textContent = item;
                list.append(li);
                return;
              }

              if (item.label) {
                const strong = document.createElement('strong');
                strong.textContent = item.label + ': ';
                li.append(strong);
              }

              if (item.href) {
                const link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.text;
                li.append(link);
                list.append(li);
                return;
              }

              li.append(item.text || '');
              list.append(li);
            });
            article.append(list);
          }

          if (section.orderedItems && section.orderedItems.length) {
            const list = document.createElement('ol');
            section.orderedItems.forEach((text) => {
              const li = document.createElement('li');
              li.textContent = text;
              list.append(li);
            });
            article.append(list);
          }

          legalContent.append(article);
        });
      }
    }

    if (!external) return;
    const externalHref = project.externalHref || project.href;
    external.href = externalHref;
    external.textContent = project.externalLabel || 'Open project';
    if (/^https?:\/\//.test(externalHref)) {
      external.target = '_blank';
      external.rel = 'noopener';
      return;
    }

    external.removeAttribute('target');
    external.removeAttribute('rel');
  }

  function showFallback() {
    root.classList.add('is-fallback');
    if (canvas) canvas.setAttribute('aria-hidden', 'true');
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

  function createParticles() {
    const particleCount = isMobile ? 90 : 180;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - .5) * 12;
      positions[i * 3 + 1] = (Math.random() - .5) * 6.5;
      positions[i * 3 + 2] = -1 - Math.random() * 8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleMaterial = new THREE.PointsMaterial({
      color: 0x69b7ff,
      size: isMobile ? .018 : .026,
      transparent: true,
      opacity: .44,
      depthWrite: false
    });

    orbitGroup.add(new THREE.Points(geometry, particleMaterial));
  }

  function createProjectCard() {
    const textureLoader = new THREE.TextureLoader();
    const cardWidth = isMobile ? 3 : 4.35;
    const cardHeight = isMobile ? 1.8 : 2.55;
    const frameGeometry = new THREE.PlaneGeometry(isMobile ? 3.2 : 4.62, isMobile ? 1.98 : 2.76);
    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 24, 14);
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: 0x69b7ff,
      transparent: true,
      opacity: .18,
      depthWrite: false
    });
    const cardMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: .96
    });
    const rimMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: .42
    });

    const frame = new THREE.Mesh(frameGeometry, accentMaterial);
    frame.position.z = -.08;

    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    const rim = new THREE.LineSegments(new THREE.EdgesGeometry(cardGeometry), rimMaterial);
    rim.position.z = .04;

    textureLoader.load(
      project.thumbnail,
      function OnProjectTextureLoadedCallback(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
        cardMaterial.map = texture;
        cardMaterial.needsUpdate = true;
        fitImageMeshToTexture(card, texture, cardWidth, cardHeight);
      },
      undefined,
      function OnProjectTextureErrorCallback() {
        cardMaterial.color.set(0x101827);
      }
    );

    projectGroup.add(frame, card, rim);
  }

  function createOrbitRings() {
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x6affd2,
      transparent: true,
      opacity: .18,
      wireframe: true,
      depthWrite: false
    });

    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.65 + i * .42, .012, 8, 112), ringMaterial);
      ring.rotation.set(Math.PI * (.28 + i * .05), Math.PI * (.16 + i * .12), Math.PI * (i * .11));
      ring.position.z = -.72 - i * .16;
      ring.userData.speed = .18 + i * .07;
      orbitGroup.add(ring);
    }
  }

  function resizeScene() {
    if (!renderer || !camera || !canvas) return;
    const width = root.clientWidth;
    const height = root.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function OnResizeCallback() {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(resizeScene);
  }

  function OnPointerMoveCallback(event) {
    mouseX = event.clientX / window.innerWidth * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight * 2 - 1);
  }

  function renderScene(time) {
    const elapsed = time * .001;

    camera.position.x += (mouseX * .26 - camera.position.x) * .04;
    camera.position.y += (mouseY * .18 - camera.position.y) * .04;
    camera.lookAt(0, 0, 0);

    projectGroup.rotation.y = Math.sin(elapsed * .45) * .08 + mouseX * .08;
    projectGroup.rotation.x = Math.sin(elapsed * .32) * .025 - mouseY * .035;
    projectGroup.position.y = Math.sin(elapsed * .7) * .06 + (isMobile ? -1.12 : 0);

    orbitGroup.rotation.y += .0025;
    orbitGroup.rotation.x = mouseY * .035;
    orbitGroup.children.forEach((child) => {
      if (!child.userData.speed) return;
      child.rotation.z += .002 * child.userData.speed;
    });

    if (particleMaterial) {
      particleMaterial.opacity = .34 + Math.sin(elapsed * .9) * .08;
    }

    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(renderScene);
  }

  function setupScene() {
    if (!canvas || !window.THREE || !isWebGLAvailable() || reduceMotion) {
      showFallback();
      return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(43, root.clientWidth / root.clientHeight, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 7.8 : 6.7);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    projectGroup = new THREE.Group();
    orbitGroup = new THREE.Group();
    projectGroup.position.set(isMobile ? 0 : 2.25, isMobile ? -1.12 : 0, 0);
    orbitGroup.position.copy(projectGroup.position);
    scene.add(projectGroup, orbitGroup);

    createProjectCard();
    createOrbitRings();
    createParticles();
    resizeScene();

    root.classList.add('is-webgl');
    window.addEventListener('resize', OnResizeCallback);
    window.addEventListener('pointermove', OnPointerMoveCallback, { passive: true });
    animationFrame = requestAnimationFrame(renderScene);
  }

  function disposeScene() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    window.removeEventListener('resize', OnResizeCallback);
    window.removeEventListener('pointermove', OnPointerMoveCallback);
    if (renderer) renderer.dispose();
  }

  setPageContent();
  setupScene();
  window.addEventListener('beforeunload', disposeScene, { once: true });
})();
