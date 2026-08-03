import "../src/lib/notifications";

import { ActivityIndicator, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "../src/auth";
import { AppText, ScreenContainer } from "../src/components";
import { colors, spacing } from "../src/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { isLoading, isPasswordRecovery, session } = useAuth();

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

  const isAuthenticated = session !== null && !isPasswordRecovery;

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
        <Stack.Screen name="esqueci-senha" />
      </Stack.Protected>
      <Stack.Screen name="redefinir-senha" />
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
