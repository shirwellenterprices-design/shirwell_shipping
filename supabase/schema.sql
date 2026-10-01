-- Shirwell Shipping — Supabase schema
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- Shipments for live tracking
create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_code text not null unique,
  status text not null default 'Processing'
    check (status in ('Processing', 'In Transit', 'Out for Delivery', 'Delivered')),
  origin_name text not null,
  origin_lat double precision not null,
  origin_lng double precision not null,
  destination_name text not null,
  destination_lat double precision not null,
  destination_lng double precision not null,
  current_lat double precision not null,
  current_lng double precision not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  route_id text,
  waypoints jsonb,
  speed_kmh integer not null default 0,
  eta timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Contact form submissions
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'customer');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger for shipments
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists shipments_updated_at on public.shipments;
create trigger shipments_updated_at
  before update on public.shipments
  for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.shipments enable row level security;
alter table public.contact_inquiries enable row level security;

-- Profiles: users read own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Shipments: public read (tracking lookup)
create policy "Anyone can read shipments"
  on public.shipments for select
  using (true);

-- Shipments: admins manage
create policy "Admins can insert shipments"
  on public.shipments for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update shipments"
  on public.shipments for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete shipments"
  on public.shipments for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Contact: anyone can submit
create policy "Anyone can submit contact inquiry"
  on public.contact_inquiries for insert
  with check (true);

create policy "Admins can read contact inquiries"
  on public.contact_inquiries for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Demo shipment (Sydney → Melbourne)
insert into public.shipments (
  tracking_code,
  status,
  origin_name,
  origin_lat,
  origin_lng,
  destination_name,
  destination_lat,
  destination_lng,
  current_lat,
  current_lng,
  progress,
  route_id,
  waypoints,
  speed_kmh,
  eta
) values (
  'SZ5YDN',
  'In Transit',
  'Sydney, NSW',
  -33.8688,
  151.2093,
  'Melbourne, VIC',
  -37.8136,
  144.9631,
  -35.2809,
  149.13,
  45,
  'syd-mel',
  '[
    {"lat": -33.8688, "lng": 151.2093},
    {"lat": -34.4278, "lng": 150.8931},
    {"lat": -35.2809, "lng": 149.13},
    {"lat": -36.0737, "lng": 146.9155},
    {"lat": -36.757, "lng": 144.2794},
    {"lat": -37.8136, "lng": 144.9631}
  ]'::jsonb,
  72,
  now() + interval '8 hours'
) on conflict (tracking_code) do nothing;
