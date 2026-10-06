import PodForm from "@/app/components/driver/PodForm";
import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Proof of Delivery", robots: { index: false } };

export default async function DriverProofPage() {
  await requireDriver();

  return (
    <OpsShell
      title="Proof of Delivery"
      subtitle="OTP verification plus photo or signature before delivered."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      <PodForm />
    </OpsShell>
  );
}
