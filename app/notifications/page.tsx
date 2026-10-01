"use client";

import AppPageHeader from "@/app/components/ui/AppPageHeader";
import AppShell from "@/app/components/ui/AppShell";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { DEMO_NOTIFICATIONS, type NotificationItem } from "@/lib/shipments";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Truck,
} from "lucide-react";
import { useState } from "react";

const ICON_MAP = {
  delivered: { Icon: CheckCircle2, className: "bg-success/15 text-success" },
  transit: { Icon: Truck, className: "bg-info/15 text-info" },
  payment: { Icon: CreditCard, className: "bg-gold/15 text-gold" },
  alert: { Icon: AlertTriangle, className: "bg-warning/15 text-warning" },
};

export default function NotificationsPage() {
  const [items, setItems] = useState(DEMO_NOTIFICATIONS);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <AppShell narrow>
      <AppPageHeader title="Notifications" backHref="/home" />

      <ul className="animate-fade-up space-y-2">
        {items.map((item) => (
          <NotificationRow key={item.id} item={item} />
        ))}
      </ul>

      <div className="mt-8">
        <PrimaryButton type="button" onClick={markAllRead}>
          Mark All as Read
        </PrimaryButton>
      </div>
    </AppShell>
  );
}

function NotificationRow({ item }: { item: NotificationItem }) {
  const { Icon, className } = ICON_MAP[item.type];

  return (
    <li
      className={`flex gap-3 rounded-2xl border border-border p-4 transition-colors ${
        item.read ? "bg-surface-elevated/60" : "bg-surface-elevated"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${className}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className={`font-semibold ${item.read ? "text-foreground/80" : "text-foreground"}`}>
            {item.title}
          </p>
          <span className="shrink-0 text-xs text-muted">{item.timeAgo}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
      </div>
      {!item.read && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-label="Unread" />
      )}
    </li>
  );
}
