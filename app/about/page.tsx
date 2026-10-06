import type { Metadata } from "next";
import Link from "next/link";
import { formatAddress, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — freight booking, shipment tracking, rate tools, and shipping guides for sea, air, and land.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">About Us</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shirwell Shipping
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Fast, reliable, worldwide shipping and logistics for businesses and individuals.
        </p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
          <h2 className="text-xl font-semibold text-foreground">Our story</h2>
          <p>
            Founded in 2019, {siteConfig.name} set out to make freight booking and shipment
            tracking clearer for people who are not full-time logistics experts. Too many
            shipping tools bury customers in jargon, opaque quotes, and silent tracking pages.
            We built a platform that puts status, booking, and support in one place.
          </p>
          <p>
            Today we support domestic, international, and e-commerce shipping through sea
            freight, air freight, and land freight options. We partner with a growing network of
            hubs and carriers so goods keep moving while you keep a single customer experience —
            on the web and in our mobile app.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-foreground">Who we serve</h2>
          <p className="text-muted">
            Our customers include small online sellers shipping daily parcels, importers moving
            seasonal inventory, and teams that need predictable regional freight without running
            their own carrier contracts. If you need to estimate a rate, book cargo, and share a
            tracking link with a client, Shirwell is built for that workflow.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>E-commerce brands that need consistent pack-and-ship routines</li>
            <li>Businesses booking sea, air, or land freight for restocks and projects</li>
            <li>Individuals sending important parcels who want live status visibility</li>
            <li>Operations teams monitoring multiple active consignments in one account</li>
          </ul>

          <h2 className="pt-4 text-xl font-semibold text-foreground">What we offer</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>Live shipment tracking with route visibility and timeline events</li>
            <li>Sea, air, and land freight booking tools</li>
            <li>Instant rate calculator for planning and comparison</li>
            <li>Account tools for shipments, notifications, and profile management</li>
            <li>Educational shipping guides on packing, customs basics, and freight choice</li>
            <li>Dedicated customer support for quotes, delays, and documentation questions</li>
          </ul>

          <h2 className="pt-4 text-xl font-semibold text-foreground">How support works</h2>
          <p>
            When something goes wrong in transit — a missed pickup window, a customs question, or
            an unclear address — you should not have to hunt for a phone tree. Email{" "}
            {siteConfig.contactEmail} or use our{" "}
            <Link href="/contact" className="font-semibold text-gold hover:underline">
              contact form
            </Link>{" "}
            with your tracking code and booking reference. Our team aims to respond during
            business hours with next steps you can act on.
          </p>
          <p className="text-muted">
            For self-serve help, start with the{" "}
            <Link href="/shipping-guide" className="font-semibold text-gold hover:underline">
              Shipping Guide
            </Link>{" "}
            and our{" "}
            <Link href="/guides" className="font-semibold text-gold hover:underline">
              full guides library
            </Link>
            .
          </p>

          <h2 className="pt-4 text-xl font-semibold text-foreground">Our commitment</h2>
          <p>
            We are committed to transparent communication, careful handling guidance, and
            dependable transit expectations. We will not pretend every lane is overnight —
            instead we help you choose the right mode, pack correctly, and track progress so
            surprises stay rare.
          </p>
          <p>
            Whether you are shipping a single parcel or managing regular freight, Shirwell aims
            to keep your supply chain simple: clear tools, honest documentation, and support when
            you need a human.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Email:{" "}
            <a className="text-gold hover:underline" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            {siteConfig.contactPhone ? (
              <>
                <br />
                Phone: {siteConfig.contactPhone}
              </>
            ) : null}
            {formatAddress() ? (
              <>
                <br />
                Address: {formatAddress()}
              </>
            ) : null}
          </p>
          <p>
            <Link href="/contact" className="font-semibold text-gold hover:underline">
              Contact us →
            </Link>{" "}
            ·{" "}
            <Link href="/privacy" className="font-semibold text-gold hover:underline">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="font-semibold text-gold hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
