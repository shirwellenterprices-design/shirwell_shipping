import { AdMobProvider } from "@/components/AdMobProvider";
import { colors } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AdMobProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.headerBg },
          }}
        />
      </AdMobProvider>
    </SafeAreaProvider>
  );
}
