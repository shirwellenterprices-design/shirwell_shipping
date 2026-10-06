const {
  withProjectBuildGradle,
  createRunOncePlugin,
} = require("@expo/config-plugins");

/**
 * Force an older Play Services Ads SDK so AdMob builds with Expo's Kotlin 2.1.x.
 * play-services-ads 25.4.0 requires Kotlin 2.3 metadata, which breaks Expo modules.
 */
function withCompatibleAdMobSdk(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language !== "groovy") {
      return config;
    }

    const marker = "force 'com.google.android.gms:play-services-ads:";
    if (config.modResults.contents.includes(marker)) {
      return config;
    }

    const injection = `
allprojects {
  configurations.configureEach {
    resolutionStrategy {
      force 'com.google.android.gms:play-services-ads:24.6.0'
      force 'com.google.android.gms:play-services-ads-lite:24.6.0'
    }
  }
}
`;

    config.modResults.contents += `\n${injection}`;
    return config;
  });
}

module.exports = createRunOncePlugin(
  withCompatibleAdMobSdk,
  "withCompatibleAdMobSdk",
  "1.0.0",
);
