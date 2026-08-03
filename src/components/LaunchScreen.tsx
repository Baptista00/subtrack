import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { borderRadius, colors, spacing } from "../theme";
import { AppText } from "./AppText";

export function LaunchScreen() {
  const { width } = useWindowDimensions();
  const iconContainerSize = Math.min(92, Math.max(80, Math.round(width * 0.22)));

  return (
    <View pointerEvents="auto" style={styles.overlay}>
      <StatusBar animated={false} backgroundColor={colors.primary} style="light" translucent />
      <SafeAreaView edges={["top", "right", "bottom", "left"]} style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.identity}>
            <View
              accessible={false}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={[styles.iconContainer, { height: iconContainerSize, width: iconContainerSize }]}
            >
              <Image
                accessibilityIgnoresInvertColors
                accessible={false}
                resizeMode="contain"
                source={require("../../assets/images/brand/subtrack-launch-symbol.png")}
                style={styles.launchSymbol}
              />
            </View>

            <View style={styles.copy}>
              <AppText accessibilityRole="header" variant="Display" style={styles.title}>
                SubTrack
              </AppText>
              <AppText variant="Body" style={styles.subtitle}>
                Organize todas as suas{"\n"}assinaturas em um só lugar.
              </AppText>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    elevation: 2,
    zIndex: 2,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  identity: {
    alignItems: "center",
    gap: spacing[5],
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "rgba(255, 255, 255, 0.24)",
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    justifyContent: "center",
  },
  launchSymbol: {
    height: "100%",
    width: "100%",
  },
  copy: {
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
  },
  title: {
    color: colors.surface,
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.72)",
    lineHeight: 22,
    maxWidth: 300,
    textAlign: "center",
  },
});
