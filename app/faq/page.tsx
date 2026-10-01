import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping FAQ",
  description: `Frequently asked questions about ${siteConfig.name}: tracking, booking, rates, packing, and international shipping.`,
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "How do I track a shipment?",
    a: "Open the Track page, enter the tracking code from your booking confirmation, and view status, timeline events, and progress. Save the code so you can share the same status page with your receiving party.",
  },
  {
    q: "How are shipping rates calculated?",
    a: "Use the Rate Calculator with origin, destination, weight, and outer package dimensions. Estimates may include base rate, fuel surcharge, and handling. Final pricing can change after actual weighing, dimensional weight rules, and any customs-related services.",
  },
  {
    q: "Should I choose sea, air, or land freight?",
    a: "Sea is usually best for larger, less urgent cargo. Air is better when transit time matters more than cost. Land freight fits regional and domestic routes. Compare options with our Sea vs Air guide and the rate calculator before you book.",
  },
  {
    q: "What should I include for international shipments?",
    a: "Prepare a clear commercial invoice, accurate product descriptions, honest declared values, and complete consignee contact details. Vague descriptions and missing paperwork are common causes of customs delays.",
  },
  {
    q: "How should I pack my shipment?",
    a: "Use a sturdy outer carton, cushion contents so nothing can shift, seal seams firmly, and place the label on a flat face. Avoid restricted items. See our packing guide for mode-specific tips.",
  },
  {
    q: "Why is my tracking status not updating?",
    a: "Long sea legs and some air transfers can go days without a new scan. That alone is not always a problem. Contact support if the estimated window has clearly passed, an address looks wrong, or delivery was marked complete but goods are missing.",
  },
  {
    q: "How do I contact support?",
    a: `Email ${siteConfig.contactEmail} or use the Contact form. Include your tracking code and booking reference so we can help faster.`,
  },
  {
    q: "Where can I read more shipping guidance?",
    a: "Visit the Shipping Guide overview and the Guides library for packing, customs basics, dimensional weight, e-commerce shipping, and booking checklists.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-3xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Help</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shipping FAQ
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Quick answers for tracking, booking, rates, packing, and international paperwork on{" "}
          {siteConfig.name}.
        </p>

        <div className="mt-10 space-y-8">
          {faqs.map((item) => (
            <section key={item.q}>
              <h2 className="text-xl font-semibold text-foreground">{item.q}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{item.a}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">
          Still need help?{" "}
          <Link href="/contact" className="font-semibold text-gold hover:underline">
            Contact us
          </Link>{" "}
          ·{" "}
          <Link href="/guides" className="font-semibold text-gold hover:underline">
            Browse guides
          </Link>{" "}
          ·{" "}
          <Link href="/privacy" className="font-semibold text-gold hover:underline">
            Privacy Policy
          </Link>
        </p>
      </article>
    </main>
  );
}
