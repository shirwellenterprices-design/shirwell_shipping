import { ADMOB_ENABLED } from "@/constants/admob";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import mobileAds, { AdsConsent } from "react-native-google-mobile-ads";

type Props = {
  children: ReactNode;
};

const AdMobReadyContext = createContext(false);

/** True when the Mobile Ads SDK has initialized and banners may load. */
export function useAdMobReady() {
  return useContext(AdMobReadyContext);
}

/**
 * Gathers UMP consent when available, then initializes Google Mobile Ads.
 * Always initializes the SDK so test/production banners can load even if
 * Privacy & messaging is not configured yet in AdMob.
 */
export function AdMobProvider({ children }: Props) {
  const [adsReady, setAdsReady] = useState(!ADMOB_ENABLED);
  const [shellReady, setShellReady] = useState(!ADMOB_ENABLED);

  useEffect(() => {
    if (!ADMOB_ENABLED) return;

    let cancelled = false;

    async function prepareAds() {
      try {
        await AdsConsent.gatherConsent();
      } catch {
        /* UMP optional until Privacy & messaging is published */
      }

      if (cancelled) return;

      try {
        await mobileAds().initialize();
      } catch {
        /* banner will fail soft */
      }

      if (!cancelled) {
        setAdsReady(true);
        setShellReady(true);
      }
    }

    void prepareAds();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!shellReady) return null;

  return (
    <AdMobReadyContext.Provider value={adsReady}>{children}</AdMobReadyContext.Provider>
  );
}
