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
      'contact.copy': 'Want to collaborate, request services, or share feedback? We also work as service providers — reach out for a quote and we’ll get back to you.',
      'contact.name': 'Your name',
      'contact.email': 'Email',
      'contact.message': 'Your message',
      'contact.send': 'Send Message',
      'contact.sending': 'Sending...',
      'contact.success': 'Message sent! We’ll get back to you soon.',
      'contact.error': 'Something went wrong. Please try again later.',
      'contact.socialTitle': 'Connect with Neo Soft',
      'contact.socialCopy': 'Follow our latest updates and behind-the-scenes moments.',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Open Neo Soft on Instagram',
      'contact.linkedinAria': 'Open Neo Soft on LinkedIn',
      'contact.socialDiscord': 'Discord Server — Neo Soft',
      'contact.discordAria': 'Join the Neo Soft Discord server',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'Open Neo Soft on YouTube',
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
      'contact.copy': 'Quer colaborar, contratar nossos serviços ou compartilhar feedback? Também atuamos como prestadores de serviços — entre em contato para solicitar uma cotação e retornaremos em breve.',
      'contact.name': 'Seu nome',
      'contact.email': 'Email',
      'contact.message': 'Sua mensagem',
      'contact.send': 'Enviar mensagem',
      'contact.sending': 'Enviando...',
      'contact.success': 'Mensagem enviada! Responderemos em breve.',
      'contact.error': 'Algo deu errado. Tente novamente mais tarde.',
      'contact.socialTitle': 'Conecte-se com a Neo Soft',
      'contact.socialCopy': 'Acompanhe as novidades e bastidores do estúdio.',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Abrir Neo Soft no Instagram',
      'contact.linkedinAria': 'Abrir Neo Soft no LinkedIn',
      'contact.socialDiscord': 'Servidor Discord — Neo Soft',
      'contact.discordAria': 'Entrar no servidor Discord da Neo Soft',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'Abrir Neo Soft no YouTube',
      'footer.copy': '© <span id="year"></span> Neo Soft. Fundada por Victor Henrique Mendonça Rodrigues. • <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
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
      'games.title': 'Nuestros Juegos',
      'games.subtitle': 'Mundos construidos con corazón y tecnología de punta. Arrastra para explorar.',
      'games.frontline': 'Un shooter táctico inmersivo que combina realismo, intensidad y narrativa — disponible ahora en Steam.',
      'games.rampage': 'Un brawler musical con un ritmo caótico que ofrece adrenalina pura, destrucción y caos en modo multijugador.',
      'games.dissociation': 'Un terror psicológico donde una IA manipula cada uno de tus movimientos — sin armas, sin escape, solo supervivencia. ¿Sabes qué es real?',
      'games.banana': 'Una aventura de supervivencia humorística donde bananas mutantes dominan el mundo — ¿podrás detener la rebelión frutal?',
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
      'news.frontline.date': 'Septiembre de 2025',
      'news.frontline.title': 'Frontline se lanza en Steam',
      'news.frontline.copy': 'Tras casi seis años de desarrollo, nuestro título debut se ha lanzado oficialmente — explora la revolución ahora.',
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
      'contact.title': 'Contáctanos',
      'contact.copy': '¿Quieres colaborar, solicitar nuestros servicios o compartir comentarios? También trabajamos como proveedores de servicios — contáctanos para pedir una cotización y te responderemos.',
      'contact.name': 'Tu nombre',
      'contact.email': 'Correo electrónico',
      'contact.message': 'Tu mensaje',
      'contact.send': 'Enviar mensaje',
      'contact.sending': 'Enviando...',
      'contact.success': '¡Mensaje enviado! Nos pondremos en contacto pronto.',
      'contact.error': 'Algo salió mal. Inténtalo de nuevo más tarde.',
      'contact.socialTitle': 'Conéctate con Neo Soft',
      'contact.socialCopy': 'Sigue nuestras novedades y momentos entre bastidores.',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Abrir Neo Soft en Instagram',
      'contact.linkedinAria': 'Abrir Neo Soft en LinkedIn',
      'contact.socialDiscord': 'Servidor de Discord — Neo Soft',
      'contact.discordAria': 'Únete al servidor de Discord de Neo Soft',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'Abrir Neo Soft en YouTube',
      'footer.copy': '© <span id="year"></span> Neo Soft. Fundado por Victor Henrique Mendonça Rodrigues. • <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
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
      'games.title': '我们的游戏',
      'games.subtitle': '用热忱与尖端科技构建的世界。拖动浏览。',
      'games.frontline': '一款将真实感、张力与叙事融合的沉浸式战术射击——现已登陆 Steam。',
      'games.rampage': '一款节奏混乱的音乐格斗游戏，在多人模式中带来纯粹的肾上腺素、破坏与混乱。',
      'games.dissociation': '一部心理恐怖作品，AI 操控你的每一步——无武器、无逃脱，只有求生。你还能分辨真实吗？',
      'games.banana': '一场充满幽默的生存冒险，变异香蕉统治世界——你能阻止这场水果起义吗？',
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
      'news.frontline.date': '2025 年 9 月',
      'news.frontline.title': 'Frontline 登陆 Steam',
      'news.frontline.copy': '经过近六年开发，我们的首款作品正式发布——立即体验这场革命。',
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
      'contact.title': '联系我们',
      'contact.copy': '想合作、咨询我们的服务或分享反馈？我们也提供定制服务——欢迎联系获取报价，我们会尽快回复。',
      'contact.name': '您的姓名',
      'contact.email': '电子邮件',
      'contact.message': '您的留言',
      'contact.send': '发送信息',
      'contact.sending': '正在发送…',
      'contact.success': '信息已发送！我们会尽快回复。',
      'contact.error': '出现问题。请稍后再试。',
      'contact.socialTitle': '关注 Neo Soft',
      'contact.socialCopy': '获取我们的最新动态与幕后花絮。',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': '在 Instagram 打开 Neo Soft',
      'contact.linkedinAria': '在 LinkedIn 打开 Neo Soft',
      'contact.socialDiscord': 'Discord 服务器 — Neo Soft',
      'contact.discordAria': '加入 Neo Soft 的 Discord 服务器',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': '在 YouTube 打开 Neo Soft',
      'footer.copy': '© <span id="year"></span> Neo Soft. 由 Victor Henrique Mendonça Rodrigues 创立。• <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
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
      'games.title': '私たちのゲーム',
      'games.subtitle': '情熱と最先端技術で作り上げた世界。ドラッグしてご覧ください。',
      'games.frontline': 'リアリズム、緊張感、物語性を融合させた没入型タクティカルシューター — 現在 Steam で配信中。',
      'games.rampage': '混沌としたリズムで展開する音楽系乱闘ゲーム。マルチプレイで純粋な興奮と破壊、カオスを体験。',
      'games.dissociation': 'AI があなたの一挙手一投足を操るサイコホラー — 武器も逃げ場もなく、生き残りだけが目的。現実を見分けられますか？',
      'games.banana': '突然変異したバナナが世界を支配するコミカルなサバイバルアドベンチャー — フルーツの反乱を止められるか？',
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
      'news.frontline.date': '2025年9月',
      'news.frontline.title': 'Frontline が Steam でリリース',
      'news.frontline.copy': '約6年の開発期間を経て、私たちのデビュー作が正式にローンチしました — 今すぐ革命を体験しよう。',
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
      'contact.title': 'お問い合わせ',
      'contact.copy': 'コラボの相談、サービスのご依頼、フィードバックなど、お気軽にご連絡ください。受託サービスも承っています — お見積もりのご相談をお待ちしています。',
      'contact.name': 'お名前',
      'contact.email': 'メールアドレス',
      'contact.message': 'メッセージ',
      'contact.send': 'メッセージを送信',
      'contact.sending': '送信中…',
      'contact.success': 'メッセージを送信しました！追ってご連絡いたします。',
      'contact.error': '問題が発生しました。後でもう一度お試しください。',
      'contact.socialTitle': 'Neo Soft とつながる',
      'contact.socialCopy': '最新情報や舞台裏の様子をチェックしましょう。',
      'contact.socialInstagram': 'Instagram @neeeosoft',
      'contact.socialLinkedIn': 'LinkedIn / Neo Soft',
      'contact.instagramAria': 'Instagram で Neo Soft を開く',
      'contact.linkedinAria': 'LinkedIn で Neo Soft を開く',
      'contact.socialDiscord': 'Discordサーバー — Neo Soft',
      'contact.discordAria': 'Neo Soft の Discord サーバーに参加する',
      'contact.socialYouTube': 'YouTube @NeoSoft-m2e',
      'contact.youtubeAria': 'YouTube で Neo Soft を開く',
      'footer.copy': '© <span id="year"></span> Neo Soft. Victor Henrique Mendonça Rodrigues により設立。• <a href="mailto:contact@neeosoft.com.br" class="hover:text-purple-300">contact@neeosoft.com.br</a>'
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