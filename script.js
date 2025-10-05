// Neo Soft — interactions + EmailJS (no preloader)
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const navbar = $('#navbar');
  const cursor = $('#cursor');
  const particles = $('#particles');
  const gamesTrack = $('#gamesTrack');
  const pluginsTrack = $('#pluginsTrack');
  const backToTop = $('#backToTop');
  const sfxToggle = $('#sfxToggle');
  const muteBtn = $('#muteBtn');
  const muteBtnMobile = $('#muteBtnMobile');
  const mobileMenu = $('#mobileMenu');
  const hamburger = $('#hamburger');
  const contactForm = $('#contactForm');
  const formFeedback = $('#formFeedback');
  const yearSpan = $('#year');

  // Year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // State
  let muted = true;
  const refreshMuteBtn = () => { if (muteBtn) muteBtn.textContent = muted ? 'Unmute SFX' : 'Mute SFX'; if (muteBtnMobile) muteBtnMobile.textContent = muted ? 'Unmute SFX' : 'Mute SFX'; }
  refreshMuteBtn();
  if (sfxToggle) sfxToggle.checked = !muted;

  // Navbar scroll / back-to-top
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 40) navbar.classList.add('sticky-nav'); else navbar.classList.remove('sticky-nav');
    backToTop && backToTop.classList.toggle('hidden', y < 600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Custom cursor
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (hasFinePointer && cursor){
    window.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  } else if (cursor){
    cursor.remove();
  }

  // SFX (WebAudio)
  let audioCtx = null;
  const ensureAudio = () => { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; };
  const blip = (freq=660, time=0.06, type='sine') => {
    if (muted) return;
    const ctx = ensureAudio();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.value = freq; g.gain.value = 0.03;
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + time);
  };

  // Toggle SFX
  muteBtn && muteBtn.addEventListener('click', () => { muted = !muted; refreshMuteBtn(); });
  muteBtnMobile && muteBtnMobile.addEventListener('click', () => { muted = !muted; refreshMuteBtn(); });
  sfxToggle && sfxToggle.addEventListener('change', (e) => { muted = !e.target.checked; refreshMuteBtn(); });

  // Mobile menu toggle
  hamburger && hamburger.addEventListener('click', () => {
    const opened = mobileMenu.classList.toggle('hidden') === false;
    hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', ()=> mobileMenu.classList.add('hidden')));

  // Back to top
  backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Particles
  if (particles){
    const ctx = particles.getContext('2d');
    if (ctx){
      const DPR = Math.max(1, window.devicePixelRatio || 1);
      const P = Array.from({ length: hasFinePointer ? 80 : 50 }).map(() => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random()-0.5)*0.0008, vy: (Math.random()-0.5)*0.0008,
        r: 1 + Math.random()*2
      }));
      const resize = () => {
        particles.width = particles.clientWidth * DPR;
        particles.height = particles.clientHeight * DPR;
      };
      resize();
      window.addEventListener('resize', resize);
      const loop = () => {
        const w = particles.width, h = particles.height;
        ctx.clearRect(0,0,w,h);
        const grd = ctx.createLinearGradient(0,0,w,h);
        grd.addColorStop(0, '#0b0114'); grd.addColorStop(1,'#12021c');
        ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);
        P.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
          const px = p.x * w, py = p.y * h;
          ctx.beginPath(); ctx.arc(px, py, p.r*DPR, 0, Math.PI*2);
          ctx.fillStyle = 'rgba(155,93,229,0.7)'; ctx.fill();
        });
        for (let i=0;i<P.length;i++){
          for (let j=i+1;j<P.length;j++){
            const a=P[i], b=P[j];
            const dx=(a.x-b.x)*w, dy=(a.y-b.y)*h;
            const dist=Math.hypot(dx,dy);
            if (dist < 150){
              ctx.strokeStyle='rgba(123,47,247,0.15)'; ctx.lineWidth=1;
              ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b.x*w,b.y*h); ctx.stroke();
            }
          }
        }
        requestAnimationFrame(loop);
      };
      loop();
    }
  }

  // Card tilt
  const allowTilt = hasFinePointer && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (allowTilt){
    $$('.card3d').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const ry = (px - 0.5) * 10;
        const rx = (0.5 - py) * 10;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  // Carousel controls
  const scrollByCard = (track, dir=1) => {
    if (!track) return;
    const card = track.querySelector('[data-card]');
    const amount = card ? card.clientWidth + 16 : 320;
    track.scrollBy({ left: amount * dir, behavior:'smooth' });
    blip(dir>0 ? 720 : 480, 0.05, 'triangle');
  };
  $('#gamesPrev')?.addEventListener('click', () => scrollByCard(gamesTrack, -1));
  $('#gamesNext')?.addEventListener('click', () => scrollByCard(gamesTrack, 1));
  $('#pluginsPrev')?.addEventListener('click', () => scrollByCard(pluginsTrack, -1));
  $('#pluginsNext')?.addEventListener('click', () => scrollByCard(pluginsTrack, 1));

  // Hover SFX
  $$('#navbar a, #heroContent a').forEach(a => a.addEventListener('mouseenter', () => blip(800, 0.05)));
  $('#navbar') && $('#navbar').addEventListener('mouseenter', () => blip(700, 0.05));

  // EmailJS form
  contactForm && contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const btn = $('#sendBtn');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add('opacity-60','cursor-not-allowed');
    btn.innerHTML = `<span class="loader mr-2"></span> Sending...`;

    emailjs.sendForm('service_47lqkyt','template_3yzo1bv', this)
      .then(function(res){
        console.log('Email sent', res.status);
        blip(540, 0.1, 'square');
        formFeedback.classList.remove('hidden');
        btn.disabled = false;
        btn.classList.remove('opacity-60','cursor-not-allowed');
        btn.innerHTML = original;
        contactForm.reset();
        setTimeout(()=> formFeedback.classList.add('hidden'), 3000);
      }, function(err){
        console.error('Email error', err);
        alert('Something went wrong. Please try again later.');
        btn.disabled = false;
        btn.classList.remove('opacity-60','cursor-not-allowed');
        btn.innerHTML = original;
      });
  });

})();