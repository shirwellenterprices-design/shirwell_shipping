import type { Metadata } from "next";
import Link from "next/link";
import InContentAd from "@/app/components/InContentAd";
import { guides } from "@/lib/guides";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping Guides & Resources",
  description: `Practical shipping guides from ${siteConfig.name}: packing, customs, sea vs air freight, tracking, dimensional weight, and booking checklists.`,
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Resources</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shipping Guides
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Original, practical articles from {siteConfig.name} to help you pack, book, track, and
          ship with fewer surprises — whether you move one parcel or regular freight.
        </p>

        <div className="mt-8">
          <InContentAd format="rectangle" />
        </div>

        <ul className="mt-10 space-y-6">
          {guides.map((guide) => (
            <li
              key={guide.slug}
              className="border-b border-border pb-6 last:border-0 last:pb-0"
            >
              <Link
                href={`/guides/${guide.slug}`}
                className="group block transition-colors"
              >
                <h2 className="text-xl font-semibold text-foreground group-hover:text-gold">
                  {guide.title}
                </h2>
                <p className="mt-2 text-muted">{guide.description}</p>
                <p className="mt-2 text-sm text-muted/70">
                  {guide.readingMinutes} min read · Updated {guide.updated}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-muted">
          Also see our{" "}
          <Link href="/shipping-guide" className="font-semibold text-gold hover:underline">
            Shipping Guide overview
          </Link>
          ,{" "}
          <Link href="/book" className="font-semibold text-gold hover:underline">
            Book a Shipment
          </Link>
          , and{" "}
          <Link href="/contact" className="font-semibold text-gold hover:underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
