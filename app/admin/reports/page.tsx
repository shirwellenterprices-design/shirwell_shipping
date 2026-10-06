import OpsShell from "@/app/components/ops/OpsShell";
import OpsStatGrid from "@/app/components/ops/OpsStatGrid";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DELIVERIES, DEMO_ORDERS } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Reports", robots: { index: false } };

export default async function AdminReportsPage() {
  await requireAdmin();

  const delivered = DEMO_DELIVERIES.filter((d) => d.status === "delivered").length;
  const total = DEMO_DELIVERIES.length;
  const successRate = total ? Math.round((delivered / total) * 100) : 0;

  return (
    <OpsShell
      title="Reports"
      subtitle="SLA, completion rate, and failed delivery trends."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <OpsStatGrid
        stats={[
          { label: "Orders (demo)", value: String(DEMO_ORDERS.length) },
          { label: "Deliveries", value: String(total) },
          { label: "Delivered", value: String(delivered) },
          { label: "Success rate", value: `${successRate}%` },
        ]}
      />
      <p className="text-sm text-muted">
        Export CSV and date-range filters can read from Supabase{" "}
        <code className="text-gold">orders</code> and <code className="text-gold">deliveries</code> once
        the migration is applied.
      </p>
    </OpsShell>
  );
}
