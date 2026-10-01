import type { ConfigContext, ExpoConfig } from "expo/config";
import {
  AndroidConfig,
  type ConfigPlugin,
  withAndroidManifest,
} from "@expo/config-plugins";

const TEST_ANDROID_APP_ID = "ca-app-pub-3940256099942544~3347511713";
const TEST_IOS_APP_ID = "ca-app-pub-3940256099942544~1458002511";
const ADMOB_ANDROID_APP_ID =
  process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID ?? TEST_ANDROID_APP_ID;
const ADMOB_IOS_APP_ID =
  process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID ?? TEST_IOS_APP_ID;

/** Allow http:// URLs in WebView during local development (Android emulator). */
const withCleartextTraffic: ConfigPlugin = (config) =>
  withAndroidManifest(config, (config) => {
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults,
    );
    application.$["android:usesCleartextTraffic"] = "true";
    return config;
  });

export default ({ config }: ConfigContext): ExpoConfig =>
  withCleartextTraffic({
    ...config,
    name: "Shirwell Shipping",
    slug: "shirwell-shipping",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    scheme: "shirwellshipping",
    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          android: {
            kotlinVersion: "2.1.20",
          },
        },
      ],
      "./plugins/withCompatibleAdMobSdk",
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: ADMOB_ANDROID_APP_ID,
          iosAppId: ADMOB_IOS_APP_ID,
        },
      ],
    ],
    android: {
      package: "com.shirwell.shipping",
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ],
      adaptiveIcon: {
        backgroundColor: "#0a0a0a",
        foregroundImage: "./assets/android-icon-foreground.png",
        backgroundImage: "./assets/android-icon-background.png",
      },
    },
    ios: {
      bundleIdentifier: "com.shirwell.shipping",
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "Shirwell Shipping uses your location to show your position on the tracking map.",
      },
    },
    extra: {
      webAppUrl: process.env.EXPO_PUBLIC_WEB_APP_URL ?? "http://10.0.2.2:3000",
      admobAndroidAppId: ADMOB_ANDROID_APP_ID,
    },
  });
