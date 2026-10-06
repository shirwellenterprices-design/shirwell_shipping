import type { Metadata } from "next";
import AdSenseAd from "@/app/components/AdSenseAd";
import MatchedContentAd from "@/app/components/MatchedContentAd";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Stats from "@/app/components/Stats";
import Pricing from "@/app/components/Pricing";
import CTA from "@/app/components/CTA";
import Contact from "@/app/components/Contact";
import EditorialContent from "@/app/components/EditorialContent";
import { adsenseConfig } from "@/lib/adsense";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Shirwell Shipping | Shipping & Logistics Worldwide",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/home" },
  openGraph: {
    title: "Shirwell Shipping | Shipping & Logistics Worldwide",
    description: siteConfig.description,
    url: "/home",
    images: [
      {
        url: "/ship.png",
        width: 1024,
        height: 1024,
        alt: "Shirwell Shipping",
      },
    ],
  },
};

/** Shared home landing (used by `/` and `/home`). */
export default function HomeLandingPage() {
  return (
    <main>
      <Hero />

      <About />
      <Services />
      {adsenseConfig.enabled && (
        <section
          aria-label="Advertisement"
          className="border-y border-border bg-surface px-4 py-8"
        >
          <div className="mx-auto max-w-5xl">
            <AdSenseAd
              className="min-h-[250px]"
              slot={adsenseConfig.inlineSlot}
              format="auto"
            />
          </div>
        </section>
      )}
      <Stats />
      <Pricing />
      <CTA />
      <EditorialContent />
      {adsenseConfig.enabled && (
        <section
          aria-label="Advertisement"
          className="border-y border-border bg-surface px-4 py-8"
        >
          <div className="mx-auto max-w-5xl">
            <AdSenseAd
              className="min-h-[250px]"
              slot={adsenseConfig.boxAdSlot}
              format="auto"
            />
          </div>
        </section>
      )}
      <div className="mx-auto max-w-5xl px-4 pb-8">
        <MatchedContentAd />
      </div>
      <Contact />
    </main>
  );
}
