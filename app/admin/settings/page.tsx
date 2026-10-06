import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Settings", robots: { index: false } };

export default async function AdminSettingsPage() {
  await requireAdmin();

  return (
    <OpsShell
      title="Settings"
      subtitle="Shipping methods, OTP rules, and warehouse locations."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <div className="space-y-4 text-sm">
        <section className="rounded-2xl border border-border bg-surface-elevated p-5">
          <h2 className="font-semibold text-foreground">Shipping methods</h2>
          <ul className="mt-2 list-inside list-disc text-muted">
            <li>Shirwell Same-Day — metro Sydney</li>
            <li>Standard courier — 2–3 business days</li>
            <li>Express — next business day</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-border bg-surface-elevated p-5">
          <h2 className="font-semibold text-foreground">Proof of delivery</h2>
          <p className="mt-2 text-muted">
            Require customer OTP plus photo or signature before marking{" "}
            <code className="text-gold">delivered</code>.
          </p>
        </section>
        <section className="rounded-2xl border border-border bg-surface-elevated p-5">
          <h2 className="font-semibold text-foreground">Database</h2>
          <p className="mt-2 text-muted">
            Run <code className="text-gold">supabase/shipping_flow.sql</code> in your Supabase SQL
            editor to persist orders, deliveries, and POD records.
          </p>
        </section>
      </div>
    </OpsShell>
  );
}
