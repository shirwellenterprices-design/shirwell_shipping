import { absoluteUrl, siteConfig } from "@/lib/site";
import { swgConfig } from "@/lib/swg";
import type { Guide } from "@/lib/guides";

/** NewsArticle JSON-LD for Reader Revenue Manager / Google News compatibility. */
export default function GuideJsonLd({ guide }: { guide: Guide }) {
  const url = absoluteUrl(`/guides/${guide.slug}`);
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-07-21",
    dateModified: "2026-07-21",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/ship.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: [absoluteUrl("/ship.png"), absoluteUrl("/hero-ship.png")],
    isAccessibleForFree: true,
    isPartOf: {
      "@type": ["CreativeWork", "Product"],
      name: `${siteConfig.name} Open Access`,
      productID: swgConfig.productId,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
