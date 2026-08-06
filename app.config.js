const isDevelopment = process.env.APP_VARIANT === "development";

export default ({ config }) => ({
  ...config,
  plugins: [
    ...(config.plugins ?? []),
    ["expo-dev-client", { addGeneratedScheme: isDevelopment }],
  ],
  ...(isDevelopment
    ? {
        name: "SubTrack Dev",
        scheme: "subtrack-dev",
        android: {
          ...config.android,
          package: "com.baptista00.subtrack.dev",
        },
        ios: {
          ...config.ios,
          bundleIdentifier: "com.baptista00.subtrack.dev",
        },
      }
    : {}),
});
