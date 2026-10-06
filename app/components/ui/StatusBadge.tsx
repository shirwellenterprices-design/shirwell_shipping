import type { ShipmentStatus } from "@/lib/shipments";

const STYLES: Record<ShipmentStatus, string> = {
  Processing: "bg-muted/20 text-muted",
  "In Transit": "bg-info/15 text-info",
  "Out for Delivery": "bg-gold/15 text-gold",
  Delivered: "bg-success/15 text-success",
  Canceled: "bg-brand-red/15 text-brand-red",
};

export default function StatusBadge({ status }: { status: ShipmentStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${STYLES[status] ?? STYLES.Processing}`}
    >
      {status}
    </span>
  );
}
