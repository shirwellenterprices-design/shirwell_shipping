import { DELIVERY_STATUS_LABEL, type DeliveryStatus } from "@/lib/shipping/statuses";

export default function DeliveryStatusBadge({ status }: { status: DeliveryStatus }) {
  const tone =
    status === "delivered"
      ? "bg-success/15 text-success"
      : status === "failed"
        ? "bg-brand-red/15 text-brand-red"
        : "bg-gold/15 text-gold";

  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${tone}`}>
      {DELIVERY_STATUS_LABEL[status]}
    </span>
  );
}
