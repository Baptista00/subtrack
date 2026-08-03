import "../src/lib/notifications";

import { ActivityIndicator, StyleSheet, View } from "react-native";
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
  const hasSession = session !== null;
  const canAccessPrivateRoutes = hasSession && !isPasswordRecovery;

  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={canAccessPrivateRoutes}>
          <Stack.Screen name="index" />
          <Stack.Screen name="assinaturas" />
          <Stack.Screen name="adicionar" />
          <Stack.Screen name="assinatura/[id]" />
          <Stack.Screen name="perfil" />
        </Stack.Protected>
        <Stack.Protected guard={!hasSession}>
          <Stack.Screen name="login" />
          <Stack.Screen name="cadastro" />
          <Stack.Screen name="esqueci-senha" />
        </Stack.Protected>
        <Stack.Screen name="redefinir-senha" />
      </Stack>

      {isLoading ? (
        <ScreenContainer style={styles.loadingScreen}>
          <ActivityIndicator color={colors.primary} />
          <AppText variant="Body" style={styles.loadingText}>
            Carregando...
          </AppText>
        </ScreenContainer>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingScreen: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    gap: spacing[2],
    justifyContent: "center",
  },
  loadingText: {
    color: colors.textSecondary,
  },
});
