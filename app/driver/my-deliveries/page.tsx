import DeliveryStatusBadge from "@/app/components/ops/DeliveryStatusBadge";
import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { deliveriesForDriver } from "@/lib/shipping/demo-data";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "My Deliveries", robots: { index: false } };

export default async function DriverMyDeliveriesPage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);
  const mine = deliveriesForDriver(driver.id);

  return (
    <OpsShell
      title="My Deliveries"
      subtitle="Accepted and completed runs assigned to you."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      <ul className="space-y-3">
        {mine.map((d) => (
          <li key={d.id} className="rounded-2xl border border-border bg-surface-elevated p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-foreground">{d.trackingCode}</p>
              <DeliveryStatusBadge status={d.status} />
            </div>
            <p className="mt-1 text-muted">{d.destinationAddress}</p>
          </li>
        ))}
        {mine.length === 0 ? (
          <li className="text-sm text-muted">No deliveries assigned yet.</li>
        ) : null}
      </ul>
    </OpsShell>
  );
}
