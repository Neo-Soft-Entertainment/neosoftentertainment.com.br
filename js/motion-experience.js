(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const nav = document.getElementById('navbar');
  const menuButton = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const backToTop = document.getElementById('backToTop');
  const cursor = document.getElementById('cursor');
  const sections = Array.from(document.querySelectorAll('[data-webgl-section]'));
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  let currentSection = 'hero';
  let cursorX = -100;
  let cursorY = -100;
  let cursorVisible = false;

  function setLoaded() {
    document.body.classList.add('is-loaded');
  }

  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.add('hidden');
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove('hidden');
    menuButton.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    window.NeoSoftExperience?.setSectionState('hero');
  }

  function toggleMenu() {
    if (!menu || !menuButton) return;
    if (menu.classList.contains('hidden')) {
      openMenu();
      return;
    }
    closeMenu();
  }

  function updateActiveNav(sectionKey) {
    navLinks.forEach(function OnNavLinkActiveCallback(link) {
      const isActive = link.dataset.sectionTarget === sectionKey;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
        return;
      }
      link.removeAttribute('aria-current');
    });
  }

  function setCurrentSection(sectionKey) {
    currentSection = sectionKey;
    updateActiveNav(sectionKey);
    window.NeoSoftExperience?.setSectionState(sectionKey);
  }

  function updateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    window.NeoSoftExperience?.setScrollProgress(progress);

    if (nav) nav.classList.toggle('sticky-nav', window.scrollY > 36);
    if (backToTop) backToTop.classList.toggle('hidden', window.scrollY < 720);
  }

  function OnScrollCallback() {
    updateScrollProgress();
  }

  function OnMenuButtonClickCallback() {
    toggleMenu();
  }

  function OnDocumentKeydownCallback(event) {
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') return;
    document.body.classList.add('keyboard-navigation');
  }

  function OnPointerDownCallback() {
    document.body.classList.remove('keyboard-navigation');
  }

  function OnSmoothLinkClickCallback(event) {
    const href = this.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function setupNavigation() {
    if (menuButton) menuButton.addEventListener('click', OnMenuButtonClickCallback);
    document.addEventListener('keydown', OnDocumentKeydownCallback);
    document.addEventListener('pointerdown', OnPointerDownCallback, { passive: true });

    document.querySelectorAll('[data-smooth-link]').forEach(function OnSmoothLinkSetupCallback(link) {
      link.addEventListener('click', OnSmoothLinkClickCallback);
    });

    navLinks.forEach(function OnNavHoverSetupCallback(link) {
      link.addEventListener('mouseenter', function OnNavMouseEnterCallback() {
        const target = link.dataset.sectionTarget;
        if (!target) return;
        window.NeoSoftExperience?.setSectionState(target);
      });
      link.addEventListener('mouseleave', function OnNavMouseLeaveCallback() {
        window.NeoSoftExperience?.setSectionState(currentSection);
      });
    });
  }

  function setupScrollTriggers() {
    if (!window.gsap || !window.ScrollTrigger) {
      setCurrentSection('hero');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    sections.forEach(function OnSectionTriggerSetupCallback(section) {
      const sectionKey = section.dataset.webglSection;
      ScrollTrigger.create({
        trigger: section,
        start: 'top 56%',
        end: 'bottom 44%',
        onEnter: function OnSectionEnterCallback() {
          setCurrentSection(sectionKey);
        },
        onEnterBack: function OnSectionEnterBackCallback() {
          setCurrentSection(sectionKey);
        }
      });
    });

    if (!reduceMotion) {
      if (document.querySelector('[data-hero-copy]')) {
        gsap.from('[data-hero-copy] > *', {
          y: 44,
          opacity: 0,
          duration: .9,
          stagger: .09,
          ease: 'power3.out',
          delay: .18
        });
      }

      if (document.querySelector('[data-hero-stage]')) {
        gsap.from('[data-hero-stage]', {
          y: 34,
          rotationY: -8,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: .42
        });
      }

      gsap.utils.toArray('[data-reveal]').forEach(function OnRevealSetupCallback(element) {
        gsap.fromTo(element,
          {
            y: 38,
            opacity: 0,
            clipPath: 'inset(12% 0% 0% 0%)'
          },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: .82,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%'
            }
          }
        );
      });

      if (document.querySelector('.hero-console')) {
        gsap.to('.hero-console', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      if (document.querySelector('.studio-marquee')) {
        gsap.to('.studio-marquee__track', {
          xPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.studio-marquee',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      if (document.querySelector('#capabilities')) {
        gsap.to('.capabilities-grid', {
          y: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: '#capabilities',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }

    ScrollTrigger.refresh();
    setCurrentSection('hero');
  }

  function OnCursorMoveCallback(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
    cursor.style.opacity = '1';
    cursor.style.transform = 'translate3d(' + (cursorX - cursor.offsetWidth / 2) + 'px, ' + (cursorY - cursor.offsetHeight / 2) + 'px, 0)';
    cursorVisible = true;
  }

  function OnCursorLeaveCallback() {
    cursorVisible = false;
    cursor.style.opacity = '0';
  }

  function setCursorHover(isHovering) {
    if (!cursor) return;
    cursor.classList.toggle('is-hovering', isHovering);
  }

  function setupCursor() {
    const smallViewport = window.matchMedia('(max-width: 760px)').matches;
    if (!cursor || !finePointer || reduceMotion || smallViewport) {
      if (cursor) cursor.remove();
      return;
    }

    document.body.classList.add('custom-cursor-active');
    window.addEventListener('pointermove', OnCursorMoveCallback, { passive: true });
    window.addEventListener('pointerleave', OnCursorLeaveCallback);

    document.querySelectorAll('a, button, [data-drag-viewport], .neo-portfolio-3d').forEach(function OnCursorTargetSetupCallback(element) {
      element.addEventListener('mouseenter', function OnCursorTargetEnterCallback() {
        setCursorHover(true);
      });
      element.addEventListener('mouseleave', function OnCursorTargetLeaveCallback() {
        setCursorHover(false);
      });
    });

    window.addEventListener('blur', OnCursorLeaveCallback);
  }

  function setupMagneticElements() {
    if (!finePointer || reduceMotion) return;

    document.querySelectorAll('.magnetic').forEach(function OnMagneticSetupCallback(element) {
      element.addEventListener('mousemove', function OnMagneticMoveCallback(event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = 'translate3d(' + x * .12 + 'px, ' + y * .18 + 'px, 0)';
      });

      element.addEventListener('mouseleave', function OnMagneticLeaveCallback() {
        element.style.transform = '';
      });
    });
  }

  function setupTiltElements() {
    if (!finePointer || reduceMotion) return;

    document.querySelectorAll('.tilt-card, .image-tilt').forEach(function OnTiltSetupCallback(element) {
      element.addEventListener('mousemove', function OnTiltMoveCallback(event) {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        element.style.transform = 'perspective(900px) rotateX(' + (-y * 7) + 'deg) rotateY(' + (x * 9) + 'deg)';
      });

      element.addEventListener('mouseleave', function OnTiltLeaveCallback() {
        element.style.transform = '';
      });
    });
  }

  function setupBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener('click', function OnBackToTopClickCallback() {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  function init() {
    setupNavigation();
    setupScrollTriggers();
    setupCursor();
    setupMagneticElements();
    setupTiltElements();
    setupBackToTop();
    updateScrollProgress();
    window.addEventListener('scroll', OnScrollCallback, { passive: true });

    if (document.readyState === 'complete') {
      setLoaded();
      return;
    }

    window.addEventListener('load', setLoaded, { once: true });
    setTimeout(setLoaded, 1100);
  }

  init();
})();
