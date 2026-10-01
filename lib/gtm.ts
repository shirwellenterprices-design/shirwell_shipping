/** Google Tag Manager container — Install GTM snippet */
const DEFAULT_GTM_ID = "GTM-MHNWRHJF";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || DEFAULT_GTM_ID;

export const gtmConfig = {
  id: gtmId,
  enabled: Boolean(gtmId),
};
