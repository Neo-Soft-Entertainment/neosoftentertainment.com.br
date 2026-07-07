create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  key text not null,
  language text not null check (language in ('en', 'pt', 'es', 'zh', 'ja')),
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  primary key (key, language)
);

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;

grant select on public.admin_users to authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

drop policy if exists "Admins can read their own access row" on public.admin_users;
create policy "Admins can read their own access row"
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Published content is public" on public.site_content;
create policy "Published content is public"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can insert content" on public.site_content;
create policy "Admins can insert content"
on public.site_content
for insert
to authenticated
with check (
  updated_by = (select auth.uid())
  and exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can update content" on public.site_content;
create policy "Admins can update content"
on public.site_content
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
)
with check (
  updated_by = (select auth.uid())
  and exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can delete content" on public.site_content;
create policy "Admins can delete content"
on public.site_content
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.posts enable row level security;

grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;

drop policy if exists "Published posts are public" on public.posts;
create policy "Published posts are public"
on public.posts
for select
to anon
using (published = true);

drop policy if exists "Admins can read all posts" on public.posts;
create policy "Admins can read all posts"
on public.posts
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can insert posts" on public.posts;
create policy "Admins can insert posts"
on public.posts
for insert
to authenticated
with check (
  updated_by = (select auth.uid())
  and exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts"
on public.posts
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
)
with check (
  updated_by = (select auth.uid())
  and exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts"
on public.posts
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop trigger if exists set_posts_updated_at on public.posts;
create or replace function public.set_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger set_posts_updated_at
before update on public.posts
for each row
execute function public.set_posts_updated_at();
