import StatusBadge from "@/app/components/ui/StatusBadge";
import type { Shipment } from "@/lib/shipments";
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";

export default function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <Link
      href={`/shipments/${shipment.id}`}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated p-4 transition-colors hover:border-gold/40 hover:bg-[#242424] sm:gap-4 sm:p-5"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
        <Package className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-foreground">{shipment.trackingNumber}</p>
          <StatusBadge status={shipment.status} />
        </div>
        <p className="mt-1 text-sm text-muted">{shipment.date}</p>
        <p className="mt-0.5 truncate text-sm text-muted">
          {shipment.from} → {shipment.to}
        </p>
      </div>
      <ChevronRight
        className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
        strokeWidth={1.75}
      />
    </Link>
  );
}
