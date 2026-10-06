import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Shipments",
  robots: { index: false, follow: false },
};

export default function ShipmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
