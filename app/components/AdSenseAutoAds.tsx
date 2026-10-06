"use client";

import { useEffect } from "react";
import { adsenseConfig } from "@/lib/adsense";
import { getStoredConsent } from "@/app/components/CookieConsent";

declare global {
  interface Window {
    __shirwellPageLevelAdsInit?: boolean;
  }
}

/**
 * Signals to AdSense Auto ads that the page is ready.
 * Auto ad placement is still controlled in the AdSense console — enabling it
 * there causes additional units to appear automatically between content.
 */
export default function AdSenseAutoAds() {
  useEffect(() => {
    if (!adsenseConfig.clientId) return;
    if (typeof window !== "undefined" && window.__shirwellPageLevelAdsInit) return;
    window.__shirwellPageLevelAdsInit = true;

    try {
      const nonPersonalized = getStoredConsent() === "rejected" ? 1 : 0;
      const w = window as typeof window & {
        adsbygoogle?: Array<Record<string, unknown>> & { requestNonPersonalizedAds?: number };
      };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.requestNonPersonalizedAds = nonPersonalized;
      w.adsbygoogle.push({
        google_ad_client: adsenseConfig.clientId,
        enable_page_level_ads: true,
        overlays: { bottom: true },
      });
    } catch {
      // Already initialized via AdSense console Auto ads or a prior push
    }
  }, []);

  return null;
}
