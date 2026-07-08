(function () {
  function configureTexture(texture, renderer) {
    if (!texture || !window.THREE) return;

    texture.colorSpace = THREE.SRGBColorSpace;
    if (renderer && renderer.capabilities) {
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    }
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
  }

  function fitMeshToTexture(mesh, texture, planeWidth, planeHeight) {
    const image = texture && texture.image ? texture.image : {};
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

  function createPlaceholderTexture(project, renderer) {
    if (!window.THREE) return null;

    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 900;

    const context = canvas.getContext('2d');
    if (!context) return null;

    const title = ((project && project.title) || 'Project').toUpperCase();
    const category = ((project && project.category) || 'Neo Soft').toUpperCase();
    const gradient = context.createLinearGradient(0, 0, 1600, 900);
    gradient.addColorStop(0, '#07111f');
    gradient.addColorStop(1, '#101b2e');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1600, 900);

    context.strokeStyle = 'rgba(105, 183, 255, .16)';
    context.lineWidth = 2;
    for (let x = 120; x < 1600; x += 180) {
      context.beginPath();
      context.moveTo(x, 110);
      context.lineTo(x, 790);
      context.stroke();
    }
    for (let y = 180; y < 900; y += 140) {
      context.beginPath();
      context.moveTo(100, y);
      context.lineTo(1500, y);
      context.stroke();
    }

    context.strokeStyle = 'rgba(106, 255, 210, .42)';
    context.lineWidth = 8;
    context.strokeRect(96, 96, 1408, 708);

    context.fillStyle = '#f7fbff';
    context.font = '800 108px Inter, Arial, sans-serif';
    const words = title.split(' ');
    const lines = [];
    let line = '';
    words.forEach(function (word) {
      const nextLine = line ? line + ' ' + word : word;
      if (context.measureText(nextLine).width > 1120 && line) {
        lines.push(line);
        line = word;
        return;
      }
      line = nextLine;
    });
    if (line) lines.push(line);

    lines.slice(0, 3).forEach(function (text, index) {
      context.fillText(text, 150, 315 + index * 120);
    });

    context.fillStyle = '#6affd2';
    context.font = '800 38px Inter, Arial, sans-serif';
    context.fillText(category, 154, 680);

    const texture = new THREE.CanvasTexture(canvas);
    configureTexture(texture, renderer);
    return texture;
  }

  window.NeoPortfolioMedia = {
    configureTexture: configureTexture,
    fitMeshToTexture: fitMeshToTexture,
    createPlaceholderTexture: createPlaceholderTexture
  };
})();
