import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const config = window.neoSoftSupabase || {};
const hasConfig = Boolean(config.url && config.anonKey);
const contentTable = config.contentTable || 'site_content';
const contentRowId = config.contentRowId || 'homepage_copy';
const adminTable = config.adminTable || 'site_admins';

const editableLanguages = [
  { id: 'en', label: 'English' },
  { id: 'pt', label: 'Português' }
];

const sections = [
  {
    title: 'News',
    description: 'Textos dos dois cards da seção de notícias na home.',
    fields: [
      { key: 'news.title', label: 'Título da seção' },
      { key: 'news.frontline.date', label: 'Notícia 1: data' },
      { key: 'news.frontline.title', label: 'Notícia 1: título' },
      { key: 'news.frontline.copy', label: 'Notícia 1: texto', multiline: true },
      { key: 'news.team.date', label: 'Notícia 2: data' },
      { key: 'news.team.title', label: 'Notícia 2: título' },
      { key: 'news.team.copy', label: 'Notícia 2: texto', multiline: true }
    ]
  },
  {
    title: 'Careers',
    description: 'Conteúdo principal da seção de carreiras.',
    fields: [
      { key: 'careers.title', label: 'Título da seção' },
      { key: 'careers.copy', label: 'Texto principal', multiline: true },
      { key: 'careers.apply', label: 'CTA principal' },
      { key: 'careers.team', label: 'CTA secundário' },
      { key: 'careers.open', label: 'Título do card lateral' },
      { key: 'careers.status', label: 'Texto do card lateral', multiline: true }
    ]
  },
  {
    title: 'About',
    description: 'Apresentação institucional da Neo Soft.',
    fields: [
      { key: 'about.title', label: 'Título da seção' },
      { key: 'about.first', label: 'Primeiro parágrafo', multiline: true },
      { key: 'about.second', label: 'Segundo parágrafo', multiline: true },
      { key: 'about.missionTitle', label: 'Título da missão' },
      { key: 'about.missionCopy', label: 'Texto da missão', multiline: true }
    ]
  }
];

const defaults = {
  en: {
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
    'about.missionCopy': 'To strengthen the Brazilian gaming scene by delivering world-class projects that showcase creativity and excellence.'
  },
  pt: {
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
    'about.missionCopy': 'Fortalecer a cena brasileira de games entregando projetos de classe mundial que exibem criatividade e excelência.'
  }
};

const setupNotice = document.querySelector('#setupNotice');
const authPanel = document.querySelector('#authPanel');
const adminPanel = document.querySelector('#adminPanel');
const loginForm = document.querySelector('#loginForm');
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const contentForm = document.querySelector('#contentForm');
const saveBtn = document.querySelector('#saveBtn');
const editorSections = document.querySelector('#editorSections');
const sessionMeta = document.querySelector('#sessionMeta');
const lastSavedText = document.querySelector('#lastSavedText');
const adminBadge = document.querySelector('#adminBadge');
const statusBar = document.querySelector('#statusBar');

let supabase = null;
let currentSession = null;
let hasAdminAccess = false;
let accessDenied = false;

renderEditor();

if (!hasConfig) {
  setupNotice.classList.remove('hidden');
  authPanel.classList.add('hidden');
  showStatus('Preencha js/supabase-config.js para ativar o login.', 'warning');
} else {
  supabase = createClient(config.url, config.anonKey);
  boot();
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!supabase) return;

  const formData = new FormData(loginForm);
  const email = (formData.get('email') || '').toString().trim();
  const password = (formData.get('password') || '').toString();
  if (!email || !password) return;

  const originalLabel = loginBtn.textContent;
  loginBtn.disabled = true;
  loginBtn.textContent = 'Entrando...';

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  loginBtn.disabled = false;
  loginBtn.textContent = originalLabel;

  if (error) {
    showStatus(error.message || 'Não foi possível entrar.', 'error');
    return;
  }

  loginForm.reset();
  showStatus('Login realizado.', 'success');
});

logoutBtn.addEventListener('click', async () => {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) {
    showStatus(error.message || 'Não foi possível encerrar a sessão.', 'error');
    return;
  }

  showStatus('Sessão encerrada.', 'success');
});

contentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!supabase || !currentSession?.user || !hasAdminAccess) return;
  if (!contentForm.reportValidity()) return;

  const payload = collectContent();
  const originalLabel = saveBtn.textContent;
  saveBtn.disabled = true;
  saveBtn.textContent = 'Salvando...';

  const updatedAt = new Date().toISOString();
  const { error } = await supabase
    .from(contentTable)
    .upsert({
      id: contentRowId,
      content: payload,
      updated_at: updatedAt
    });

  saveBtn.disabled = false;
  saveBtn.textContent = originalLabel;

  if (error) {
    showStatus(error.message || 'Não foi possível salvar o conteúdo.', 'error');
    return;
  }

  lastSavedText.textContent = `Última atualização: ${formatDate(updatedAt)}`;
  showStatus('Alterações salvas com sucesso.', 'success');
});

async function boot() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    showStatus(error.message || 'Não foi possível restaurar a sessão.', 'error');
    return;
  }

  await syncSession(data.session || null);
  supabase.auth.onAuthStateChange((_event, session) => {
    window.setTimeout(() => {
      syncSession(session);
    }, 0);
  });
}

async function syncSession(session) {
  if (accessDenied) return;

  currentSession = session;
  const user = session?.user || null;

  if (!user) {
    authPanel.classList.remove('hidden');
    adminPanel.classList.add('hidden');
    sessionMeta.textContent = '';
    lastSavedText.textContent = '';
    adminBadge.classList.add('hidden');
    hasAdminAccess = false;
    saveBtn.disabled = true;
    fillEditor(cloneDefaults());
    return;
  }

  hasAdminAccess = await checkAdminAccess(user.id);

  if (!hasAdminAccess) {
    accessDenied = true;
    await supabase.auth.signOut();
    showDeniedState();
    return;
  }

  authPanel.classList.add('hidden');
  adminPanel.classList.remove('hidden');
  sessionMeta.textContent = `Sessão atual: ${user.email || user.id}`;
  adminBadge.classList.remove('hidden');
  adminBadge.dataset.tone = 'success';
  adminBadge.textContent = 'Acesso liberado';
  saveBtn.disabled = false;

  const loaded = await loadContent();
  if (loaded) {
    showStatus('Conteúdo carregado.', 'success');
  }
}

async function checkAdminAccess(userId) {
  const { data, error } = await supabase
    .from(adminTable)
    .select('user_id')
    .eq('user_id', userId);

  if (error) {
    showStatus(error.message || 'Não foi possível validar o acesso administrativo.', 'error');
    return false;
  }

  return Boolean(data?.length);
}

async function loadContent() {
  const merged = cloneDefaults();
  const { data, error } = await supabase
    .from(contentTable)
    .select('content, updated_at')
    .eq('id', contentRowId);

  if (error) {
    fillEditor(merged);
    lastSavedText.textContent = 'Usando o conteúdo padrão local.';
    showStatus(error.message || 'Não foi possível carregar o conteúdo salvo.', 'error');
    return false;
  }

  const row = data?.[0];
  mergeContent(merged, row?.content);
  fillEditor(merged);

  if (!row?.updated_at) {
    lastSavedText.textContent = 'Nenhum conteúdo remoto salvo ainda.';
    return true;
  }

  lastSavedText.textContent = `Última atualização: ${formatDate(row.updated_at)}`;
  return true;
}

function renderEditor() {
  editorSections.innerHTML = '';

  for (const section of sections) {
    const panel = document.createElement('section');
    panel.className = 'admin-panel p-6 sm:p-8';

    const heading = document.createElement('div');
    heading.className = 'admin-section-head';

    const title = document.createElement('h2');
    title.textContent = section.title;
    heading.appendChild(title);

    const description = document.createElement('p');
    description.textContent = section.description;
    heading.appendChild(description);

    panel.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'admin-grid admin-grid--2';

    for (const language of editableLanguages) {
      const languageCard = document.createElement('div');
      languageCard.className = 'admin-language-card';

      const languageTitle = document.createElement('h3');
      languageTitle.textContent = language.label;
      languageCard.appendChild(languageTitle);

      const fieldsWrap = document.createElement('div');
      fieldsWrap.className = 'admin-grid';

      for (const field of section.fields) {
        const label = document.createElement('label');
        label.className = 'admin-field';

        const labelText = document.createElement('span');
        labelText.textContent = field.label;
        label.appendChild(labelText);

        const name = `${language.id}:${field.key}`;
        let control;

        if (field.multiline) {
          control = document.createElement('textarea');
          control.rows = 4;
        } else {
          control = document.createElement('input');
          control.type = 'text';
        }

        control.name = name;
        control.dataset.lang = language.id;
        control.dataset.key = field.key;
        control.required = true;
        label.appendChild(control);
        fieldsWrap.appendChild(label);
      }

      languageCard.appendChild(fieldsWrap);
      grid.appendChild(languageCard);
    }

    panel.appendChild(grid);
    editorSections.appendChild(panel);
  }
}

function fillEditor(content) {
  for (const language of editableLanguages) {
    for (const section of sections) {
      for (const field of section.fields) {
        const control = contentForm.elements.namedItem(`${language.id}:${field.key}`);
        if (!control) continue;
        control.value = content[language.id]?.[field.key] ?? '';
      }
    }
  }
}

function collectContent() {
  const payload = {};

  for (const language of editableLanguages) {
    payload[language.id] = {};

    for (const section of sections) {
      for (const field of section.fields) {
        const control = contentForm.elements.namedItem(`${language.id}:${field.key}`);
        payload[language.id][field.key] = (control?.value || '').trim();
      }
    }
  }

  return payload;
}

function mergeContent(target, source) {
  if (!source || typeof source !== 'object') return;

  for (const language of editableLanguages) {
    const values = source[language.id];
    if (!values || typeof values !== 'object') continue;

    for (const section of sections) {
      for (const field of section.fields) {
        if (typeof values[field.key] !== 'string') continue;
        target[language.id][field.key] = values[field.key];
      }
    }
  }
}

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaults));
}

function showStatus(message, tone = 'info') {
  statusBar.textContent = message;
  statusBar.dataset.tone = tone;
  statusBar.classList.remove('hidden');
}

function showDeniedState() {
  authPanel.classList.add('hidden');
  adminPanel.classList.add('hidden');
  statusBar.classList.add('hidden');
  document.body.innerHTML = '';
  window.location.replace('index.html');
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  } catch (error) {
    return value;
  }
}
