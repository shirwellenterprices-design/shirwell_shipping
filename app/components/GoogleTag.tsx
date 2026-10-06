import { gtagConfig } from "@/lib/gtag";
import Script from "next/script";

/**
 * Google tag (gtag.js) — early in <head>.
 * Defaults allow ads to fill; cookie banner can tighten personalization.
 */
export default function GoogleTag() {
  if (!gtagConfig.enabled) return null;

  const id = gtagConfig.id;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${id}');
        `.trim()}
      </Script>
      <Script
        id="gtag-js"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
    </>
  );
}
