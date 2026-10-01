# Supabase Setup — Shirwell Shipping

## 1. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Copy **Project URL** and **anon public key** from Settings → API

## 2. Add environment variables

In `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Restart the dev server after saving.

## 3. Run the database schema

Open **SQL Editor** in Supabase and run the full contents of:

```
supabase/schema.sql
```

This creates:
- `profiles` — user roles (customer / admin)
- `shipments` — live tracking data
- `contact_inquiries` — contact form submissions
- Row Level Security policies
- Demo shipment `SZ5YDN`

## 4. Enable Email Auth

In Supabase → Authentication → Providers, enable **Email**.

## 5. Create an admin user

1. Sign up a user via Supabase → Authentication → Users → Add user
2. In SQL Editor, promote to admin:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin@email.com';
```

## 6. Test

| Feature | URL |
|---------|-----|
| Customer login | `/login` |
| Admin login | `/admin` → redirects to `/admin/dashboard` |
| Track shipment | `/track?code=SZ5YDN` |
| Contact form | Homepage → Contact section |

Tracking reads from Supabase first, then falls back to simulated data if not configured.

## Pricing plans

Run `supabase/pricing_plans.sql` in the SQL Editor to create independent pricing rows:

| Slug | Plan | Default price |
|------|------|---------------|
| `road-freight` | Road Freight | $10/shipment |
| `ocean-freight` | Ocean Freight | $20/shipment |
| `air-freight` | Air Freight | $40/shipment |

Update any single plan in **Admin Dashboard → Pricing Plans** without affecting the others.

## Admin dashboard

`/admin/dashboard` lets admins:
- Create shipments with tracking codes
- Update live GPS coordinates on the map
- View contact form submissions
