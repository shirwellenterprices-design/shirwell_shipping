import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DELIVERIES, DEMO_DRIVERS } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Assignments", robots: { index: false } };

export default async function AdminAssignmentsPage() {
  await requireAdmin();

  const queue = DEMO_DELIVERIES.filter((d) => d.status === "pending_assignment");

  return (
    <OpsShell
      title="Assignments"
      subtitle="Match ready deliveries to available drivers (driver accepts on mobile)."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            Unassigned
          </h2>
          <ul className="space-y-3">
            {queue.map((d) => (
              <li key={d.id} className="rounded-xl border border-border bg-surface-elevated p-4 text-sm">
                <p className="font-medium text-gold">{d.trackingCode}</p>
                <p className="text-muted">{d.destinationAddress}</p>
              </li>
            ))}
            {queue.length === 0 ? (
              <li className="text-sm text-muted">Queue is clear.</li>
            ) : null}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            Available drivers
          </h2>
          <ul className="space-y-3">
            {DEMO_DRIVERS.filter((d) => d.onDuty).map((d) => (
              <li key={d.id} className="rounded-xl border border-border bg-surface-elevated p-4 text-sm">
                <p className="font-medium">{d.name}</p>
                <p className="text-muted">{d.vehicle}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Wire this queue to Supabase <code className="text-gold">deliveries.driver_id</code> updates
            (see <code className="text-gold">supabase/shipping_flow.sql</code>).
          </p>
        </section>
      </div>
    </OpsShell>
  );
}
