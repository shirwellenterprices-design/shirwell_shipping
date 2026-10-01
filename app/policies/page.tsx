import type { Metadata } from "next";
import Link from "next/link";
import { formatAddress, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Publication Policies",
  description: `Publication policies for ${siteConfig.name}: Privacy Policy, Terms of Service, and publisher information for AdSense and Reader Revenue Manager.`,
  alternates: { canonical: "/policies" },
};

export default function PublicationPoliciesPage() {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">
          Publisher disclosures
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Publication Policies
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {siteConfig.name} publishes shipping and logistics information, guides, and service
          tools at{" "}
          <a className="text-gold hover:underline" href={siteConfig.url}>
            {siteConfig.url}
          </a>
          . Use the official policy URLs below for Google AdSense, AdMob, Publisher Center, and
          Reader Revenue Manager.
        </p>

        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Required policy URLs</h2>
          <ul className="space-y-4 text-base text-muted">
            <li className="rounded-2xl border border-border bg-surface-elevated p-5">
              <p className="text-sm font-bold uppercase tracking-widest text-gold">
                Privacy Policy
              </p>
              <Link
                href="/privacy"
                className="mt-2 block break-all text-lg font-semibold text-foreground hover:text-gold"
              >
                {siteConfig.url}/privacy
              </Link>
              <p className="mt-2 text-sm">
                How we collect, use, and share data — including advertising and Google reader
                tools.
              </p>
            </li>
            <li className="rounded-2xl border border-border bg-surface-elevated p-5">
              <p className="text-sm font-bold uppercase tracking-widest text-gold">
                Terms of Service
              </p>
              <Link
                href="/terms"
                className="mt-2 block break-all text-lg font-semibold text-foreground hover:text-gold"
              >
                {siteConfig.url}/terms
              </Link>
              <p className="mt-2 text-sm">
                Rules for using our website, apps, shipping tools, and related reader offers.
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 text-base leading-relaxed text-foreground/90">
          <h2 className="text-xl font-semibold text-foreground">Publisher identity</h2>
          <p className="text-muted">
            This publication is operated by <strong className="text-foreground">{siteConfig.name}</strong>
            . We provide original shipping guides and logistics tools. We do not impersonate
            other brands, and we do not publish prohibited content under Google Publisher or
            Reader Revenue Manager policies.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>
              About:{" "}
              <Link href="/about" className="font-semibold text-gold hover:underline">
                {siteConfig.url}/about
              </Link>
            </li>
            <li>
              Contact:{" "}
              <Link href="/contact" className="font-semibold text-gold hover:underline">
                {siteConfig.url}/contact
              </Link>
            </li>
            <li>
              Email:{" "}
              <a
                className="font-semibold text-gold hover:underline"
                href={`mailto:${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
            </li>
            {siteConfig.contactPhone ? (
              <li>Phone: {siteConfig.contactPhone}</li>
            ) : null}
            {formatAddress() ? <li>Address: {formatAddress()}</li> : null}
          </ul>
        </section>

        <section className="mt-12 space-y-4 text-base leading-relaxed text-muted">
          <h2 className="text-xl font-semibold text-foreground">Content standards</h2>
          <p>
            Our public content focuses on shipping education and service information. We prohibit
            hate speech, harassment, illegal activity, deceptive claims, spam, and intellectual
            property infringement on this site. Readers can report concerns to{" "}
            <a className="font-semibold text-gold hover:underline" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            .
          </p>
          <p>
            Explore our guides:{" "}
            <Link href="/guides" className="font-semibold text-gold hover:underline">
              Shipping Guides
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
