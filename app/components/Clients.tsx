const clients = [
  "Aqua Investments",
  "TechFlow",
  "ShopNest",
  "GlobalTrade Co.",
  "Meridian Logistics",
  "Pacific Freight",
];

export default function Clients() {
  return (
    <section className="border-y border-border bg-surface py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">
            Our Clients
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Trusted by Leading Companies
          </h2>
          <p className="mt-3 text-muted">
            Our client list speaks for itself. Since our earliest days, we&apos;ve represented
            everything from start-ups to Fortune 500 companies.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {clients.map((client) => (
            <div
              key={client}
              className="flex h-16 items-center justify-center rounded-xl border border-border bg-surface-elevated px-3 sm:h-20 sm:px-4"
            >
              <span className="text-center text-xs font-bold text-muted sm:text-sm">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
