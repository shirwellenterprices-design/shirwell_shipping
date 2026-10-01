"use client";

import AdSenseAd from "@/app/components/AdSenseAd";
import { adsenseConfig } from "@/lib/adsense";

type Props = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
};

/** Shared in-content ad block for tool and content pages. */
export default function InContentAd({
  slot,
  format = "auto",
  className = "min-h-[250px]",
}: Props) {
  if (!adsenseConfig.enabled) return null;

  return (
    <section aria-label="Advertisement" className="overflow-hidden py-4">
      <AdSenseAd
        className={className}
        slot={slot ?? adsenseConfig.boxAdSlot}
        format={format}
      />
    </section>
  );
}
