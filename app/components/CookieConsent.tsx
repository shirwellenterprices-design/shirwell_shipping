"use client";

import Link from "next/link";
import { applyGtagConsent } from "@/lib/consent-mode";
import { useEffect, useState } from "react";

const STORAGE_KEY = "shirwell_cookie_consent";

export type ConsentValue = "accepted" | "rejected" | null;

export function getStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function useAdConsent(): ConsentValue {
  // Read synchronously on init so first render already knows the stored value.
  const [consent, setConsent] = useState<ConsentValue>(() => getStoredConsent());

  useEffect(() => {
    // Sync in case localStorage changed in another tab.
    setConsent(getStoredConsent());

    const onChange = () => setConsent(getStoredConsent());
    window.addEventListener("shirwell-consent-changed", onChange);
    return () => window.removeEventListener("shirwell-consent-changed", onChange);
  }, []);

  return consent;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) setVisible(true);
  }, []);

  function save(value: "accepted" | "rejected") {
    window.localStorage.setItem(STORAGE_KEY, value);
    applyGtagConsent(value);
    window.dispatchEvent(new Event("shirwell-consent-changed"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-[#0a0a0a]/98 p-4 shadow-2xl backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted">
          We use cookies for essential site features, analytics, and advertising (including
          Google AdSense). See our{" "}
          <Link href="/privacy" className="font-semibold text-gold hover:underline">
            Privacy Policy
          </Link>
          . Choose Accept for personalized ads, or Reject for non-personalized ads only.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-gold-bright"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
