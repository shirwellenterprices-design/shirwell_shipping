"use client";

import ShipmentCard from "@/app/components/ShipmentCard";
import AppPageHeader from "@/app/components/ui/AppPageHeader";
import AppShell from "@/app/components/ui/AppShell";
import { DEMO_SHIPMENTS, type ShipmentStatus } from "@/lib/shipments";
import { useMemo, useState } from "react";

const FILTERS = ["All", "In Transit", "Delivered", "Canceled"] as const;
type Filter = (typeof FILTERS)[number];

export default function ShipmentsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const shipments = useMemo(() => {
    if (filter === "All") return DEMO_SHIPMENTS;
    return DEMO_SHIPMENTS.filter((s) => s.status === (filter as ShipmentStatus));
  }, [filter]);

  return (
    <AppShell>
      <AppPageHeader title="My Shipments" backHref="/home" />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((tab) => {
          const active = filter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-gold text-black"
                  : "bg-surface-elevated text-foreground hover:bg-[#2a2a2a]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {shipments.map((shipment) => (
          <ShipmentCard key={shipment.id} shipment={shipment} />
        ))}
        {shipments.length === 0 && (
          <p className="col-span-full rounded-2xl border border-border bg-surface-elevated p-8 text-center text-muted">
            No shipments in this category.
          </p>
        )}
      </div>
    </AppShell>
  );
}
