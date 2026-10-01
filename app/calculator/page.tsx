"use client";

import AppPageHeader from "@/app/components/ui/AppPageHeader";
import AppShell from "@/app/components/ui/AppShell";
import { AppInput, AppSelect } from "@/app/components/ui/AppInput";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import InContentAd from "@/app/components/InContentAd";
import ToolPageHelp from "@/app/components/ToolPageHelp";
import { MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";

const TYPE_OPTIONS = [
  { value: "sea", label: "Sea Freight" },
  { value: "air", label: "Air Freight" },
  { value: "land", label: "Land Freight" },
];

const RATES: Record<string, number> = {
  sea: 12.5,
  air: 48,
  land: 18,
};

export default function RateCalculatorPage() {
  const [rate, setRate] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<{
    base: number;
    fuel: number;
    handling: number;
    other: number;
  } | null>(null);
  const [type, setType] = useState("sea");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const w = Number(weight) || 0;
    const l = Number(length) || 0;
    const wi = Number(width) || 0;
    const h = Number(height) || 0;
    const volumetric = (l * wi * h) / 5000;
    const billable = Math.max(w, volumetric, 1);
    const unit = RATES[type] ?? 12.5;
    const base = Math.round(billable * unit * 100) / 100;
    const fuel = Math.round(base * 0.12 * 100) / 100;
    const handling = Math.round(base * 0.08 * 100) / 100;
    const other = Math.round(base * 0.05 * 100) / 100;
    const total = Math.round((base + fuel + handling + other) * 100) / 100;
    setBreakdown({ base, fuel, handling, other });
    setRate(total);
  }

  return (
    <AppShell narrow>
      <AppPageHeader title="Rate Calculator" backHref="/home" />

      <form onSubmit={handleSubmit} className="animate-fade-up space-y-5">
        <AppSelect
          label="From"
          name="from"
          options={[
            { value: "los-angeles", label: "Los Angeles, USA" },
            { value: "shanghai", label: "Shanghai, China" },
            { value: "tokyo", label: "Tokyo, Japan" },
            { value: "singapore", label: "Singapore" },
          ]}
          icon={<MapPin className="h-5 w-5" strokeWidth={1.75} />}
        />
        <AppSelect
          label="To"
          name="to"
          options={[
            { value: "manila", label: "Manila, Philippines" },
            { value: "cebu", label: "Cebu City, PH" },
            { value: "davao", label: "Davao, PH" },
            { value: "sydney", label: "Sydney, Australia" },
          ]}
          icon={<MapPin className="h-5 w-5" strokeWidth={1.75} />}
        />
        <AppSelect
          label="Shipment Type"
          name="type"
          options={TYPE_OPTIONS}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <AppInput
          label="Weight (kg)"
          name="weight"
          type="number"
          min="0.1"
          step="0.01"
          placeholder="0.00"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <div>
          <p className="mb-1.5 text-sm font-medium text-muted">Dimensions (cm)</p>
          <div className="grid grid-cols-3 gap-2">
            <AppInput
              name="length"
              type="number"
              min="1"
              placeholder="L"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
            <AppInput
              name="width"
              type="number"
              min="1"
              placeholder="W"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              required
            />
            <AppInput
              name="height"
              type="number"
              min="1"
              placeholder="H"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
        </div>

        <PrimaryButton type="submit">Calculate Rate</PrimaryButton>
      </form>

      {rate !== null && breakdown && (
        <div className="animate-fade-up mt-8 rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6">
          <p className="text-sm text-muted">Estimated Rate</p>
          <p className="mt-2 text-3xl font-bold text-success sm:text-4xl">
            ${rate.toFixed(2)} USD
          </p>
          <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            {[
              { label: "Base Rate", value: breakdown.base },
              { label: "Fuel Surcharge", value: breakdown.fuel },
              { label: "Handling Fee", value: breakdown.handling },
              { label: "Other Fees", value: breakdown.other },
            ].map((row) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt className="text-muted">{row.label}</dt>
                <dd className="font-medium text-foreground">${row.value.toFixed(2)}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-border pt-3">
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="font-bold text-success">${rate.toFixed(2)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Final pricing may vary based on actual weight, dimensions, customs, and
            fuel surcharges at booking.
          </p>
        </div>
      )}

      <InContentAd />

      <ToolPageHelp
        title="How shipping rates are estimated"
        intro="This calculator gives a planning estimate from mode, weight, and outer dimensions. Final invoices can differ after actual weighing, dimensional weight rules, fuel surcharges, and any customs-related services."
        blocks={[
          {
            heading: "Actual weight vs dimensional weight",
            paragraphs: [
              "Carriers usually charge the greater of actual weight and dimensional (volumetric) weight. Dimensional weight is based on length × width × height. A light but bulky carton can cost more than a dense, compact one of the same product.",
            ],
            link: {
              href: "/guides/dimensional-weight-explained",
              label: "Dimensional weight explained →",
            },
          },
          {
            heading: "What the estimate includes",
            paragraphs: [
              "Our estimate combines a base rate with illustrative fuel, handling, and other fees so you can compare modes. It is not a binding quote. Formal quotes may add terminal fees, security screening, or destination charges depending on the lane.",
            ],
          },
          {
            heading: "Tips to keep costs down",
            paragraphs: [
              "Use the smallest practical carton, remove excess void space, and measure accurately before you book. For heavy or large cargo, compare sea and land before defaulting to air. For urgent small parcels, air or courier may still be the better total cost when inventory or customer deadlines matter.",
            ],
            link: { href: "/book", label: "Book a shipment →" },
          },
        ]}
      />
    </AppShell>
  );
}
