import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { activeDeliveryForDriver } from "@/lib/shipping/demo-data";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";
import Link from "next/link";

export const metadata = { title: "Map", robots: { index: false } };

export default async function DriverMapPage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);
  const active = activeDeliveryForDriver(driver.id);

  return (
    <OpsShell
      title="Map"
      subtitle="Live GPS tracking while in transit and out for delivery."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      {active ? (
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 text-sm">
          <p>
            Broadcasting route for <span className="font-semibold text-gold">{active.trackingCode}</span>
            . Customers see the same position on{" "}
            <Link href={`/track?code=${active.trackingCode}`} className="text-gold underline">
              Track Shipment
            </Link>
            .
          </p>
          <p className="mt-4 text-muted">
            Enable geolocation in the Shirwell mobile WebView or native app to push{" "}
            <code className="text-gold">current_lat</code> /{" "}
            <code className="text-gold">current_lng</code> on the delivery record.
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted">Start an active delivery to share GPS.</p>
      )}
    </OpsShell>
  );
}
