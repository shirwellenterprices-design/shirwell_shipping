import Script from "next/script";
import { swgConfig } from "@/lib/swg";

/**
 * Google Reader Revenue Manager — Subscribe with Google (SWG Basic) snippet.
 * Required on published content so Publisher Center can sync access levels.
 */
export default function SwgBasicScript() {
  if (!swgConfig.enabled || !swgConfig.productId) return null;

  const init = `(self.SWG_BASIC = self.SWG_BASIC || []).push(function (basicSubscriptions) {
  basicSubscriptions.init({
    type: "NewsArticle",
    isPartOfType: ["Product"],
    isPartOfProductId: ${JSON.stringify(swgConfig.productId)},
    clientOptions: { theme: ${JSON.stringify(swgConfig.theme)}, lang: ${JSON.stringify(swgConfig.lang)} }
  });
});`;

  return (
    <>
      <Script
        async
        src="https://news.google.com/swg/js/v1/swg-basic.js"
        strategy="afterInteractive"
      />
      <Script id="swg-basic-init" strategy="afterInteractive">
        {init}
      </Script>
    </>
  );
}
