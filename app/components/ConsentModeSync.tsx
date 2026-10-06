"use client";

import { applyGtagConsent } from "@/lib/consent-mode";
import { getStoredConsent } from "@/app/components/CookieConsent";
import { useEffect } from "react";

/** Sync Consent Mode with the cookie banner choice on load and on change. */
export default function ConsentModeSync() {
  useEffect(() => {
    const sync = () => {
      const stored = getStoredConsent();
      if (stored) applyGtagConsent(stored);
    };

    sync();
    window.addEventListener("shirwell-consent-changed", sync);
    return () => window.removeEventListener("shirwell-consent-changed", sync);
  }, []);

  return null;
}
