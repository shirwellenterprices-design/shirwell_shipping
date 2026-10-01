import type { TimelineEvent } from "@/lib/shipments";

export default function ShipmentTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6">
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-muted">
        Shipment Progress
      </h2>
      <ol className="relative space-y-0">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          return (
            <li key={`${event.status}-${index}`} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute left-[9px] top-5 h-[calc(100%-8px)] w-0.5 ${
                    event.completed ? "bg-success" : "bg-border"
                  }`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full border-2 ${
                  event.completed
                    ? "border-success bg-success"
                    : "border-border bg-surface"
                }`}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`font-semibold ${
                    event.completed ? "text-foreground" : "text-muted"
                  }`}
                >
                  {event.status}
                </p>
                {(event.date !== "—" || event.time) && (
                  <p className="mt-0.5 text-sm text-muted">
                    {[event.date, event.time].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="mt-0.5 text-sm text-muted">{event.location}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
