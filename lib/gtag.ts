/** Google tag (gtag.js) — from Google Tag / Ads installation instructions */
const DEFAULT_GTAG_ID = "GT-MKTBV8CX";

const gtagId = process.env.NEXT_PUBLIC_GTAG_ID?.trim() || DEFAULT_GTAG_ID;

export const gtagConfig = {
  id: gtagId,
  enabled: Boolean(gtagId),
};
