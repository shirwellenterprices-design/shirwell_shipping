/** Reader Revenue Manager / Subscribe with Google (SWG Basic) */
export const swgConfig = {
  /** From Publisher Center → Reader Revenue Manager snippet */
  productId:
    process.env.NEXT_PUBLIC_SWG_PRODUCT_ID?.trim() || "CAow5KfHDA:openaccess",
  enabled: process.env.NEXT_PUBLIC_SWG_ENABLED !== "false",
  lang: "en",
  theme: "light" as const,
};
