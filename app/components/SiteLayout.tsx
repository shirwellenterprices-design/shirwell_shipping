import AdSenseAd from "./AdSenseAd";
import BottomNav from "./BottomNav";
import CookieConsent from "./CookieConsent";
import Footer from "./Footer";
import Header from "./Header";
import { adsenseConfig } from "@/lib/adsense";
import { getCurrentAccount } from "@/lib/supabase/account";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const account = await getCurrentAccount();

  return (
    <>
      <Header account={account} />
      <div className="pb-20 lg:pb-0">{children}</div>
      {adsenseConfig.enabled && (
        <section
          aria-label="Advertisement"
          className="border-t border-border bg-surface px-4 py-6"
        >
          <div className="mx-auto max-w-5xl">
            <AdSenseAd
              className="min-h-[100px]"
              slot={adsenseConfig.bannerSlot}
              format="auto"
            />
          </div>
        </section>
      )}
      <Footer />
      <BottomNav />
      <CookieConsent />
    </>
  );
}
