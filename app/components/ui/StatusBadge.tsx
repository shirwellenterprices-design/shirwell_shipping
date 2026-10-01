import type { ShipmentStatus } from "@/lib/shipments";

/** Matches design sheet: In Transit = green, Delivered = blue, Canceled = muted red */
const STATUS_STYLES: Record<ShipmentStatus, string> = {
  Delivered: "bg-info/15 text-info",
  "In Transit": "bg-success/15 text-success",
  "Out for Delivery": "bg-success/15 text-success",
  Processing: "bg-gold/15 text-gold",
  Canceled: "bg-brand-red/15 text-brand-red",
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: ShipmentStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]} ${className}`}
    >
      {status}
    </span>
  );
}
