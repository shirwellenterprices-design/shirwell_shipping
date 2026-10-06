import OpsShell from "@/app/components/ops/OpsShell";
import { requireAdmin } from "@/lib/shipping/auth";
import { DEMO_ORDERS } from "@/lib/shipping/demo-data";
import { ADMIN_NAV } from "@/lib/shipping/ops-nav";

export const metadata = { title: "Orders", robots: { index: false } };

export default async function AdminOrdersPage() {
  await requireAdmin();

  return (
    <OpsShell
      title="Orders"
      subtitle="From payment confirmed through packing and ready for shipping."
      nav={ADMIN_NAV}
      homeHref="/admin/dashboard"
      roleLabel="Shipping Admin"
    >
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface-elevated">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Items</th>
              <th className="px-4 py-3 font-semibold">Method</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {DEMO_ORDERS.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-medium text-gold">{o.orderNumber}</td>
                <td className="px-4 py-3">
                  <p>{o.customerName}</p>
                  <p className="text-xs text-muted">{o.customerEmail}</p>
                </td>
                <td className="max-w-xs px-4 py-3 text-muted">{o.itemsSummary}</td>
                <td className="px-4 py-3">{o.shippingMethod}</td>
                <td className="px-4 py-3 capitalize">{o.status.replace(/_/g, " ")}</td>
                <td className="px-4 py-3 text-right">${o.totalAud.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OpsShell>
  );
}
