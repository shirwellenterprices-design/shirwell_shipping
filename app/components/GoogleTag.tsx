import { gtagConfig } from "@/lib/gtag";

/**
 * Google tag (gtag.js) — early in <head>.
 * Defaults allow ads to fill; cookie banner can tighten personalization.
 */
export default function GoogleTag() {
  if (!gtagConfig.enabled) return null;

  const id = gtagConfig.id;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
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
          `.trim(),
        }}
      />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
    </>
  );
}
