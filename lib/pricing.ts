export type PricingPlan = {
  slug: string;
  name: string;
  price: number;
  load: string;
  features: string[];
  featured: boolean;
  sort_order: number;
};

export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    slug: "road-freight",
    name: "Road Freight",
    price: 10,
    load: "40kg load",
    features: ["Warehousing", "Free Packaging", "24/7 Support"],
    featured: false,
    sort_order: 1,
  },
  {
    slug: "ocean-freight",
    name: "Ocean Freight",
    price: 20,
    load: "70kg load",
    features: ["Warehousing", "Free Packaging", "24/7 Support"],
    featured: true,
    sort_order: 2,
  },
  {
    slug: "air-freight",
    name: "Air Freight",
    price: 40,
    load: "40kg load",
    features: ["Warehousing", "Free Packaging", "24/7 Support"],
    featured: false,
    sort_order: 3,
  },
];

export type PricingPlanRow = {
  slug: string;
  name: string;
  price: number;
  load_label: string;
  features: string[];
  featured: boolean;
  sort_order: number;
};

/** Each plan is loaded by slug — Ocean Freight price never affects Road or Air. */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return DEFAULT_PRICING_PLANS;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pricing_plans")
      .select("*")
      .order("sort_order", { ascending: true });

    const dbBySlug = new Map(
      !error && data?.length
        ? (data as PricingPlanRow[]).map((row) => [row.slug, row])
        : [],
    );

    return DEFAULT_PRICING_PLANS.map((defaultPlan) => {
      const row = dbBySlug.get(defaultPlan.slug);
      if (!row) return defaultPlan;

      return {
        ...defaultPlan,
        name: row.name,
        price: Number(row.price),
        load: row.load_label,
        features: row.features?.length ? row.features : defaultPlan.features,
        featured: row.featured,
        sort_order: row.sort_order,
      };
    });
  } catch {
    return DEFAULT_PRICING_PLANS;
  }
}

export async function getPricingPlan(slug: string): Promise<PricingPlan | null> {
  const plans = await getPricingPlans();
  return plans.find((plan) => plan.slug === slug) ?? null;
}
