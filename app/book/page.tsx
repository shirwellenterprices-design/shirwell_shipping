"use client";

import AppPageHeader from "@/app/components/ui/AppPageHeader";
import AppShell from "@/app/components/ui/AppShell";
import { AppInput, AppTextarea } from "@/app/components/ui/AppInput";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import InContentAd from "@/app/components/InContentAd";
import ToolPageHelp from "@/app/components/ToolPageHelp";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const SHIPMENT_TYPES = ["Sea Freight", "Air Freight", "Land Freight"] as const;

export default function BookShipmentPage() {
  const router = useRouter();
  const [type, setType] = useState<(typeof SHIPMENT_TYPES)[number]>("Sea Freight");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/shipments");
  }

  return (
    <AppShell narrow>
      <AppPageHeader title="Book a Shipment" backHref="/home" />

      <form onSubmit={handleSubmit} className="animate-fade-up space-y-5">
        <div>
          <p className="mb-2 text-sm font-medium text-muted">Shipment Type</p>
          <div className="grid grid-cols-3 gap-2">
            {SHIPMENT_TYPES.map((option) => {
              const active = type === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setType(option)}
                  className={`rounded-xl border px-2 py-2.5 text-center text-xs font-semibold transition-colors sm:text-sm ${
                    active
                      ? "border-gold bg-gold text-black"
                      : "border-border bg-surface-elevated text-foreground hover:bg-[#2a2a2a]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <AppInput
          label="From"
          name="from"
          placeholder="Origin city / port"
          required
          icon={<MapPin className="h-5 w-5" strokeWidth={1.75} />}
        />
        <AppInput
          label="To"
          name="to"
          placeholder="Destination city / port"
          required
          icon={<MapPin className="h-5 w-5" strokeWidth={1.75} />}
        />
        <AppTextarea
          label="Cargo Details"
          name="cargo"
          placeholder="Description of Goods"
          required
        />
        <AppInput
          label="Weight (kg)"
          name="weight"
          type="number"
          min="0.1"
          step="0.01"
          placeholder="0.00"
          required
        />

        <div>
          <p className="mb-1.5 text-sm font-medium text-muted">Dimensions (cm)</p>
          <div className="grid grid-cols-3 gap-2">
            <AppInput name="length" type="number" min="1" placeholder="L" required />
            <AppInput name="width" type="number" min="1" placeholder="W" required />
            <AppInput name="height" type="number" min="1" placeholder="H" required />
          </div>
        </div>

        <PrimaryButton type="submit">Continue</PrimaryButton>
      </form>

      <InContentAd />

      <ToolPageHelp
        title="How to book freight with fewer errors"
        intro="A clear booking request saves time later. Accurate origin and destination, honest cargo descriptions, and realistic weight and outer dimensions help us quote correctly and keep paperwork ready for customs when needed."
        blocks={[
          {
            heading: "Choose sea, air, or land",
            paragraphs: [
              "Sea freight usually costs less for larger or heavier cargo and takes longer. Air is better when transit time matters more than cost. Land freight fits regional and domestic routes, including palletized stock between cities.",
            ],
            link: {
              href: "/guides/sea-vs-air-freight",
              label: "Compare freight modes →",
            },
          },
          {
            heading: "What to prepare before you submit",
            paragraphs: [
              "Gather the receiving party’s full name, phone, and delivery address. Measure the outer carton or pallet in centimetres. Weigh the packed shipment. For international moves, draft a commercial invoice with clear product descriptions and declared values.",
            ],
            bullets: [
              "Origin and destination cities or ports",
              "Cargo description (avoid vague labels like “electronics”)",
              "Actual weight in kilograms",
              "Outer length, width, and height",
              "Any special handling needs (fragile, perishable, batteries)",
            ],
            link: {
              href: "/guides/freight-booking-checklist",
              label: "Full booking checklist →",
            },
          },
          {
            heading: "After you book",
            paragraphs: [
              "You will receive a tracking code once the booking is registered. Share that link with the receiving party, pack to the standard in our packing guide, and keep invoices ready if the shipment crosses a border.",
            ],
            link: {
              href: "/guides/how-to-pack-for-shipping",
              label: "Packing guide →",
            },
          },
        ]}
      />
    </AppShell>
  );
}
