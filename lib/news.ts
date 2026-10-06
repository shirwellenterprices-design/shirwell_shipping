export type NewsArticle = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  relatedGuide: { href: string; label: string };
};

export const newsArticles: NewsArticle[] = [
  {
    date: "August 14, 2026",
    title: "Peak Season Shipping: How to Prepare Before Volume Spikes",
    slug: "peak-season-shipping",
    excerpt:
      "Q4 is the highest-volume period for parcel and freight networks worldwide. Carriers reduce capacity flexibility, transit times lengthen, and last-minute bookings become expensive. The stores and shippers that navigate peak season smoothly do most of their preparation in August and September — not November.",
    body: `Peak shipping season begins earlier than most businesses expect. By the time October arrives, air freight capacity on major trade lanes is already heavily committed. Sea bookings for pre-Christmas inventory typically need to leave origin ports by early October to arrive in time for December retail dates.

The most effective preparation starts with an honest forecast. Review last year's order volumes by week and identify the three to four weeks that drove the most shipment activity. Those weeks will demand your best packaging, your most reliable carrier arrangements, and the cleanest possible address data in your system.

Carrier capacity: contact your freight partner early to discuss rate agreements and space commitments for the peak period. Spot rates on air freight can triple during peak weeks. Locking in a rate — even if volume commitments are approximate — provides cost certainty and priority access when space is tight.

Packaging: run a packaging audit in September. Check carton stock levels, tape and void-fill supplies, and whether your standard box sizes still match your current product mix. Running out of the right carton mid-peak is a simple problem with an avoidable disruption.

Tracking communication: customers send significantly more delivery enquiries during peak season. Set up automated tracking emails or SMS updates so recipients know when their order is dispatched and when it is out for delivery. Proactive communication reduces inbound support queries by 40–60% on average.

Returns: if your store sells products that are commonly gifted, plan your returns window before peak begins. A clear, accessible returns policy — visible on the checkout page — reduces customer anxiety at purchase and reduces disputes after delivery.`,
    relatedGuide: {
      href: "/guides/ecommerce-shipping-checklist",
      label: "E-commerce shipping checklist",
    },
  },
  {
    date: "August 7, 2026",
    title: "Customs Documentation: What Changed and What Still Trips Up Shippers",
    slug: "customs-documentation-2026",
    excerpt:
      "Customs requirements across major trade corridors have tightened over the past two years. Electronic advance data filing, stricter HS code validation, and enhanced de minimis thresholds are changing what shippers need to submit before cargo arrives at the border.",
    body: `The trend across most major customs authorities is toward electronic pre-arrival data — detailed cargo information submitted before the vessel or aircraft departs. In practice, this means shippers need to have their commercial invoice, packing list, HS codes, and declared values ready at the time of booking, not after cargo has departed.

HS (Harmonized System) tariff codes are under greater scrutiny. Vague descriptions are being flagged more consistently, and under-declared values are triggering more audits. Accuracy now is not just about compliance — it is about keeping your cargo moving. A query from customs on an ambiguous description can hold a shipment for five to ten business days while correspondence is exchanged.

De minimis thresholds — the value below which goods can enter without formal customs entry — have been revised downward in several major markets. Goods that previously cleared automatically may now require a formal entry with duties assessed. If you ship low-value consumer goods internationally, review the current threshold for your primary destination markets before your next booking cycle.

For regulated products — cosmetics, food supplements, electronics with wireless components, lithium batteries — the documentation requirements go beyond the commercial invoice. Permits, safety certificates, and test reports may be required to clear customs. These cannot be obtained after departure. If you are introducing a new product category into your shipping range, research the import requirements for your target markets before placing your first order.

Practical advice: maintain a master HS code list for every SKU you ship internationally. Review it annually and when product specifications change. One accurate reference document saves time on every booking and reduces the risk of a customs hold.`,
    relatedGuide: {
      href: "/guides/customs-basics-for-shippers",
      label: "Customs basics for shippers",
    },
  },
  {
    date: "July 28, 2026",
    title: "Why Your Air Freight Bill Is Higher Than the Quote — And How to Reduce It",
    slug: "air-freight-cost-differences",
    excerpt:
      "Air freight quotes and final invoices frequently differ. Dimensional weight, fuel surcharges, security surcharges, and terminal handling fees are the main culprits. Understanding how each charge is applied lets you pack smarter and compare quotes more accurately.",
    body: `The gap between an air freight estimate and a final invoice surprises many first-time shippers. The estimate reflects base rate per kilogram — but the invoice reflects the chargeable weight (which may be dimensional, not actual), plus a stack of surcharges that are standard across the industry but not always itemised in initial quotes.

Dimensional weight is the most common source of surprise. Air freight uses a divisor of 5,000 (some carriers use 6,000) to convert cubic centimetres to a chargeable kilogram. A package measuring 50 × 40 × 30 cm has a volume of 60,000 cm³ — a dimensional weight of 12 kg at a 5,000 divisor. If the actual weight is 3 kg, you are billed for 12 kg. Right-sizing packaging — using boxes matched to the contents rather than grabbing the nearest large carton — is the most direct way to reduce this.

Fuel surcharges are applied as a percentage of the base rate and vary monthly based on aviation fuel prices. A fuel surcharge of 20–35% of base rate is typical in normal market conditions; it can climb above 50% during supply disruptions. Security surcharges cover screening costs and are usually applied per kilogram.

Terminal handling charges (THC) cover the physical acceptance of cargo at the freight terminal, documentation processing, and in some cases X-ray or inspection fees. These are charged by the origin terminal, the destination terminal, or both.

To compare air freight quotes accurately, ask for an all-in rate that includes fuel surcharge, security, and any terminal handling that applies to your lane. A low base rate with high surcharges is often more expensive than a higher base rate with minimal add-ons. Our rate calculator provides estimated totals for common routes — use it as a planning reference before requesting a formal quote.`,
    relatedGuide: {
      href: "/guides/sea-vs-air-freight",
      label: "Sea vs. air freight comparison",
    },
  },
  {
    date: "July 18, 2026",
    title: "How Tracking Technology Has Changed Freight Visibility",
    slug: "freight-tracking-technology",
    excerpt:
      "A decade ago, international shipment tracking was a series of infrequent status updates from a single carrier. Today, multi-leg freight tracking pulls data from vessel AIS feeds, airline cargo systems, customs APIs, and last-mile carriers — often into a single view.",
    body: `Modern freight tracking has improved dramatically in depth and frequency, but it has also introduced complexity. A single international shipment might pass through four to six different systems before delivery — ocean carrier, transshipment port operator, customs authority, domestic freight forwarder, and last-mile carrier — each with its own data format and update frequency.

For shippers, the practical improvement is that genuine delays and exceptions surface faster. A vessel diversion that would once have appeared as a silent week with no tracking updates now shows a status change within hours as AIS (Automatic Identification System) data updates the vessel's position and estimated arrival at the next port.

For recipients, the improvement is more predictable delivery windows. End-to-end tracking with multiple scan points gives a clearer picture of where cargo is and when it will arrive, reducing the anxiety of "last seen at origin three weeks ago."

What tracking still cannot do well is explain delays caused by documentation problems. When a shipment is held for a customs query, the tracking event often shows only "held" or "exception" — it does not tell you that a missing permit or an ambiguous product description triggered the hold. For these situations, proactive shipper communication — emailing the receiver with context when you know there is an issue — still matters.

The next step in freight visibility is predictive ETA: using historical lane data and current congestion to estimate not just when cargo left the origin hub, but when it will realistically arrive at the destination, accounting for typical customs processing times and last-mile carrier performance. Some carriers already offer this on their primary lanes.`,
    relatedGuide: {
      href: "/guides/tracking-status-explained",
      label: "Tracking status explained",
    },
  },
  {
    date: "August 25, 2026",
    title: "Land Freight vs Courier: When Each Option Makes Sense",
    slug: "land-freight-vs-courier",
    excerpt:
      "Not every shipment needs air or ocean. Regional land freight and courier networks cover different use cases — cost, speed, and cargo size determine which one is the better fit.",
    body: `Land freight and courier services are often confused because both can move goods by road. The difference is scale and service model. Couriers are built for parcels and small packages with door-to-door pickup, frequent scans, and delivery windows measured in days. Land freight is built for pallets, crates, and bulkier cargo that moves between warehouses, terminals, or business addresses.

Choose courier when the shipment is under roughly 30–50 kg, fits in a carton or small box, and the recipient expects consumer-style tracking and a short transit window. Choose land freight when you are moving palletized stock, project materials, or regular replenishment between cities or countries that share a land corridor.

Cost differences are significant. Courier rates rise steeply with weight and dimensional weight. Land freight rates are usually quoted per pallet, per cubic metre, or per truckload and become more efficient as volume grows. Transit time for land freight can still be competitive on regional routes — often two to seven days depending on border crossings and scheduling.

Documentation still matters for cross-border land freight. Commercial invoices, packing lists, and consignee details are required at many land borders just as they are for air and sea. Plan paperwork before the truck leaves the origin yard.

If you are unsure which mode fits, start with our rate calculator for a rough cost band, then book a shipment request with accurate weight and dimensions so we can recommend the practical option for your lane.`,
    relatedGuide: {
      href: "/guides/freight-booking-checklist",
      label: "Freight booking checklist",
    },
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return newsArticles.map((a) => a.slug);
}
