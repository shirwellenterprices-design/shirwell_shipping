/** Production defaults so ads work even if Vercel env vars are missing. */
const DEFAULT_CLIENT_ID = "ca-pub-2495432679632375";
/** AdSense Display unit "shipping" */
const DEFAULT_SLOT = "8197243699";
/** AdSense In-article unit */
const DEFAULT_IN_ARTICLE_SLOT = "6607155384";
/** AdSense Matched content / autorelaxed unit */
const DEFAULT_MATCHED_SLOT = "5780185108";

/** Normalize to ca-pub-XXXXXXXX (fixes env values missing the prefix). */
function normalizeClientId(raw: string | undefined): string {
  const value = (raw ?? "").trim();
  if (!value) return DEFAULT_CLIENT_ID;
  if (value.startsWith("ca-pub-")) return value;
  if (value.startsWith("pub-")) return `ca-${value}`;
  if (/^\d+$/.test(value)) return `ca-pub-${value}`;
  return value;
}

const clientId = normalizeClientId(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);
const bannerSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER?.trim() || DEFAULT_SLOT;
const boxAdSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOX_AD?.trim() || bannerSlot;
const inlineSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE?.trim() || boxAdSlot;
const inArticleSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE?.trim() || DEFAULT_IN_ARTICLE_SLOT;
const matchedSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_MATCHED?.trim() || DEFAULT_MATCHED_SLOT;

export const adsenseConfig = {
  clientId,
  /** Footer / site-wide horizontal banner */
  bannerSlot,
  /** Rectangle / in-content ad units */
  boxAdSlot,
  /** Homepage mid-content (defaults to box ad slot) */
  inlineSlot,
  /** In-article (fluid) — place inside long guide articles */
  inArticleSlot,
  /** Matched content / related (autorelaxed) */
  matchedSlot,
  /** Script + meta load when publisher id is set (needed for AdSense site verification) */
  scriptEnabled: Boolean(clientId),
  /** Ad units require both client + at least one slot */
  enabled: Boolean(clientId && (bannerSlot || boxAdSlot || matchedSlot || inArticleSlot)),
  /** ads.txt publisher id (pub-xxxxxxxx) */
  publisherId: clientId ? clientId.replace(/^ca-pub-/, "pub-") : "",
};
