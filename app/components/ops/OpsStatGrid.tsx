type Stat = {
  label: string;
  value: string;
  hint?: string;
};

export default function OpsStatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-surface-elevated p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold text-gold">{stat.value}</p>
          {stat.hint ? <p className="mt-1 text-xs text-muted">{stat.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}
