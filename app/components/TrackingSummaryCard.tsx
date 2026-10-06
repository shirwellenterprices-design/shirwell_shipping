"use client";

import StatusBadge from "@/app/components/ui/StatusBadge";
import type { Shipment } from "@/lib/shipments";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function TrackingSummaryCard({ shipment }: { shipment: Shipment }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(shipment.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Tracking Number</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-lg font-semibold text-foreground">{shipment.trackingNumber}</p>
            <button
              type="button"
              onClick={copyCode}
              className="rounded-lg p-1.5 text-gold transition-colors hover:bg-gold/10"
              aria-label="Copy tracking number"
            >
              {copied ? (
                <Check className="h-4 w-4 text-success" strokeWidth={2} />
              ) : (
                <Copy className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      {shipment.status === "Delivered" && (
        <div className="mt-4 rounded-xl border border-info/30 bg-info/10 p-4">
          <p className="font-semibold text-info">Delivered</p>
          <p className="mt-1 text-sm text-foreground/90">{shipment.lastUpdated}</p>
          <p className="mt-0.5 text-sm text-muted">{shipment.to}</p>
        </div>
      )}

      {shipment.status === "In Transit" && (
        <div className="mt-4 rounded-xl border border-success/30 bg-success/10 p-4">
          <p className="font-semibold text-success">In Transit</p>
          <p className="mt-1 text-sm text-foreground/90">{shipment.lastUpdated}</p>
          <p className="mt-0.5 text-sm text-muted">{shipment.to}</p>
        </div>
      )}
    </div>
  );
}
