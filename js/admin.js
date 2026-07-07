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
const captchaSlot = document.querySelector('#captchaSlot');
const adminTabs = document.querySelector('#adminTabs');
const tabPosts = document.querySelector('#tabPosts');
const tabContent = document.querySelector('#tabContent');
const postsPanel = document.querySelector('#postsPanel');
const postsStatus = document.querySelector('#postsStatus');
const postsList = document.querySelector('#postsList');
const newPostBtn = document.querySelector('#newPostBtn');
const signOutPosts = document.querySelector('#signOutPosts');
const postEditor = document.querySelector('#postEditor');
const postEditorEyebrow = document.querySelector('#postEditorEyebrow');
const postEditorTitle = document.querySelector('#postEditorTitle');
const postEditorStatus = document.querySelector('#postEditorStatus');
const postForm = document.querySelector('#postForm');
const postTitleField = document.querySelector('#postTitle');
const postSlugField = document.querySelector('#postSlug');
const postExcerptField = document.querySelector('#postExcerpt');
const postBodyField = document.querySelector('#postBody');
const postCoverImageField = document.querySelector('#postCoverImage');
const postPublishedField = document.querySelector('#postPublished');
const savePostBtn = document.querySelector('#savePost');
const cancelPostEditBtn = document.querySelector('#cancelPostEdit');
const deletePostBtn = document.querySelector('#deletePost');
const languages = Object.keys(translations);
let supabase;
let hcaptchaWidgetId;
let adminUser;
let overrides = new Map();
let posts = [];
let editingPostId = null;
let slugTouched = false;

const slugify = (value) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

if (!config.supabaseUrl || !config.supabaseAnonKey || !config.hcaptchaSiteKey || !languages.length) {
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

  const hcaptchaScript = document.createElement('script');
  hcaptchaScript.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
  hcaptchaScript.async = true;
  hcaptchaScript.defer = true;
  hcaptchaScript.addEventListener('load', () => {
    if (!window.hcaptcha) return;
    hcaptchaWidgetId = window.hcaptcha.render(captchaSlot, {
      sitekey: config.hcaptchaSiteKey,
      theme: 'dark'
    });
  });
  document.head.append(hcaptchaScript);

  supabase.auth.getSession().then(({ data }) => {
    if (data.session) openEditor(data.session.user);
  });
}

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginStatus.textContent = '';

  if (hcaptchaWidgetId === undefined) {
    loginStatus.textContent = 'hCaptcha is still loading.';
    return;
  }

  const hcaptchaToken = window.hcaptcha.getResponse(hcaptchaWidgetId);
  if (!hcaptchaToken) {
    loginStatus.textContent = 'Complete hCaptcha before signing in.';
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
      hcaptchaToken
    })
  });
  const result = await response.json().catch(() => ({}));

  window.hcaptcha.reset(hcaptchaWidgetId);
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

async function doSignOut() {
  await supabase.auth.signOut();
  adminUser = undefined;
  overrides = new Map();
  posts = [];
  adminTabs.classList.add('hidden');
  editorPanel.classList.add('hidden');
  postsPanel.classList.add('hidden');
  postEditor.classList.add('hidden');
  loginPanel.classList.remove('hidden');
  editorStatus.textContent = '';
  loginStatus.textContent = '';
  if (hcaptchaWidgetId !== undefined) window.hcaptcha.reset(hcaptchaWidgetId);
}

signOut?.addEventListener('click', doSignOut);
signOutPosts?.addEventListener('click', doSignOut);

function showTab(tab) {
  const isPosts = tab === 'posts';
  tabPosts.className = isPosts ? 'btn-primary' : 'btn-outline';
  tabContent.className = isPosts ? 'btn-outline' : 'btn-primary';
  postsPanel.classList.toggle('hidden', !isPosts);
  postEditor.classList.add('hidden');
  editorPanel.classList.toggle('hidden', isPosts);
}

tabPosts?.addEventListener('click', () => showTab('posts'));
tabContent?.addEventListener('click', () => showTab('content'));

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
  adminTabs.classList.remove('hidden');
  renderFields();
  showTab('posts');
  await loadPosts();
}

async function loadPosts() {
  postsStatus.textContent = 'Loading...';
  const { data, error } = await supabase
    .from('posts')
    .select('id,slug,title,excerpt,body,cover_image,published,published_at,updated_at')
    .order('updated_at', { ascending: false });

  if (error) {
    postsStatus.textContent = error.message;
    return;
  }

  posts = data || [];
  postsStatus.textContent = '';
  renderPostsList();
}

function renderPostsList() {
  postsList.replaceChildren();

  if (!posts.length) {
    const empty = document.createElement('p');
    empty.className = 'admin-copy';
    empty.textContent = 'No posts yet. Create the first one.';
    postsList.append(empty);
    return;
  }

  posts.forEach((post) => {
    const row = document.createElement('div');
    row.className = 'admin-content__field';
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.gap = '.75rem';

    const info = document.createElement('div');
    const title = document.createElement('p');
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-1)';
    title.textContent = post.title;
    const meta = document.createElement('p');
    meta.className = 'text-sm';
    meta.style.color = 'var(--text-3)';
    const date = post.published_at ? new Date(post.published_at) : new Date(post.updated_at);
    meta.textContent = `${post.published ? 'Published' : 'Draft'} · ${date.toLocaleDateString()} · /${post.slug}`;
    info.append(title, meta);

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '.5rem';
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn-outline';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => openPostEditor(post));
    actions.append(editBtn);

    row.append(info, actions);
    postsList.append(row);
  });
}

function openPostEditor(post) {
  editingPostId = post ? post.id : null;
  slugTouched = Boolean(post);
  postEditorEyebrow.textContent = post ? 'Edit post' : 'New post';
  postEditorTitle.textContent = post ? post.title : 'Create post';
  postEditorStatus.textContent = '';
  postTitleField.value = post?.title || '';
  postSlugField.value = post?.slug || '';
  postExcerptField.value = post?.excerpt || '';
  postBodyField.value = post?.body || '';
  postCoverImageField.value = post?.cover_image || '';
  postPublishedField.checked = Boolean(post?.published);
  deletePostBtn.classList.toggle('hidden', !post);
  postsPanel.classList.add('hidden');
  postEditor.classList.remove('hidden');
}

newPostBtn?.addEventListener('click', () => openPostEditor(null));
cancelPostEditBtn?.addEventListener('click', () => {
  postEditor.classList.add('hidden');
  postsPanel.classList.remove('hidden');
});

postTitleField?.addEventListener('input', () => {
  if (slugTouched) return;
  postSlugField.value = slugify(postTitleField.value);
});
postSlugField?.addEventListener('input', () => {
  slugTouched = true;
});

savePostBtn?.addEventListener('click', async () => {
  const title = postTitleField.value.trim();
  const slug = slugify(postSlugField.value);
  const excerpt = postExcerptField.value.trim();

  if (!title || !slug || !excerpt) {
    postEditorStatus.textContent = 'Title, slug, and excerpt are required.';
    return;
  }

  const published = postPublishedField.checked;
  const wasPublished = editingPostId ? posts.find((p) => p.id === editingPostId)?.published : false;
  const row = {
    title,
    slug,
    excerpt,
    body: postBodyField.value,
    cover_image: postCoverImageField.value.trim() || null,
    published,
    updated_by: adminUser.id
  };
  if (published && !wasPublished) row.published_at = new Date().toISOString();

  savePostBtn.disabled = true;
  savePostBtn.textContent = 'Saving...';

  const { error } = editingPostId
    ? await supabase.from('posts').update(row).eq('id', editingPostId)
    : await supabase.from('posts').insert(row);

  savePostBtn.disabled = false;
  savePostBtn.textContent = 'Save post';

  if (error) {
    postEditorStatus.textContent = error.message;
    return;
  }

  postEditor.classList.add('hidden');
  postsPanel.classList.remove('hidden');
  await loadPosts();
});

deletePostBtn?.addEventListener('click', async () => {
  if (!editingPostId) return;
  if (!window.confirm('Delete this post? This cannot be undone.')) return;

  deletePostBtn.disabled = true;
  const { error } = await supabase.from('posts').delete().eq('id', editingPostId);
  deletePostBtn.disabled = false;

  if (error) {
    postEditorStatus.textContent = error.message;
    return;
  }

  postEditor.classList.add('hidden');
  postsPanel.classList.remove('hidden');
  await loadPosts();
});

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
