import { Platform } from "react-native";

/** Android emulator maps 10.0.2.2 → host machine localhost */
const DEV_ANDROID_URL = "http://10.0.2.2:3000";
const DEV_DEFAULT_URL = Platform.OS === "android" ? DEV_ANDROID_URL : "http://localhost:3000";

export const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_APP_URL ?? DEV_DEFAULT_URL;
