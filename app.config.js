require('dotenv/config')

export default {
  expo: {
    name: 'WorkoutAppExpo',
    slug: 'WorkoutAppExpo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.raymartevangelista.WorkoutAppExpo',
      supportsTablet: true,
      userInterfaceStyle: 'automatic',
    },
    android: {
      package: 'com.raymartevangelista.WorkoutAppExpo',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      userInterfaceStyle: 'automatic',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      BASE_LOGIN_URL: process.env.BASE_LOGIN_URL,
      BASE_USERS_URL: process.env.BASE_USERS_URL,
      GOOGLE_WEB_ID: process.env.GOOGLE_WEB_ID,
      GOOGLE_IOS_ID: process.env.GOOGLE_IOS_ID,
      GOOGLE_ANDROID_ID: process.env.GOOGLE_ANDROID_ID,
    },
    scheme: 'WorkoutAppExpo',
    plugins: [
      'expo-build-properties',
      {
        ios: {
          extraPods: [
            {
              name: 'simdjson',
              configurations: ['Debug', 'Release'],
              path: '../node_modules/@nozbe/simdjson',
              modular_headers: true,
            },
          ],
        },
      },
    ],
  },
}
