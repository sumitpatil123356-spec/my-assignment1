-- SUPABASE SCHEMA MIGRATION: 20260613000000_schema.sql
-- principal DevOps and Security Architect

-- Create User Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  username text,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin'))
);

-- Create Products Inventory Table
create table public.products (
  id text primary key,
  label text not null,
  value numeric not null,
  img text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create Orders Table
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  status text default 'pending' check (status in ('pending', 'completed', 'cancelled')),
  total_price numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create Order Items Table
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders on delete cascade,
  product_id text references public.products on delete restrict,
  quantity integer not null check (quantity > 0),
  price numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create System Transaction Audit Logs (Security Audit requirement)
create table public.transactions_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  action text not null,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create Visitor Logs
create table public.visitor_logs (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  path text not null,
  referrer text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create Support Tickets Table
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  subject text not null,
  message text not null,
  status text default 'open' check (status in ('open', 'resolved', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Trigger to automatically create a profile for new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ROW LEVEL SECURITY (RLS) ACTIVATION

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.transactions_log enable row level security;
alter table public.visitor_logs enable row level security;
alter table public.support_tickets enable row level security;

-- Profiles Policies
create policy "Allow public profiles read access" on public.profiles
  for select using (true);

create policy "Allow users to update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins have superuser access on profiles" on public.profiles
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Products Policies
create policy "Allow anyone to read products" on public.products
  for select using (true);

create policy "Only admins can modify products" on public.products
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Orders Policies
create policy "Allow users to read their own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Allow users to create their own orders" on public.orders
  for insert with check (auth.uid() = user_id or user_id is null);

create policy "Admins have superuser access on orders" on public.orders
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Order Items Policies
create policy "Allow users to read order items of their own orders" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where id = order_items.order_id and orders.user_id = auth.uid()
    )
  );

create policy "Allow users to add order items to their own orders" on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders
      where id = order_items.order_id and (orders.user_id = auth.uid() or orders.user_id is null)
    )
  );

create policy "Admins have superuser access on order items" on public.order_items
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Transactions Log Policies
create policy "Only admins can select transaction logs" on public.transactions_log
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Allow users and public to write logs" on public.transactions_log
  for insert with check (true);

-- Visitor Logs Policies
create policy "Only admins can select visitor logs" on public.visitor_logs
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Allow anyone to insert visitor logs" on public.visitor_logs
  for insert with check (true);

-- Support Tickets Policies
create policy "Allow users to read their own support tickets" on public.support_tickets
  for select using (auth.uid() = user_id);

create policy "Allow users to create support tickets" on public.support_tickets
  for insert with check (auth.uid() = user_id);

create policy "Admins have superuser access on support tickets" on public.support_tickets
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- POPULATE SEED INVENTORY DATA
insert into public.products (id, label, value, img, category) values
('ctrl-volt', 'Volt Green Special', 169.00, 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80', 'Controllers'),
('ctrl-blue', 'Cobalt Element', 159.00, 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80', 'Controllers'),
('ctrl-white', 'Alabaster Core', 149.00, 'https://images.unsplash.com/photo-1602532432638-3486ec2c2a0d?auto=format&fit=crop&w=600&q=80', 'Controllers'),
('20', 'Mechanical Core TKL Keyboard', 125.00, 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80', 'Keyboards'),
('21', 'SoundScape Pro Tactical Array', 210.00, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80', 'Audio'),
('22', 'Zero-Lag Precision Speed Mouse', 80.00, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80', 'Mice'),
('23', 'Apex Stealth Linear Keyboard', 175.00, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80', 'Keyboards'),
('24', 'Vortex Wireless Macro Pad', 65.00, 'https://images.unsplash.com/photo-1626958390898-162d3577f593?auto=format&fit=crop&w=400&q=80', 'Keyboards'),
('25', 'Carbon Grid Ultralight Mouse', 95.00, 'https://images.unsplash.com/photo-1625842268584-8f3290455651?auto=format&fit=crop&w=400&q=80', 'Mice'),
('26', 'Vector Audio Desk Monitor Mic', 140.00, 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80', 'Audio'),
('27', 'Kevlar Coiled Connection Cable', 35.00, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80', 'Accessories'),
('28', 'Onyx Desk Armor Mat (XL)', 45.00, 'https://images.unsplash.com/photo-1632292224971-0d45778b3c9b?auto=format&fit=crop&w=400&q=80', 'Accessories'),
('29', 'Quantum Dots Ultrawide Display', 899.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80', 'Displays'),
('30', 'Titanium Monitor Articulated Arm', 115.00, 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=400&q=80', 'Accessories'),
('31', 'Stream Command Deck Controller', 150.00, 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=400&q=80', 'Controllers'),
('32', 'Pro Ambient Backlight Tube', 55.00, 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', 'Accessories')
on conflict (id) do update set
  label = excluded.label,
  value = excluded.value,
  img = excluded.img,
  category = excluded.category;
