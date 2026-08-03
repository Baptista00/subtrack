import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";

import { useAuth } from "../src/auth";
import { AppText, Button, PasswordInput, ScreenContainer } from "../src/components";
import { establishPasswordRecoverySession } from "../src/lib/auth-recovery";
import { supabase } from "../src/lib/supabase";
import { colors, spacing } from "../src/theme";

type RecoveryScreenState = "processing" | "valid" | "invalid" | "updating" | "success";

type PasswordFieldErrors = {
  password?: string;
  confirmPassword?: string;
};

function validatePasswords(password: string, confirmPassword: string): PasswordFieldErrors {
  const errors: PasswordFieldErrors = {};

  if (!password) {
    errors.password = "Informe a nova senha.";
  } else if (password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }

  if (!confirmPassword || confirmPassword !== password) {
    errors.confirmPassword = "As senhas não coincidem.";
  }

  return errors;
}

export default function ResetPassword() {
  const { beginPasswordRecovery, clearPasswordRecovery, isPasswordRecovery } = useAuth();
  const [screenState, setScreenState] = useState<RecoveryScreenState>("processing");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<PasswordFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isMountedRef = useRef(true);
  const isProcessingRef = useRef(false);
  const hasValidRecoveryLinkRef = useRef(false);
  const isUpdatingRef = useRef(false);

  const handleRecoveryUrl = useCallback(
    async (url: string) => {
      if (isProcessingRef.current || hasValidRecoveryLinkRef.current) {
        return;
      }

      isProcessingRef.current = true;
      beginPasswordRecovery();
      setScreenState("processing");
      setSubmitError(null);

      try {
        const result = await establishPasswordRecoverySession(url);

        if (!isMountedRef.current) {
          return;
        }

        if (result.status === "success") {
          hasValidRecoveryLinkRef.current = true;
          setScreenState("valid");
          return;
        }

        clearPasswordRecovery();
        setScreenState("invalid");
      } finally {
        isProcessingRef.current = false;
      }
    },
    [beginPasswordRecovery, clearPasswordRecovery],
  );

  useEffect(() => {
    isMountedRef.current = true;

    async function processInitialUrl() {
      try {
        const url = await Linking.getInitialURL();

        if (!isMountedRef.current) {
          return;
        }

        if (!url) {
          setScreenState("invalid");
          return;
        }

        await handleRecoveryUrl(url);
      } catch {
        if (isMountedRef.current) {
          clearPasswordRecovery();
          setScreenState("invalid");
        }
      }
    }

    void processInitialUrl();

    const subscription = Linking.addEventListener("url", ({ url }) => {
      void handleRecoveryUrl(url);
    });

    return () => {
      isMountedRef.current = false;
      subscription.remove();
    };
  }, [clearPasswordRecovery, handleRecoveryUrl]);

  async function handleSubmit() {
    if (screenState !== "valid" || isUpdatingRef.current) {
      return;
    }

    const nextErrors = validatePasswords(password, confirmPassword);
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!isPasswordRecovery) {
      setScreenState("invalid");
      return;
    }

    isUpdatingRef.current = true;
    setScreenState("updating");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        clearPasswordRecovery();
        setScreenState("invalid");
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setSubmitError("Não foi possível alterar a senha. Solicite um novo link e tente novamente.");
        setScreenState("valid");
        return;
      }

      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });

      if (signOutError) {
        setSubmitError("Não foi possível alterar a senha. Solicite um novo link e tente novamente.");
        setScreenState("valid");
        return;
      }

      clearPasswordRecovery();
      setScreenState("success");
    } catch {
      setSubmitError("Não foi possível alterar a senha. Solicite um novo link e tente novamente.");
      setScreenState("valid");
    } finally {
      isUpdatingRef.current = false;
    }
  }

  if (screenState === "processing") {
    return (
      <ScreenContainer style={styles.statusScreen}>
        <ActivityIndicator color={colors.primary} />
        <AppText variant="Body" style={styles.statusText}>
          Validando link de recuperação...
        </AppText>
      </ScreenContainer>
    );
  }

  if (screenState === "invalid") {
    return (
      <ScreenContainer style={styles.statusScreen}>
        <View style={styles.statusContent}>
          <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
            Link inválido ou expirado
          </AppText>
          <AppText variant="Body" style={styles.statusText}>
            Solicite um novo link para redefinir sua senha.
          </AppText>
          <View style={styles.actions}>
            <Button onPress={() => router.replace("/esqueci-senha")} variant="primary">
              Solicitar novo link
            </Button>
            <Button onPress={() => router.replace("/login")} variant="ghost">
              Voltar para o login
            </Button>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (screenState === "success") {
    return (
      <ScreenContainer style={styles.statusScreen}>
        <View style={styles.statusContent}>
          <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
            Senha alterada com sucesso.
          </AppText>
          <View style={styles.actions}>
            <Button onPress={() => router.replace("/login")} variant="primary">
              Ir para o login
            </Button>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const isUpdating = screenState === "updating";

  return (
    <ScreenContainer scrollable style={styles.formScreen}>
      <View style={styles.formContent}>
        <View style={styles.heading}>
          <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
            Crie uma nova senha
          </AppText>
        </View>

        <View style={styles.form}>
          <PasswordInput
            autoComplete="new-password"
            editable={!isUpdating}
            error={errors.password}
            label="Nova senha"
            onChangeText={setPassword}
            placeholder="Digite a nova senha"
            textContentType="newPassword"
            value={password}
          />
          <PasswordInput
            autoComplete="new-password"
            editable={!isUpdating}
            error={errors.confirmPassword}
            label="Confirmar nova senha"
            onChangeText={setConfirmPassword}
            placeholder="Repita a nova senha"
            textContentType="newPassword"
            value={confirmPassword}
          />
        </View>

        <View style={styles.actions}>
          {submitError ? (
            <AppText accessibilityRole="alert" variant="Small/Helper" style={styles.errorMessage}>
              {submitError}
            </AppText>
          ) : null}
          <Button loading={isUpdating} loadingText="Alterando..." onPress={handleSubmit} variant="primary">
            Alterar senha
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statusScreen: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  statusContent: {
    alignItems: "center",
    gap: spacing[3],
    width: "100%",
  },
  statusText: {
    color: colors.textSecondary,
    textAlign: "center",
  },
  formScreen: {
    flex: 1,
  },
  formContent: {
    flexGrow: 1,
    gap: spacing[5],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[5],
  },
  heading: {
    gap: spacing[1],
  },
  title: {
    color: colors.textPrimary,
    textAlign: "center",
  },
  form: {
    gap: spacing[3],
  },
  actions: {
    alignItems: "center",
    gap: spacing[3],
    width: "100%",
  },
  errorMessage: {
    color: colors.error,
    textAlign: "center",
  },
});
