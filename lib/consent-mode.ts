declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Accept → personalized ads + analytics.
 * Reject → non-personalized ads still allowed.
 */
export function applyGtagConsent(value: "accepted" | "rejected") {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  if (value === "accepted") {
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    return;
  }

  window.gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}
