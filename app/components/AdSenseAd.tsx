"use client";

import { adsenseConfig } from "@/lib/adsense";
import { useAdConsent } from "@/app/components/CookieConsent";
import { useEffect, useRef } from "react";

type AdSenseAdProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid" | "autorelaxed";
  layout?: string;
  className?: string;
  /** When false, omits data-full-width-responsive (needed for autorelaxed / matched content). */
  fullWidthResponsive?: boolean;
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>> & {
      requestNonPersonalizedAds?: number;
      loaded?: boolean;
    };
  }
}

function waitForAdSenseScript(timeoutMs = 12000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.adsbygoogle?.loaded || document.querySelector('script[src*="adsbygoogle.js"]')) {
      // Script tag exists; give the loader a tick to attach
      window.adsbygoogle = window.adsbygoogle || [];
      resolve(true);
      return;
    }

    const started = Date.now();
    const timer = window.setInterval(() => {
      if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        window.clearInterval(timer);
        window.adsbygoogle = window.adsbygoogle || [];
        resolve(true);
        return;
      }
      if (Date.now() - started > timeoutMs) {
        window.clearInterval(timer);
        resolve(false);
      }
    }, 100);
  });
}

/**
 * Renders a Google AdSense unit.
 * Reject consent → non-personalized ads; Accept / no choice → personalized.
 */
export default function AdSenseAd({
  slot,
  format = "auto",
  layout,
  className = "",
  fullWidthResponsive,
}: AdSenseAdProps) {
  const adSlot = slot ?? adsenseConfig.bannerSlot;
  const consent = useAdConsent();
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const nonPersonalized = consent === "rejected";
  const isInArticle = layout === "in-article";
  const useFullWidth =
    fullWidthResponsive ?? (!isInArticle && format !== "autorelaxed");

  useEffect(() => {
    // consent===null means the banner hasn't been answered yet.
    // We still push — AdSense defaults to non-personalized in that case
    // (ad_storage is granted by default in gtag consent defaults).
    if (!adsenseConfig.clientId || !adSlot || pushed.current) return;

    let cancelled = false;

    async function init() {
      const ready = await waitForAdSenseScript();
      if (cancelled || !ready) return;

      // Wait one frame so <ins> is mounted and has dimensions
      await new Promise((r) => window.requestAnimationFrame(() => r(null)));
      if (cancelled || pushed.current) return;

      const ins = insRef.current;
      if (!ins) return;

      if (ins.getAttribute("data-adsbygoogle-status") || ins.getAttribute("data-ad-status")) {
        pushed.current = true;
        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        // nonPersonalized only when user explicitly rejected; null/accepted → personalized
        window.adsbygoogle.requestNonPersonalizedAds = nonPersonalized ? 1 : 0;
        window.adsbygoogle.push({});
        pushed.current = true;
      } catch (err) {
        console.warn("AdSense push failed:", err);
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
  }, [adSlot, nonPersonalized]);

  if (!adsenseConfig.clientId || !adSlot) return null;

  return (
    <div className={`adsense-container w-full overflow-visible ${className}`.trim()}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: isInArticle ? "center" : undefined,
          // Explicit min-height prevents AdSense from seeing a zero-height slot
          minHeight: format === "autorelaxed" ? 280 : isInArticle ? 150 : 90,
          width: "100%",
        }}
        data-ad-client={adsenseConfig.clientId}
        data-ad-slot={adSlot}
        data-ad-format={format}
        {...(useFullWidth ? { "data-full-width-responsive": "true" } : {})}
        {...(layout ? { "data-ad-layout": layout } : undefined)}
      />
    </div>
  );
}
