(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dragSections = Array.from(document.querySelectorAll('[data-drag-section]'));

  function initDragSection(section) {
    const viewport = section.querySelector('[data-drag-viewport]');
    const track = section.querySelector('[data-drag-track]');
    const cards = Array.from(section.querySelectorAll('.drag-card'));
    const prevButton = section.querySelector('[data-drag-prev]');
    const nextButton = section.querySelector('[data-drag-next]');
    const status = section.querySelector('[data-drag-status]');

    if (!viewport || !track || !cards.length) return;

    let index = 0;
    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startTranslate = 0;
    let currentTranslate = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let pressedDetailHref = '';

    function getStep() {
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || 0) || 0;
      return cards[0].getBoundingClientRect().width + gap;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - 1);
    }

    function updateStatus() {
      if (!status) return;
      status.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
    }

    function applyTranslate(value) {
      currentTranslate = value;
      track.style.transform = 'translate3d(' + value + 'px, 0, 0)';
    }

    function goToIndex(nextIndex) {
      index = Math.max(0, Math.min(getMaxIndex(), nextIndex));
      applyTranslate(-index * getStep());
      updateStatus();
    }

    function OnPointerDownCallback(event) {
      if (reduceMotion || event.button > 0 || event.target.closest('a, button')) return;
      const card = event.target.closest('[data-detail-href]');
      pressedDetailHref = card ? card.dataset.detailHref : '';
      isDragging = true;
      hasDragged = false;
      startX = event.clientX;
      startTranslate = currentTranslate;
      lastX = event.clientX;
      lastTime = performance.now();
      velocity = 0;
      section.classList.add('is-dragging');
      document.body.classList.add('is-dragging');
      viewport.setPointerCapture(event.pointerId);
    }

    function OnPointerMoveCallback(event) {
      if (!isDragging) return;

      const now = performance.now();
      const elapsed = Math.max(16, now - lastTime);
      const delta = event.clientX - startX;
      velocity = (event.clientX - lastX) / elapsed;
      lastX = event.clientX;
      lastTime = now;

      if (Math.abs(delta) > 6) hasDragged = true;
      applyTranslate(startTranslate + delta);
    }

    function OnPointerUpCallback(event) {
      if (!isDragging) return;
      isDragging = false;
      section.classList.remove('is-dragging');
      document.body.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);

      const projected = currentTranslate + velocity * 180;
      goToIndex(Math.round(-projected / getStep()));
    }

    function OnPointerCancelCallback(event) {
      if (!isDragging) return;
      isDragging = false;
      pressedDetailHref = '';
      section.classList.remove('is-dragging');
      document.body.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      goToIndex(index);
    }

    function OnClickCaptureCallback(event) {
      if (hasDragged) {
        event.preventDefault();
        event.stopPropagation();
        hasDragged = false;
        pressedDetailHref = '';
        return;
      }

      if (event.target.closest('a, button')) return;

      const card = event.target.closest('[data-detail-href]');
      const detailHref = pressedDetailHref || (card ? card.dataset.detailHref : '');
      pressedDetailHref = '';
      if (!detailHref) return;
      window.location.href = detailHref;
    }

    function OnKeydownCallback(event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToIndex(index + 1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToIndex(index - 1);
      }
    }

    function OnResizeCallback() {
      goToIndex(index);
    }

    viewport.addEventListener('pointerdown', OnPointerDownCallback);
    viewport.addEventListener('pointermove', OnPointerMoveCallback);
    viewport.addEventListener('pointerup', OnPointerUpCallback);
    viewport.addEventListener('pointercancel', OnPointerCancelCallback);
    viewport.addEventListener('click', OnClickCaptureCallback, true);
    viewport.addEventListener('keydown', OnKeydownCallback);
    window.addEventListener('resize', OnResizeCallback);

    if (prevButton) {
      prevButton.addEventListener('click', function OnDragPrevClickCallback() {
        goToIndex(index - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function OnDragNextClickCallback() {
        goToIndex(index + 1);
      });
    }

    goToIndex(0);
  }

  dragSections.forEach(initDragSection);
})();
