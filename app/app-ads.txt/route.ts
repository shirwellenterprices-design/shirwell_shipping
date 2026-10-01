import { adsenseConfig } from "@/lib/adsense";

/** Authorized sellers for AdMob apps that declare this developer website. */
export function GET() {
  if (!adsenseConfig.publisherId) {
    return new Response("# AdMob app-ads.txt not configured\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = `google.com, ${adsenseConfig.publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
