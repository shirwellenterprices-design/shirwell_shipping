"use client";

import type { AccountProfile } from "@/lib/supabase/account";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import AdSenseAd from "./AdSenseAd";
import BottomNav from "./BottomNav";
import CookieConsent from "./CookieConsent";
import Footer from "./Footer";
import Header from "./Header";
import { adsenseConfig } from "@/lib/adsense";

type SiteChromeProps = {
  account: AccountProfile | null;
  children: ReactNode;
};

function isBareOpsRoute(pathname: string): boolean {
  return pathname.startsWith("/admin") || pathname.startsWith("/driver");
}

export default function SiteChrome({ account, children }: SiteChromeProps) {
  const pathname = usePathname() ?? "";

  if (isBareOpsRoute(pathname)) {
    return <>{children}</>;
  }

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
