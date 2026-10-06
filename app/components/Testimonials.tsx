export default function Testimonials() {
  return (
    <section className="bg-surface py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent sm:text-sm">
            What Our Customers Say
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Trusted by Businesses Worldwide
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            We revolutionize the way sales teams interact with customers. Our success
            has been driven by your passion for great selling.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote:
                "Thank you to your team for going the extra mile and working on Friday to deliver to site as soon as possible. Very grateful to both you and your team.",
              name: "Fannie Figueroa",
              role: "CEO, Aqua Investments",
            },
            {
              quote:
                "Shirwell has transformed our supply chain. Their reliability and transparent tracking give us complete peace of mind on every shipment.",
              name: "Marcus Chen",
              role: "Operations Director, TechFlow",
            },
            {
              quote:
                "Outstanding e-commerce logistics support. Our delivery times improved by 40% since partnering with Shirwell Shipping.",
              name: "Sarah Okonkwo",
              role: "Founder, ShopNest Africa",
            },
          ].map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-border bg-surface-elevated p-5 sm:p-8"
            >
              <svg className="h-8 w-8 text-gold/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="mt-4 leading-relaxed text-muted">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-bold text-black">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
