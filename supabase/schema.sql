-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

-- ---------------------------------------------------------------------------
-- Admins: only users listed here can change content or upload images.
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

drop policy if exists "Admins can read their own row" on public.admins;
create policy "Admins can read their own row" on public.admins
  for select using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text,
  type text not null default 'office' check (type in ('office', 'retail', 'industrial')),
  price text,
  area text,
  parkings integer,
  description text,
  cover_image text,
  gallery text[] not null default '{}',
  details jsonb not null default '{}'::jsonb,
  units jsonb not null default '[]'::jsonb,
  amenities text[] not null default '{}',
  rating numeric(2, 1),
  is_new boolean not null default false,
  featured boolean not null default false,
  status text not null default 'available' check (status in ('available', 'completed')),
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  rating integer check (rating between 1 and 5),
  photo text,
  video_url text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials add column if not exists video_url text;

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  description text,
  photo text,
  image_position text,
  image_scale numeric(3, 2),
  image_origin text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.interior_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text,
  area text,
  duration text,
  image text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row level security: everyone can read published rows, only admins can write.
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['properties', 'testimonials', 'team_members', 'interior_projects']
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists "Public can read published" on public.%I', t);
    execute format(
      'create policy "Public can read published" on public.%I for select using (published or public.is_admin())',
      t
    );

    execute format('drop policy if exists "Admins can write" on public.%I', t);
    execute format(
      'create policy "Admins can write" on public.%I for all using (public.is_admin()) with check (public.is_admin())',
      t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Image storage: public read, admin-only upload / replace / delete.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view media" on storage.objects;
create policy "Public can view media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "Admins can upload media" on storage.objects;
create policy "Admins can upload media" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins can update media" on storage.objects;
create policy "Admins can update media" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admins can delete media" on storage.objects;
create policy "Admins can delete media" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());

-- ---------------------------------------------------------------------------
-- After creating your admin login (Authentication -> Users -> Add user),
-- make that user an admin by running (replace the email):
--
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'you@example.com';
-- ---------------------------------------------------------------------------
