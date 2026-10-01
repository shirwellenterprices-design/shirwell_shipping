import { createShipmentAction, updatePricingPlanAction, updateShipmentLocationAction } from "@/app/admin/actions";
import { signOutAction } from "@/app/login/actions";
import { getPricingPlans } from "@/lib/pricing";
import { createClient } from "@/lib/supabase/server";
import type { ShipmentRow } from "@/lib/supabase/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
};

type DashboardProps = {
  searchParams: Promise<{ created?: string; updated?: string; pricing?: string; error?: string }>;
};

export default async function AdminDashboardPage({ searchParams }: DashboardProps) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/admin");

  const { data: shipments } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: inquiries } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  const pricingPlans = await getPricingPlans();

  return (
    <main className="bg-surface px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-gold sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-muted">Manage shipments and view contact inquiries.</p>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="border border-gold bg-gold px-4 py-2 font-serif text-sm font-bold text-black"
            >
              Sign Out
            </button>
          </form>
        </div>

        {params.created && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Shipment created successfully.
          </p>
        )}
        {params.pricing && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Pricing plan updated.
          </p>
        )}
        {params.updated && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Shipment location updated.
          </p>
        )}
        {params.error && (
          <p className="rounded-lg border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
            {decodeURIComponent(params.error)}
          </p>
        )}

        <section className="rounded-xl border border-border bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-foreground">Pricing Plans</h2>
          <p className="mt-1 text-sm text-muted">
            Each plan has its own price — changing Road Freight does not affect Ocean or Air.
          </p>
          <div className="mt-4 space-y-3">
            {pricingPlans.map((plan) => (
              <form
                key={plan.slug}
                action={updatePricingPlanAction}
                className="flex flex-wrap items-end gap-3 rounded-lg border border-border p-4"
              >
                <input type="hidden" name="slug" value={plan.slug} />
                <div className="min-w-[140px] flex-1">
                  <p className="text-sm font-bold uppercase tracking-wide text-muted">{plan.name}</p>
                  <p className="text-xs text-muted">{plan.load}</p>
                </div>
                <div>
                  <label htmlFor={`price-${plan.slug}`} className="block text-xs font-medium text-muted">
                    Price ($/shipment)
                  </label>
                  <input
                    id={`price-${plan.slug}`}
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={plan.price}
                    className="mt-1 w-28 border border-border px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="border border-gold bg-gold px-4 py-2 text-xs font-bold text-black"
                >
                  Save
                </button>
              </form>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-foreground">Create Shipment</h2>
          <form action={createShipmentAction} className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Tracking Code" name="tracking_code" placeholder="SZ5YDN" required />
            <Field label="Status" name="status" placeholder="In Transit" required />
            <Field label="Origin Name" name="origin_name" placeholder="Sydney, NSW" required />
            <Field label="Destination Name" name="destination_name" placeholder="Melbourne, VIC" required />
            <Field label="Origin Lat" name="origin_lat" type="number" step="any" defaultValue="-33.8688" required />
            <Field label="Origin Lng" name="origin_lng" type="number" step="any" defaultValue="151.2093" required />
            <Field label="Destination Lat" name="destination_lat" type="number" step="any" defaultValue="-37.8136" required />
            <Field label="Destination Lng" name="destination_lng" type="number" step="any" defaultValue="144.9631" required />
            <Field label="Current Lat" name="current_lat" type="number" step="any" defaultValue="-35.2809" />
            <Field label="Current Lng" name="current_lng" type="number" step="any" defaultValue="149.13" />
            <Field label="Progress %" name="progress" type="number" defaultValue="0" />
            <Field label="Speed km/h" name="speed_kmh" type="number" defaultValue="68" />
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="border border-gold bg-gold px-6 py-3 font-serif text-sm font-bold text-black"
              >
                Create Shipment
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-border bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-foreground">Shipments</h2>
          <div className="mt-4 space-y-4">
            {(shipments as ShipmentRow[] | null)?.map((shipment) => (
              <div key={shipment.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-foreground">{shipment.tracking_code}</p>
                  <Link
                    href={`/track?code=${shipment.tracking_code}`}
                    className="text-sm font-semibold text-gold hover:underline"
                  >
                    View on map →
                  </Link>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {shipment.origin_name} → {shipment.destination_name} · {shipment.status} ·{" "}
                  {shipment.progress}%
                </p>
                <form action={updateShipmentLocationAction} className="mt-3 grid gap-2 sm:grid-cols-5">
                  <input type="hidden" name="id" value={shipment.id} />
                  <input
                    name="current_lat"
                    type="number"
                    step="any"
                    defaultValue={shipment.current_lat}
                    className="border border-border px-2 py-1.5 text-sm"
                    placeholder="Lat"
                  />
                  <input
                    name="current_lng"
                    type="number"
                    step="any"
                    defaultValue={shipment.current_lng}
                    className="border border-border px-2 py-1.5 text-sm"
                    placeholder="Lng"
                  />
                  <input
                    name="progress"
                    type="number"
                    defaultValue={shipment.progress}
                    className="border border-border px-2 py-1.5 text-sm"
                    placeholder="Progress"
                  />
                  <select
                    name="status"
                    defaultValue={shipment.status}
                    className="border border-border px-2 py-1.5 text-sm"
                  >
                    <option>Processing</option>
                    <option>In Transit</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                  </select>
                  <button
                    type="submit"
                    className="border border-gold bg-gold px-3 py-1.5 text-xs font-bold text-black"
                  >
                    Update Live Location
                  </button>
                </form>
              </div>
            )) ?? <p className="text-muted">No shipments yet.</p>}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-foreground">Recent Contact Inquiries</h2>
          <div className="mt-4 space-y-3">
            {inquiries?.length ? (
              inquiries.map((inquiry) => (
                <div key={inquiry.id} className="rounded-lg border border-border p-4 text-sm">
                  <p className="font-semibold text-foreground">{inquiry.name}</p>
                  <p className="text-muted">{inquiry.email}</p>
                  <p className="mt-2 text-foreground">{inquiry.message}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No inquiries yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  step,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  step?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        step={step}
        required={required}
        className="mt-1 w-full border border-border px-3 py-2 text-sm"
      />
    </div>
  );
}
