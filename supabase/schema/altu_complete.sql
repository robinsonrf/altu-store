-- =============================================================================
-- ALTU Store — esquema Supabase (PostgreSQL)
-- -----------------------------------------------------------------------------
-- Alineado con:
--   - src/domain/product.ts (Product, Money, ProductImage, ProductColor)
--   - src/features/products/model/product-mappers.ts (ProductRecord ↔ filas)
--   - src/infrastructure/catalog/catalog-repository.ts (consultas a products)
--   - src/infrastructure/storage/product-image-storage.ts (bucket "products")
--
-- Uso:
--   - Base nueva: ejecutar este script completo en el SQL Editor de Supabase.
--   - Proyecto con migración previa 20260513_*: revisar sección "Compatibilidad"
--     al final antes de aplicar; evita duplicar objetos ya creados.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Extensiones
-- -----------------------------------------------------------------------------
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- -----------------------------------------------------------------------------
-- Utilidades
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Trigger genérico: mantiene updated_at en UTC antes de cada UPDATE.';

-- -----------------------------------------------------------------------------
-- Perfiles (1:1 con auth.users) — patrón recomendado por Supabase
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

comment on table public.profiles is
  'Datos públicos de perfil enlazados a auth.users; ampliable para checkout.';
comment on column public.profiles.id is 'Misma PK que auth.users.';

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'Users can view own profile'
  ) then
    create policy "Users can view own profile"
      on public.profiles for select
      to authenticated
      using (auth.uid() = id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'Users can insert own profile'
  ) then
    create policy "Users can insert own profile"
      on public.profiles for insert
      to authenticated
      with check (auth.uid() = id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
      and policyname = 'Users can update own profile'
  ) then
    create policy "Users can update own profile"
      on public.profiles for update
      to authenticated
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;
end $$;

-- Crear fila de perfil al registrarse (SQL Editor / migración con permisos).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Catálogo: productos (mapa 1:1 con ProductRecord / tabla "products" del repo)
-- -----------------------------------------------------------------------------
-- price + currency reflejan Money { amount, currency: "CLP" }.
-- images: jsonb array de { url, alt, isPrimary? }
-- colors: jsonb array de { name, hex }
-- sizes: text[] (filtro .contains en cliente)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 1),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null default '',
  short_description text not null default '',
  price integer not null check (price >= 0),
  currency text not null default 'CLP' check (currency = 'CLP'),
  category text not null,
  images jsonb not null default '[]'::jsonb
    check (jsonb_typeof(images) = 'array'),
  sizes text[] not null default '{}'::text[],
  colors jsonb not null default '[]'::jsonb
    check (jsonb_typeof(colors) = 'array'),
  featured boolean not null default false,
  stock integer not null default 0 check (stock >= 0),
  drop_tag text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

comment on table public.products is
  'Catálogo ALTU; columnas snake_case consumidas por Supabase JS en catalog-repository.';
comment on column public.products.price is 'Monto mínimo (ej. peso chileno) — entero, sin decimales.';
comment on column public.products.currency is 'ISO de Money; hoy solo CLP en dominio TypeScript.';
comment on column public.products.images is 'JSON array: ProductImage[]';
comment on column public.products.colors is 'JSON array: ProductColor[]';
comment on column public.products.drop_tag is 'Etiqueta de drop / colección; nullable.';

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_featured on public.products (featured);
create index if not exists idx_products_drop_tag on public.products (drop_tag)
  where drop_tag is not null;
create index if not exists idx_products_created_at_desc on public.products (created_at desc);
create index if not exists idx_products_name_trgm on public.products using gin (name gin_trgm_ops);
create index if not exists idx_products_images_gin on public.products using gin (images);
create index if not exists idx_products_colors_gin on public.products using gin (colors);
create index if not exists idx_products_sizes_gin on public.products using gin (sizes);

alter table public.products enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'products'
      and policyname = 'Public can read products'
  ) then
    create policy "Public can read products"
      on public.products for select
      to anon, authenticated
      using (true);
  end if;
end $$;

-- Escritura en catálogo: solo staff (ajusta el UUID a roles reales).
-- Descomenta y sustituye cuando tengas usuarios admin en auth.users.
-- create policy "Staff can manage products"
--   on public.products for all
--   to authenticated
--   using (auth.uid() in ('00000000-0000-0000-0000-000000000001'::uuid))
--   with check (auth.uid() in ('00000000-0000-0000-0000-000000000001'::uuid));

-- -----------------------------------------------------------------------------
-- Newsletter (HomeNewsletter — hoy mock en UI; tabla lista para integración)
-- -----------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'home',
  created_at timestamptz not null default timezone('utc'::text, now()),
  constraint newsletter_email_format check (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  ),
  constraint newsletter_source_nonempty check (char_length(trim(source)) > 0)
);

create unique index if not exists ux_newsletter_subscribers_email_lower
  on public.newsletter_subscribers (lower(trim(email)));

comment on table public.newsletter_subscribers is
  'Suscripciones desde la home u otros orígenes; email único por lower(trim).';

alter table public.newsletter_subscribers enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'newsletter_subscribers'
      and policyname = 'Anyone can subscribe to newsletter'
  ) then
    create policy "Anyone can subscribe to newsletter"
      on public.newsletter_subscribers for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;

-- SELECT sin políticas: RLS deniega lectura a anon/authenticated (usar service_role en backoffice).

-- -----------------------------------------------------------------------------
-- Storage: imágenes de producto (bucket "products")
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'products',
  'products',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']::text[]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Public can view product assets'
  ) then
    create policy "Public can view product assets"
      on storage.objects for select
      to public
      using (bucket_id = 'products');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Authenticated can manage product assets'
  ) then
    create policy "Authenticated can manage product assets"
      on storage.objects for all
      to authenticated
      using (bucket_id = 'products')
      with check (bucket_id = 'products');
  end if;
end $$;

-- -----------------------------------------------------------------------------
-- Compatibilidad con migración previa `20260513_products_and_storage.sql`
-- -----------------------------------------------------------------------------
-- Si products ya existe SIN columna currency, ejecutar:
--   alter table public.products add column if not exists currency text
--     not null default 'CLP' check (currency = 'CLP');
-- Si ya aplicaste políticas idénticas, los bloques DO anterior no duplican.
-- =============================================================================
