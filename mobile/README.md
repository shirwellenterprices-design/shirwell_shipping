# Shirwell Shipping — Android WebView App

Android app for **Shirwell Shipping**, built with **Expo** and **React Native WebView**. It loads the full Next.js website inside a native shell.

## Features

- Full-screen WebView of the Shirwell Shipping website
- **Google AdMob** native banner at the bottom of the screen
- Google AdSense ads from the website (inside the WebView)
- Android hardware back button navigates WebView history
- Pull-to-refresh
- Cookie/session support for login and admin flows
- Gold/dark splash and status bar matching the brand

## Prerequisites

- Node.js 20+
- [Android Studio](https://developer.android.com/studio) with Android SDK
- The Next.js website running locally or deployed

## Setup

```bash
cd mobile
npm install --legacy-peer-deps
cp .env.example .env
```

Set the website URL in `.env`:

```bash
# Android emulator → host machine localhost
EXPO_PUBLIC_WEB_APP_URL=http://10.0.2.2:3000

# Physical device on same Wi‑Fi (use your computer's LAN IP)
# EXPO_PUBLIC_WEB_APP_URL=http://192.168.1.10:3000

# Production
# EXPO_PUBLIC_WEB_APP_URL=https://your-domain.com
```

Ads:
- **AdMob** (native banner) — configure in `mobile/.env` (see below)
- **AdSense** (website) — configure `NEXT_PUBLIC_ADSENSE_*` in repo root `.env.local`

### AdMob setup

Create an Android app at [Google AdMob](https://admob.google.com), add a **Banner** ad unit, then set in `mobile/.env`:

```bash
EXPO_PUBLIC_ADMOB_ANDROID_APP_ID=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID=ca-app-pub-xxxxxxxxxxxxxxxx/zzzzzzzzzz
```

**Qualification checklist**

1. Host `app-ads.txt` on the developer website linked in AdMob (served at `/app-ads.txt` on this site).
2. In AdMob → **Privacy & messaging**, create and publish a GDPR / UMP consent message.
3. The app gathers UMP consent via `AdsConsent.gatherConsent()` before initializing the Mobile Ads SDK.
4. Use production AdMob IDs only in release builds; leave unset locally to use Google **test** IDs.

After changing AdMob config, rebuild:

```bash
npx expo prebuild --platform android --clean
npm run android
```

Set `EXPO_PUBLIC_ADMOB_ENABLED=false` to disable native ads.

## Run on Android

1. Start the website from the repo root:

```bash
cd ..
npm run dev
```

2. Build and run the Android app:

```bash
cd mobile
npx expo prebuild --platform android
npm run android
```

For day-to-day development after prebuild:

```bash
npm run android
```

### If you see “No Android connected device found”

Expo needs a **running emulator** or a **USB-connected phone** with debugging enabled.

**1. Set Android SDK env vars** (add to `~/.zshrc`, then `source ~/.zshrc`):

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH"
```

**2. Start an emulator** (pick one):

- **Android Studio** → Device Manager → ▶ next to `Medium_Phone_API_36.1`
- **Terminal:**
  ```bash
  emulator -avd Medium_Phone_API_36.1
  ```

Wait until the home screen appears, then verify:

```bash
adb devices
# should show: emulator-5554   device
```

**3. Run the app again:**

```bash
cd mobile
npm run android
```

**Physical device instead:** enable Developer options → USB debugging, plug in via USB, accept the debug prompt, then `adb devices` should list your phone.

## Build APK / AAB

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
```

Release APK: `android/app/build/outputs/apk/release/`

## Project structure

```
mobile/
  app/           Expo Router — WebView + AdMob layout
  components/    AdMob banner + SDK init
  constants/     Web app URL, AdMob IDs, theme
```

## Notes

- **Android emulator** uses `http://10.0.2.2:3000` to reach the dev server on your computer.
- **Physical device** must use your computer's LAN IP, not `localhost`.
- **Production** should use `https://` so cleartext traffic is not required.
- The Next.js website lives in the repo root; this `mobile/` folder is the Android wrapper.
