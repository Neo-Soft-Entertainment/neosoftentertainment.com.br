// Neo Soft — interactions + EmailJS (no preloader)
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const navbar = $('#navbar');
  const cursor = $('#cursor');
  const particles = $('#particles');
  const gamesTrack = $('#gamesTrack');
  const servicesTrack = $('#servicesTrack');
  const pluginsTrack = $('#pluginsTrack');
  const servicesPrevBtn = $('#servicesPrev');
  const servicesNextBtn = $('#servicesNext');
  const pluginsPrevBtn = $('#pluginsPrev');
  const pluginsNextBtn = $('#pluginsNext');
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
      'hero.kicker': 'From indie passion to global stages',
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
      'games.rampage': 'A musical brawler with a chaotic rhythm that offers pure adrenaline, destruction and chaos in multiplayer mode.',
      'games.apocrophia': 'GameJam-born roguelike FPS where you chase the zombie who stole your corgi across frantic runs.',
      'games.playApocrophia': 'Play on itch.io →',
      'games.dissociation': 'A psychological horror where an AI manipulates your every move — no weapons, no escape, only survival. Do you know what’s real?',
      'games.banana': 'A co-op adventure where every player is a monkey escaping a lab, sprinting for freedom while causing monkey mischief.',
      'games.servicesTitle': 'Project Highlights',
      'games.servicesSubtitle': 'Examples of our work showcasing the games we built as co-dev and services partners.',
      'games.services.bunsTitle': 'Buns Of Fire',
      'games.services.bunsDesc': 'NSFW fighting game in the spirit of Mortal Kombat where the hook trades fatalities for explicit scenes inspired by Eroico.',
      'games.services.bunsAlt': 'Key art from Buns Of Fire showing fighters mid-finish as the screen cuts to an explicit vignette.',
      'games.services.fatumTitle': 'FATUM',
      'games.services.fatumDesc': 'Futuristic multiplayer FPS set after the world collapses, where only robots remain. Battle across Domination, Capture the Flag, and Deathmatch modes inspired by Splitgate. We implemented the spectator system, grenade gameplay, and fixed replication issues.',
      'games.services.fatumAlt': 'Key art from FATUM showing combat robots battling in a collapsed futuristic arena.',
      'games.services.buildyTitle': 'Buildy Game (Working Title)',
      'games.services.buildyDesc': 'Construction-focused project where we implemented a complete save system with manual slots and auto-save support.',
      'games.services.buildyAlt': 'Key art from Buildy Game showing modular structures preserved across save slots.',
      'games.services.phaseTitle': 'Phase',
      'games.services.phaseDesc': 'High-mobility FPS centered on Titanfall-inspired movement systems.',
      'games.services.phaseAlt': 'Key art from Phase showing a pilot wall-running through a neon arena.',
      'games.services.secret1Title': 'Confidential Project I',
      'games.services.secret1Desc': 'In-development initiative under NDA. Our tools team is engineering core combat prototypes for the client.',
      'games.services.secret2Title': 'Confidential Project II',
      'games.services.secret2Desc': 'Ongoing Unreal Engine support providing optimization sprints and multiplayer stability tuning.',
      'games.services.secret3Title': 'Confidential Project III',
      'games.services.secret3Desc': 'Next-gen concept where we handle worldbuilding pre-production while respecting strict confidentiality.',
      'services.title': 'Services for Unreal teams',
      'services.subtitle': 'From embedded engineering to full productions and build automation, we provide three service pillars tailored to your needs.',
      'services.coDev.title': 'Co-Development',
      'services.coDev.copy': 'Specialist support that plugs into your team to deliver gameplay, networking, and AI features with production-ready code.',
      'services.coDev.gameplayTitle': 'Gameplay Systems',
      'services.coDev.gameplayDesc': 'High performance gameplay engineering for Unreal Engine. Complete FPS and TPS systems including weapon frameworks, modular components, procedural recoil, ADS rigs, locomotion logic, melee integration, interaction systems, hit detection, animation graphs, montage driven actions, camera systems, movement refinement, state machines and gameplay tag based architecture.',
      'services.coDev.multiplayerTitle': 'Multiplayer and Replication',
      'services.coDev.multiplayerDesc': 'Robust client server logic built with production standards. Deterministic replication for weapons, abilities, movement, grenades, projectiles, VFX sync, animation replication and inventory systems. Server authority, client prediction, reconciliation, lag compensation, replication condition optimization and stable network performance for real game scenarios.',
      'services.coDev.aiTitle': 'AI and Behavior Systems',
      'services.coDev.aiDesc': 'Design and implementation of intelligent agents using Behavior Trees, Blackboards, EQS and AI Perception. Patrol investigate chase flows, combat decision making, sensory systems, stealth detection, squad coordination, dynamic navigation, reactive enemies and modular AI frameworks that scale with complexity.',
      'services.full.title': 'Full Service Game Development',
      'services.full.copy': 'End-to-end Unreal delivery including tooling, optimization, and technical direction for complex productions.',
      'services.full.toolsTitle': 'Tools and Editor Extensions',
      'services.full.toolsDesc': 'Development of internal tools to accelerate production. Custom Unreal Editor utilities, batch automated asset processes, map validation tools, import optimizers, Blueprint tooling, profiling widgets and full standalone applications in WPF or WinUI for build control, Git integration, content management, data editing and version organization.',
      'services.full.performanceTitle': 'Performance and Optimization',
      'services.full.performanceDesc': 'Deep optimization for CPU, GPU and network. Profiling and reduction of Blueprint heavy systems, tick minimization, async tasks, animation graph simplification, LOD and HLOD refinement, Nanite setups, streaming tuning, network bandwidth reduction, replication pruning, physics optimization and frame stability improvements for production builds.',
      'services.full.directionTitle': 'Technical Direction and Architecture',
      'services.full.directionDesc': 'Foundational planning for long term Unreal projects. Codebase architecture, modular system planning, scalable gameplay framework design, replication strategy for large features, feature roadmaps, guidelines for component driven systems, data structures and high level technical leadership to align development with production milestones.',
      'services.build.title': 'Build & Release Systems',
      'services.build.copy': 'Automated delivery, server infrastructure, and deployment pipelines that keep releases stable and repeatable.',
      'services.build.ciTitle': 'Automation and CI',
      'services.build.ciDesc': 'Full pipeline automation for Unreal Engine projects. Continuous Integration and Continuous Delivery with GitHub Actions, GitLab CI or Azure DevOps. Automated builds for Windows, Linux and Dedicated Server targets. Cloud storage support including Backblaze B2, AWS S3, Google Cloud Storage and any S3 compatible provider. Packaging automation, versioning scripts, changelog generation, environment bootstrap, artifact distribution, nightly builds, branch based build rules, code quality checks, caching layers, dependency setup and automated deployment flows for production or playtests.',
      'services.build.serversTitle': 'Dedicated Servers and Deployment',
      'services.build.serversDesc': 'Complete support for dedicated server infrastructure. Unreal Engine server builds, Linux configuration, process supervision, crash recovery, runtime monitoring, performance optimization, automated deployment, multi instance orchestration, database connectivity, remote logging, S3 based asset distribution and scripts that simplify testing or staging environments.',
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
      'news.frontline.title': 'Frontline Steam Page Goes Live',
      'news.frontline.copy': 'After nearly six years in development, our debut title is preparing for launch — wishlist the revolution now.',
      'news.team.date': 'July 2025',
      'news.team.title': 'Neo Soft Expands Team',
      'news.team.copy': 'We’re growing! Neo Soft welcomes new talent as we take on the next chapter of our journey.',
      'careers.title': 'Careers',
      'careers.copy': 'All roles are filled for now, but we’re still happy to hear from passionate developers, artists, and designers who want to collaborate in the future.',
      'careers.apply': 'Send Portfolio',
      'careers.team': 'Meet the Team',
      'careers.open': 'All positions filled',
      'careers.status': 'Thank you to everyone who applied. We don’t have open roles right now, but you can still email your portfolio so we can reach out when opportunities return.',
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
      'hero.kicker': 'Da paixão indie aos palcos globais',
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
      'games.rampage': 'Um brawler musical de ritmo caótico que entrega adrenalina, destruição e caos no modo multiplayer.',
      'games.apocrophia': 'FPS roguelike criado em GameJam. Persiga o zumbi que levou seu cachorro em corridas caóticas.',
      'games.playApocrophia': 'Jogar no itch.io →',
      'games.dissociation': 'Um terror psicológico em que uma IA manipula cada movimento seu — sem armas, sem escape, só sobrevivência. Você sabe o que é real?',
      'games.banana': 'Um jogo co-op onde todos os jogadores são macacos fugindo de um laboratório — todos precisam correr e escapar enquanto fazem macacagens.',
      'games.servicesTitle': 'Destaques de Projetos',
      'games.servicesSubtitle': 'Exemplos dos nossos trabalhos, mostrando os jogos que fizemos como parceiros de co-dev e serviços.',
      'games.services.bunsTitle': 'Buns Of Fire',
      'games.services.bunsDesc': 'Jogo de luta NSFW no espírito de Mortal Kombat, em que o gancho troca fatalities por cenas explícitas inspiradas em Eroico.',
      'games.services.bunsAlt': 'Arte de Buns Of Fire mostrando lutadores em um final explícito.',
      'games.services.fatumTitle': 'FATUM',
      'games.services.fatumDesc': 'FATUM é um FPS multiplayer futurista ambientado após o colapso do mundo, onde apenas robôs restam. Lute como uma máquina de combate em modos como Dominação, Captura a Bandeira e Deathmatch, inspirado em Splitgate. Trabalhamos na implementação do sistema de espectador, das granadas e na correção de falhas de replicação.',
      'games.services.fatumAlt': 'Arte de FATUM mostrando robôs de combate em uma arena futurista em colapso.',
      'games.services.buildyTitle': 'Buildy Game (projeto sem nome)',
      'games.services.buildyDesc': 'Projeto focado em construção no qual implementamos um sistema de save completo com slots manuais e salvamento automático.',
      'games.services.buildyAlt': 'Arte de Buildy Game mostrando estruturas modulares salvas em diferentes slots.',
      'games.services.phaseTitle': 'Phase',
      'games.services.phaseDesc': 'FPS de alta mobilidade com movimentação inspirada em Titanfall.',
      'games.services.phaseAlt': 'Arte de Phase mostrando um piloto correndo na parede em uma arena neon.',
      'games.services.secret1Title': 'Projeto Confidencial I',
      'games.services.secret1Desc': 'Iniciativa em desenvolvimento sob NDA. Nossa equipe de ferramentas está criando protótipos centrais de combate para o cliente.',
      'games.services.secret2Title': 'Projeto Confidencial II',
      'games.services.secret2Desc': 'Suporte contínuo em Unreal Engine com sprints de otimização e ajustes de estabilidade no multiplayer.',
      'games.services.secret3Title': 'Projeto Confidencial III',
      'games.services.secret3Desc': 'Concept de nova geração em que cuidamos da pré-produção de worldbuilding com confidencialidade total.',
      'services.title': 'Serviços para equipes Unreal',
      'services.subtitle': 'De engenharia dedicada a produções completas e automação de builds, oferecemos três pilares de serviço sob medida para sua necessidade.',
      'services.coDev.title': 'Cocriamos com seu time',
      'services.coDev.copy': 'Suporte especializado que se integra à sua equipe para entregar gameplay, rede e IA com código em padrão de produção.',
      'services.coDev.gameplayTitle': 'Sistemas de Gameplay',
      'services.coDev.gameplayDesc': 'Engenharia de gameplay de alta performance para Unreal Engine. Sistemas completos de FPS e TPS incluindo frameworks de armas, componentes modulares, recoil procedural, rigs de mira (ADS), lógica de locomoção, integração de melee, sistemas de interação, detecção de acertos, gráficos de animação, ações dirigidas por montages, sistemas de câmera, refinamento de movimento, máquinas de estado e arquitetura baseada em gameplay tags.',
      'services.coDev.multiplayerTitle': 'Multiplayer e Replicação',
      'services.coDev.multiplayerDesc': 'Lógica cliente-servidor robusta construída com padrões de produção. Replicação determinística para armas, habilidades, movimento, granadas, projéteis, sincronização de VFX, replicação de animação e sistemas de inventário. Autoridade de servidor, predição de cliente, reconciliação, compensação de latência, otimização de condições de replicação e desempenho de rede estável para cenários reais.',
      'services.coDev.aiTitle': 'IA e Sistemas de Comportamento',
      'services.coDev.aiDesc': 'Design e implementação de agentes inteligentes usando Behavior Trees, Blackboards, EQS e AI Perception. Fluxos de patrulha–investigação–perseguição, decisões de combate, sistemas sensoriais, detecção stealth, coordenação de esquadrão, navegação dinâmica, inimigos reativos e frameworks de IA modulares que escalam com a complexidade.',
      'services.full.title': 'Desenvolvimento de Jogos Completo',
      'services.full.copy': 'Entrega Unreal de ponta a ponta, incluindo ferramentas, otimização e direção técnica para produções complexas.',
      'services.full.toolsTitle': 'Ferramentas e Extensões do Editor',
      'services.full.toolsDesc': 'Criação de ferramentas internas para acelerar a produção. Utilitários personalizados no Editor do Unreal, processos automatizados em lote, ferramentas de validação de mapa, otimizadores de importação, tooling para Blueprint, widgets de profiling e aplicativos completos em WPF ou WinUI para controle de builds, integração com Git, gestão de conteúdo, edição de dados e organização de versões.',
      'services.full.performanceTitle': 'Performance e Otimização',
      'services.full.performanceDesc': 'Otimização profunda para CPU, GPU e rede. Profiling e redução de sistemas pesados em Blueprint, minimização de ticks, tarefas assíncronas, simplificação de gráficos de animação, refinamento de LOD e HLOD, setups de Nanite, ajuste de streaming, redução de banda de rede, poda de replicação, otimização de física e melhorias de estabilidade de frame em builds de produção.',
      'services.full.directionTitle': 'Direção Técnica e Arquitetura',
      'services.full.directionDesc': 'Planejamento fundamental para projetos Unreal de longo prazo. Arquitetura de código, planejamento de sistemas modulares, design de frameworks de gameplay escaláveis, estratégia de replicação para grandes features, roadmaps, guias para sistemas orientados a componentes, estruturas de dados e liderança técnica para alinhar desenvolvimento e milestones.',
      'services.build.title': 'Sistemas de Build e Release',
      'services.build.copy': 'Entrega automatizada, infraestrutura de servidores e pipelines de deploy que mantêm lançamentos estáveis e repetíveis.',
      'services.build.ciTitle': 'Automação e CI',
      'services.build.ciDesc': 'Automação completa de pipeline para projetos Unreal Engine. CI/CD com GitHub Actions, GitLab CI ou Azure DevOps. Builds automatizados para Windows, Linux e Dedicated Server. Suporte a storage na nuvem incluindo Backblaze B2, AWS S3, Google Cloud Storage e qualquer provedor compatível com S3. Automação de packaging, scripts de versionamento, geração de changelog, bootstrap de ambiente, distribuição de artefatos, builds noturnos, regras de build por branch, checagens de qualidade de código, camadas de cache, setup de dependências e fluxos de deploy automatizado para produção ou playtests.',
      'services.build.serversTitle': 'Servidores Dedicados e Deploy',
      'services.build.serversDesc': 'Suporte completo para infraestrutura de servidores dedicados. Builds de servidor Unreal Engine, configuração Linux, supervisão de processos, recuperação de crash, monitoramento em runtime, otimização de performance, deploy automatizado, orquestração de múltiplas instâncias, conectividade com banco de dados, logging remoto, distribuição de assets via S3 e scripts que simplificam ambientes de teste ou staging.',
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
      'news.frontline.title': 'Frontline estreia página na Steam',
      'news.frontline.copy': 'Após quase seis anos de desenvolvimento, nosso título de estreia se prepara para o lançamento — adicione a revolução à sua lista de desejos.',
      'news.team.date': 'Julho de 2025',
      'news.team.title': 'Neo Soft expande o time',
      'news.team.copy': 'Estamos crescendo! A Neo Soft recebe novos talentos enquanto avançamos para o próximo capítulo da nossa jornada.',
      'careers.title': 'Carreiras',
      'careers.copy': 'Todas as vagas estão preenchidas no momento, mas seguimos abertos a conhecer desenvolvedores, artistas e designers para futuras colaborações.',
      'careers.apply': 'Enviar portfólio',
      'careers.team': 'Conheça a equipe',
      'careers.open': 'Todas as vagas preenchidas',
      'careers.status': 'Obrigado a todos que se candidataram. No momento não há vagas em aberto, mas você pode enviar seu portfólio por e-mail para sermos avisados quando surgirem novas oportunidades.',
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
      'hero.kicker': 'De la pasión indie a los escenarios globales',
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
      'games.rampage': 'Un brawler musical con un ritmo caótico que ofrece adrenalina pura, destrucción y caos en modo multijugador.',
      'games.apocrophia': 'FPS roguelike nacido en una GameJam. Persigue al zombi que robó a tu perro en partidas frenéticas.',
      'games.playApocrophia': 'Jugar en itch.io →',
      'games.dissociation': 'Un terror psicológico donde una IA manipula cada uno de tus movimientos — sin armas, sin escape, solo supervivencia. ¿Sabes qué es real?',
      'games.banana': 'Un juego cooperativo donde todos los jugadores son monos escapando de un laboratorio; todos deben correr y huir mientras hacen travesuras de mono.',
      'games.servicesTitle': 'Proyectos Destacados',
      'games.servicesSubtitle': 'Ejemplos de nuestros trabajos, mostrando los juegos que hicimos como socios de co-dev y servicios.',
      'games.services.bunsTitle': 'Buns Of Fire',
      'games.services.bunsDesc': 'Juego de lucha NSFW en la línea de Mortal Kombat donde el gancho cambia los fatalities por escenas explícitas inspiradas en Eroico.',
      'games.services.bunsAlt': 'Arte de Buns Of Fire con luchadores en un remate explícito.',
      'games.services.fatumTitle': 'FATUM',
      'games.services.fatumDesc': 'FATUM es un FPS multijugador futurista ambientado tras el colapso del mundo, donde solo quedan robots. Combate como una máquina en modos como Dominación, Captura la Bandera y Deathmatch, inspirado en Splitgate. Trabajamos en la implementación del sistema de espectador, de las granadas y en la corrección de errores de replicación.',
      'games.services.fatumAlt': 'Arte de FATUM que muestra robots de combate luchando en una arena futurista colapsada.',
      'games.services.buildyTitle': 'Buildy Game (título provisional)',
      'games.services.buildyDesc': 'Proyecto centrado en la construcción donde implementamos un sistema de guardado completo con ranuras manuales y guardado automático.',
      'games.services.buildyAlt': 'Arte de Buildy Game que muestra estructuras modulares guardadas en distintos espacios.',
      'games.services.phaseTitle': 'Phase',
      'games.services.phaseDesc': 'FPS de alta movilidad inspirado en los sistemas de movimiento de Titanfall.',
      'games.services.phaseAlt': 'Arte de Phase con un piloto corriendo por la pared en una arena de neón.',
      'games.services.secret1Title': 'Proyecto Confidencial I',
      'games.services.secret1Desc': 'Iniciativa en desarrollo bajo NDA. Nuestro equipo de herramientas crea prototipos centrales de combate para el cliente.',
      'games.services.secret2Title': 'Proyecto Confidencial II',
      'games.services.secret2Desc': 'Soporte continuo en Unreal Engine con sprints de optimización y ajustes de estabilidad multijugador.',
      'games.services.secret3Title': 'Proyecto Confidencial III',
      'games.services.secret3Desc': 'Concepto de próxima generación donde gestionamos la preproducción de worldbuilding con total confidencialidad.',
      'services.title': 'Servicios para equipos de Unreal',
      'services.subtitle': 'Desde ingeniería embebida hasta producciones completas y automatización de builds, ofrecemos tres pilares de servicio a la medida de tus necesidades.',
      'services.coDev.title': 'Cocreamos con tu equipo',
      'services.coDev.copy': 'Soporte especializado que se integra a tu equipo para entregar gameplay, red y IA con código listo para producción.',
      'services.coDev.gameplayTitle': 'Sistemas de Gameplay',
      'services.coDev.gameplayDesc': 'Ingeniería de gameplay de alto rendimiento para Unreal Engine. Sistemas completos de FPS y TPS que incluyen frameworks de armas, componentes modulares, retroceso procedural, rigs de apuntado (ADS), lógica de locomoción, integración de melee, sistemas de interacción, detección de impactos, gráficos de animación, acciones dirigidas por montages, sistemas de cámara, refinamiento de movimiento, máquinas de estado y arquitectura basada en gameplay tags.',
      'services.coDev.multiplayerTitle': 'Multijugador y Replicación',
      'services.coDev.multiplayerDesc': 'Lógica cliente-servidor robusta construida con estándares de producción. Replicación determinista para armas, habilidades, movimiento, granadas, proyectiles, sincronización de VFX, replicación de animaciones y sistemas de inventario. Autoridad de servidor, predicción de cliente, reconciliación, compensación de lag, optimización de condiciones de replicación y rendimiento de red estable para escenarios reales.',
      'services.coDev.aiTitle': 'IA y Sistemas de Comportamiento',
      'services.coDev.aiDesc': 'Diseño e implementación de agentes inteligentes usando Behavior Trees, Blackboards, EQS y AI Perception. Flujos de patrulla–investigación–persecución, decisiones de combate, sistemas sensoriales, detección de sigilo, coordinación de escuadras, navegación dinámica, enemigos reactivos y frameworks de IA modulares que escalan con la complejidad.',
      'services.full.title': 'Desarrollo de Juegos Integral',
      'services.full.copy': 'Entrega Unreal de extremo a extremo, incluyendo herramientas, optimización y dirección técnica para producciones complejas.',
      'services.full.toolsTitle': 'Herramientas y Extensiones del Editor',
      'services.full.toolsDesc': 'Desarrollo de herramientas internas para acelerar la producción. Utilidades personalizadas en el Editor de Unreal, procesos automatizados por lotes, herramientas de validación de mapas, optimizadores de importación, tooling para Blueprint, widgets de profiling y aplicaciones completas en WPF o WinUI para control de builds, integración con Git, gestión de contenido, edición de datos y organización de versiones.',
      'services.full.performanceTitle': 'Rendimiento y Optimización',
      'services.full.performanceDesc': 'Optimización profunda para CPU, GPU y red. Profiling y reducción de sistemas pesados en Blueprint, minimización de ticks, tareas asíncronas, simplificación de gráficos de animación, refinamiento de LOD y HLOD, configuraciones de Nanite, ajuste de streaming, reducción de ancho de banda de red, poda de replicación, optimización de física y mejoras de estabilidad de fotogramas para builds de producción.',
      'services.full.directionTitle': 'Dirección Técnica y Arquitectura',
      'services.full.directionDesc': 'Planificación fundamental para proyectos Unreal a largo plazo. Arquitectura de código, planificación de sistemas modulares, diseño de frameworks de gameplay escalables, estrategia de replicación para grandes features, hojas de ruta, guías para sistemas basados en componentes, estructuras de datos y liderazgo técnico de alto nivel que alinea el desarrollo con los hitos de producción.',
      'services.build.title': 'Sistemas de Build y Release',
      'services.build.copy': 'Entrega automatizada, infraestructura de servidores y pipelines de despliegue que mantienen los lanzamientos estables y repetibles.',
      'services.build.ciTitle': 'Automatización y CI',
      'services.build.ciDesc': 'Automatización completa del pipeline para proyectos Unreal Engine. Integración y Entrega Continua con GitHub Actions, GitLab CI o Azure DevOps. Builds automatizados para Windows, Linux y Dedicated Server. Soporte de almacenamiento en la nube, incluyendo Backblaze B2, AWS S3, Google Cloud Storage y cualquier proveedor compatible con S3. Automatización de packaging, scripts de versionado, generación de changelog, bootstrap de entornos, distribución de artefactos, builds nocturnas, reglas de build por rama, revisiones de calidad de código, capas de caché, configuración de dependencias y flujos de despliegue automatizado para producción o playtests.',
      'services.build.serversTitle': 'Servidores Dedicados y Despliegue',
      'services.build.serversDesc': 'Soporte completo para infraestructura de servidores dedicados. Builds de servidor Unreal Engine, configuración de Linux, supervisión de procesos, recuperación ante fallos, monitoreo en tiempo de ejecución, optimización de rendimiento, despliegue automatizado, orquestación de múltiples instancias, conectividad con bases de datos, registro remoto, distribución de assets mediante S3 y scripts que simplifican entornos de prueba o staging.',
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
      'news.frontline.title': 'Frontline estrena página en Steam',
      'news.frontline.copy': 'Tras casi seis años de desarrollo, nuestro título debut se prepara para el lanzamiento — añádelo a tu lista de deseados.',
      'news.team.date': 'Julio de 2025',
      'news.team.title': 'Neo Soft amplía el equipo',
      'news.team.copy': '¡Estamos creciendo! Neo Soft recibe nuevo talento mientras abordamos el próximo capítulo de nuestro viaje.',
      'careers.title': 'Carreras',
      'careers.copy': 'Todas las vacantes ya están cubiertas por ahora, pero nos encantará conocer a desarrolladores, artistas y diseñadores interesados en futuras colaboraciones.',
      'careers.apply': 'Enviar portafolio',
      'careers.team': 'Conoce al equipo',
      'careers.open': 'Todas las vacantes cubiertas',
      'careers.status': 'Gracias a todos quienes postularon. No tenemos roles abiertos en este momento, pero puedes enviar tu portafolio por correo para que te contactemos cuando haya nuevas oportunidades.',
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
      'hero.kicker': '从独立热忱走向全球舞台',
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
      'games.rampage': '一款节奏混乱的音乐格斗游戏，在多人模式中带来纯粹的肾上腺素、破坏与混乱。',
      'games.apocrophia': 'GameJam 诞生的节奏明快 Roguelike FPS，追击绑走你爱犬的僵尸，冲破混乱轮回。',
      'games.playApocrophia': '前往 itch.io 体验 →',
      'games.dissociation': '一部心理恐怖作品，AI 操控你的每一步——无武器、无逃脱，只有求生。你还能分辨真实吗？',
      'games.banana': '一款合作游戏，所有玩家都是逃离实验室的猴子，一边拼命奔逃，一边制造猴子般的恶作剧。',
      'games.servicesTitle': '项目亮点',
      'games.servicesSubtitle': '展示我们以共同开发和服务合作伙伴身份打造的游戏案例。',
      'games.services.bunsTitle': 'Buns Of Fire',
      'games.services.bunsDesc': '成人向格斗游戏，风格类似《真人快打》，卖点是把终结技换成如《Eroico》般的露骨场景。',
      'games.services.bunsAlt': '《Buns Of Fire》宣传画，展示选手在露骨终结场景中的瞬间。',
      'games.services.fatumTitle': 'FATUM',
      'games.services.fatumDesc': '《FATUM》是一款世界崩塌后仅存机器人的未来风格多人FPS。玩家将化身战斗机器，在统治、夺旗、死斗等受《Splitgate》启发的模式中厮杀。我们负责实现观战系统、手雷玩法，并修复复制同步问题。',
      'games.services.fatumAlt': '《FATUM》宣传画，展现坍塌未来竞技场中交战的战斗机器人。',
      'games.services.buildyTitle': 'Buildy Game（暂定名）',
      'games.services.buildyDesc': '这是一款专注建造的项目，我们实现了带手动槽位和自动保存支持的完整存档系统。',
      'games.services.buildyAlt': '《Buildy Game》宣传画，展示保存在多个槽位中的模块化结构。',
      'games.services.phaseTitle': 'Phase',
      'games.services.phaseDesc': '一款强调类似《Titanfall》机动系统的高速FPS。',
      'games.services.phaseAlt': '《Phase》宣传画，描绘飞行员在霓虹竞技场的墙面上奔跑。',
      'games.services.secret1Title': '保密项目 I',
      'games.services.secret1Desc': '在保密协议下开发中，我们的工具团队为客户打造核心战斗原型。',
      'games.services.secret2Title': '保密项目 II',
      'games.services.secret2Desc': '持续提供 Unreal Engine 支持，开展优化冲刺并强化多人联机稳定性。',
      'games.services.secret3Title': '保密项目 III',
      'games.services.secret3Desc': '下一代概念项目，我们负责世界观前期制作并严格遵守保密要求。',
      'services.title': '面向 Unreal 团队的服务',
      'services.subtitle': '从嵌入式工程到完整制作与构建自动化，我们提供三大服务支柱以满足您的需求。',
      'services.coDev.title': '与团队共创',
      'services.coDev.copy': '嵌入式专家支持，加入你的团队，交付具备生产水准的玩法、联网与 AI 功能。',
      'services.coDev.gameplayTitle': '玩法系统',
      'services.coDev.gameplayDesc': '为 Unreal Engine 提供高性能玩法工程。完整的 FPS/TPS 系统，包括武器框架、模块化组件、程序化后坐力、ADS 瞄准、移动逻辑、近战整合、交互系统、命中检测、动画图表、Montage 驱动的动作、摄像机系统、运动优化、状态机以及基于 Gameplay Tag 的架构。',
      'services.coDev.multiplayerTitle': '多人联机与复制',
      'services.coDev.multiplayerDesc': '按照生产标准构建的可靠客户端-服务器逻辑。为武器、技能、移动、手雷、弹道、VFX 同步、动画复制和库存系统提供确定性复制。服务器权威、客户端预测、状态回滚、延迟补偿、复制条件优化以及适用于真实游戏场景的稳定网络表现。',
      'services.coDev.aiTitle': 'AI 与行为系统',
      'services.coDev.aiDesc': '使用行为树、黑板、EQS 与 AI Perception 设计并实现智能体。巡逻-调查-追击流程、战斗决策、感知系统、潜行侦测、小队协作、动态导航、可反应的敌人以及可随复杂度扩展的模块化 AI 框架。',
      'services.full.title': '全流程游戏开发',
      'services.full.copy': '端到端的 Unreal 交付，涵盖工具、优化以及复杂项目的技术方向。',
      'services.full.toolsTitle': '工具与编辑器扩展',
      'services.full.toolsDesc': '打造内部工具以加速生产。定制 Unreal 编辑器实用工具、批量自动化的资产流程、地图验证工具、导入优化器、Blueprint 工具、性能分析组件，以及使用 WPF 或 WinUI 编写的独立应用，用于构建控制、Git 集成、内容管理、数据编辑与版本组织。',
      'services.full.performanceTitle': '性能与优化',
      'services.full.performanceDesc': '针对 CPU、GPU 与网络的深度优化。对 Blueprint 负载大的系统做 Profiling 与减重，减少 Tick，使用异步任务，简化动画图表，优化 LOD/HLOD，配置 Nanite，调优流式加载，降低网络带宽，裁剪复制数据，优化物理，并提升生产构建下的帧率稳定性。',
      'services.full.directionTitle': '技术统筹与架构',
      'services.full.directionDesc': '为长期 Unreal 项目奠定基础。设计代码架构与模块化系统，规划可扩展的玩法框架，为大型功能制定复制策略、功能路线图、组件驱动系统指南、数据结构，以及高层技术领导来使开发与生产里程碑保持一致。',
      'services.build.title': '构建与发布系统',
      'services.build.copy': '自动化交付、服务器基础设施与部署流水线，确保版本稳定可重复。',
      'services.build.ciTitle': '自动化与 CI',
      'services.build.ciDesc': '为 Unreal Engine 项目提供完整的流水线自动化。使用 GitHub Actions、GitLab CI 或 Azure DevOps 实现 CI/CD。自动生成 Windows、Linux 与专用服务器构建。支持 Backblaze B2、AWS S3、Google Cloud Storage 以及任意兼容 S3 的云存储。自动化打包、版本脚本、变更日志生成、环境引导、制品分发、夜间构建、基于分支的构建规则、代码质量检查、缓存层、依赖配置以及面向生产或测试的自动化部署流程。',
      'services.build.serversTitle': '专用服务器与部署',
      'services.build.serversDesc': '为专用服务器基础设施提供全方位支持。Unreal Engine 服务器构建、Linux 配置、进程监管、崩溃恢复、运行时监控、性能优化、自动化部署、多实例编排、数据库连接、远程日志、基于 S3 的资产分发，以及简化测试或预发布环境的脚本。',
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
      'news.frontline.title': 'Frontline 在 Steam 上线商店页面',
      'news.frontline.copy': '历经近六年开发，我们的首部作品正筹备发布——现在就加入愿望单，静待这场革命。',
      'news.team.date': '2025 年 7 月',
      'news.team.title': 'Neo Soft 扩充团队',
      'news.team.copy': '我们在成长！Neo Soft 欢迎新人才，共同开启旅程的新篇章。',
      'careers.title': '招聘',
      'careers.copy': '目前所有职位都已招满，但我们仍期待与有激情的开发者、艺术家和设计师建立联系，为未来的合作做好准备。',
      'careers.apply': '发送作品集',
      'careers.team': '认识团队',
      'careers.open': '职位已满',
      'careers.status': '感谢所有申请者。目前暂无空缺，但你仍可通过邮件发送作品集，我们会在有新机会时联系你。',
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
      'hero.kicker': 'インディーの情熱から世界の舞台へ',
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
      'games.rampage': '混沌としたリズムで展開する音楽系乱闘ゲーム。マルチプレイで純粋な興奮と破壊、カオスを体験。',
      'games.apocrophia': 'GameJam発のハイテンポなローグライクFPS。愛犬をさらったゾンビを追い詰める混沌ランを駆け抜けろ。',
      'games.playApocrophia': 'itch.ioでプレイ →',
      'games.dissociation': 'AI があなたの一挙手一投足を操るサイコホラー — 武器も逃げ場もなく、生き残りだけが目的。現実を見分けられますか？',
      'games.banana': 'すべてのプレイヤーが研究所から脱走するサルとなり、自由を求めて走りながらおサルのいたずらを繰り広げる協力ゲーム。',
      'games.servicesTitle': 'プロジェクトのハイライト',
      'games.servicesSubtitle': '共同開発やサービスパートナーとして携わったゲーム実績の例を紹介します。',
      'games.services.bunsTitle': 'Buns Of Fire',
      'games.services.bunsDesc': '『モータルコンバット』を想起させるNSFW格闘ゲーム。ファタリティの代わりに『Eroico』のような露骨シーンが展開するのがフック。',
      'games.services.bunsAlt': '『Buns Of Fire』のキービジュアル。露骨なフィニッシュシーンに臨む闘士たち。',
      'games.services.fatumTitle': 'FATUM',
      'games.services.fatumDesc': '『FATUM』は世界崩壊後にロボットだけが残った未来を舞台にしたマルチプレイヤーFPSです。プレイヤーは支配、キャプチャーザフラッグ、デスマッチなど『Splitgate』に着想を得たモードで戦闘マシンとして戦います。私たちは観戦システム、グレネード実装、レプリケーション不具合の修正を担当しました。',
      'games.services.fatumAlt': '『FATUM』のキービジュアル。崩壊した未来のアリーナで戦う戦闘ロボットを描く。',
      'games.services.buildyTitle': 'Buildy Game（仮称）',
      'games.services.buildyDesc': '建築に特化したプロジェクトで、手動スロットと自動保存に対応した完全なセーブシステムを実装しました。',
      'games.services.buildyAlt': '『Buildy Game』のキービジュアル。複数スロットに保存されたモジュラー構造が描かれている。',
      'games.services.phaseTitle': 'Phase',
      'games.services.phaseDesc': 'Titanfall を思わせる機動力を重視した FPS です。',
      'games.services.phaseAlt': '『Phase』のキービジュアル。パイロットがネオンのアリーナでウォールランしている。',
      'games.services.secret1Title': '機密プロジェクト I',
      'games.services.secret1Desc': 'NDA 下で進行中。ツールチームがクライアント向けにコア戦闘プロトタイプを構築。',
      'games.services.secret2Title': '機密プロジェクト II',
      'games.services.secret2Desc': 'Unreal Engine の継続サポートとして、最適化スプリントとマルチプレイ安定性の調整を実施。',
      'games.services.secret3Title': '機密プロジェクト III',
      'games.services.secret3Desc': '次世代コンセプトで、厳重な機密保持のもとワールドビルディングのプリプロを担当。',
      'services.title': 'Unreal チーム向けサービス',
      'services.subtitle': 'エンジニアの常駐支援からフルプロダクション、ビルド自動化まで。3 つのサービス基盤でニーズに応えます。',
      'services.coDev.title': 'チームと共同開発',
      'services.coDev.copy': '専門エンジニアがチームに入り、実戦レベルのゲームプレイ、ネットワーク、AI 機能を納品します。',
      'services.coDev.gameplayTitle': 'ゲームプレイシステム',
      'services.coDev.gameplayDesc': 'Unreal Engine 向けの高性能ゲームプレイエンジニアリング。武器フレームワーク、モジュラーコンポーネント、プロシージャルリコイル、ADS リグ、ロコモーションロジック、メレー連携、インタラクションシステム、ヒット判定、アニメーショングラフ、モンタージュ駆動のアクション、カメラシステム、モーション調整、ステートマシン、Gameplay Tag ベースのアーキテクチャまで網羅した FPS/TPS システムを構築します。',
      'services.coDev.multiplayerTitle': 'マルチプレイとレプリケーション',
      'services.coDev.multiplayerDesc': '本番品質で構築したクライアントサーバーロジック。武器、アビリティ、移動、グレネード、弾丸、VFX 同期、アニメーションレプリケーション、インベントリの決定的レプリケーション。サーバー権威、クライアント予測、リコンシリエーション、ラグ補償、レプリケーション条件の最適化、現場で通用する安定したネットワーク性能を提供します。',
      'services.coDev.aiTitle': 'AI と行動システム',
      'services.coDev.aiDesc': 'Behavior Tree、Blackboard、EQS、AI Perception を用いた知的エージェントの設計と実装。巡回–捜索–追跡フロー、戦闘判断、感覚システム、ステルス検知、部隊連携、動的ナビゲーション、リアクティブな敵、複雑さに応じて拡張できるモジュラー AI フレームワークを構築します。',
      'services.full.title': 'フルサービスのゲーム開発',
      'services.full.copy': 'ツール開発、最適化、技術ディレクションを含むエンドツーエンドの Unreal 提供で複雑なプロダクションを支援。',
      'services.full.toolsTitle': 'ツールとエディタ拡張',
      'services.full.toolsDesc': '制作を加速する社内ツールを開発。Unreal Editor 用のカスタムユーティリティ、アセットのバッチ自動化、マップ検証ツール、インポート最適化、Blueprint 向けツーリング、プロファイリング用ウィジェット、さらに WPF/WinUI 製のスタンドアロンアプリでビルド管理、Git 連携、コンテンツ管理、データ編集、バージョン整理を行います。',
      'services.full.performanceTitle': 'パフォーマンスと最適化',
      'services.full.performanceDesc': 'CPU・GPU・ネットワークの徹底最適化。Blueprint 依存の重いシステムのプロファイリングと削減、Tick 最小化、非同期タスク、アニメーショングラフの簡素化、LOD/HLOD の調整、Nanite 設定、ストリーミング最適化、ネットワーク帯域削減、レプリケーションの剪定、物理最適化、プロダクションビルドのフレーム安定性向上まで対応します。',
      'services.full.directionTitle': 'テクニカルディレクションとアーキテクチャ',
      'services.full.directionDesc': '長期 Unreal プロジェクトの基盤を設計。コードベースのアーキテクチャ、モジュラーシステム計画、拡張性のあるゲームプレイフレームワーク設計、大規模機能のレプリケーション戦略、機能ロードマップ、コンポーネント駆動型システムのガイドライン、データ構造、開発とマイルストーンをつなぐハイレベル技術リードを提供します。',
      'services.build.title': 'ビルドとリリースのシステム',
      'services.build.copy': '自動化されたデリバリー、サーバー基盤、デプロイパイプラインで、安定かつ再現性の高いリリースを実現。',
      'services.build.ciTitle': '自動化と CI',
      'services.build.ciDesc': 'Unreal Engine プロジェクトのパイプラインを完全自動化。GitHub Actions、GitLab CI、Azure DevOps を用いた CI/CD。Windows・Linux・専用サーバー向けの自動ビルド。Backblaze B2、AWS S3、Google Cloud Storage など S3 互換のクラウドストレージに対応。パッケージング自動化、バージョンスクリプト、チェンジログ生成、環境ブートストラップ、アーティファクト配布、ナイトリービルド、ブランチ別ビルドルール、コード品質チェック、キャッシュレイヤー、依存関係セットアップ、そして本番・テスト向けの自動デプロイフローを提供します。',
      'services.build.serversTitle': '専用サーバーとデプロイ',
      'services.build.serversDesc': '専用サーバー基盤をフルサポート。Unreal Engine サーバービルド、Linux 設定、プロセス監視、クラッシュ復旧、ランタイム監視、パフォーマンス最適化、自動デプロイ、多重インスタンス編成、データベース接続、リモートログ、S3 ベースのアセット配信、テストやステージングを簡潔にするスクリプトを用意します。',
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
      'news.frontline.title': 'Frontline が Steam ストアページを公開',
      'news.frontline.copy': '約6年の開発を経て、デビュー作はいよいよローンチ準備中 — 今すぐウィッシュリストに追加して革命に備えよう。',
      'news.team.date': '2025年7月',
      'news.team.title': 'Neo Soft がチームを拡大',
      'news.team.copy': '私たちは成長を続けています！Neo Soft は新たな才能を迎え入れ、次のチャプターへ進みます。',
      'careers.title': '採用情報',
      'careers.copy': '現在すべてのポジションが充足していますが、将来の協業に向けて情熱的な開発者・アーティスト・デザイナーとつながりたいと考えています。',
      'careers.apply': 'ポートフォリオを送る',
      'careers.team': 'チームを見る',
      'careers.open': '現在募集はありません',
      'careers.status': 'ご応募いただいた皆さま、ありがとうございます。今は募集がありませんが、メールでポートフォリオを送っていただければ新しい機会が出た際にご連絡します。',
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

  const createServiceImages = () => {
    $$('[data-service-image]').forEach(slot => {
      const src = (slot.dataset.serviceImage || '').trim();
      if (!src || slot.querySelector('.card3d-img-media')) return;
      const img = document.createElement('img');
      img.src = src;
      img.className = 'card3d-img-media';
      const altKey = slot.dataset.serviceAlt;
      if (altKey){
        img.dataset.i18nAlt = altKey;
        const initialAlt = translations[currentLang]?.[altKey] ?? translations.en[altKey];
        img.alt = initialAlt || '';
      } else {
        img.alt = '';
      }
      img.addEventListener('load', () => slot.classList.add('has-media'), { once: true });
      img.addEventListener('error', () => {
        slot.classList.remove('has-media');
        img.remove();
      }, { once: true });
      slot.prepend(img);
      if (img.complete && img.naturalWidth > 0){
        slot.classList.add('has-media');
      }
    });
  };

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
    $$('[data-i18n-alt]').forEach(el => {
      const key = el.dataset.i18nAlt;
      const value = translations[lang]?.[key];
      if (value !== undefined) el.setAttribute('alt', value);
    });
    if (formError && !formError.classList.contains('hidden') && formError.dataset.errorKey){
      formError.textContent = t(formError.dataset.errorKey);
    }
    refreshMuteBtn();
  };

  createServiceImages();
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

  // Carousel controls - Games slider setup
  const setupServicesSlider = (track) => {
    if (!track) return null;
    const slides = $$('.services-slide', track);
    if (!slides.length) return null;

    const cards = slides.flatMap((slide, slideIndex) =>
      $$('.card3d', slide)
        .filter(card => !card.classList.contains('card3d--placeholder'))
        .map(card => ({ card, slide, slideIndex }))
    );

    if (!cards.length) return null;

    const mq = window.matchMedia('(max-width: 640px)');
    let isMobile = mq.matches;
    let desktopIndex = 0;
    let mobileIndex = 0;

    const updateControls = () => {
      const total = isMobile ? cards.length : slides.length;
      const disabled = total <= 1;
      if (servicesPrevBtn){
        servicesPrevBtn.disabled = disabled;
        servicesPrevBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      }
      if (servicesNextBtn){
        servicesNextBtn.disabled = disabled;
        servicesNextBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      }
    };

    const updateDesktop = () => {
      track.style.transform = `translateX(-${desktopIndex * 100}%)`;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === desktopIndex;
        slide.style.display = '';
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        $$('.card3d', slide).forEach(card => {
          const isPlaceholder = card.classList.contains('card3d--placeholder');
          card.style.display = '';
          card.setAttribute('aria-hidden', isPlaceholder ? 'true' : (isActive ? 'false' : 'true'));
        });
      });
      const anchorIndex = cards.findIndex(entry => entry.slideIndex === desktopIndex);
      if (anchorIndex !== -1){
        mobileIndex = anchorIndex;
      }
    };

    const updateMobile = () => {
      if (!cards.length) return;
      const activeEntry = cards[mobileIndex] || cards[0];
      if (!activeEntry) return;
      mobileIndex = cards.indexOf(activeEntry);
      track.style.transform = '';
      slides.forEach((slide, slideIndex) => {
        const isActiveSlide = slideIndex === activeEntry.slideIndex;
        slide.style.display = isActiveSlide ? '' : 'none';
        slide.setAttribute('aria-hidden', isActiveSlide ? 'false' : 'true');
        $$('.card3d', slide).forEach(card => {
          const isPlaceholder = card.classList.contains('card3d--placeholder');
          if (isPlaceholder){
            card.style.display = 'none';
            card.setAttribute('aria-hidden', 'true');
            return;
          }
          const isActiveCard = isActiveSlide && card === activeEntry.card;
          card.style.display = isActiveCard ? '' : 'none';
          card.setAttribute('aria-hidden', isActiveCard ? 'false' : 'true');
        });
      });
      desktopIndex = activeEntry.slideIndex;
    };

    const applyState = (matches) => {
      isMobile = matches;
      if (isMobile){
        mobileIndex = Math.min(mobileIndex, cards.length - 1);
        updateMobile();
      } else {
        desktopIndex = Math.min(desktopIndex, slides.length - 1);
        updateDesktop();
      }
      updateControls();
    };

    applyState(isMobile);

    mq.addEventListener('change', (event) => {
      if (event.matches){
        const anchor = cards.findIndex(entry => entry.slideIndex === desktopIndex);
        mobileIndex = anchor !== -1 ? anchor : 0;
      } else {
        desktopIndex = cards[mobileIndex]?.slideIndex ?? 0;
      }
      applyState(event.matches);
    });

    return {
      next(){
        if (isMobile){
          if (cards.length <= 1) return;
          mobileIndex = (mobileIndex + 1) % cards.length;
          updateMobile();
        } else {
          if (slides.length <= 1) return;
          desktopIndex = (desktopIndex + 1) % slides.length;
          updateDesktop();
        }
        blip(720, 0.05, 'triangle');
      },
      prev(){
        if (isMobile){
          if (cards.length <= 1) return;
          mobileIndex = (mobileIndex - 1 + cards.length) % cards.length;
          updateMobile();
        } else {
          if (slides.length <= 1) return;
          desktopIndex = (desktopIndex - 1 + slides.length) % slides.length;
          updateDesktop();
        }
        blip(480, 0.05, 'triangle');
      }
    };
  };

  const setupPluginSlider = () => {
    if (!pluginsTrack) return null;
    const cards = $$('#pluginsTrack .card3d:not(.card3d--placeholder)');
    if (!cards.length) return null;
    const placeholder = $('#pluginsTrack .card3d--placeholder');
    let index = 0;
    const mq = window.matchMedia('(max-width: 640px)');

    const updateControls = (isMobile) => {
      const disabled = !isMobile || cards.length <= 1;
      if (pluginsPrevBtn){
        pluginsPrevBtn.disabled = disabled;
        pluginsPrevBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      }
      if (pluginsNextBtn){
        pluginsNextBtn.disabled = disabled;
        pluginsNextBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      }
    };

    const updateDisplay = (isMobile) => {
      if (isMobile){
        cards.forEach((card, i) => {
          const active = i === index;
          card.style.display = active ? '' : 'none';
          card.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        if (placeholder){
          placeholder.style.display = 'none';
          placeholder.setAttribute('aria-hidden', 'true');
        }
        pluginsTrack.style.transform = '';
      } else {
        cards.forEach((card) => {
          card.style.display = '';
          card.setAttribute('aria-hidden', 'false');
        });
        if (placeholder){
          placeholder.style.display = '';
          placeholder.removeAttribute('aria-hidden');
        }
      }
    };

    const applyState = (isMobile) => {
      index = Math.min(index, cards.length - 1);
      updateDisplay(isMobile);
      updateControls(isMobile);
    };

    applyState(mq.matches);

    const handleChange = (event) => applyState(event.matches);
    mq.addEventListener('change', handleChange);

    return {
      next(){
        if (!mq.matches || cards.length <= 1) return;
        index = (index + 1) % cards.length;
        updateDisplay(true);
        blip(720, 0.05, 'triangle');
      },
      prev(){
        if (!mq.matches || cards.length <= 1) return;
        index = (index - 1 + cards.length) % cards.length;
        updateDisplay(true);
        blip(480, 0.05, 'triangle');
      }
    };
  };

  const servicesSlider = setupServicesSlider(servicesTrack);
  if (servicesSlider){
    servicesPrevBtn?.addEventListener('click', () => servicesSlider.prev());
    servicesNextBtn?.addEventListener('click', () => servicesSlider.next());
  }

  const gamesSlider = setupServicesSlider(gamesTrack);
  const gamesPrevBtn = $('#gamesPrev');
  const gamesNextBtn = $('#gamesNext');
  if (gamesSlider){
    gamesPrevBtn?.addEventListener('click', () => gamesSlider.prev());
    gamesNextBtn?.addEventListener('click', () => gamesSlider.next());
  }

  const pluginsSlider = setupPluginSlider();
  if (pluginsSlider){
    pluginsPrevBtn?.addEventListener('click', () => pluginsSlider.prev());
    pluginsNextBtn?.addEventListener('click', () => pluginsSlider.next());
  }

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