const highlights = [
  { value: "Sea · Air · Land", label: "Freight Modes" },
  { value: "Live Track", label: "Shipment Status" },
  { value: "Rate Tools", label: "Instant Estimates" },
  { value: "Guides", label: "Shipping Help" },
];

export default function Stats() {
  return (
    <section className="border-y border-border bg-surface py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Built for practical shipping workflows
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Tools and guides to plan freight, book shipments, and follow delivery progress —
            without inflated claims.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-xl font-extrabold text-gold sm:text-2xl lg:text-3xl">
                {item.value}
              </p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted sm:mt-2 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
