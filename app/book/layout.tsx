import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Shipment",
  description:
    "Book sea, air, or land freight with Shirwell Shipping. Enter origin, destination, cargo details, and continue to ship worldwide.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Shipment | Shirwell Shipping",
    description: "Book sea, air, or land freight with Shirwell Shipping.",
    url: "/book",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
