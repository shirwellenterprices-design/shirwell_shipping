import { CUSTOMER_FLOW_STEPS } from "@/lib/shipping/flow";

type FlowDiagramProps = {
  compact?: boolean;
  highlightFrom?: number;
};

export default function FlowDiagram({ compact, highlightFrom = 0 }: FlowDiagramProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface-elevated ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <ol className="relative space-y-0 border-l border-gold/30 pl-4">
        {CUSTOMER_FLOW_STEPS.map((step, index) => {
          const active = index >= highlightFrom;
          return (
            <li key={step.id} className={`pb-3 last:pb-0 ${compact ? "text-xs" : "text-sm"}`}>
              <span
                className={`absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full ${
                  active ? "bg-gold" : "bg-border"
                }`}
                aria-hidden
              />
              <span className={active ? "text-foreground" : "text-muted"}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
