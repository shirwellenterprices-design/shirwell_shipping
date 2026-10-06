import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_DRIVERS } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Drivers", robots: { index: false } };

export default async function AdminDriversPage() {
  await requireAdmin();

  return (
    <OpsShell
      title="Drivers"
      subtitle="On-duty drivers for assignment and live GPS legs."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {DEMO_DRIVERS.map((d) => (
          <li key={d.id} className="rounded-2xl border border-border bg-surface-elevated p-4">
            <p className="font-semibold text-foreground">{d.name}</p>
            <p className="mt-1 text-sm text-muted">{d.email}</p>
            <p className="text-sm text-muted">{d.phone}</p>
            <p className="mt-2 text-sm">{d.vehicle}</p>
            <p className="mt-2 text-xs text-gold">
              {d.onDuty ? "On duty" : "Off duty"} · {d.activeDeliveries} active · ★ {d.rating}
            </p>
          </li>
        ))}
      </ul>
    </OpsShell>
  );
}
