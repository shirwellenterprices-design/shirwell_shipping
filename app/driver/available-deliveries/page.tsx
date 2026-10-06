import DeliveryStatusBadge from "@/app/components/ops/DeliveryStatusBadge";
import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { availableDeliveries } from "@/lib/shipping/demo-data";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Available Deliveries", robots: { index: false } };

export default async function DriverAvailableDeliveriesPage() {
  await requireDriver();
  const open = availableDeliveries();

  return (
    <OpsShell
      title="Available Deliveries"
      subtitle="Jobs waiting for driver acceptance after admin assignment."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      <ul className="space-y-3">
        {open.map((d) => (
          <li key={d.id} className="rounded-2xl border border-border bg-surface-elevated p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-gold">{d.trackingCode}</p>
              <DeliveryStatusBadge status={d.status} />
            </div>
            <p className="mt-2 text-muted">{d.destinationAddress}</p>
            <button
              type="button"
              className="mt-3 rounded-lg bg-gold px-4 py-2 text-xs font-bold text-black"
              disabled
              title="Wire to Supabase: set status accepted and driver_id"
            >
              Accept (connect DB)
            </button>
          </li>
        ))}
        {open.length === 0 ? (
          <li className="text-sm text-muted">Nothing available right now.</li>
        ) : null}
      </ul>
    </OpsShell>
  );
}
