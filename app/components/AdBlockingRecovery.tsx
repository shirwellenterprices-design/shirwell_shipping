import Script from "next/script";

/**
 * Google AdSense — Ad blocking recovery (Funding Choices) + optional error protection.
 * Publisher: pub-2495432679632375
 */
export default function AdBlockingRecovery() {
  return (
    <>
      <Script
        id="funding-choices"
        async
        src="https://fundingchoicesmessages.google.com/i/pub-2495432679632375?ers=1"
        strategy="afterInteractive"
      />
      <Script id="googlefc-present" strategy="afterInteractive">
        {`(function(){function signalGooglefcPresent(){if(!window.frames['googlefcPresent']){if(document.body){const iframe=document.createElement('iframe');iframe.style='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px';iframe.style.display='none';iframe.name='googlefcPresent';document.body.appendChild(iframe);}else{setTimeout(signalGooglefcPresent,0);}}}signalGooglefcPresent();})();`}
      </Script>
      <Script
        id="adsense-error-protection"
        src="/adsense-error-protection.js"
        strategy="afterInteractive"
      />
    </>
  );
}
