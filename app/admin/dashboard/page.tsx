import FlowDiagram from "@/app/components/shipping/FlowDiagram";
import OpsShell from "@/app/components/ops/OpsShell";
import OpsStatGrid from "@/app/components/ops/OpsStatGrid";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DELIVERIES, DEMO_DRIVERS, DEMO_ORDERS } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";
import { DELIVERY_STATUS_LABEL } from "@/lib/shipping/statuses";
import Link from "next/link";

export const metadata = { title: "Admin Dashboard", robots: { index: false } };

export default async function AdminDashboardPage() {
  await requireAdmin();

  const inTransit = DEMO_DELIVERIES.filter((d) =>
    ["in_transit", "out_for_delivery", "picked_up"].includes(d.status),
  ).length;
  const unassigned = DEMO_DELIVERIES.filter((d) => d.status === "pending_assignment").length;
  const failed = DEMO_DELIVERIES.filter((d) => d.status === "failed").length;

  return (
    <OpsShell
      title="Dashboard"
      subtitle="Orders, deliveries, and live ops aligned to the Shirwell end-to-end flow."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <OpsStatGrid
        stats={[
          { label: "Open orders", value: String(DEMO_ORDERS.length), hint: "Including ready to ship" },
          { label: "In transit", value: String(inTransit), hint: "GPS-tracked legs" },
          { label: "Awaiting driver", value: String(unassigned), hint: "Needs assignment" },
          { label: "Drivers on duty", value: String(DEMO_DRIVERS.filter((d) => d.onDuty).length) },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 font-semibold text-foreground">Recent deliveries</h2>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-elevated">
            {DEMO_DELIVERIES.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{d.trackingCode}</p>
                  <p className="truncate text-muted">
                    {d.originName} → {d.destinationName}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                  {DELIVERY_STATUS_LABEL[d.status]}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/admin/deliveries" className="mt-3 inline-block text-sm font-medium text-gold">
            View all deliveries →
          </Link>
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-foreground">End-to-end flow</h2>
          <FlowDiagram compact highlightFrom={14} />
          {failed > 0 ? (
            <p className="mt-3 text-sm text-warning">
              {failed} failed delivery — see{" "}
              <Link href="/admin/failed-deliveries" className="text-gold underline">
                Failed Deliveries
              </Link>
              .
            </p>
          ) : null}
        </section>
      </div>
    </OpsShell>
  );
}
