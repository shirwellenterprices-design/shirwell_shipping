import OpsShell from "@/app/components/ops/OpsShell";
import { signOutAction } from "@/app/login/actions";
import { requireDriver } from "@/lib/shipping/auth";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Driver Profile", robots: { index: false } };

export default async function DriverProfilePage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);

  return (
    <OpsShell
      title="Profile"
      subtitle="Vehicle, contact, and on-duty status."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      <div className="rounded-2xl border border-border bg-surface-elevated p-5 text-sm">
        <p className="text-lg font-semibold">{driver.name}</p>
        <p className="text-muted">{account.email}</p>
        <p className="mt-2">{driver.phone}</p>
        <p className="mt-2">{driver.vehicle}</p>
        <p className="mt-3 text-gold">{driver.onDuty ? "On duty" : "Off duty"}</p>
      </div>
      <form action={signOutAction} className="mt-6">
        <button
          type="submit"
          className="rounded-xl border border-brand-red/40 px-4 py-2 text-sm font-semibold text-brand-red"
        >
          Sign out
        </button>
      </form>
    </OpsShell>
  );
}
