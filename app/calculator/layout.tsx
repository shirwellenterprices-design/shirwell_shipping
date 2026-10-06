import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rate Calculator",
  description:
    "Calculate estimated shipping rates for sea, air, and land freight with Shirwell Shipping. Instant quotes based on weight and dimensions.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Rate Calculator | Shirwell Shipping",
    description: "Get an estimated freight rate instantly with Shirwell Shipping.",
    url: "/calculator",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
