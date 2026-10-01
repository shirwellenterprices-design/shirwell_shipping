import { useAdMobReady } from "@/components/AdMobProvider";
import { ADMOB_BANNER_UNIT_ID, ADMOB_ENABLED } from "@/constants/admob";
import { colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

export function AdMobBanner() {
  const insets = useSafeAreaInsets();
  const adsReady = useAdMobReady();
  const [visible, setVisible] = useState(true);

  if (!ADMOB_ENABLED || !adsReady || !visible) return null;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BannerAd
        unitId={ADMOB_BANNER_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setVisible(true)}
        onAdFailedToLoad={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.headerBg,
    borderTopWidth: 1,
    borderTopColor: colors.headerSurface,
  },
});
