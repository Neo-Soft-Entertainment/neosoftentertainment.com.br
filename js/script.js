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
  const languageSelect = $('#languageSelect');
  const languageSelectMobile = $('#languageSelectMobile');
  const contactForm = $('#contactForm');
  const formFeedback = $('#formFeedback');
  const sendBtn = $('#sendBtn');

  const translations = {
    en: {
      'nav.games': 'Games',
      'nav.plugins': 'Plugins',
      'nav.news': 'News',
      'nav.careers': 'Careers',
      'nav.about': 'About',
      'nav.team': 'Team',
      'nav.contact': 'Contact',
      'nav.unmute': 'Unmute SFX',
      'nav.mute': 'Mute SFX',
      'nav.languageLabel': 'Select language',
      'nav.menuTitle': 'Menu',
      'hero.title': 'Creating Worlds. <span class="text-purpleNeo">Inspiring Players.</span>',
      'hero.subtitle': 'Brazilian game studio crafting immersive experiences with technology, creativity and passion.',
      'hero.ctaGames': 'Explore Games',
      'hero.ctaPlugins': 'See Plugins',
      'games.title': 'Our Games',
      'games.subtitle': 'Worlds built with heart and cutting-edge tech. Drag to explore.',
      'games.frontline': 'An immersive tactical shooter combining realism, intensity, and storytelling — available now on Steam.',
      'games.rampage': 'A musical brawler with a chaotic rhythm that offers pure adrenaline, destruction and chaos in multiplayer mode.',
      'games.dissociation': 'A psychological horror where an AI manipulates your every move — no weapons, no escape, only survival. Do you know what’s real?',
      'games.banana': 'A humorous survival adventure where mutant bananas rule the world — can you fight the fruit uprising?',
      'shared.learnMore': 'Learn More →',
      'shared.backToTop': 'Back to top',
      'carousel.prev': 'Previous',
      'carousel.next': 'Next',
      'plugins.title': 'Our Plugins',
      'plugins.subtitle': 'Fab marketplace listings',
      'plugins.world': 'Create vast and dynamic open worlds in Unreal Engine with procedural terrain, biomes, and asset placement.',
      'plugins.explosion': 'Add fully replicated, network-ready explosions with customizable effects and optimized physics.',
      'plugins.view': 'View Plugin →',
      'news.title': 'Latest News',
      'news.frontline.date': 'September 2025',
      'news.frontline.title': 'Frontline Launches on Steam',
      'news.frontline.copy': 'After nearly six years in development, our debut title has officially launched — explore the revolution now.',
      'news.team.date': 'July 2025',
      'news.team.title': 'Neo Soft Expands Team',
      'news.team.copy': 'We’re growing! Neo Soft welcomes new talent as we take on the next chapter of our journey.',
      'careers.title': 'Careers',
      'careers.copy': 'We’re hiring! Developers, artists and designers passionate about building next-gen experiences. Help us shape the future of interactive entertainment.',
      'careers.apply': 'Apply Now',
      'careers.team': 'Meet the Team',
      'careers.open': 'Open Roles',
      'careers.roles.gameplay': '• Gameplay Programmer (Unreal)',
      'careers.roles.technical': '• Technical Artist',
      'careers.roles.environment': '• 3D Environment Artist',
      'careers.roles.narrative': '• Narrative Designer',
      'about.title': 'About Neo Soft',
      'about.first': 'Founded in 2020 by <strong>Victor</strong>, Neo Soft is a Brazilian studio creating games and tools that inspire and empower creators.',
      'about.second': 'Our debut project, <em>Frontline</em>, represents our commitment to innovation and storytelling. We’ve been building for almost six years with a dedicated team — all driven by the love of games.',
      'about.missionTitle': 'Our Mission',
      'about.missionCopy': 'To strengthen the Brazilian gaming scene by delivering world-class projects that showcase creativity and excellence.',
      'team.title': 'Our Team',
      'contact.title': 'Contact Us',
      'contact.copy': 'Want to collaborate, ask questions, or share feedback? Get in touch — we’d love to hear from you.',
      'contact.name': 'Your name',
      'contact.email': 'Email',
      'contact.message': 'Your message',
      'contact.send': 'Send Message',
      'contact.sending': 'Sending...',
      'contact.success': 'Message sent! We’ll get back to you soon.',
      'contact.error': 'Something went wrong. Please try again later.',
      'footer.copy': '© <span id="year"></span> Neo Soft. Founded by Victor Henrique Mendonça Rodrigues. • <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
    },
    pt: {
      'nav.games': 'Jogos',
      'nav.plugins': 'Plugins',
      'nav.news': 'Notícias',
      'nav.careers': 'Carreiras',
      'nav.about': 'Sobre',
      'nav.team': 'Equipe',
      'nav.contact': 'Contato',
      'nav.unmute': 'Ativar efeitos',
      'nav.mute': 'Desativar efeitos',
      'nav.languageLabel': 'Selecionar idioma',
      'nav.menuTitle': 'Menu',
      'hero.title': 'Criando Mundos. <span class="text-purpleNeo">Inspirando Jogadores.</span>',
      'hero.subtitle': 'Estúdio brasileiro de jogos criando experiências imersivas com tecnologia, criatividade e paixão.',
      'hero.ctaGames': 'Explorar jogos',
      'hero.ctaPlugins': 'Ver plugins',
      'games.title': 'Nossos Jogos',
      'games.subtitle': 'Mundos construídos com coração e tecnologia de ponta. Arraste para explorar.',
      'games.frontline': 'Um shooter tático imersivo que combina realismo, intensidade e narrativa — disponível agora na Steam.',
      'games.rampage': 'Um brawler musical de ritmo caótico que entrega adrenalina, destruição e caos no modo multiplayer.',
      'games.dissociation': 'Um terror psicológico em que uma IA manipula cada movimento seu — sem armas, sem escape, só sobrevivência. Você sabe o que é real?',
      'games.banana': 'Uma aventura de sobrevivência bem-humorada em que bananas mutantes dominam o mundo — você consegue conter a revolta das frutas?',
      'shared.learnMore': 'Saiba mais →',
      'shared.backToTop': 'Voltar ao topo',
      'carousel.prev': 'Anterior',
      'carousel.next': 'Próximo',
      'plugins.title': 'Nossos Plugins',
      'plugins.subtitle': 'Listagens na Fab',
      'plugins.world': 'Crie mundos abertos vastos e dinâmicos no Unreal Engine com terreno procedural, biomas e posicionamento de assets.',
      'plugins.explosion': 'Adicione explosões totalmente replicadas, prontas para rede, com efeitos personalizáveis e física otimizada.',
      'plugins.view': 'Ver plugin →',
      'news.title': 'Últimas Notícias',
      'news.frontline.date': 'Setembro de 2025',
      'news.frontline.title': 'Frontline é lançado na Steam',
      'news.frontline.copy': 'Após quase seis anos de desenvolvimento, nosso título de estreia foi lançado oficialmente — explore a revolução agora.',
      'news.team.date': 'Julho de 2025',
      'news.team.title': 'Neo Soft expande o time',
      'news.team.copy': 'Estamos crescendo! A Neo Soft recebe novos talentos enquanto avançamos para o próximo capítulo da nossa jornada.',
      'careers.title': 'Carreiras',
      'careers.copy': 'Estamos contratando! Desenvolvedores, artistas e designers apaixonados por criar experiências de nova geração. Ajude-nos a moldar o futuro do entretenimento interativo.',
      'careers.apply': 'Inscreva-se',
      'careers.team': 'Conheça a equipe',
      'careers.open': 'Vagas abertas',
      'careers.roles.gameplay': '• Programador(a) de Gameplay (Unreal)',
      'careers.roles.technical': '• Artista Técnico(a)',
      'careers.roles.environment': '• Artista 3D de Cenários',
      'careers.roles.narrative': '• Designer Narrativo',
      'about.title': 'Sobre a Neo Soft',
      'about.first': 'Fundada em 2020 por <strong>Victor</strong>, a Neo Soft é um estúdio brasileiro que cria jogos e ferramentas para inspirar e potencializar criadores.',
      'about.second': 'Nosso projeto de estreia, <em>Frontline</em>, representa nosso compromisso com inovação e narrativa. Estamos construindo há quase seis anos com uma equipe dedicada — movida pelo amor aos jogos.',
      'about.missionTitle': 'Nossa missão',
      'about.missionCopy': 'Fortalecer a cena brasileira de games entregando projetos de classe mundial que exibem criatividade e excelência.',
      'team.title': 'Nossa equipe',
      'contact.title': 'Fale conosco',
      'contact.copy': 'Quer colaborar, tirar dúvidas ou compartilhar feedback? Entre em contato — vamos adorar conversar com você.',
      'contact.name': 'Seu nome',
      'contact.email': 'Email',
      'contact.message': 'Sua mensagem',
      'contact.send': 'Enviar mensagem',
      'contact.sending': 'Enviando...',
      'contact.success': 'Mensagem enviada! Responderemos em breve.',
      'contact.error': 'Algo deu errado. Tente novamente mais tarde.',
      'footer.copy': '© <span id="year"></span> Neo Soft. Fundada por Victor Henrique Mendonça Rodrigues. • <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
    }
  };

  const storageKey = 'neoSoftLang';
  let currentLang = 'en';
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && translations[stored]) currentLang = stored;
  } catch (err) {
    currentLang = 'en';
  }

  const setDocumentLang = (lang) => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  };

  const t = (key) => translations[currentLang]?.[key] ?? translations.en[key] ?? key;

  let muted = true;

  function refreshMuteBtn(){
    const label = muted ? t('nav.unmute') : t('nav.mute');
    if (muteBtn) muteBtn.textContent = label;
    if (muteBtnMobile) muteBtnMobile.textContent = label;
  }

  const applyTranslations = (lang = currentLang) => {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    try { localStorage.setItem(storageKey, lang); } catch (err) {}
    setDocumentLang(lang);
    if (languageSelect) languageSelect.value = lang;
    if (languageSelectMobile) languageSelectMobile.value = lang;
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = translations[lang]?.[key];
      if (value !== undefined) el.innerHTML = value;
    });
    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const value = translations[lang]?.[key];
      if (value !== undefined) el.setAttribute('placeholder', value);
    });
    $$('[data-i18n-aria-label]').forEach(el => {
      const key = el.dataset.i18nAriaLabel;
      const value = translations[lang]?.[key];
      if (value !== undefined) el.setAttribute('aria-label', value);
    });
    updateYear();
    refreshMuteBtn();
  };

  const updateYear = () => {
    const span = $('#year');
    if (span) span.textContent = new Date().getFullYear();
  };

  applyTranslations(currentLang);
  updateYear();

  if (sfxToggle) sfxToggle.checked = !muted;

  languageSelect && languageSelect.addEventListener('change', (e) => applyTranslations(e.target.value));
  languageSelectMobile && languageSelectMobile.addEventListener('change', (e) => applyTranslations(e.target.value));

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
  const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
  const enableCustomCursor = hasFinePointer && !isMobileViewport;
  if (cursor){
    if (enableCustomCursor){
      document.body.classList.add('custom-cursor-active');
      let cursorVisible = false;
      const reveal = () => {
        if (!cursorVisible){
          cursor.style.opacity = '1';
          cursorVisible = true;
        }
      };
      const hideCursor = () => {
        cursorVisible = false;
        cursor.style.opacity = '0';
      };
      window.addEventListener('mousemove', (e) => {
        reveal();
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
      window.addEventListener('mouseleave', hideCursor);

    } else {
      cursor.remove();
    }
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
    const btn = sendBtn;
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add('opacity-60','cursor-not-allowed');
    btn.innerHTML = `<span class="loader mr-2"></span> ${t('contact.sending')}`;

    emailjs.sendForm('service_47lqkyt','template_3yzo1bv', this)
      .then(function(res){
        console.log('Email sent', res.status);
        blip(540, 0.1, 'square');
        if (formFeedback) formFeedback.classList.remove('hidden');
        btn.disabled = false;
        btn.classList.remove('opacity-60','cursor-not-allowed');
        btn.innerHTML = original;
        contactForm.reset();
        setTimeout(()=> formFeedback && formFeedback.classList.add('hidden'), 3000);
      }, function(err){
        console.error('Email error', err);
        alert(t('contact.error'));
        btn.disabled = false;
        btn.classList.remove('opacity-60','cursor-not-allowed');
        btn.innerHTML = original;
      });
  });

})();