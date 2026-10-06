import DeliveryStatusBadge from "@/app/components/ops/DeliveryStatusBadge";
import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { DELIVERY_PIPELINE, flowStepLabel } from "@/lib/shipping/flow";
import { activeDeliveryForDriver } from "@/lib/shipping/demo-data";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DELIVERY_TO_FLOW } from "@/lib/shipping/statuses";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";
import Link from "next/link";

export const metadata = { title: "Active Delivery", robots: { index: false } };

export default async function DriverActiveDeliveryPage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);
  const active = activeDeliveryForDriver(driver.id);

  return (
    <OpsShell
      title="Active Delivery"
      subtitle="Current leg in the Shirwell shipping pipeline."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      {!active ? (
        <p className="text-sm text-muted">
          No active run. Check{" "}
          <Link href="/driver/available-deliveries" className="text-gold underline">
            Available Deliveries
          </Link>
          .
        </p>
      ) : (
        <>
          <div className="mb-6 rounded-2xl border border-border bg-surface-elevated p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-lg font-semibold text-gold">{active.trackingCode}</p>
              <DeliveryStatusBadge status={active.status} />
            </div>
            <p className="mt-2 text-sm text-muted">{active.destinationAddress}</p>
            <p className="mt-1 text-sm text-muted">Customer: {active.customerPhone}</p>
          </div>

          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            Pipeline
          </h2>
          <ol className="space-y-2 text-sm">
            {DELIVERY_PIPELINE.map((stepId) => {
              const current = DELIVERY_TO_FLOW[active.status] === stepId;
              return (
                <li
                  key={stepId}
                  className={`rounded-lg px-3 py-2 ${
                    current ? "bg-gold/15 font-semibold text-gold" : "text-muted"
                  }`}
                >
                  {flowStepLabel(stepId)}
                </li>
              );
            })}
          </ol>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/driver/map" className="rounded-lg border border-border px-4 py-2 hover:border-gold/40">
              Live map
            </Link>
            <Link href="/driver/pickup" className="rounded-lg border border-border px-4 py-2 hover:border-gold/40">
              Pickup / scan
            </Link>
            <Link
              href="/driver/proof-of-delivery"
              className="rounded-lg bg-gold px-4 py-2 font-semibold text-black"
            >
              Complete POD
            </Link>
          </div>
        </>
      )}
    </OpsShell>
  );
}
