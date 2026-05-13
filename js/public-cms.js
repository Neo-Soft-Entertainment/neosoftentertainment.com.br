(function () {
  const config = window.neoSoftSupabase;
  if (!config || !config.url || !config.anonKey) return;

  const baseUrl = config.url.replace(/\/$/, '');
  const table = config.contentTable || 'site_content';
  const rowId = config.contentRowId || 'homepage_copy';
  const params = new URLSearchParams({
    select: 'content',
    id: `eq.${rowId}`
  });

  fetch(`${baseUrl}/rest/v1/${table}?${params.toString()}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`CMS request failed with status ${response.status}.`);
      }

      return response.json();
    })
    .then((rows) => {
      window.neoSoftCmsContent = rows[0]?.content || null;
      window.dispatchEvent(new CustomEvent('neo-soft-cms-content', {
        detail: window.neoSoftCmsContent
      }));
    })
    .catch((error) => {
      console.warn('Neo Soft CMS content could not be loaded.', error);
    });
})();
