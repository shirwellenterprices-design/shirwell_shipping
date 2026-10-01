import { AdMobBanner } from "@/components/AdMobBanner";
import { ADMOB_ENABLED } from "@/constants/admob";
import { WEB_APP_URL } from "@/constants/config";
import { colors } from "@/constants/theme";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView, type WebViewNavigation } from "react-native-webview";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  // Android hardware back button → WebView history
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });

    return () => subscription.remove();
  }, [canGoBack]);

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Unable to load website</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorHint}>
            Set EXPO_PUBLIC_WEB_APP_URL in mobile/.env (e.g. http://10.0.2.2:3000 for Android
            emulator, or your deployed site URL).
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.goldBright} />
          <Text style={styles.loaderText}>Loading Shirwell Shipping…</Text>
        </View>
      )}
      <View style={styles.content}>
        <WebView
          ref={webViewRef}
          source={{ uri: WEB_APP_URL }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={onNavigationStateChange}
          onError={() => setError(`Could not connect to ${WEB_APP_URL}`)}
          onHttpError={() => setError(`Could not connect to ${WEB_APP_URL}`)}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          allowsBackForwardNavigationGestures
          pullToRefreshEnabled
          geolocationEnabled
          setSupportMultipleWindows={false}
          originWhitelist={["*"]}
        />
        {ADMOB_ENABLED && <AdMobBanner />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.headerBg,
  },
  content: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loader: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.headerBg,
    gap: 12,
  },
  loaderText: {
    color: colors.goldBright,
    fontSize: 14,
  },
  errorBox: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.goldBright,
  },
  errorText: {
    color: "#fff",
    fontSize: 14,
  },
  errorHint: {
    color: colors.gold,
    fontSize: 13,
    lineHeight: 20,
  },
});
