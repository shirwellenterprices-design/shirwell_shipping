import PickupScanForm from "@/app/components/driver/PickupScanForm";
import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { activeDeliveryForDriver } from "@/lib/shipping/demo-data";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Pickup", robots: { index: false } };

export default async function DriverPickupPage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);
  const active = activeDeliveryForDriver(driver.id);

  return (
    <OpsShell
      title="Pickup"
      subtitle="At the warehouse — scan package or QR before leaving."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      {active ? (
        <>
          <p className="mb-4 text-sm text-muted">
            Warehouse: {active.originName}
          </p>
          <PickupScanForm expectedCode={active.trackingCode} />
        </>
      ) : (
        <p className="text-sm text-muted">No active delivery to pick up.</p>
      )}
    </OpsShell>
  );
}
