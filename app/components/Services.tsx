import Image from "next/image";

const services = [
  {
    title: "Domestic Courier Solutions",
    description:
      "Plan and book domestic courier and land freight with clear tracking. Use our tools to estimate rates and follow door-to-door delivery progress.",
    image: "/service-domestic.png",
    alt: "Warehouse worker preparing domestic courier packages for delivery",
  },
  {
    title: "International Courier Solutions",
    description:
      "We understand how important it is for you to reach all your international destinations via a single service provider with the capacity to respond flexibly.",
    image: "/service-international.png",
    alt: "Cargo ship loaded with colorful shipping containers at an international port",
  },
  {
    title: "E-Commerce Logistics",
    description:
      "We work in partnership with you to achieve the right delivery solutions that will convey positive outcomes to your e-commerce business.",
    image: "/service-ecommerce.png",
    alt: "Modern e-commerce fulfillment warehouse with shelving and forklift",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent sm:text-sm">
            Our Services
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Comprehensive Logistics Solutions
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Domestic, international, and e-commerce shipping tools for sea, air, and land
            freight — with tracking, rate estimates, and guides tailored to your needs.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative min-h-[420px] overflow-hidden sm:min-h-[480px] lg:min-h-[520px]"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
                <h3 className="text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90 sm:mt-3 sm:text-[15px]">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
