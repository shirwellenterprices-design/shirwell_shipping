import OpsShell from "@/app/components/ops/OpsShell";
import { requireDriver } from "@/lib/shipping/auth";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Earnings", robots: { index: false } };

export default async function DriverEarningsPage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);

  return (
    <OpsShell
      title="Earnings"
      subtitle="Payout summary for completed deliveries."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface-elevated p-4">
          <p className="text-xs text-muted">Today</p>
          <p className="mt-2 text-2xl font-bold text-gold">$86.00</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4">
          <p className="text-xs text-muted">This week</p>
          <p className="mt-2 text-2xl font-bold text-gold">$412.50</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-elevated p-4">
          <p className="text-xs text-muted">Completed runs</p>
          <p className="mt-2 text-2xl font-bold text-gold">12</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">Demo totals for {driver.name}.</p>
    </OpsShell>
  );
}
