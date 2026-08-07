import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { colors, spacing } from "../theme";
import { AppText } from "./AppText";

export function LegalAgreementFooter() {
  return (
    <View style={styles.container}>
      <AppText variant="Small/Helper" style={styles.text}>
        Ao continuar, você concorda com os
      </AppText>
      <Pressable
        accessibilityHint="Abre os Termos de Uso em revisão."
        accessibilityLabel="Termos de Uso"
        accessibilityRole="link"
        hitSlop={6}
        onPress={() => router.push("/termos-de-uso")}
        style={styles.linkPressable}
      >
        <AppText variant="Small/Helper" style={styles.linkText}>
          Termos de Uso
        </AppText>
      </Pressable>
      <AppText variant="Small/Helper" style={styles.text}>
        e reconhece a
      </AppText>
      <Pressable
        accessibilityHint="Abre a Política de Privacidade em revisão."
        accessibilityLabel="Política de Privacidade"
        accessibilityRole="link"
        hitSlop={6}
        onPress={() => router.push("/politica-privacidade")}
        style={styles.linkPressable}
      >
        <AppText variant="Small/Helper" style={styles.linkText}>
          Política de Privacidade.
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  text: {
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: "center",
  },
  linkPressable: {
    minHeight: 32,
    paddingHorizontal: spacing[1],
    paddingVertical: spacing[1],
  },
  linkText: {
    color: colors.primary,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
});
