import DeliveryStatusBadge from "@/app/components/ops/DeliveryStatusBadge";
import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DELIVERIES } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Deliveries", robots: { index: false } };

export default async function AdminDeliveriesPage() {
  await requireAdmin();

  return (
    <OpsShell
      title="Deliveries"
      subtitle="Delivery records created when orders are ready for Shirwell Shipping."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <ul className="space-y-3">
        {DEMO_DELIVERIES.map((d) => (
          <li
            key={d.id}
            className="rounded-2xl border border-border bg-surface-elevated p-4 text-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">
                  {d.trackingCode}{" "}
                  <span className="font-normal text-muted">· {d.orderNumber}</span>
                </p>
                <p className="mt-1 text-muted">
                  {d.originName} → {d.destinationAddress}
                </p>
                <p className="mt-1 text-muted">Driver: {d.driverName ?? "—"}</p>
              </div>
              <DeliveryStatusBadge status={d.status} />
            </div>
          </li>
        ))}
      </ul>
    </OpsShell>
  );
}
