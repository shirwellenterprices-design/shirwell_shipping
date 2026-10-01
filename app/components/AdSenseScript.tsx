import { adsenseConfig } from "@/lib/adsense";
import Script from "next/script";

/**
 * AdSense ownership verification + ads loader.
 * Must appear in <head> with the ca-pub client id.
 */
export default function AdSenseScript() {
  if (!adsenseConfig.scriptEnabled) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.clientId}`}
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
