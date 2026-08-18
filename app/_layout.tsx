import "../src/lib/notifications";

import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stack, usePathname, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "../src/auth";
import { LaunchScreen } from "../src/components";

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
  const { isLoading, isPasswordRecovery, isPasswordRecoveryLinkReady, session } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [hasMinimumLaunchTimeElapsed, setHasMinimumLaunchTimeElapsed] = useState(false);
  const hasSession = session !== null;
  const canAccessPrivateRoutes = hasSession && !isPasswordRecovery;
  const isAuthBootstrapLoading = isLoading || !isPasswordRecoveryLinkReady;
  const showLaunchScreen = !hasMinimumLaunchTimeElapsed || isAuthBootstrapLoading;

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMinimumLaunchTimeElapsed(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isPasswordRecovery && pathname !== "/redefinir-senha") {
      router.replace("/redefinir-senha");
    }
  }, [isPasswordRecovery, pathname, router]);

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

      {showLaunchScreen ? <LaunchScreen /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
