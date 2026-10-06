import { absoluteUrl, siteConfig } from "@/lib/site";
import Script from "next/script";

export default function JsonLd() {
  const hasPhone = Boolean(siteConfig.contactPhone);
  const hasAddress = Boolean(siteConfig.address.line1);

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/ship.png"),
    image: absoluteUrl("/ship.png"),
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contactEmail,
      ...(hasPhone ? { telephone: siteConfig.contactPhone } : {}),
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    slogan: "Fast • Reliable • Worldwide Shipping",
    brand: {
      "@type": "Brand",
      name: "Shirwell Shipping",
    },
  };

  if (hasAddress) {
    organization.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    };
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Shirwell Shipping & Logistics",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    areaServed: "Worldwide",
    serviceType: [
      "Sea Freight",
      "Air Freight",
      "Land Freight",
      "Shipment Tracking",
      "E-commerce Logistics",
    ],
    url: absoluteUrl("/home"),
  };

  return (
    <>
      <Script
        id="jsonld-organization"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(organization)}
      </Script>
      <Script id="jsonld-website" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(website)}
      </Script>
      <Script id="jsonld-service" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(service)}
      </Script>
    </>
  );
}
