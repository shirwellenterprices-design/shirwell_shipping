import AdSenseAd from "@/app/components/AdSenseAd";
import ShipmentTimeline from "@/app/components/ShipmentTimeline";
import TrackingMap from "@/app/components/TrackingMap";
import TrackingSummaryCard from "@/app/components/TrackingSummaryCard";
import ToolPageHelp from "@/app/components/ToolPageHelp";
import AppPageHeader from "@/app/components/ui/AppPageHeader";
import AppShell from "@/app/components/ui/AppShell";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import { adsenseConfig } from "@/lib/adsense";
import { getShipmentByCode } from "@/lib/shipments";
import { ScanLine } from "lucide-react";

type TrackPageProps = {
  searchParams: Promise<{ code?: string }>;
};

export const metadata = {
  title: "Track Shipping",
  description:
    "Track Shirwell Shipping deliveries in real time. Enter your shipping tracking code for live status, route progress, and delivery updates.",
  keywords: ["track shipping", "Shirwell Shipping", "track shipment", "shipping tracker"],
  alternates: { canonical: "/track" },
  openGraph: {
    title: "Track Shipping | Shirwell Shipping",
    description:
      "Track your shipping in real time with Shirwell Shipping.",
    url: "/track",
  },
};

export default async function TrackPage({ searchParams }: TrackPageProps) {
  const { code } = await searchParams;
  const trackingCode = code?.trim() ?? "";
  const shipment = trackingCode ? getShipmentByCode(trackingCode) : null;

  return (
    <AppShell narrow>
      <AppPageHeader title="Track Shipment" backHref="/home" />

      {!shipment ? (
        <div className="animate-fade-up space-y-5">
          <p className="text-muted">Enter your tracking code to view shipment status.</p>
          <form action="/track" method="get" className="space-y-4">
            <div className="relative">
              <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-muted">
                Tracking Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                placeholder="e.g. SWS123456789"
                required
                className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3.5 pr-12 text-foreground placeholder:text-muted/70 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
              <span className="pointer-events-none absolute bottom-3.5 right-3 text-gold">
                <ScanLine className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </div>
            <PrimaryButton type="submit">Track Shipment</PrimaryButton>
          </form>
          <p className="text-center text-sm text-muted">
            Try demo code{" "}
            <a href="/track?code=SWS123456789" className="font-semibold text-gold hover:underline">
              SWS123456789
            </a>
          </p>
        </div>
      ) : (
        <div className="animate-fade-up space-y-5">
          <TrackingSummaryCard shipment={shipment} />
          <ShipmentTimeline events={shipment.timeline} />
          <TrackingMap code={shipment.trackingNumber} />
          <PrimaryButton
            href={`/shipments/${shipment.id === "demo" ? "1" : shipment.id}`}
          >
            View Details
          </PrimaryButton>

          {adsenseConfig.enabled && adsenseConfig.boxAdSlot && (
            <section aria-label="Advertisement" className="overflow-hidden pt-2">
              <AdSenseAd
                className="min-h-[250px]"
                slot={adsenseConfig.boxAdSlot}
                format="rectangle"
              />
            </section>
          )}
        </div>
      )}

      <ToolPageHelp
        title="How shipment tracking works"
        intro="Enter the tracking code from your booking confirmation to see live status, timeline events, and route progress. Tracking updates come from carrier scans, hub transfers, and customs checkpoints — so long quiet periods can be normal on sea freight, while air and land usually update more often."
        blocks={[
          {
            heading: "What you will see on a tracking page",
            paragraphs: [
              "A complete tracking view usually includes the current status, origin and destination, estimated progress, and a timeline of scan events. Use the timeline to understand whether cargo is still at origin, moving between hubs, clearing customs, or out for delivery.",
            ],
            bullets: [
              "Booking confirmed / label created — recorded before pickup",
              "In transit — cargo is moving between facilities or on a vessel/aircraft",
              "Customs hold — action may be needed (documents or duties)",
              "Out for delivery / delivered — final-mile events",
            ],
            link: {
              href: "/guides/tracking-status-explained",
              label: "Full tracking status guide →",
            },
          },
          {
            heading: "When tracking looks stuck",
            paragraphs: [
              "Sea freight can go many days without a new scan during ocean legs. Act when the estimated window has clearly passed, the status shows a customs hold or exception, or delivery is marked complete but the recipient has nothing.",
              "If you need help, email support with the tracking code, last status, and the date it last changed. That context speeds up investigation.",
            ],
            link: { href: "/contact", label: "Contact support →" },
          },
          {
            heading: "Share tracking with recipients",
            paragraphs: [
              "Send the full track URL rather than only the code. Recipients can open status without an account. Set expectations early if the shipment is ocean freight or needs customs paperwork.",
            ],
            link: { href: "/faq", label: "Shipping FAQ →" },
          },
        ]}
      />
    </AppShell>
  );
}
