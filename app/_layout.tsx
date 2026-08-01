import { ActivityIndicator, StyleSheet } from "react-native";
import { Stack } from "expo-router";

import { AuthProvider, useAuth } from "../src/auth";
import { AppText, ScreenContainer } from "../src/components";
import { colors, spacing } from "../src/theme";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return (
      <ScreenContainer style={styles.loadingScreen}>
        <ActivityIndicator color={colors.primary} />
        <AppText variant="Body" style={styles.loadingText}>
          Carregando...
        </AppText>
      </ScreenContainer>
    );
  }

  const isAuthenticated = session !== null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="assinaturas" />
        <Stack.Screen name="adicionar" />
        <Stack.Screen name="assinatura/[id]" />
        <Stack.Screen name="perfil" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: "center",
    gap: spacing[2],
    justifyContent: "center",
  },
  loadingText: {
    color: colors.textSecondary,
  },
});
