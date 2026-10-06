function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "") || "https://shirwell-shipping.vercel.app";
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Shirwell Shipping",
  url: normalizeUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shirwell-shipping.vercel.app",
  ),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "shirwellenterprices@gmail.com",
  /** Leave empty until a real number is set — fake placeholders hurt AdSense review. */
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? "",
  address: {
    line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1?.trim() ?? "",
    city: process.env.NEXT_PUBLIC_ADDRESS_CITY?.trim() ?? "",
    region: process.env.NEXT_PUBLIC_ADDRESS_REGION?.trim() ?? "",
    postalCode: process.env.NEXT_PUBLIC_ADDRESS_POSTAL?.trim() ?? "",
    country: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY?.trim() ?? "",
  },
  tagline: "Fast • Reliable • Worldwide Shipping",
  description:
    "Shirwell Shipping — track shipments, book sea/air/land freight, estimate rates, and manage logistics online with clear guides and customer support.",
  keywords: [
    "Shirwell Shipping",
    "shirwell shipping",
    "shipping",
    "shipping company",
    "shipping services",
    "track shipping",
    "track shipment",
    "freight shipping",
    "sea shipping",
    "air shipping",
    "land shipping",
    "international shipping",
    "domestic shipping",
    "logistics shipping",
    "courier shipping",
    "e-commerce shipping",
    "freight forwarding",
    "shipping rate calculator",
  ],
};

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatAddress(): string {
  const { line1, city, region, postalCode, country } = siteConfig.address;
  if (!line1) return "";
  return [line1, city, [region, postalCode].filter(Boolean).join(" "), country]
    .filter(Boolean)
    .join(", ");
}

export function hasPhysicalAddress(): boolean {
  return Boolean(siteConfig.address.line1.trim());
}
