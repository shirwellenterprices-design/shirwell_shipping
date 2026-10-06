export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  readingMinutes: number;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-pack-for-shipping",
    title: "How to Pack Shipments So They Arrive Intact",
    description:
      "Practical packing rules for parcels and freight: cartons, cushioning, seals, labels, and common mistakes that cause damage claims.",
    updated: "July 21, 2026",
    readingMinutes: 9,
    sections: [
      {
        heading: "Why packing quality matters",
        paragraphs: [
          "Most transit damage is preventable. Carriers and freight partners move thousands of packages every day, and shipments are stacked, sorted, and transferred between hubs. Weak cartons, loose contents, and missing labels turn a routine delivery into a claim.",
          "Whether you ship a single e-commerce order or a multi-carton freight booking, the goal is the same: protect the product, keep the outer package intact, and make identification easy at every handoff.",
        ],
      },
      {
        heading: "Choose the right outer packaging",
        paragraphs: [
          "Match packaging strength to freight mode and journey length. Domestic ground parcels can often travel in a solid single-wall carton. International sea freight and multi-hub routes usually need heavier board, double-wall cartons, or crates for heavier goods.",
        ],
        bullets: [
          "Use new or undamaged cartons rated for the weight you are shipping.",
          "Do not reuse cartons that are soft, crushed, wet, or already heavily taped.",
          "Leave a small buffer of space for cushioning — do not force items into a too-small box.",
          "For irregular or high-value freight, ask about crates, pallets, or stretch-wrap options before booking.",
        ],
      },
      {
        heading: "Cushion and immobilize contents",
        paragraphs: [
          "Damage often happens when items rattle inside the carton. Fill voids so nothing can shift during transit. Fragile items need layers of protection on every side, not only on top.",
        ],
        bullets: [
          "Wrap fragile pieces individually before placing them in the carton.",
          "Use bubble wrap, foam, kraft paper, or air pillows to fill empty space.",
          "Keep heavy items at the bottom and lighter items above them.",
          "Separate items that could scratch or puncture each other.",
          "Shake the closed carton gently — if you hear movement, add more fill.",
        ],
      },
      {
        heading: "Seal, label, and document",
        paragraphs: [
          "A strong seal keeps the carton closed through sorting equipment. Clear labeling reduces misroutes. Complete paperwork speeds customs and delivery for international shipments.",
        ],
        bullets: [
          "Seal all seams with quality packing tape in an H-pattern on top and bottom.",
          "Place the shipping label on a flat face — never over a seam or around a corner.",
          "Remove old barcodes and address labels from reused boxes.",
          "Mark Fragile only when contents truly need careful handling; overusing the mark reduces its effect.",
          "Include a commercial invoice and packing list for cross-border freight as required.",
        ],
      },
      {
        heading: "Special cases: liquids, electronics, and apparel",
        paragraphs: [
          "Liquids need leak-proof primary containers, absorbent material, and a sealed secondary bag or liner. Electronics benefit from anti-static wrap and firm immobilization so connectors are not stressed. Apparel can compress, but keep moisture barriers in humid routes and avoid sharp hangers that puncture cartons.",
          "If you are unsure whether an item needs special packing, contact support before you book. A short conversation is cheaper than a damaged delivery.",
        ],
      },
      {
        heading: "Quick packing checklist before you book",
        paragraphs: [
          "Run through this list once the carton is closed and labeled:",
        ],
        bullets: [
          "Outer carton is dry, rigid, and sized correctly.",
          "Contents cannot shift when the carton is tilted.",
          "Seams are fully taped; label is readable and flat.",
          "Weight and dimensions match what you will enter in the rate calculator or booking form.",
          "Restricted or prohibited items are not included.",
        ],
      },
    ],
  },
  {
    slug: "customs-basics-for-shippers",
    title: "Customs Basics for International Shippers",
    description:
      "What commercial invoices, HS codes, and declared values mean, and how to avoid common customs delays on international freight.",
    updated: "July 21, 2026",
    readingMinutes: 10,
    sections: [
      {
        heading: "What customs actually checks",
        paragraphs: [
          "Customs authorities decide whether goods may enter a country, what duties or taxes apply, and whether paperwork is complete. Delays usually come from incomplete descriptions, missing invoices, undervalued declarations, or restricted products — not from tracking systems alone.",
          "As a shipper, your job is accurate paperwork and honest product descriptions. Carriers and freight partners move cargo; they cannot invent missing commercial details for you.",
        ],
      },
      {
        heading: "Commercial invoice essentials",
        paragraphs: [
          "A commercial invoice is the primary document for most business shipments. It should clearly identify seller, buyer, and goods so customs can classify and value the shipment.",
        ],
        bullets: [
          "Full shipper and consignee names, addresses, and contact details.",
          "Clear item descriptions (what the goods are, materials, intended use when helpful).",
          "Quantities, unit values, and total value in a stated currency.",
          "Country of origin for the goods.",
          "Incoterms or shipping terms when used in your sales contract.",
          "Reason for export (sale, sample, return, gift) when required.",
        ],
      },
      {
        heading: "HS codes and product classification",
        paragraphs: [
          "Harmonized System (HS) codes classify products for duty calculation. Using a vague description like “parts” or “goods” invites questions. Prefer specific names: “cotton T-shirts, knitted,” “laptop computers,” “ceramic tableware.”",
          "If you ship the same catalog repeatedly, keep a small internal list of preferred descriptions and codes so every booking stays consistent. Consistency reduces rework and inspection risk.",
        ],
      },
      {
        heading: "Declared value and undervaluation risks",
        paragraphs: [
          "Declare the true transaction value. Undervaluing goods to reduce duties can lead to seizure, fines, or blocked future shipments. Overvaluing can inflate duties and insurance complexity. Match the invoice to your sales records.",
          "For samples or gifts, still describe items accurately and follow destination rules for low-value or sample shipments. Rules differ by country.",
        ],
      },
      {
        heading: "Common reasons customs holds shipments",
        paragraphs: [
          "Most holds are paperwork or compliance issues:",
        ],
        bullets: [
          "Missing or incomplete commercial invoice.",
          "Descriptions that do not match the physical goods.",
          "Restricted or regulated products without permits.",
          "Address or consignee details that cannot be verified.",
          "Duty or tax payment issues at destination.",
        ],
      },
      {
        heading: "How Shirwell Shipping helps you prepare",
        paragraphs: [
          "Before you book an international shipment, gather invoice data, confirm the consignee can receive and clear goods, and check whether your product category needs special licenses. Use our booking tools for the logistics leg, and contact support early if your goods are regulated (food, chemicals, batteries, medical devices, and similar categories).",
          "Customs laws vary by country and change over time. This guide is educational, not legal advice. For complex freight, work with a licensed customs broker in the destination market.",
        ],
      },
    ],
  },
  {
    slug: "sea-vs-air-freight",
    title: "Sea Freight vs Air Freight: How to Choose",
    description:
      "Compare cost, speed, capacity, and risk so you can pick sea or air freight for the right shipment — with land freight notes for regional moves.",
    updated: "July 21, 2026",
    readingMinutes: 8,
    sections: [
      {
        heading: "Start with urgency, size, and budget",
        paragraphs: [
          "Sea and air freight solve different problems. Air wins on speed and is often better for high-value, time-sensitive, or lightweight cargo. Sea wins on cost per kilogram for larger volumes when transit time can stretch to weeks.",
          "Land freight (road or rail) fills regional and domestic needs where door-to-door trucking or scheduled rail makes more sense than an ocean or airport handoff.",
        ],
      },
      {
        heading: "When sea freight is the better fit",
        paragraphs: [
          "Choose sea freight when you can plan ahead and volume matters:",
        ],
        bullets: [
          "Larger cartons, pallets, or container-level quantities.",
          "Products with stable demand where inventory can wait.",
          "Shipments where freight cost would dominate margins on air rates.",
          "Goods that are not extremely time-sensitive (seasonal stock, bulk materials, furniture).",
        ],
      },
      {
        heading: "When air freight is the better fit",
        paragraphs: [
          "Choose air freight when time or value outweighs the higher rate:",
        ],
        bullets: [
          "Urgent replenishment, samples for a deadline, or launch inventory.",
          "High-value electronics or components where capital locked in transit is costly.",
          "Lightweight parcels where air premiums stay reasonable.",
          "Routes where ocean transit plus inland legs would miss a customer commitment.",
        ],
      },
      {
        heading: "Cost drivers beyond the base rate",
        paragraphs: [
          "Your invoice is rarely only “freight.” Fuel surcharges, handling, documentation, inland pickup or delivery, and storage at hubs can change the total. Dimensional weight (how much space cargo occupies) often matters more on air shipments than many first-time shippers expect.",
          "Use the rate calculator with realistic weight and dimensions, then treat the estimate as planning guidance. Final pricing may adjust after actual measurement and any accessorial services you request.",
        ],
      },
      {
        heading: "Risk, reliability, and planning tips",
        paragraphs: [
          "Ocean schedules can face weather, port congestion, and vessel rollovers. Air capacity can tighten around holidays and peak seasons. Build buffer days into customer promises either way.",
          "If you regularly ship the same lane, compare historical transit times and total landed cost — not only the cheapest spot quote. Consistency often beats a one-time bargain that arrives late.",
        ],
      },
      {
        heading: "A simple decision framework",
        paragraphs: [
          "Ask three questions before you book:",
        ],
        bullets: [
          "What is the latest acceptable arrival date?",
          "What is the cargo size and value?",
          "Would a cheaper slower mode still protect margin and customer trust?",
        ],
      },
    ],
  },
  {
    slug: "tracking-tips",
    title: "Shipment Tracking Tips That Reduce Stress",
    description:
      "How to read tracking statuses, what “in transit” really means, when to wait, and when to contact support about a delay.",
    updated: "July 21, 2026",
    readingMinutes: 8,
    sections: [
      {
        heading: "Save your tracking code immediately",
        paragraphs: [
          "Your tracking code is the key to status updates, map progress, and support conversations. Save it from the booking confirmation email and store it with your order number or invoice reference.",
          "On Shirwell Shipping, open the Track page, enter the code, and keep the link bookmarked while the shipment is active. Share the same code with your customer or warehouse team so everyone sees one source of truth.",
        ],
      },
      {
        heading: "How to read common statuses",
        paragraphs: [
          "Statuses describe milestones, not minute-by-minute GPS for every second of the journey. Gaps between scans are normal when cargo is on a vessel, aircraft, or long-haul truck.",
        ],
        bullets: [
          "Booked / Label created — shipment exists in the system but may not have been handed over yet.",
          "Picked up / Received at hub — the network has physical custody.",
          "In transit — moving between locations; scan frequency varies by mode.",
          "Customs / Clearance — paperwork or authority review may temporarily pause movement.",
          "Out for delivery / At destination hub — final leg is underway or imminent.",
          "Delivered — confirmed handoff or completion event.",
        ],
      },
      {
        heading: "When silence is normal vs when to escalate",
        paragraphs: [
          "Long ocean legs and some air transfers can go days without a new public scan. That alone is not proof of a problem. Escalate when the estimated window has clearly passed, a status looks stuck far beyond typical lane times, address details look wrong, or delivery was marked complete but goods are missing.",
          "Before contacting support, gather the tracking code, booking reference, shipper and consignee names, and the last status you saw. Faster context means faster help.",
        ],
      },
      {
        heading: "Help your delivery succeed",
        paragraphs: [
          "Many “failed delivery” events are local: incomplete addresses, closed businesses, secure buildings without access instructions, or phone numbers that do not ring. Confirm the destination contact can answer during delivery windows.",
        ],
        bullets: [
          "Use a complete street address, unit/suite, city, region, and postal code.",
          "Add gate codes or receiving hours in booking notes when available.",
          "Keep the destination phone number current.",
          "For businesses, confirm the receiving dock accepts freight of your size.",
        ],
      },
      {
        heading: "Track once, act deliberately",
        paragraphs: [
          "Refreshing tracking every few minutes rarely changes the outcome and can create unnecessary anxiety. Check at natural milestones — after pickup, mid-transit, and near the estimated arrival — then act if something is clearly off.",
          "Our notifications and account shipment list help you monitor multiple consignments without juggling screenshots. For recurring freight, standardize how your team records tracking codes in your own order system.",
        ],
      },
    ],
  },
  {
    slug: "dimensional-weight-explained",
    title: "Dimensional Weight Explained (And How to Lower Shipping Cost)",
    description:
      "Learn how dimensional weight works, why light bulky boxes cost more, and how to pack smarter before you use the rate calculator.",
    updated: "July 21, 2026",
    readingMinutes: 9,
    sections: [
      {
        heading: "Actual weight vs dimensional weight",
        paragraphs: [
          "Carriers bill based on the greater of actual weight and dimensional (volumetric) weight. A large, light box of pillows can cost more than a small, dense box of metal parts because it occupies more vehicle or aircraft space.",
          "Dimensional weight is calculated from length × width × height divided by a dim divisor (the exact divisor can vary by service). The result is compared with the scale weight; you typically pay for the higher figure.",
        ],
      },
      {
        heading: "Why this surprises first-time shippers",
        paragraphs: [
          "Online shopping trained many people to think only in kilograms. Freight networks think in both mass and cube. If your packaging is oversized for the product, you pay to move empty air.",
          "Always measure the finished outer carton after packing — not the product alone. Tape, void fill, and oversized boxes change billable dimensions.",
        ],
      },
      {
        heading: "How to measure accurately",
        paragraphs: [
          "Measure the longest points on each axis of the closed package. Round up according to the rules used at booking time if your process requires it, and be consistent across quotes and final labels.",
        ],
        bullets: [
          "Measure length, width, and height of the outer carton in centimeters or inches as required by the form.",
          "Include bulges — soft packs that expand still occupy space.",
          "Weigh on a calibrated scale after packing is complete.",
          "Enter the same numbers in the rate calculator that you will use on the booking.",
        ],
      },
      {
        heading: "Practical ways to reduce billable weight",
        paragraphs: [
          "You do not need exotic packaging science — just discipline:",
        ],
        bullets: [
          "Right-size the carton; avoid “one big box for everything” when two tighter cartons bill less.",
          "Compress soft goods carefully without crushing products that can crease or break.",
          "Use efficient void fill instead of oversized cartons stuffed with paper.",
          "Remove unnecessary retail packaging when it is safe and allowed for the product type.",
          "For freight, ask whether palletization or consolidation improves the total landed cost.",
        ],
      },
      {
        heading: "Using Shirwell’s rate calculator wisely",
        paragraphs: [
          "The rate calculator is most useful when inputs are honest. Understating dimensions to get a lower estimate creates friction later when the shipment is reweighed or remeasured. Overstating everything “just in case” can hide cheaper options.",
          "Run two scenarios when you are unsure: current packaging versus a tighter carton. The difference often pays for better boxes many times over across a month of orders.",
        ],
      },
      {
        heading: "Key takeaway",
        paragraphs: [
          "Billable weight is a space-and-mass decision. Pack to protect the product, then trim empty volume. That habit lowers cost without gambling on undervalued paperwork or unsafe packaging.",
        ],
      },
    ],
  },
  {
    slug: "ecommerce-shipping-checklist",
    title: "E-commerce Shipping Checklist for Growing Stores",
    description:
      "A practical checklist for online sellers: packaging standards, SLAs, tracking communication, returns planning, and peak-season readiness.",
    updated: "July 21, 2026",
    readingMinutes: 10,
    sections: [
      {
        heading: "Treat shipping as part of the product",
        paragraphs: [
          "Customers judge your store by unboxing and arrival time as much as by the item itself. Late, damaged, or silent shipments drive refunds and bad reviews even when the product is excellent.",
          "Build a simple shipping standard that every order follows. Consistency beats heroic one-off fixes.",
        ],
      },
      {
        heading: "Pre-fulfillment checklist",
        paragraphs: [
          "Before an order is packed:",
        ],
        bullets: [
          "Confirm address completeness and flag high-risk destinations early.",
          "Verify stock, variants, and gift notes.",
          "Choose service level based on the promise shown at checkout.",
          "Print or assign tracking only when the package is ready to hand over.",
        ],
      },
      {
        heading: "Packaging and brand presentation",
        paragraphs: [
          "Protect first, brand second. A beautiful mailer that arrives crushed costs more than a plain sturdy carton. Still, a clean pack-out with a packing slip and clear return guidance builds trust.",
          "Standardize carton sizes for your top SKUs so staff pack faster and dimensional weight stays predictable.",
        ],
      },
      {
        heading: "Customer communication that prevents tickets",
        paragraphs: [
          "Send tracking as soon as the shipment is in the network. Tell customers what “in transit” means for your typical lanes. If a delay is known, message early with a revised window rather than waiting for angry inbox mail.",
          "Link buyers to a public track page and keep support macros ready for common questions: where is my order, customs delay, wrong address, damaged on arrival.",
        ],
      },
      {
        heading: "Returns and failed deliveries",
        paragraphs: [
          "Decide in advance who pays return freight, how long buyers have to report damage, and what photos you need for claims. Publish the policy; do not invent it per ticket.",
          "Failed deliveries should trigger a clear retry or pickup process. Outdated phone numbers and incomplete apartment fields are still among the top preventable causes.",
        ],
      },
      {
        heading: "Peak season and growth readiness",
        paragraphs: [
          "Before major sales events, stress-test packing capacity, label printing, and pickup cutoffs. Pre-kit cartons and void fill. Extend promised transit windows slightly if your operation cannot absorb a volume spike safely.",
          "As volume grows, review whether parcel, consolidated freight, or a mix serves each SKU family better. Shirwell’s booking, tracking, and rate tools help you compare options as your catalog and lanes evolve.",
        ],
      },
    ],
  },
  {
    slug: "restricted-and-prohibited-items",
    title: "Restricted and Prohibited Items: What Not to Ship",
    description:
      "High-level guidance on common restricted categories, why rules exist, and how to check before you book a shipment.",
    updated: "July 21, 2026",
    readingMinutes: 8,
    sections: [
      {
        heading: "Why restrictions exist",
        paragraphs: [
          "Airlines, ocean lines, trucking networks, and destination countries restrict items that create safety, security, legal, or environmental risk. Shipping a banned item can stop your cargo, create fines, and endanger handlers.",
          "This guide is a practical overview, not a complete legal list. Rules differ by mode, carrier policy, and destination. When in doubt, ask before you pack.",
        ],
      },
      {
        heading: "Categories that often need extra scrutiny",
        paragraphs: [
          "These categories frequently require permits, special packing, or are banned on some services:",
        ],
        bullets: [
          "Lithium batteries and devices containing them (especially damaged or loose cells).",
          "Flammable liquids, aerosols, and many chemicals.",
          "Compressed gases and pressurized containers.",
          "Perishable foods and agricultural products without proper clearance.",
          "Alcohol, tobacco, and other heavily regulated consumer goods.",
          "Weapons, replicas, and certain dual-use goods.",
          "Pharmaceuticals and medical devices without documentation.",
          "Cash, bullion, and some high-value negotiable instruments on standard services.",
        ],
      },
      {
        heading: "Counterfeit and intellectual property risks",
        paragraphs: [
          "Do not ship counterfeit branded goods. Customs agencies actively target IP violations. Seizure risk is high, and it can affect your ability to ship future consignments.",
          "If you are a reseller, keep proof of authenticity and legitimate supply chain documents for branded inventory.",
        ],
      },
      {
        heading: "How to stay compliant in practice",
        paragraphs: [
          "Build a simple intake question for every new SKU: “Can this legally travel by the mode I want, to the countries I sell?” Keep answers with your product records.",
        ],
        bullets: [
          "Read destination import rules for regulated categories.",
          "Declare contents accurately — never hide restricted goods inside ordinary descriptions.",
          "Use required UN markings and packing instructions when applicable for dangerous goods (via qualified specialists).",
          "Contact Shirwell support early for unusual cargo instead of discovering a refusal at handover.",
        ],
      },
      {
        heading: "If a shipment is refused",
        paragraphs: [
          "If a restricted item is identified, the shipment may be returned, held, or disposed of according to applicable rules. Costs and delays are usually the shipper’s responsibility when undeclared or non-compliant goods cause the issue.",
          "Treat a refusal as a process failure to fix: update your SKU rules so the same item is not booked again on an incompatible service.",
        ],
      },
    ],
  },
  {
    slug: "freight-booking-checklist",
    title: "Freight Booking Checklist: From Quote to Handover",
    description:
      "Step-by-step checklist to book freight with fewer errors: cargo details, contacts, documents, pickup readiness, and post-booking tracking.",
    updated: "July 21, 2026",
    readingMinutes: 9,
    sections: [
      {
        heading: "Before you open the booking form",
        paragraphs: [
          "Good bookings start with prepared data. Guessing weight, dimensions, or addresses creates rework and can change pricing after the cargo is measured.",
        ],
        bullets: [
          "Final packed weight and outer dimensions for each piece.",
          "Number of cartons or pallets and whether cargo is stackable.",
          "Ready date and preferred service level (sea, air, or land).",
          "Full shipper and consignee details, including phone numbers.",
          "Commercial invoice draft for international moves.",
        ],
      },
      {
        heading: "Estimate, then book",
        paragraphs: [
          "Use the rate calculator to compare rough cost and choose a mode. When you are ready, complete the booking with the same cargo facts. Mismatched calculator and booking inputs are a common source of surprise invoices.",
          "Add special instructions that matter operationally: liftgate needs, limited access locations, appointment delivery, or fragile handling notes.",
        ],
      },
      {
        heading: "Documents and compliance",
        paragraphs: [
          "Attach or prepare documents required for the lane. International shipments typically need a commercial invoice and may need packing lists, certificates, or permits depending on the goods.",
          "Confirm the consignee knows a shipment is coming and can receive it. Surprises at destination create storage fees and failed delivery loops.",
        ],
      },
      {
        heading: "Pickup and handover day",
        paragraphs: [
          "Have cargo packed, labeled, and accessible at the agreed time. If something changes — count, weight, or readiness — update support before pickup rather than after a driver arrives.",
        ],
        bullets: [
          "Labels match the booking references.",
          "Pieces are counted and easy to load.",
          "Restricted items were screened out.",
          "Someone on-site can sign and answer questions.",
        ],
      },
      {
        heading: "After booking: monitor and close the loop",
        paragraphs: [
          "Save the tracking code, watch early scans to confirm the network received the cargo, and share status with your customer or receiving team. When delivery completes, reconcile any accessorial charges against what you requested.",
          "For recurring lanes, keep a short playbook: standard carton sizes, default documents, and preferred contacts. Booking becomes faster and error rates drop.",
        ],
      },
      {
        heading: "Need help mid-booking?",
        paragraphs: [
          "If cargo is unusual, regulated, or time-critical, contact Shirwell Shipping before you finalize. A five-minute check on mode choice and paperwork often saves days of delay later.",
        ],
      },
    ],
  },
];

/** Tracking status guide */
const trackingStatusGuide: Guide = {
  slug: "tracking-status-explained",
  title: "Tracking Status Explained: What Every Shipment Update Means",
  description:
    "Demystify shipment tracking events — from booking confirmed to delivered — and know exactly when to act if something looks wrong.",
  updated: "August 14, 2026",
  readingMinutes: 10,
  sections: [
    {
      heading: "Why tracking updates can be confusing",
      paragraphs: [
        "Shipment tracking systems log events as cargo passes through hubs, customs, and carriers. Each status is generated by a scan or a system update from a different party in the chain. Because multiple carriers and customs agencies feed into a single tracking page, the same physical event can produce different status labels depending on who scanned it.",
        "Understanding what each status actually means helps you decide whether everything is on track, whether you need to take action, or whether it's time to contact support.",
      ],
    },
    {
      heading: "Pre-shipment statuses",
      paragraphs: [
        "These statuses appear before the carrier physically accepts the cargo.",
      ],
      bullets: [
        "Booking confirmed / label created — The booking is registered in the system and a tracking number has been assigned. The carrier has not yet scanned or accepted the parcel.",
        "Awaiting pickup — The shipment is waiting for a carrier agent or driver to collect it from the sender's address or drop-off point.",
        "Pickup scheduled — A collection appointment is booked. The shipment is still at the origin.",
        "Handed to carrier — The sender has physically passed the parcel to the carrier. This is often the first scan that updates in real time.",
      ],
    },
    {
      heading: "In-transit statuses",
      paragraphs: [
        "Once cargo is moving, you will see a sequence of hub and transfer events.",
      ],
      bullets: [
        "Departed origin facility — The cargo has left the first sorting hub or depot and is moving toward the next point in the route.",
        "In transit — A general status used when cargo is between scans. Long gaps here (especially for sea freight) are normal.",
        "Arrived at hub / sorting facility — The shipment has reached an intermediate depot for onward sorting.",
        "Transfer to next carrier — For international or multi-leg routes, cargo moves between carriers. Status may pause for several hours while records are updated.",
        "Customs clearance initiated — The shipment has reached the destination country border and customs processing has begun.",
        "Cleared customs / released by customs — Duties assessed, paperwork accepted. The shipment is handed back to the carrier for final delivery.",
        "Held by customs — Action is required. Check your email for a customs notice. Common causes: missing invoice, undeclared value, or a restricted item.",
        "Out for delivery — The package is on a local delivery vehicle and should arrive today.",
      ],
    },
    {
      heading: "Delivery and post-delivery statuses",
      paragraphs: [
        "Final-mile events confirm the outcome of the delivery attempt.",
      ],
      bullets: [
        "Delivered — The carrier has confirmed delivery. Check the timestamp and, if available, the delivery note or photo.",
        "Delivery attempted — Nobody was available. The carrier will usually leave a notice and retry or hold the parcel for collection.",
        "Returned to sender — The shipment could not be delivered and is going back. Common causes: wrong address, unclaimed parcel, refused delivery.",
        "Exception / delivery exception — A non-standard event: damaged packaging, address problem, or carrier issue. Contact support with your tracking number.",
      ],
    },
    {
      heading: "When should you be concerned?",
      paragraphs: [
        "Not every long gap means a problem. Sea freight between major ports can go 10–20 days without a new scan. Air freight clearing busy hubs can show nothing for 24–48 hours.",
        "Act if any of the following apply:",
      ],
      bullets: [
        "The status has not changed and the estimated delivery window has clearly passed by more than 2–3 days.",
        "The status shows 'held by customs' — you will need to supply documents or pay duties.",
        "The status shows 'returned to sender' — contact support to arrange redelivery before the return is processed.",
        "The status shows 'delivered' but the recipient confirms nothing arrived — file a missing delivery query within 24 hours.",
        "You see a delivery exception with no follow-up scan in 48 hours.",
      ],
    },
    {
      heading: "How to contact support effectively",
      paragraphs: [
        "When you reach out about a stuck shipment, include your tracking number, the booking reference, the last status shown, and the date it was last updated. This allows the team to locate the shipment quickly without a back-and-forth.",
        "For customs holds, also attach a copy of your commercial invoice and any permits for the goods. Customs queries are often resolved faster when complete documentation is ready to forward.",
      ],
    },
    {
      heading: "Tips for sharing tracking with recipients",
      paragraphs: [
        "Share the full tracking URL rather than just the code. Recipients without a shipping account can view status directly. Set expectations before you send — if delivery is sea freight and will take 3 weeks, say so. Surprise delays feel worse than expected ones.",
        "Consider adding a shipment note or simple text message when the shipment is booked, so the recipient knows what to look for and who to call if they have questions.",
      ],
    },
  ],
};

guides.push(trackingStatusGuide);

/** Canonical slug aliases — 404-safe redirects for linked slugs */
const SLUG_ALIASES: Record<string, string> = {
  "ecommerce-shipping-guide": "ecommerce-shipping-checklist",
  "booking-checklist": "freight-booking-checklist",
};

export function getGuide(slug: string): Guide | undefined {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  return guides.find((g) => g.slug === canonical);
}

export function getAllGuideSlugs(): string[] {
  return [...guides.map((g) => g.slug), ...Object.keys(SLUG_ALIASES)];
}
