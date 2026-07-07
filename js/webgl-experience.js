(function () {
  const SECTION_STATES = {
    hero: {
      cameraZ: 8,
      particleIntensity: 1,
      fragmentSpread: 1.08,
      lineOpacity: .34,
      gridOpacity: .08,
      coreScale: 1.18,
      colorAccent: '#69b7ff'
    },
    about: {
      cameraZ: 10.4,
      particleIntensity: .58,
      fragmentSpread: .72,
      lineOpacity: .22,
      gridOpacity: .04,
      coreScale: .86,
      colorAccent: '#8f78ff'
    },
    projects: {
      cameraZ: 7.4,
      particleIntensity: .92,
      fragmentSpread: 1.22,
      lineOpacity: .38,
      gridOpacity: .08,
      coreScale: 1.08,
      colorAccent: '#00d4ff'
    },
    technology: {
      cameraZ: 9.2,
      particleIntensity: .5,
      fragmentSpread: .58,
      lineOpacity: .46,
      gridOpacity: .34,
      coreScale: .72,
      colorAccent: '#6affd2'
    },
    pipeline: {
      cameraZ: 8.8,
      particleIntensity: .72,
      fragmentSpread: .98,
      lineOpacity: .32,
      gridOpacity: .18,
      coreScale: .92,
      colorAccent: '#f2c46d'
    },
    contact: {
      cameraZ: 11.2,
      particleIntensity: .34,
      fragmentSpread: .46,
      lineOpacity: .18,
      gridOpacity: .05,
      coreScale: .66,
      colorAccent: '#ffffff'
    }
  };

  const PROJECT_ACCENTS = ['#69b7ff', '#8f78ff', '#6affd2', '#f2c46d', '#ff6b8a', '#ffffff'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  const lowPowerDevice = navigator.deviceMemory && navigator.deviceMemory <= 2;

  let canvas;
  let renderer;
  let scene;
  let camera;
  let rootGroup;
  let particleGeometry;
  let particleMaterial;
  let particlePositions;
  let particleBase;
  let particlePhases;
  let fragmentGroup;
  let lineMaterial;
  let gridMaterial;
  let coreGroup;
  let coreMaterials = [];
  let accentColor;
  let targetColor;
  let pointLight;
  let animationFrame = 0;
  let resizeFrame = 0;
  let initialized = false;
  let currentSection = 'hero';
  let scrollProgress = 0;
  let projectPulse = 0;
  let mouseX = 0;
  let mouseY = 0;

  const currentState = Object.assign({}, SECTION_STATES.hero);
  const targetState = Object.assign({}, SECTION_STATES.hero);
  const geometries = [];
  const materials = [];

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

  function setFallback() {
    document.body.classList.remove('webgl-ready');
    document.body.classList.add('no-webgl');
  }

  function resizeRenderer() {
    if (!renderer || !camera) return;
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function OnResizeCallback() {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(resizeRenderer);
  }

  function OnPointerMoveCallback(event) {
    mouseX = event.clientX / window.innerWidth * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight * 2 - 1);
  }

  function createParticles() {
    const particleCount = lowPowerDevice ? 120 : (isMobile ? 190 : 520);
    particlePositions = new Float32Array(particleCount * 3);
    particleBase = new Float32Array(particleCount * 3);
    particlePhases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 7;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - .5) * 7;
      const z = (Math.random() - .5) * 8;
      particleBase[i * 3] = Math.cos(angle) * radius;
      particleBase[i * 3 + 1] = y;
      particleBase[i * 3 + 2] = Math.sin(angle) * radius + z;
      particlePositions[i * 3] = particleBase[i * 3];
      particlePositions[i * 3 + 1] = particleBase[i * 3 + 1];
      particlePositions[i * 3 + 2] = particleBase[i * 3 + 2];
      particlePhases[i] = Math.random() * Math.PI * 2;
    }

    particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleMaterial = new THREE.PointsMaterial({
      color: accentColor,
      size: isMobile ? .018 : .024,
      transparent: true,
      opacity: .58,
      depthWrite: false
    });
    geometries.push(particleGeometry);
    materials.push(particleMaterial);
    rootGroup.add(new THREE.Points(particleGeometry, particleMaterial));
  }

  function createFragments() {
    fragmentGroup = new THREE.Group();
    const fragmentGeometry = new THREE.TetrahedronGeometry(.11, 0);
    const fragmentMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: .22,
      depthWrite: false
    });
    geometries.push(fragmentGeometry);
    materials.push(fragmentMaterial);

    const fragmentCount = lowPowerDevice ? 12 : (isMobile ? 18 : 46);
    for (let i = 0; i < fragmentCount; i++) {
      const fragment = new THREE.Mesh(fragmentGeometry, fragmentMaterial);
      fragment.position.set((Math.random() - .5) * 10, (Math.random() - .5) * 6, (Math.random() - .5) * 8);
      fragment.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      fragment.scale.setScalar(.55 + Math.random() * 2.6);
      fragment.userData.baseX = fragment.position.x;
      fragment.userData.baseY = fragment.position.y;
      fragment.userData.baseZ = fragment.position.z;
      fragment.userData.speed = .25 + Math.random() * .7;
      fragmentGroup.add(fragment);
    }

    rootGroup.add(fragmentGroup);
  }

  function createEnergyLines() {
    const segmentCount = isMobile ? 42 : 96;
    const positions = new Float32Array(segmentCount * 6);

    for (let i = 0; i < segmentCount; i++) {
      const branch = Math.floor(i / 6);
      const angle = branch * .64 + Math.random() * .4;
      const radius = 1.2 + Math.random() * 4.8;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - .5) * 5;
      const z = Math.sin(angle) * radius - Math.random() * 4;
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x + (Math.random() - .5) * 1.4;
      positions[i * 6 + 4] = y + (Math.random() - .5) * .7;
      positions[i * 6 + 5] = z + (Math.random() - .5) * 1.4;
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    lineMaterial = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: currentState.lineOpacity,
      depthWrite: false
    });
    geometries.push(lineGeometry);
    materials.push(lineMaterial);
    rootGroup.add(new THREE.LineSegments(lineGeometry, lineMaterial));
  }

  function createGrid() {
    const grid = new THREE.GridHelper(18, 28, 0x6affd2, 0x69b7ff);
    grid.position.y = -3.2;
    grid.position.z = -2;
    grid.material.transparent = true;
    grid.material.opacity = currentState.gridOpacity;
    grid.material.depthWrite = false;
    gridMaterial = grid.material;
    materials.push(gridMaterial);
    rootGroup.add(grid);
  }

  function createCore() {
    coreGroup = new THREE.Group();
    const ringGeometry = new THREE.TorusGeometry(1.1, .006, 8, 120);
    const innerGeometry = new THREE.TorusGeometry(.58, .005, 8, 90);
    geometries.push(ringGeometry, innerGeometry);

    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: .22 - i * .045,
        depthWrite: false
      });
      const ring = new THREE.Mesh(i === 1 ? innerGeometry : ringGeometry, material);
      ring.rotation.set(i * .7, i * .42, i * .3);
      ring.scale.setScalar(1 + i * .28);
      coreGroup.add(ring);
      coreMaterials.push(material);
      materials.push(material);
    }

    rootGroup.add(coreGroup);
  }

  function createScene() {
    accentColor = new THREE.Color(SECTION_STATES.hero.colorAccent);
    targetColor = new THREE.Color(SECTION_STATES.hero.colorAccent);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, .1, 80);
    camera.position.set(0, 0, currentState.cameraZ);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;

    rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, .45);
    pointLight = new THREE.PointLight(accentColor, 1.4, 18);
    pointLight.position.set(0, 1.2, 3.8);
    scene.add(ambientLight, pointLight);

    createParticles();
    createFragments();
    createEnergyLines();
    createGrid();
    createCore();
  }

  function updateParticles(elapsed) {
    if (!particleGeometry || !particlePositions) return;

    for (let i = 0; i < particlePhases.length; i++) {
      const phase = particlePhases[i];
      const drift = Math.sin(elapsed * .35 + phase) * .12;
      particlePositions[i * 3] = particleBase[i * 3] * currentState.fragmentSpread + drift;
      particlePositions[i * 3 + 1] = particleBase[i * 3 + 1] + Math.cos(elapsed * .28 + phase) * .1;
      particlePositions[i * 3 + 2] = particleBase[i * 3 + 2] * currentState.fragmentSpread;
    }

    particleGeometry.attributes.position.needsUpdate = true;
  }

  function updateState() {
    currentState.cameraZ += (targetState.cameraZ - currentState.cameraZ) * .045;
    currentState.particleIntensity += (targetState.particleIntensity - currentState.particleIntensity) * .05;
    currentState.fragmentSpread += (targetState.fragmentSpread - currentState.fragmentSpread) * .045;
    currentState.lineOpacity += (targetState.lineOpacity - currentState.lineOpacity) * .05;
    currentState.gridOpacity += (targetState.gridOpacity - currentState.gridOpacity) * .05;
    currentState.coreScale += (targetState.coreScale - currentState.coreScale) * .05;
    accentColor.lerp(targetColor, .055);
  }

  function renderScene(time) {
    const elapsed = time * .001;
    updateState();
    updateParticles(elapsed);

    const scrollDepth = (scrollProgress - .5) * .9;
    camera.position.x += (mouseX * .38 - camera.position.x) * .035;
    camera.position.y += (mouseY * .24 - camera.position.y) * .035;
    camera.position.z += (currentState.cameraZ + scrollDepth - camera.position.z) * .045;
    camera.lookAt(0, 0, 0);

    rootGroup.rotation.y = elapsed * .018 + mouseX * .035;
    rootGroup.rotation.x = mouseY * .018;
    rootGroup.position.y = -scrollProgress * .42;

    if (fragmentGroup) {
      fragmentGroup.children.forEach(function OnFragmentTickCallback(fragment) {
        const spread = currentState.fragmentSpread;
        fragment.position.x += (fragment.userData.baseX * spread - fragment.position.x) * .025;
        fragment.position.y += (fragment.userData.baseY - fragment.position.y) * .025;
        fragment.position.z += (fragment.userData.baseZ * spread - fragment.position.z) * .025;
        fragment.rotation.x += .0025 * fragment.userData.speed;
        fragment.rotation.y += .0016 * fragment.userData.speed;
      });
    }

    if (particleMaterial) {
      particleMaterial.color.copy(accentColor);
      particleMaterial.opacity = .18 + currentState.particleIntensity * .42;
    }

    if (lineMaterial) {
      lineMaterial.color.copy(accentColor);
      lineMaterial.opacity = currentState.lineOpacity;
    }

    if (gridMaterial) {
      gridMaterial.opacity = currentState.gridOpacity;
    }

    if (coreGroup) {
      const pulse = projectPulse * .18 + Math.sin(elapsed * 1.1) * .025;
      coreGroup.scale.setScalar(currentState.coreScale + pulse);
      coreGroup.rotation.x = elapsed * .06;
      coreGroup.rotation.y = -elapsed * .04 + mouseX * .08;
      coreMaterials.forEach(function OnCoreMaterialTickCallback(material, index) {
        material.color.copy(accentColor);
        material.opacity = (.2 - index * .04) * currentState.particleIntensity;
      });
    }

    if (pointLight) {
      pointLight.color.copy(accentColor);
      pointLight.position.x += (mouseX * 3.2 - pointLight.position.x) * .08;
      pointLight.position.y += (mouseY * 2.2 + .8 - pointLight.position.y) * .08;
    }

    projectPulse *= .92;
    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(renderScene);
  }

  function setSectionState(sectionKey) {
    const nextState = SECTION_STATES[sectionKey];
    if (!nextState) return;
    currentSection = sectionKey;
    Object.assign(targetState, nextState);
    if (targetColor) targetColor.set(nextState.colorAccent);
    document.body.dataset.webglSection = sectionKey;
  }

  function setScrollProgress(progress) {
    scrollProgress = Math.max(0, Math.min(1, progress || 0));
  }

  function setActiveProject(index) {
    if (!targetColor) return;
    const color = PROJECT_ACCENTS[Math.abs(index || 0) % PROJECT_ACCENTS.length];
    targetColor.set(color);
    projectPulse = 1;
  }

  function init() {
    if (initialized) return;
    initialized = true;
    canvas = document.getElementById('neoWebglCanvas');

    if (!canvas || !window.THREE || !isWebGLAvailable()) {
      setFallback();
      return;
    }

    if (reduceMotion) {
      document.body.classList.add('webgl-reduced');
      return;
    }

    try {
      createScene();
      setSectionState(currentSection);
      window.addEventListener('resize', OnResizeCallback);
      window.addEventListener('pointermove', OnPointerMoveCallback, { passive: true });
      document.body.classList.add('webgl-ready');
      animationFrame = requestAnimationFrame(renderScene);
    } catch (error) {
      console.warn('Neo Soft WebGL unavailable.', error);
      destroy();
      setFallback();
    }
  }

  function destroy() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    window.removeEventListener('resize', OnResizeCallback);
    window.removeEventListener('pointermove', OnPointerMoveCallback);
    geometries.forEach(function OnGeometryDisposeCallback(geometry) {
      geometry.dispose();
    });
    materials.forEach(function OnMaterialDisposeCallback(material) {
      material.dispose();
    });
    if (renderer) renderer.dispose();
    document.body.classList.remove('webgl-ready');
    initialized = false;
  }

  window.NeoSoftExperience = {
    init: init,
    destroy: destroy,
    setSectionState: setSectionState,
    setScrollProgress: setScrollProgress,
    setActiveProject: setActiveProject
  };

  init();
  window.addEventListener('pagehide', destroy);
})();
