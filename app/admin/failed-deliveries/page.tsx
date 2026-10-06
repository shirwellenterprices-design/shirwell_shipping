import DeliveryStatusBadge from "@/app/components/ops/DeliveryStatusBadge";
import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DELIVERIES } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Failed Deliveries", robots: { index: false } };

export default async function AdminFailedDeliveriesPage() {
  await requireAdmin();

  const failed = DEMO_DELIVERIES.filter((d) => d.status === "failed");

  return (
    <OpsShell
      title="Failed Deliveries"
      subtitle="Exceptions after out-for-delivery or OTP/POD failures."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <ul className="space-y-3">
        {failed.map((d) => (
          <li key={d.id} className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-foreground">{d.trackingCode}</p>
              <DeliveryStatusBadge status={d.status} />
            </div>
            <p className="mt-2 text-muted">{d.failReason}</p>
            <p className="mt-1 text-muted">{d.destinationAddress}</p>
          </li>
        ))}
        {failed.length === 0 ? (
          <li className="text-sm text-muted">No failed deliveries.</li>
        ) : null}
      </ul>
    </OpsShell>
  );
}
