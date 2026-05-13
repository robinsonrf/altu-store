-- ALTU ecommerce foundation
-- Products table, performance indexes, and storage bucket/policies.

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 1),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null default '',
  short_description text not null default '',
  price integer not null check (price >= 0),
  category text not null,
  images jsonb not null default '[]'::jsonb,
  sizes text[] not null default '{}'::text[],
  colors jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  stock integer not null default 0 check (stock >= 0),
  drop_tag text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

-- Filtering indexes
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_featured on public.products(featured);
create index if not exists idx_products_drop_tag on public.products(drop_tag) where drop_tag is not null;
create index if not exists idx_products_created_at_desc on public.products(created_at desc);

-- Optional search helpers for editorial/product search.
create index if not exists idx_products_name_trgm on public.products using gin (name gin_trgm_ops);
create index if not exists idx_products_images_gin on public.products using gin (images);
create index if not exists idx_products_colors_gin on public.products using gin (colors);
create index if not exists idx_products_sizes_gin on public.products using gin (sizes);

-- Enable RLS (adjust policies based on auth model).
alter table public.products enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'Public can read products'
  ) then
    create policy "Public can read products"
      on public.products
      for select
      to anon, authenticated
      using (true);
  end if;
end $$;

-- Storage bucket for product media.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'products',
  'products',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Public read policy for product assets.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public can view product assets'
  ) then
    create policy "Public can view product assets"
      on storage.objects
      for select
      to public
      using (bucket_id = 'products');
  end if;
end $$;

-- Authenticated upload/update/delete policy for product assets.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated can manage product assets'
  ) then
    create policy "Authenticated can manage product assets"
      on storage.objects
      for all
      to authenticated
      using (bucket_id = 'products')
      with check (bucket_id = 'products');
  end if;
end $$;
