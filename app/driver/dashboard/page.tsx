import OpsShell from "@/app/components/ops/OpsShell";
import OpsStatGrid from "@/app/components/ops/OpsStatGrid";
import { requireDriver } from "@/lib/shipping/auth";
import {
  activeDeliveryForDriver,
  availableDeliveries,
  deliveriesForDriver,
} from "@/lib/shipping/demo-data";
import { demoDriverForAccount } from "@/lib/shipping/demo-driver";
import { DRIVER_NAV } from "@/lib/shipping/ops-nav";
import Link from "next/link";

export const metadata = { title: "Driver Dashboard", robots: { index: false } };

export default async function DriverDashboardPage() {
  const account = await requireDriver();
  const driver = demoDriverForAccount(account);
  const active = activeDeliveryForDriver(driver.id);
  const mine = deliveriesForDriver(driver.id);
  const open = availableDeliveries();

  return (
    <OpsShell
      title={`Hi, ${driver.name.split(" ")[0]}`}
      subtitle="Accept jobs, scan at warehouse, track live, complete OTP and POD."
      nav={DRIVER_NAV}
      homeHref="/driver/dashboard"
      roleLabel="Driver"
    >
      <OpsStatGrid
        stats={[
          { label: "Available", value: String(open.length), hint: "Unassigned nearby" },
          { label: "My deliveries", value: String(mine.length) },
          { label: "Active leg", value: active ? "1" : "0" },
          { label: "Rating", value: String(driver.rating) },
        ]}
      />

      {active ? (
        <section className="mb-6 rounded-2xl border border-gold/40 bg-gold/10 p-5">
          <h2 className="font-semibold text-foreground">Active delivery</h2>
          <p className="mt-1 text-sm text-muted">
            {active.trackingCode} → {active.destinationName}
          </p>
          <Link
            href="/driver/active-delivery"
            className="mt-3 inline-block text-sm font-semibold text-gold"
          >
            Continue →
          </Link>
        </section>
      ) : (
        <Link
          href="/driver/available-deliveries"
          className="mb-6 block rounded-2xl border border-border bg-surface-elevated p-5 text-sm hover:border-gold/40"
        >
          <span className="font-semibold text-foreground">No active delivery</span>
          <span className="mt-1 block text-muted">Browse available deliveries to accept a job.</span>
        </Link>
      )}

      <ol className="space-y-2 text-sm text-muted">
        <li>1. Accept assignment</li>
        <li>2. Go to warehouse · scan package / QR</li>
        <li>3. Pickup · live GPS · in transit</li>
        <li>4. Arrive · customer OTP · photo / signature</li>
      </ol>
    </OpsShell>
  );
}
