# Neo Soft Admin Setup

1. Run `schema.sql` in the Supabase SQL editor.
2. Create each admin as a Supabase Auth email/password user manually.
3. Add that Auth user's UUID and email to `public.admin_users`.
4. Add the project URL, public Supabase key, and hCaptcha site key to `js/site-config.js`.
5. Add `HCAPTCHA_SECRET_KEY` to Supabase Edge Function secrets.
6. Deploy the `admin-login` Edge Function. `config.toml` keeps that login endpoint public so it can verify hCaptcha before a session exists.

Add admins to the allowlist after the Auth user exists:

```sql
insert into public.admin_users (user_id, email)
values ('AUTH_USER_UUID', 'admin@example.com');
```

The admin page is `admin.html`. Public pages do not link to it.

`public.site_content` stores published translation-key overrides. If a key has no row in Supabase, the site keeps the text already bundled in `js/script.js`.

hCaptcha protects the admin login flow from automated submissions. Use the site host or CDN controls as well for volumetric DDoS protection.
