module.exports = {
  expo: {
    name: "Kifayati Bazar",
    slug: "kifayati-bazar",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/zar.com.png",
    scheme: "com.kifayatibazar.app",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/zar.com.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kifayatibazar.app",
      googleServicesFile: "./GoogleService-Info.plist",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              "com.googleusercontent.apps.177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g",
              "com.kifayatibazar.app",
            ],
          },
        ],
        GIDClientID:
          "177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g.apps.googleusercontent.com",
      },
      config: {
        googleSignIn: {
          reservedClientId:
            "com.googleusercontent.apps.177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g",
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/zar.com.png",
        backgroundColor: "#ffffff",
      },
      package: "com.kifayatibazar.app",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/zar.com.png",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "your-project-id",
      },
    },
    newArchEnabled: true,
  },
};
