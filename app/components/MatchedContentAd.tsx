"use client";

import AdSenseAd from "@/app/components/AdSenseAd";
import { adsenseConfig } from "@/lib/adsense";

/** Matched content / related ads (data-ad-format="autorelaxed"). */
export default function MatchedContentAd({ className = "min-h-[280px]" }: { className?: string }) {
  if (!adsenseConfig.enabled || !adsenseConfig.matchedSlot) return null;

  return (
    <section aria-label="Related content advertisement" className="overflow-hidden py-4">
      <AdSenseAd
        className={className}
        slot={adsenseConfig.matchedSlot}
        format="autorelaxed"
        fullWidthResponsive={false}
      />
    </section>
  );
}
