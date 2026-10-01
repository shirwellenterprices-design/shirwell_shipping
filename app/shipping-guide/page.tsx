import type { Metadata } from "next";
import Link from "next/link";
import AdSenseAd from "@/app/components/AdSenseAd";
import MatchedContentAd from "@/app/components/MatchedContentAd";
import { adsenseConfig } from "@/lib/adsense";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping Guide",
  description:
    "Complete Shirwell Shipping guide: how to track packages, book freight, choose sea/air/land shipping, estimate rates, and prepare documents.",
  keywords: [
    "shipping guide",
    "how to ship",
    "track package",
    "Shirwell Shipping",
    "freight guide",
  ],
  alternates: { canonical: "/shipping-guide" },
};

export default function ShippingGuidePage() {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-3xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Resources</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shipping Guide
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Everything you need to ship with {siteConfig.name} — from choosing a freight mode to
          tracking your delivery. Use this overview, then dive into our deeper{" "}
          <Link href="/guides" className="font-semibold text-gold hover:underline">
            shipping guides
          </Link>{" "}
          for packing, customs, and cost tips.
        </p>

        <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Choose your shipping mode</h2>
            <p className="mt-3 text-muted">
              Mode choice is a trade-off between speed, cost, and cargo size. There is no single
              “best” option — only the best fit for your deadline and product.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              <li>
                <strong className="text-foreground">Sea freight</strong> — best for larger or
                less time-sensitive cargo; usually the most cost-effective option for volume.
              </li>
              <li>
                <strong className="text-foreground">Air freight</strong> — fastest for urgent
                parcels and high-value goods when transit days matter more than rate.
              </li>
              <li>
                <strong className="text-foreground">Land freight</strong> — reliable for regional
                and domestic routes by road or rail with flexible pickup and delivery.
              </li>
            </ul>
            <p className="mt-3">
              Read our full comparison in{" "}
              <Link
                href="/guides/sea-vs-air-freight"
                className="font-semibold text-gold hover:underline"
              >
                Sea vs Air Freight
              </Link>
              , then start a booking on{" "}
              <Link href="/book" className="font-semibold text-gold hover:underline">
                Book a Shipment
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Estimate your rate</h2>
            <p className="mt-3 text-muted">
              Use the{" "}
              <Link href="/calculator" className="font-semibold text-gold hover:underline">
                Rate Calculator
              </Link>{" "}
              with origin, destination, weight, and dimensions (L × W × H). Estimates may include
              base rate, fuel surcharge, and handling fees. Final invoices can differ after actual
              weighing and customs-related services.
            </p>
            <p className="mt-3 text-muted">
              Light but bulky cartons are often billed on{" "}
              <Link
                href="/guides/dimensional-weight-explained"
                className="font-semibold text-gold hover:underline"
              >
                dimensional weight
              </Link>
              . Measuring the finished outer package — not just the product — keeps quotes honest.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Pack and label correctly</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              <li>Use sturdy outer packaging suited to the freight mode and journey length</li>
              <li>Seal cartons and protect fragile items with adequate cushioning on all sides</li>
              <li>Place labels on a flat face; remove old barcodes from reused boxes</li>
              <li>Include a clear commercial invoice for international shipments</li>
              <li>Keep prohibited and restricted items off your booking</li>
            </ul>
            <p className="mt-3 text-muted">
              Step-by-step packing advice:{" "}
              <Link
                href="/guides/how-to-pack-for-shipping"
                className="font-semibold text-gold hover:underline"
              >
                How to Pack Shipments
              </Link>
              . Restricted categories overview:{" "}
              <Link
                href="/guides/restricted-and-prohibited-items"
                className="font-semibold text-gold hover:underline"
              >
                Restricted and Prohibited Items
              </Link>
              .
            </p>
          </section>

          {adsenseConfig.enabled && (
            <section aria-label="Advertisement" className="overflow-hidden py-2">
              <AdSenseAd className="min-h-[250px]" slot={adsenseConfig.boxAdSlot} format="rectangle" />
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Prepare international paperwork</h2>
            <p className="mt-3 text-muted">
              Cross-border shipments need accurate commercial invoices, clear product
              descriptions, and honest declared values. Vague descriptions and missing consignee
              details are common causes of customs delays.
            </p>
            <p className="mt-3 text-muted">
              Learn the basics in{" "}
              <Link
                href="/guides/customs-basics-for-shippers"
                className="font-semibold text-gold hover:underline"
              >
                Customs Basics for International Shippers
              </Link>
              . For complex regulated goods, use a licensed customs broker in the destination
              market — this guide is educational, not legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Book with complete details</h2>
            <p className="mt-3 text-muted">
              Enter the same weight and dimensions you measured, confirm pickup readiness, and
              include phone numbers that actually ring. Incomplete addresses cause failed
              deliveries more often than “lost” freight.
            </p>
            <p className="mt-3 text-muted">
              Use our{" "}
              <Link
                href="/guides/freight-booking-checklist"
                className="font-semibold text-gold hover:underline"
              >
                Freight Booking Checklist
              </Link>{" "}
              before handover day.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Track your shipment</h2>
            <p className="mt-3 text-muted">
              Enter your tracking code on the{" "}
              <Link href="/track" className="font-semibold text-gold hover:underline">
                Track Shipment
              </Link>{" "}
              page to see live status, timeline events, and map progress. Save the code from your
              booking confirmation email and share it with your receiving party.
            </p>
            <p className="mt-3 text-muted">
              Gaps between scans can be normal on long sea or air legs. Read{" "}
              <Link href="/guides/tracking-tips" className="font-semibold text-gold hover:underline">
                Shipment Tracking Tips
              </Link>{" "}
              to know when to wait and when to escalate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Selling online?</h2>
            <p className="mt-3 text-muted">
              Online stores need repeatable packing standards, clear delivery promises, and fast
              tracking communication. Our{" "}
              <Link
                href="/guides/ecommerce-shipping-checklist"
                className="font-semibold text-gold hover:underline"
              >
                E-commerce Shipping Checklist
              </Link>{" "}
              covers fulfillment habits that reduce tickets and refunds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Need help?</h2>
            <p className="mt-3 text-muted">
              Our support team can help with quotes, delays, and documentation. Visit{" "}
              <Link href="/contact" className="font-semibold text-gold hover:underline">
                Contact Us
              </Link>{" "}
              or email {siteConfig.contactEmail}. Browse all articles in the{" "}
              <Link href="/guides" className="font-semibold text-gold hover:underline">
                Guides library
              </Link>
              .
            </p>
          </section>
        </div>

        <MatchedContentAd />
      </article>
    </main>
  );
}
