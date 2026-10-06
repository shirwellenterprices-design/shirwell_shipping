import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { activeDeliveryForDriver } from "@/lib/shipping/demo-data";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";
import Link from "next/link";

export const metadata = { title: "Delivery", robots: { index: false } };

export default async function DriverDeliveryPage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);
  const active = activeDeliveryForDriver(driver.id);

  return (
    <OpsShell
      title="Delivery"
      subtitle="Out for delivery — arrive, verify OTP, capture proof."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      {active ? (
        <div className="space-y-4 text-sm">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5">
            <p className="font-semibold text-foreground">{active.destinationName}</p>
            <p className="mt-1 text-muted">{active.destinationAddress}</p>
            <p className="mt-2 text-muted">Call customer: {active.customerPhone}</p>
          </div>
          <ol className="list-inside list-decimal space-y-2 text-muted">
            <li>Mark arrived at destination</li>
            <li>Ask customer for OTP sent by SMS</li>
            <li>Photo and/or signature</li>
          </ol>
          <Link
            href="/driver/proof-of-delivery"
            className="inline-block rounded-xl bg-gold px-5 py-2.5 font-semibold text-black"
          >
            Open proof of delivery
          </Link>
        </div>
      ) : (
        <p className="text-sm text-muted">No delivery in progress.</p>
      )}
    </OpsShell>
  );
}
