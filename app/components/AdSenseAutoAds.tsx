"use client";

import { useEffect } from "react";
import { adsenseConfig } from "@/lib/adsense";
import { getStoredConsent } from "@/app/components/CookieConsent";

/**
 * Signals to AdSense Auto ads that the page is ready.
 * Auto ad placement is still controlled in the AdSense console — enabling it
 * there causes additional units to appear automatically between content.
 */
export default function AdSenseAutoAds() {
  useEffect(() => {
    if (!adsenseConfig.clientId) return;
    try {
      const nonPersonalized = getStoredConsent() === "rejected" ? 1 : 0;
      const w = window as typeof window & {
        adsbygoogle?: Array<Record<string, unknown>> & { requestNonPersonalizedAds?: number };
      };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.requestNonPersonalizedAds = nonPersonalized;
      // Enables Auto ads if turned on in the AdSense console
      w.adsbygoogle.push({
        google_ad_client: adsenseConfig.clientId,
        enable_page_level_ads: true,
        overlays: { bottom: true },
      });
    } catch {
      // Suppress push errors when script loads slowly
    }
  }, []);

  return null;
}
