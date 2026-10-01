-- Pricing plans — each freight type has its own row and price
create table if not exists public.pricing_plans (
  slug text primary key,
  name text not null,
  price numeric(10, 2) not null check (price >= 0),
  load_label text not null,
  features jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create or replace function public.set_pricing_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists pricing_plans_updated_at on public.pricing_plans;
create trigger pricing_plans_updated_at
  before update on public.pricing_plans
  for each row execute function public.set_pricing_updated_at();

alter table public.pricing_plans enable row level security;

create policy "Anyone can read pricing plans"
  on public.pricing_plans for select
  using (true);

create policy "Admins can update pricing plans"
  on public.pricing_plans for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can insert pricing plans"
  on public.pricing_plans for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Independent prices per plan (update one row without affecting others)
insert into public.pricing_plans (slug, name, price, load_label, features, featured, sort_order)
values
  (
    'road-freight',
    'Road Freight',
    10,
    '40kg load',
    '["Warehousing", "Free Packaging", "24/7 Support"]'::jsonb,
    false,
    1
  ),
  (
    'ocean-freight',
    'Ocean Freight',
    20,
    '70kg load',
    '["Warehousing", "Free Packaging", "24/7 Support"]'::jsonb,
    true,
    2
  ),
  (
    'air-freight',
    'Air Freight',
    40,
    '40kg load',
    '["Warehousing", "Free Packaging", "24/7 Support"]'::jsonb,
    false,
    3
  )
on conflict (slug) do update set
  name = excluded.name,
  price = excluded.price,
  load_label = excluded.load_label,
  features = excluded.features,
  featured = excluded.featured,
  sort_order = excluded.sort_order;
