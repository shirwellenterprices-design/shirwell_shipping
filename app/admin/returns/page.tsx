import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DELIVERIES } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Returns", robots: { index: false } };

export default async function AdminReturnsPage() {
  await requireAdmin();

  const returns = DEMO_DELIVERIES.filter((d) => d.status === "returned");

  return (
    <OpsShell
      title="Returns"
      subtitle="Reverse logistics after failed delivery or customer return request."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      {returns.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface-elevated p-6 text-sm text-muted">
          No returns in the demo dataset. Status <code className="text-gold">returned</code> on a
          delivery triggers inventory restock in a full integration.
        </p>
      ) : (
        <ul className="space-y-3">
          {returns.map((d) => (
            <li key={d.id} className="rounded-xl border border-border bg-surface-elevated p-4 text-sm">
              {d.trackingCode} — {d.orderNumber}
            </li>
          ))}
        </ul>
      )}
    </OpsShell>
  );
}
