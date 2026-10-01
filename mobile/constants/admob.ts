import { TestIds } from "react-native-google-mobile-ads";

/** Google sample app ID — safe for development. */
const TEST_ANDROID_APP_ID = "ca-app-pub-3940256099942544~3347511713";

export const ADMOB_ANDROID_APP_ID =
  process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID ?? TEST_ANDROID_APP_ID;

export const ADMOB_BANNER_UNIT_ID =
  process.env.EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID ?? TestIds.ADAPTIVE_BANNER;

export const ADMOB_ENABLED = process.env.EXPO_PUBLIC_ADMOB_ENABLED !== "false";
