import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const config = window.NEO_SOFT_CONFIG || {};
const translations = window.NEO_SOFT_TRANSLATIONS || {};
const setupPanel = document.querySelector('#adminSetup');
const loginPanel = document.querySelector('#loginPanel');
const editorPanel = document.querySelector('#editorPanel');
const loginForm = document.querySelector('#loginForm');
const loginButton = document.querySelector('#loginButton');
const loginStatus = document.querySelector('#loginStatus');
const editorStatus = document.querySelector('#editorStatus');
const contentLanguage = document.querySelector('#contentLanguage');
const contentFilter = document.querySelector('#contentFilter');
const contentFields = document.querySelector('#contentFields');
const saveContent = document.querySelector('#saveContent');
const signOut = document.querySelector('#signOut');
const recaptchaSlot = document.querySelector('#recaptchaSlot');
const languages = Object.keys(translations);
let supabase;
let recaptchaWidget;
let adminUser;
let overrides = new Map();

if (!config.supabaseUrl || !config.supabaseAnonKey || !config.recaptchaSiteKey || !languages.length) {
  setupPanel.classList.remove('hidden');
  loginPanel.classList.add('hidden');
} else {
  supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

  languages.forEach((language) => {
    const option = document.createElement('option');
    option.value = language;
    option.textContent = language.toUpperCase();
    contentLanguage.append(option);
  });

  const recaptchaScript = document.createElement('script');
  recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
  recaptchaScript.async = true;
  recaptchaScript.defer = true;
  recaptchaScript.addEventListener('load', () => {
    recaptchaWidget = window.grecaptcha.render(recaptchaSlot, {
      sitekey: config.recaptchaSiteKey,
      theme: 'dark'
    });
  });
  document.head.append(recaptchaScript);

  supabase.auth.getSession().then(({ data }) => {
    if (data.session) openEditor(data.session.user);
  });
}

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginStatus.textContent = '';

  if (recaptchaWidget === undefined) {
    loginStatus.textContent = 'reCAPTCHA is still loading.';
    return;
  }

  const recaptchaToken = window.grecaptcha.getResponse(recaptchaWidget);
  if (!recaptchaToken) {
    loginStatus.textContent = 'Complete reCAPTCHA before signing in.';
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = 'Signing in...';

  const response = await fetch(`${config.supabaseUrl.replace(/\/$/, '')}/functions/v1/admin-login`, {
    method: 'POST',
    headers: {
      apikey: config.supabaseAnonKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: loginForm.email.value.trim(),
      password: loginForm.password.value,
      recaptchaToken
    })
  });
  const result = await response.json().catch(() => ({}));

  window.grecaptcha.reset(recaptchaWidget);
  loginButton.disabled = false;
  loginButton.textContent = 'Sign in';

  if (!response.ok) {
    loginStatus.textContent = result.error || 'Sign in failed.';
    return;
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: result.access_token,
    refresh_token: result.refresh_token
  });

  if (error || !data.user) {
    loginStatus.textContent = error?.message || 'Supabase could not start the admin session.';
    return;
  }

  loginForm.password.value = '';
  openEditor(data.user);
});

contentLanguage?.addEventListener('change', renderFields);
contentFilter?.addEventListener('input', renderFields);

saveContent?.addEventListener('click', async () => {
  editorStatus.textContent = '';

  const rows = Array.from(contentFields.querySelectorAll('textarea'))
    .filter((field) => field.value !== field.dataset.original)
    .map((field) => ({
      key: field.dataset.key,
      language: contentLanguage.value,
      value: field.value,
      updated_at: new Date().toISOString(),
      updated_by: adminUser.id
    }));

  if (!rows.length) {
    editorStatus.textContent = 'No changes to save.';
    return;
  }

  saveContent.disabled = true;
  saveContent.textContent = 'Saving...';
  const { error } = await supabase.from('site_content').upsert(rows, { onConflict: 'key,language' });
  saveContent.disabled = false;
  saveContent.textContent = 'Save changes';

  if (error) {
    editorStatus.textContent = error.message;
    return;
  }

  rows.forEach((row) => overrides.set(`${row.language}:${row.key}`, row.value));
  editorStatus.textContent = `${rows.length} content override${rows.length === 1 ? '' : 's'} saved.`;
  renderFields();
});

signOut?.addEventListener('click', async () => {
  await supabase.auth.signOut();
  adminUser = undefined;
  overrides = new Map();
  editorPanel.classList.add('hidden');
  loginPanel.classList.remove('hidden');
  editorStatus.textContent = '';
  loginStatus.textContent = '';
  if (recaptchaWidget !== undefined) window.grecaptcha.reset(recaptchaWidget);
});

async function openEditor(user) {
  loginStatus.textContent = '';
  const { data: adminRow, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (adminError || !adminRow) {
    await supabase.auth.signOut();
    loginStatus.textContent = adminError?.message || 'This account is not an approved admin.';
    return;
  }

  const { data: rows, error: contentError } = await supabase
    .from('site_content')
    .select('key,language,value');

  if (contentError) {
    loginStatus.textContent = contentError.message;
    return;
  }

  adminUser = user;
  overrides = new Map((rows || []).map((row) => [`${row.language}:${row.key}`, row.value]));
  loginPanel.classList.add('hidden');
  editorPanel.classList.remove('hidden');
  renderFields();
}

function renderFields() {
  const language = contentLanguage.value || languages[0];
  const filter = contentFilter.value.trim().toLowerCase();
  const keys = Object.keys(translations[language] || {})
    .filter((key) => !filter || key.toLowerCase().includes(filter))
    .sort();

  contentFields.replaceChildren();

  keys.forEach((key) => {
    const field = document.createElement('label');
    const title = document.createElement('span');
    const textarea = document.createElement('textarea');
    const override = overrides.get(`${language}:${key}`);
    const value = override ?? translations[language][key];

    field.className = 'admin-content__field';
    title.textContent = key;
    textarea.className = 'textarea';
    textarea.rows = value.length > 180 ? 6 : 3;
    textarea.value = value;
    textarea.dataset.key = key;
    textarea.dataset.original = value;
    field.append(title, textarea);
    contentFields.append(field);
  });
}
