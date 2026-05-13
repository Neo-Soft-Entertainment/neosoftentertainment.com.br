create table if not exists public.site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.site_content enable row level security;
alter table public.site_admins enable row level security;

grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;
grant select on public.site_admins to authenticated;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.site_admins
    where user_id = (select auth.uid())
  );
$$;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can insert site content" on public.site_content;
create policy "Admins can insert site content"
on public.site_content
for insert
to authenticated
with check ((select public.is_site_admin()));

drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
on public.site_content
for update
to authenticated
using ((select public.is_site_admin()))
with check ((select public.is_site_admin()));

drop policy if exists "Users can read their own admin row" on public.site_admins;
create policy "Users can read their own admin row"
on public.site_admins
for select
to authenticated
using ((select auth.uid()) = user_id);

insert into public.site_content (id, content)
values ('homepage_copy', '{}'::jsonb)
on conflict (id) do nothing;
