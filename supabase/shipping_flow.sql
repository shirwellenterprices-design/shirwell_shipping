-- Shirwell end-to-end shipping flow (orders → deliveries → driver POD)
-- Run after schema.sql and profiles_account.sql

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in ('customer', 'admin', 'driver'));

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid references public.profiles (id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  items_summary text not null,
  total_aud numeric(12, 2) not null default 0,
  shipping_method text not null,
  shipping_address text not null,
  status text not null default 'paid'
    check (status in (
      'draft', 'payment_pending', 'paid', 'processing', 'packed',
      'ready_for_shipping', 'completed', 'cancelled'
    )),
  flow_step text not null default 'create_order',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders (id) on delete cascade,
  tracking_code text not null unique,
  status text not null default 'pending_assignment'
    check (status in (
      'pending_assignment', 'assigned', 'accepted', 'en_route_pickup',
      'picked_up', 'in_transit', 'out_for_delivery', 'arrived',
      'otp_pending', 'pod_pending', 'delivered', 'failed', 'returned'
    )),
  driver_id uuid references public.profiles (id) on delete set null,
  origin_name text not null,
  destination_name text not null,
  destination_address text not null,
  customer_phone text,
  pickup_qr_token text,
  delivery_otp text,
  fail_reason text,
  eta timestamptz,
  current_lat double precision,
  current_lng double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.delivery_events (
  id uuid primary key default gen_random_uuid(),
  delivery_id uuid not null references public.deliveries (id) on delete cascade,
  event_type text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.proof_of_delivery (
  id uuid primary key default gen_random_uuid(),
  delivery_id uuid not null references public.deliveries (id) on delete cascade,
  photo_url text,
  signature_url text,
  recipient_name text,
  completed_at timestamptz not null default now()
);

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

drop trigger if exists deliveries_updated_at on public.deliveries;
create trigger deliveries_updated_at
  before update on public.deliveries
  for each row execute function public.set_updated_at();

alter table public.orders enable row level security;
alter table public.deliveries enable row level security;
alter table public.delivery_events enable row level security;
alter table public.proof_of_delivery enable row level security;

create policy "Admins manage orders"
  on public.orders for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Customers read own orders"
  on public.orders for select
  using (customer_id = auth.uid());

create policy "Admins manage deliveries"
  on public.deliveries for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Drivers read assigned deliveries"
  on public.deliveries for select
  using (
    driver_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Drivers update assigned deliveries"
  on public.deliveries for update
  using (driver_id = auth.uid())
  with check (driver_id = auth.uid());

create policy "Public read deliveries by tracking"
  on public.deliveries for select
  using (true);

create policy "Admins manage delivery events"
  on public.delivery_events for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Drivers insert delivery events"
  on public.delivery_events for insert
  with check (
    exists (
      select 1 from public.deliveries d
      where d.id = delivery_id and d.driver_id = auth.uid()
    )
  );

create policy "Admins manage pod"
  on public.proof_of_delivery for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Drivers manage pod for assigned"
  on public.proof_of_delivery for all
  using (
    exists (
      select 1 from public.deliveries d
      where d.id = delivery_id and d.driver_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.deliveries d
      where d.id = delivery_id and d.driver_id = auth.uid()
    )
  );
