import { absoluteUrl, siteConfig } from "@/lib/site";

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

  if (hasPhone) {
    organization.telephone = siteConfig.contactPhone;
  }
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
    name: "Shirwell Shipping",
    alternateName: ["Shirwell Shipping", "shipping"],
    url: absoluteUrl("/home"),
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: "Shirwell Shipping",
      logo: absoluteUrl("/ship.png"),
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/track?code={tracking_code}`,
      },
      "query-input": "required name=tracking_code",
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Freight & Logistics Services",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    description: siteConfig.description,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
