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
  const formError = $('#formError');
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
      'flair.kicker': 'Neo Soft DNA',
      'flair.title': 'Immersive universes energized by Neo Soft’s signature storytelling.',
      'flair.subtitle': 'We amplify our worlds with cinematic pacing, rich lore, and visual drama — all anchored by accessible gameplay systems.',
      'flair.card1.title': 'Cinematic Worlds',
      'flair.card1.copy': 'Layered lighting, diagonal compositions, and atmospheric depth guide players through unforgettable journeys.',
      'flair.card2.title': 'Living Communities',
      'flair.card2.copy': 'We foster thriving fan hubs with regular updates, developer diaries, and community-driven events.',
      'flair.card3.title': 'Fearless Innovation',
      'flair.card3.copy': 'Proprietary Unreal Engine tools give us the edge to prototype fast and push the boundaries of gameplay.',
      'games.title': 'Our Games',
      'games.subtitle': 'Worlds built with heart and cutting-edge tech. Drag to explore.',
      'games.frontline': 'An immersive tactical shooter combining realism, intensity, and storytelling — coming soon to Steam. Wishlist now.',
      'games.fatum': 'FATUM is a fast-paced futuristic multiplayer FPS set after civilization’s collapse. Control agile combat robots in Domination, Capture the Flag, Deathmatch, and more — inspired by Splitgate.',
      'games.rampage': 'A musical brawler with a chaotic rhythm that offers pure adrenaline, destruction and chaos in multiplayer mode.',
      'games.dissociation': 'A psychological horror where an AI manipulates your every move — no weapons, no escape, only survival. Do you know what’s real?',
      'games.banana': 'A co-op adventure where every player is a monkey escaping a lab, sprinting for freedom while causing monkey mischief.',
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
      'news.fatum.date': 'October 2025',
      'news.fatum.title': 'FATUM Gameplay Systems Progress',
      'news.fatum.copy': 'We delivered a new spectator system, added grenade combat, and fixed replication issues to keep firefights smooth across the network.',
      'news.frontline.date': 'September 2025',
      'news.frontline.title': 'Frontline Steam Page Goes Live',
      'news.frontline.copy': 'After nearly six years in development, our debut title is preparing for launch — wishlist the revolution now.',
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
      'team.victor.bio': 'Leads Neo Soft’s creative direction and builds Unreal Engine experiences, balancing gameplay, tools, and storytelling.',
      'team.hiury.bio': 'Transforms game footage into cinematic trailers and coordinates marketing assets that capture each project’s energy.',
      'team.jose.bio': 'Builds gameplay systems and optimizes performance so our Unreal projects feel smooth, responsive, and alive.',
      'team.henrique.bio': 'Crafts narrative arcs, dialogue, and world-building while designing gameplay systems and player experiences that shape the heart of every Neo Soft adventure.',
      'team.isabel.bio': 'Guides casting and performance for voice talent, ensuring every character sounds authentic and emotionally grounded.',
      'contact.title': 'Contact Us',
      'contact.copy': 'Want to collaborate, request services, or share feedback? We also work as service providers — reach out for a quote and we’ll get back to you.',
      'contact.name': 'Your name',
      'contact.email': 'Email',
      'contact.message': 'Your message',
      'contact.send': 'Send Message',
      'contact.sending': 'Sending...',
      'contact.invalidEmail': 'Please enter a valid email address.',
      'contact.success': 'Message sent! We’ll get back to you soon.',
      'contact.error': 'Something went wrong. Please try again later.',
      'contact.socialTitle': 'Connect with Neo Soft',
      'contact.socialCopy': 'Follow our latest updates and behind-the-scenes moments.',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Open Neo Soft on Instagram',
      'contact.linkedinAria': 'Open Neo Soft on LinkedIn',
      'contact.socialDiscord': 'Discord / Neo Soft',
      'contact.discordAria': 'Open Discord / Neo Soft',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'Open Neo Soft on YouTube',
      'footer.copy': '© 2025 Neo Soft. Founded by Victor. - <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
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
      'flair.kicker': 'DNA Neo Soft',
      'flair.title': 'Universos imersivos energizados pela narrativa exclusiva da Neo Soft.',
      'flair.subtitle': 'Amplificamos nossos mundos com ritmo cinematográfico, lore rico e drama visual — tudo ancorado em sistemas de gameplay acessíveis.',
      'flair.card1.title': 'Mundos Cinematográficos',
      'flair.card1.copy': 'Iluminação em camadas, composições diagonais e profundidade atmosférica guiam os jogadores por jornadas inesquecíveis.',
      'flair.card2.title': 'Comunidades Vivas',
      'flair.card2.copy': 'Cultivamos hubs de fãs vibrantes com atualizações frequentes, diários de desenvolvimento e eventos guiados pela comunidade.',
      'flair.card3.title': 'Inovação Destemida',
      'flair.card3.copy': 'Ferramentas proprietárias em Unreal Engine nos dão agilidade para prototipar rápido e expandir os limites do gameplay.',
      'games.title': 'Nossos Jogos',
      'games.subtitle': 'Mundos construídos com coração e tecnologia de ponta. Arraste para explorar.',
      'games.frontline': 'Um shooter tático imersivo que combina realismo, intensidade e narrativa — em breve na Steam. Adicione à lista de desejos.',
      'games.fatum': 'FATUM é um FPS multiplayer futurista onde o mundo colapsou e restaram apenas robôs. Você controla um robô em modos como Dominação, Captura a Bandeira, Deathmatch e outros — inspirado em Splitgate.',
      'games.rampage': 'Um brawler musical de ritmo caótico que entrega adrenalina, destruição e caos no modo multiplayer.',
      'games.dissociation': 'Um terror psicológico em que uma IA manipula cada movimento seu — sem armas, sem escape, só sobrevivência. Você sabe o que é real?',
      'games.banana': 'Um jogo co-op onde todos os jogadores são macacos fugindo de um laboratório — todos precisam correr e escapar enquanto fazem macacagens.',
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
      'news.fatum.date': 'Outubro de 2025',
      'news.fatum.title': 'Avanços nos sistemas de FATUM',
      'news.fatum.copy': 'Implementamos o modo espectador, adicionamos granadas ao combate e corrigimos falhas de replicação para partidas mais estáveis.',
      'news.frontline.date': 'Setembro de 2025',
      'news.frontline.title': 'Frontline estreia página na Steam',
      'news.frontline.copy': 'Após quase seis anos de desenvolvimento, nosso título de estreia se prepara para o lançamento — adicione a revolução à sua lista de desejos.',
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
      'team.victor.bio': 'Lidera a direção criativa da Neo Soft e desenvolve experiências em Unreal Engine, equilibrando gameplay, ferramentas e narrativa.',
      'team.hiury.bio': 'Transforma gameplays em trailers cinematográficos e coordena materiais de marketing que capturam a energia de cada projeto.',
      'team.jose.bio': 'Constrói sistemas de gameplay e otimiza desempenho para que nossos projetos em Unreal sejam fluidos, responsivos e vibrantes.',
      'team.henrique.bio': 'Cria arcos narrativos, diálogos e worldbuilding enquanto projeta sistemas de jogo e experiências do jogador que moldam o coração de cada aventura da Neo Soft.',
      'team.isabel.bio': 'Conduz casting e performance das vozes, garantindo que cada personagem soe autêntico e emocionalmente impactante.',
      'contact.title': 'Fale conosco',
      'contact.copy': 'Quer colaborar, contratar nossos serviços ou compartilhar feedback? Também atuamos como prestadores de serviços — entre em contato para solicitar uma cotação e retornaremos em breve.',
      'contact.name': 'Seu nome',
      'contact.email': 'Email',
      'contact.message': 'Sua mensagem',
      'contact.send': 'Enviar mensagem',
      'contact.sending': 'Enviando...',
      'contact.invalidEmail': 'Por favor, insira um email válido.',
      'contact.success': 'Mensagem enviada! Responderemos em breve.',
      'contact.error': 'Algo deu errado. Tente novamente mais tarde.',
      'contact.socialTitle': 'Conecte-se com a Neo Soft',
      'contact.socialCopy': 'Acompanhe as novidades e bastidores do estúdio.',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Abrir Neo Soft no Instagram',
      'contact.linkedinAria': 'Abrir Neo Soft no LinkedIn',
      'contact.socialDiscord': 'Discord / Neo Soft',
      'contact.discordAria': 'Abrir o Discord / Neo Soft',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'Abrir Neo Soft no YouTube',
      'footer.copy': '© 2025 Neo Soft. Fundada por Victor. - <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
    },
    es: {
      'nav.games': 'Juegos',
      'nav.plugins': 'Plugins',
      'nav.news': 'Noticias',
      'nav.careers': 'Carreras',
      'nav.about': 'Acerca de',
      'nav.team': 'Equipo',
      'nav.contact': 'Contacto',
      'nav.unmute': 'Activar efectos',
      'nav.mute': 'Silenciar efectos',
      'nav.languageLabel': 'Seleccionar idioma',
      'nav.menuTitle': 'Menú',
      'hero.title': 'Creando Mundos. <span class="text-purpleNeo">Inspirando Jugadores.</span>',
      'hero.subtitle': 'Estudio brasileño de videojuegos que crea experiencias inmersivas con tecnología, creatividad y pasión.',
      'hero.ctaGames': 'Explorar juegos',
      'hero.ctaPlugins': 'Ver plugins',
      'flair.kicker': 'ADN Neo Soft',
      'flair.title': 'Universos inmersivos impulsados por la narrativa distintiva de Neo Soft.',
      'flair.subtitle': 'Amplificamos nuestros mundos con ritmo cinematográfico, rica mitología y drama visual — todo anclado en sistemas de juego accesibles.',
      'flair.card1.title': 'Mundos Cinematográficos',
      'flair.card1.copy': 'Iluminación en capas, composiciones diagonales y profundidad atmosférica guían a los jugadores a través de viajes inolvidables.',
      'flair.card2.title': 'Comunidades Vivas',
      'flair.card2.copy': 'Fomentamos comunidades de fans vibrantes con actualizaciones constantes, diarios de desarrollo y eventos impulsados por la comunidad.',
      'flair.card3.title': 'Innovación Sin Miedo',
      'flair.card3.copy': 'Herramientas propietarias en Unreal Engine nos permiten prototipar rápido y empujar los límites del gameplay.',
      'games.title': 'Nuestros Juegos',
      'games.subtitle': 'Mundos construidos con corazón y tecnología de punta. Arrastra para explorar.',
      'games.frontline': 'Un shooter táctico inmersivo que combina realismo, intensidad y narrativa — muy pronto en Steam. Agrégalo a tu lista de deseados.',
      'games.fatum': 'FATUM es un FPS multijugador futurista donde el mundo colapsó y solo quedan robots. Juegas como un robot en modos como Dominación, Captura la Bandera, Deathmatch y más — inspirado en Splitgate.',
      'games.rampage': 'Un brawler musical con un ritmo caótico que ofrece adrenalina pura, destrucción y caos en modo multijugador.',
      'games.dissociation': 'Un terror psicológico donde una IA manipula cada uno de tus movimientos — sin armas, sin escape, solo supervivencia. ¿Sabes qué es real?',
      'games.banana': 'Un juego cooperativo donde todos los jugadores son monos escapando de un laboratorio; todos deben correr y huir mientras hacen travesuras de mono.',
      'shared.learnMore': 'Saber más →',
      'shared.backToTop': 'Volver arriba',
      'carousel.prev': 'Anterior',
      'carousel.next': 'Siguiente',
      'plugins.title': 'Nuestros Plugins',
      'plugins.subtitle': 'Listados en Fab',
      'plugins.world': 'Crea mundos abiertos vastos y dinámicos en Unreal Engine con terreno procedural, biomas y colocación de assets.',
      'plugins.explosion': 'Añade explosiones totalmente replicadas, listas para red, con efectos personalizables y física optimizada.',
      'plugins.view': 'Ver plugin →',
      'news.title': 'Últimas Noticias',
      'news.fatum.date': 'Octubre de 2025',
      'news.fatum.title': 'Progreso de sistemas en FATUM',
      'news.fatum.copy': 'Implementamos el modo espectador, incorporamos granadas y corregimos errores de replicación para mantener los combates estables en red.',
      'news.frontline.date': 'Septiembre de 2025',
      'news.frontline.title': 'Frontline estrena página en Steam',
      'news.frontline.copy': 'Tras casi seis años de desarrollo, nuestro título debut se prepara para el lanzamiento — añádelo a tu lista de deseados.',
      'news.team.date': 'Julio de 2025',
      'news.team.title': 'Neo Soft amplía el equipo',
      'news.team.copy': '¡Estamos creciendo! Neo Soft recibe nuevo talento mientras abordamos el próximo capítulo de nuestro viaje.',
      'careers.title': 'Carreras',
      'careers.copy': '¡Estamos contratando! Desarrolladores, artistas y diseñadores apasionados por crear experiencias de nueva generación. Ayúdanos a dar forma al futuro del entretenimiento interactivo.',
      'careers.apply': 'Postular ahora',
      'careers.team': 'Conoce al equipo',
      'careers.open': 'Vacantes abiertas',
      'careers.roles.gameplay': '• Programador(a) de Gameplay (Unreal)',
      'careers.roles.technical': '• Artista Técnico(a)',
      'careers.roles.environment': '• Artista 3D de Entornos',
      'careers.roles.narrative': '• Diseñador(a) Narrativo',
      'about.title': 'Acerca de Neo Soft',
      'about.first': 'Fundado en 2020 por <strong>Victor</strong>, Neo Soft es un estudio brasileño que crea juegos y herramientas para inspirar y empoderar a creadores.',
      'about.second': 'Nuestro proyecto debut, <em>Frontline</em>, representa nuestro compromiso con la innovación y la narrativa. Llevamos casi seis años construyendo con un equipo dedicado — todos impulsados por el amor a los juegos.',
      'about.missionTitle': 'Nuestra misión',
      'about.missionCopy': 'Fortalecer la escena brasileña de videojuegos entregando proyectos de clase mundial que exhiban creatividad y excelencia.',
      'team.title': 'Nuestro equipo',
      'team.victor.bio': 'Dirige la visión creativa de Neo Soft y desarrolla experiencias en Unreal Engine, equilibrando jugabilidad, herramientas y narrativa.',
      'team.hiury.bio': 'Convierte el gameplay en tráilers cinematográficos y coordina materiales de marketing que capturan la energía de cada proyecto.',
      'team.jose.bio': 'Construye sistemas de jugabilidad y optimiza el rendimiento para que nuestros proyectos en Unreal se sientan fluidos, responsivos y llenos de vida.',
      'team.henrique.bio': 'Diseña arcos narrativos, diálogos y worldbuilding mientras crea sistemas de juego y experiencias para el jugador que dan forma al corazón de cada aventura de Neo Soft.',
      'team.isabel.bio': 'Guía el casting y la actuación de las voces, asegurando que cada personaje suene auténtico y con impacto emocional.',
      'contact.title': 'Contáctanos',
      'contact.copy': '¿Quieres colaborar, solicitar nuestros servicios o compartir comentarios? También trabajamos como proveedores de servicios — contáctanos para pedir una cotización y te responderemos.',
      'contact.name': 'Tu nombre',
      'contact.email': 'Correo electrónico',
      'contact.message': 'Tu mensaje',
      'contact.send': 'Enviar mensaje',
      'contact.sending': 'Enviando...',
      'contact.invalidEmail': 'Por favor, ingresa un correo electrónico válido.',
      'contact.success': '¡Mensaje enviado! Nos pondremos en contacto pronto.',
      'contact.error': 'Algo salió mal. Inténtalo de nuevo más tarde.',
      'contact.socialTitle': 'Conéctate con Neo Soft',
      'contact.socialCopy': 'Sigue nuestras novedades y momentos entre bastidores.',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Abrir Neo Soft en Instagram',
      'contact.linkedinAria': 'Abrir Neo Soft en LinkedIn',
      'contact.socialDiscord': 'Discord / Neo Soft',
      'contact.discordAria': 'Abrir Discord / Neo Soft',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'Abrir Neo Soft en YouTube',
      'footer.copy': '© 2025 Neo Soft. Fundado por Victor. - <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
    },
    zh: {
      'nav.games': '游戏',
      'nav.plugins': '插件',
      'nav.news': '新闻',
      'nav.careers': '招聘',
      'nav.about': '关于',
      'nav.team': '团队',
      'nav.contact': '联系',
      'nav.unmute': '开启音效',
      'nav.mute': '关闭音效',
      'nav.languageLabel': '选择语言',
      'nav.menuTitle': '菜单',
      'hero.title': '创造世界。<span class="text-purpleNeo">激发玩家。</span>',
      'hero.subtitle': '巴西游戏工作室，以技术、创意与热情打造沉浸式体验。',
      'hero.ctaGames': '探索游戏',
      'hero.ctaPlugins': '查看插件',
      'flair.kicker': 'Neo Soft 基因',
      'flair.title': '沉浸式宇宙由 Neo Soft 标志性的叙事驱动。',
      'flair.subtitle': '我们通过电影化节奏、丰富的世界观和视觉张力强化作品，同时以易上手的玩法系统为核心。',
      'flair.card1.title': '电影级世界',
      'flair.card1.copy': '层次分明的灯光、对角线构图与氛围深度，引领玩家踏上难忘旅程。',
      'flair.card2.title': '活力社群',
      'flair.card2.copy': '通过定期更新、开发日志和社区驱动的活动，我们培育蓬勃的粉丝基地。',
      'flair.card3.title': '无惧创新',
      'flair.card3.copy': '自研的 Unreal Engine 工具让我们快速原型迭代，不断突破玩法边界。',
      'games.title': '我们的游戏',
      'games.subtitle': '用热忱与尖端科技构建的世界。拖动浏览。',
      'games.frontline': '一款将真实感、张力与叙事融合的沉浸式战术射击——即将登陆 Steam，立即加入愿望单。',
      'games.fatum': 'FATUM 是一款未来风格的多人 FPS，文明崩塌后只剩下机器人。你将以敏捷机甲参战，占领据点、夺旗、死斗等模式 —— 灵感来自 Splitgate。',
      'games.rampage': '一款节奏混乱的音乐格斗游戏，在多人模式中带来纯粹的肾上腺素、破坏与混乱。',
      'games.dissociation': '一部心理恐怖作品，AI 操控你的每一步——无武器、无逃脱，只有求生。你还能分辨真实吗？',
      'games.banana': '一款合作游戏，所有玩家都是逃离实验室的猴子，一边拼命奔逃，一边制造猴子般的恶作剧。',
      'shared.learnMore': '了解更多 →',
      'shared.backToTop': '返回顶部',
      'carousel.prev': '上一项',
      'carousel.next': '下一项',
      'plugins.title': '我们的插件',
      'plugins.subtitle': 'Fab 市场上架',
      'plugins.world': '使用程序化地形、生物群落与资产布置，在 Unreal Engine 中打造广阔而动态的开放世界。',
      'plugins.explosion': '添加完全复制、即插即用的爆炸效果，可自定义视觉与优化的物理表现。',
      'plugins.view': '查看插件 →',
      'news.title': '最新消息',
      'news.fatum.date': '2025 年 10 月',
      'news.fatum.title': 'FATUM 系统进展',
      'news.fatum.copy': '我们上线观战模式，加入手雷玩法，并修复复制同步问题，让联网战斗更加稳定。',
      'news.frontline.date': '2025 年 9 月',
      'news.frontline.title': 'Frontline 在 Steam 上线商店页面',
      'news.frontline.copy': '历经近六年开发，我们的首部作品正筹备发布——现在就加入愿望单，静待这场革命。',
      'news.team.date': '2025 年 7 月',
      'news.team.title': 'Neo Soft 扩充团队',
      'news.team.copy': '我们在成长！Neo Soft 欢迎新人才，共同开启旅程的新篇章。',
      'careers.title': '招聘',
      'careers.copy': '我们正在招募！欢迎热衷于打造下一代体验的开发者、艺术家与设计师加入。帮助我们塑造互动娱乐的未来。',
      'careers.apply': '立即申请',
      'careers.team': '认识团队',
      'careers.open': '招募职位',
      'careers.roles.gameplay': '• 游戏玩法程序员（Unreal）',
      'careers.roles.technical': '• 技术美术',
      'careers.roles.environment': '• 3D 场景美术',
      'careers.roles.narrative': '• 叙事设计师',
      'about.title': '关于 Neo Soft',
      'about.first': '由 <strong>Victor</strong> 于 2020 年创立，Neo Soft 是一家巴西工作室，打造激发并赋能创作者的游戏与工具。',
      'about.second': '我们的首发项目 <em>Frontline</em> 体现了我们对创新与叙事的执着。近六年来，我们与一支敬业团队携手打造，只因热爱游戏。',
      'about.missionTitle': '我们的使命',
      'about.missionCopy': '通过交付世界级项目，展现创造力与卓越，壮大巴西游戏生态。',
      'team.title': '我们的团队',
      'team.victor.bio': '主导 Neo Soft 的创意方向，并构建 Unreal Engine 体验，在玩法、工具与叙事之间取得平衡。',
      'team.hiury.bio': '将游戏画面打造成电影级预告片，并统筹营销素材，展现每个项目的能量。',
      'team.jose.bio': '搭建游戏玩法系统并优化性能，让我们的 Unreal 项目保持流畅、灵敏且充满活力。',
      'team.henrique.bio': '塑造叙事弧线、对白与世界观，同时设计游戏系统与玩家体验，让每个 Neo Soft 冒险的核心更加鲜活。',
      'team.isabel.bio': '指导配音的选角与表演，确保每个角色都听起来真实且情感充沛。',
      'contact.title': '联系我们',
      'contact.copy': '想合作、咨询我们的服务或分享反馈？我们也提供定制服务——欢迎联系获取报价，我们会尽快回复。',
      'contact.name': '您的姓名',
      'contact.email': '电子邮件',
      'contact.message': '您的留言',
      'contact.send': '发送信息',
      'contact.sending': '正在发送…',
      'contact.invalidEmail': '请输入有效的电子邮件地址。',
      'contact.success': '信息已发送！我们会尽快回复。',
      'contact.error': '出现问题。请稍后再试。',
      'contact.socialTitle': '关注 Neo Soft',
      'contact.socialCopy': '获取我们的最新动态与幕后花絮。',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': '在 Instagram 打开 Neo Soft',
      'contact.linkedinAria': '在 LinkedIn 打开 Neo Soft',
      'contact.socialDiscord': 'Discord / Neo Soft',
      'contact.discordAria': '打开 Discord / Neo Soft',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': '在 YouTube 打开 Neo Soft',
      'footer.copy': '© 2025 Neo Soft。由 Victor 创立。- <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
    },
    ja: {
      'nav.games': 'ゲーム',
      'nav.plugins': 'プラグイン',
      'nav.news': 'ニュース',
      'nav.careers': '採用情報',
      'nav.about': '概要',
      'nav.team': 'チーム',
      'nav.contact': 'お問い合わせ',
      'nav.unmute': '効果音をオン',
      'nav.mute': '効果音をオフ',
      'nav.languageLabel': '言語を選択',
      'nav.menuTitle': 'メニュー',
      'hero.title': '世界を創造する。<span class="text-purpleNeo">プレイヤーを刺激する。</span>',
      'hero.subtitle': 'テクノロジー、創造性、情熱で没入型体験を生み出すブラジルのゲームスタジオ。',
      'hero.ctaGames': 'ゲームを見る',
      'hero.ctaPlugins': 'プラグインを見る',
      'flair.kicker': 'Neo Soft DNA',
      'flair.title': 'Neo Soft ならではの物語性が、没入型の世界を駆動する。',
      'flair.subtitle': 'シネマティックなテンポ、豊かな世界観、視覚的なドラマを重ね、誰もが遊びやすいゲームプレイに落とし込んでいます。',
      'flair.card1.title': 'シネマティックな世界',
      'flair.card1.copy': '層状のライティングや対角構図、空気感のある奥行きで、忘れられない旅へプレイヤーを導きます。',
      'flair.card2.title': '生きたコミュニティ',
      'flair.card2.copy': '定期的なアップデート、開発者ダイアリー、コミュニティ主導のイベントでファンの拠点を育てています。',
      'flair.card3.title': '恐れないイノベーション',
      'flair.card3.copy': '自社の Unreal Engine ツールで素早くプロトタイプを作り、ゲームプレイの限界に挑み続けます。',
      'games.title': '私たちのゲーム',
      'games.subtitle': '情熱と最先端技術で作り上げた世界。ドラッグしてご覧ください。',
      'games.frontline': 'リアリズム、緊張感、物語性を融合させた没入型タクティカルシューター — まもなく Steam で配信予定。ウィッシュリストに登録しよう。',
      'games.fatum': 'FATUM は文明崩壊後の世界を舞台にした未来派マルチプレイヤー FPS。ロボット同士がドミネーション、キャプチャーザフラッグ、デスマッチなどで戦い、Splitgate に着想を得ています。',
      'games.rampage': '混沌としたリズムで展開する音楽系乱闘ゲーム。マルチプレイで純粋な興奮と破壊、カオスを体験。',
      'games.dissociation': 'AI があなたの一挙手一投足を操るサイコホラー — 武器も逃げ場もなく、生き残りだけが目的。現実を見分けられますか？',
      'games.banana': 'すべてのプレイヤーが研究所から脱走するサルとなり、自由を求めて走りながらおサルのいたずらを繰り広げる協力ゲーム。',
      'shared.learnMore': 'さらに詳しく →',
      'shared.backToTop': 'トップへ戻る',
      'carousel.prev': '前へ',
      'carousel.next': '次へ',
      'plugins.title': '私たちのプラグイン',
      'plugins.subtitle': 'Fab マーケット掲載',
      'plugins.world': 'Unreal Engine でプロシージャル地形、バイオーム、アセット配置を使って広大でダイナミックなオープンワールドを構築。',
      'plugins.explosion': '完全レプリケーション対応でネットワーク運用可能な爆発を追加。カスタマイズ可能な演出と最適化された物理を搭載。',
      'plugins.view': 'プラグインを見る →',
      'news.title': '最新ニュース',
      'news.fatum.date': '2025年10月',
      'news.fatum.title': 'FATUM システムの進捗',
      'news.fatum.copy': '観戦モードを実装し、グレネードを追加、複製同期の不具合も修正してネットワーク戦闘を安定させました。',
      'news.frontline.date': '2025年9月',
      'news.frontline.title': 'Frontline が Steam ストアページを公開',
      'news.frontline.copy': '約6年の開発を経て、デビュー作はいよいよローンチ準備中 — 今すぐウィッシュリストに追加して革命に備えよう。',
      'news.team.date': '2025年7月',
      'news.team.title': 'Neo Soft がチームを拡大',
      'news.team.copy': '私たちは成長を続けています！Neo Soft は新たな才能を迎え入れ、次のチャプターへ進みます。',
      'careers.title': '採用情報',
      'careers.copy': '私たちは採用中です！次世代の体験づくりに情熱を持つ開発者、アーティスト、デザイナーを求めています。インタラクティブ・エンターテインメントの未来を共に形にしましょう。',
      'careers.apply': '今すぐ応募',
      'careers.team': 'チームを見る',
      'careers.open': '募集中の職種',
      'careers.roles.gameplay': '・ゲームプレイプログラマー（Unreal）',
      'careers.roles.technical': '・テクニカルアーティスト',
      'careers.roles.environment': '・3D環境アーティスト',
      'careers.roles.narrative': '・ナラティブデザイナー',
      'about.title': 'Neo Soft について',
      'about.first': '<strong>Victor</strong> によって 2020 年に設立された Neo Soft は、クリエイターを刺激し力を与えるゲームとツールを開発するブラジルのスタジオです。',
      'about.second': '私たちのデビュー作 <em>Frontline</em> は、イノベーションとストーリーテリングへのこだわりを体現しています。約 6 年間、献身的なチームとともに制作を進めてきました — すべてはゲームへの愛から。',
      'about.missionTitle': '私たちの使命',
      'about.missionCopy': '創造性と卓越性を示す世界水準のプロジェクトを届け、ブラジルのゲームシーンを強化すること。',
      'team.title': '私たちのチーム',
      'team.victor.bio': 'Neo Soft のクリエイティブディレクションをリードし、Unreal Engine でゲームプレイ、ツール、物語を両立させた体験を構築している。',
      'team.hiury.bio': 'ゲーム映像をシネマティックなトレーラーへと仕上げ、各プロジェクトの熱量を伝えるマーケティング素材を統括している。',
      'team.jose.bio': 'ゲームプレイシステムを構築し、パフォーマンスを最適化して、Unreal プロジェクトを滑らかで反応の良い、生き生きとしたものにしている。',
      'team.henrique.bio': 'ストーリーラインや会話、世界設定を緻密に作り上げながら、ゲームシステムとプレイヤー体験も設計し、Neo Soft の冒険の核を形作っている。',
      'team.isabel.bio': 'ボイスキャストと演技を指揮し、すべてのキャラクターが本物らしく、感情豊かに響くよう仕上げている。',
      'contact.title': 'お問い合わせ',
      'contact.copy': 'コラボの相談、サービスのご依頼、フィードバックなど、お気軽にご連絡ください。受託サービスも承っています — お見積もりのご相談をお待ちしています。',
      'contact.name': 'お名前',
      'contact.email': 'メールアドレス',
      'contact.message': 'メッセージ',
      'contact.send': 'メッセージを送信',
      'contact.sending': '送信中…',
      'contact.invalidEmail': '有効なメールアドレスを入力してください。',
      'contact.success': 'メッセージを送信しました！追ってご連絡いたします。',
      'contact.error': '問題が発生しました。後でもう一度お試しください。',
      'contact.socialTitle': 'Neo Soft とつながる',
      'contact.socialCopy': '最新情報や舞台裏の様子をチェックしましょう。',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Instagram で Neo Soft を開く',
      'contact.linkedinAria': 'LinkedIn で Neo Soft を開く',
      'contact.socialDiscord': 'Discord / Neo Soft',
      'contact.discordAria': 'Discord / Neo Soft を開く',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'YouTube で Neo Soft を開く',
      'footer.copy': '© 2025 Neo Soft。Victor により設立。- <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
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
    const map = { pt: 'pt-BR', es: 'es-ES', en: 'en', zh: 'zh-CN', ja: 'ja-JP' };
    document.documentElement.lang = map[lang] || 'en';
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
    if (formError && !formError.classList.contains('hidden') && formError.dataset.errorKey){
      formError.textContent = t(formError.dataset.errorKey);
    }
    refreshMuteBtn();
  };

  applyTranslations(currentLang);

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
      let cursorX = 0;
      let cursorY = 0;

      const updateCursorTransform = () => {
        const baseScale = 0.9;
        const scale = cursor.classList.contains('cursor-press')
          ? baseScale * 0.85
          : cursor.classList.contains('cursor-hover')
            ? baseScale * 1.5
            : baseScale;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${scale})`;
      };

      const reveal = () => {
        if (!cursorVisible){
          cursor.style.opacity = '1';
          cursorVisible = true;
        }
      };

      const hideCursor = () => {
        cursorVisible = false;
        cursor.style.opacity = '0';
        cursor.classList.remove('cursor-hover', 'cursor-press');
        updateCursorTransform();
      };

      window.addEventListener('mousemove', (e) => {
        reveal();
        cursorX = e.clientX;
        cursorY = e.clientY;
        updateCursorTransform();
      });

      window.addEventListener('mouseleave', hideCursor);

      const interactiveElements = $$('a, button');
      const handleEnter = () => {
        cursor.classList.add('cursor-hover');
        updateCursorTransform();
      };
      const handleLeave = () => {
        cursor.classList.remove('cursor-hover', 'cursor-press');
        updateCursorTransform();
      };
      const handleDown = () => {
        cursor.classList.add('cursor-press');
        updateCursorTransform();
      };
      const handleUp = () => {
        cursor.classList.remove('cursor-press');
        updateCursorTransform();
      };

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
        el.addEventListener('mousedown', handleDown);
        el.addEventListener('mouseup', handleUp);
      });

      window.addEventListener('mouseup', handleUp);

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
  const setMobileMenuOpen = (open) => {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('hidden', !open);
    hamburger?.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  hamburger && hamburger.addEventListener('click', () => {
    const shouldOpen = mobileMenu.classList.contains('hidden');
    setMobileMenuOpen(shouldOpen);
  });

  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => setMobileMenuOpen(false)));

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
    const btn = sendBtn || this.querySelector('button[type="submit"]');
    if (!btn) return;
    const original = btn.innerHTML;
    const disableBtn = () => {
      btn.disabled = true;
      btn.classList.add('opacity-60','cursor-not-allowed');
      btn.innerHTML = `<span class="loader mr-2"></span> ${t('contact.sending')}`;
    };
    const restoreBtn = () => {
      btn.disabled = false;
      btn.classList.remove('opacity-60','cursor-not-allowed');
      btn.innerHTML = original;
    };

    const showError = (key) => {
      if (!formError) return;
      formError.textContent = t(key);
      formError.dataset.errorKey = key;
      formError.classList.remove('hidden');
    };

    const clearError = () => {
      if (!formError) return;
      formError.classList.add('hidden');
      delete formError.dataset.errorKey;
    };

    const formData = new FormData(contactForm);
    const fromName = (formData.get('from_name') || '').toString().trim();
    const fromMail = (formData.get('from_mail') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(fromMail)){
      showError('contact.invalidEmail');
      restoreBtn();
      return;
    }

    clearError();
    disableBtn();

    const serviceId = 'service_47lqkyt';
    const contactTemplateId = 'template_3yzo1bv';
    const autoReplyTemplateId = 'template_contact_ack';
    const ownerEmail = 'contact@neeosoft.com.br';

    if (!emailPattern.test(ownerEmail)) {
      console.error('Invalid owner email configured for EmailJS:', ownerEmail);
      showError('contact.error');
      restoreBtn();
      return;
    }

    const templateParams = {
      from_name: fromName,
      from_mail: fromMail,
      message,
      reply_to: fromMail,
      to_email: ownerEmail,
      to_name: 'Neo Soft Team'
    };

    const acknowledgementParams = {
      to_name: fromName || 'Friend',
      to_email: fromMail,
      from_name: 'Neo Soft',
      reply_to: 'contact@neeosoft.com.br',
      message: 'Recebemos sua mensagem e responderemos em breve. We received your message and will get back to you shortly.'
    };

    emailjs.send(serviceId, contactTemplateId, templateParams)
      .then((res) => {
        console.log('Email sent', res.status);
        blip(540, 0.1, 'square');
        if (formFeedback) formFeedback.classList.remove('hidden');
        contactForm.reset();
        setTimeout(()=> formFeedback && formFeedback.classList.add('hidden'), 3000);
        return emailjs.send(serviceId, autoReplyTemplateId, acknowledgementParams).catch(err => {
          console.warn('Auto-reply failed', err);
        });
      })
      .catch((err) => {
        console.error('Email error', err);
        showError('contact.error');
      })
      .finally(() => {
        restoreBtn();
      });
  });

})();