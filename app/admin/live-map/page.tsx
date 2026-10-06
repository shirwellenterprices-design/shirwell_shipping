import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DELIVERIES } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";
import Link from "next/link";

export const metadata = { title: "Live Map", robots: { index: false } };

export default async function AdminLiveMapPage() {
  await requireAdmin();

  const active = DEMO_DELIVERIES.filter(
    (d) => !["delivered", "failed", "returned", "pending_assignment"].includes(d.status),
  );

  return (
    <OpsShell
      title="Live Map"
      subtitle="Fleet view during in-transit and out-for-delivery legs."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <div className="rounded-2xl border border-border bg-surface-elevated p-6">
        <p className="text-sm text-muted">
          Connect{" "}
          <code className="text-gold">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to render the same live
          map used on customer tracking. Active routes:
        </p>
        <ul className="mt-4 space-y-3">
          {active.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm"
            >
              <span className="font-medium text-foreground">{d.trackingCode}</span>
              <span className="text-muted">{d.driverName ?? "Unassigned"}</span>
              <Link href={`/track?code=${d.trackingCode}`} className="text-gold hover:underline">
                Open tracking
              </Link>
            </li>
          ))}
          {active.length === 0 ? (
            <li className="text-sm text-muted">No active routes right now.</li>
          ) : null}
        </ul>
      </div>
    </OpsShell>
  );
}
