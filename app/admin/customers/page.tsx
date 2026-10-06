import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_ORDERS } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Customers", robots: { index: false } };

export default async function AdminCustomersPage() {
  await requireAdmin();

  const byEmail = new Map<string, { name: string; email: string; orders: number }>();
  for (const o of DEMO_ORDERS) {
    const existing = byEmail.get(o.customerEmail);
    if (existing) existing.orders += 1;
    else byEmail.set(o.customerEmail, { name: o.customerName, email: o.customerEmail, orders: 1 });
  }

  return (
    <OpsShell
      title="Customers"
      subtitle="Shoppers who completed checkout and entered a delivery address."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-elevated">
        {[...byEmail.values()].map((c) => (
          <li key={c.email} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-muted">{c.email}</p>
            </div>
            <span className="text-xs text-gold">{c.orders} order(s)</span>
          </li>
        ))}
      </ul>
    </OpsShell>
  );
}
