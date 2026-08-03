import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { AppText, BackButton, Button, Input, ScreenContainer } from "../src/components";
import { getPasswordRecoveryRedirectUrl } from "../src/lib/auth-recovery";
import { supabase } from "../src/lib/supabase";
import { colors, home, spacing } from "../src/theme";

type ForgotPasswordFieldErrors = {
  email?: string;
};

function validateEmail(email: string): ForgotPasswordFieldErrors {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return { email: "Informe seu e-mail." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { email: "Informe um e-mail válido." };
  }

  return {};
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ForgotPasswordFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const nextErrors = validateEmail(email);
    setErrors(nextErrors);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: getPasswordRecoveryRedirectUrl(),
      });

      if (error) {
        setErrorMessage("Não foi possível enviar o link agora. Aguarde um momento e tente novamente.");
        return;
      }

      setSuccessMessage("Se existir uma conta com este e-mail, enviaremos um link de recuperação.");
    } catch {
      setErrorMessage("Não foi possível enviar o link agora. Aguarde um momento e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenContainer scrollable style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <BackButton onPress={() => router.back()} />
          <AppText accessibilityRole="header" variant="Heading 1" style={styles.title}>
            Esqueci minha senha
          </AppText>
        </View>

        <View style={styles.body}>
          <AppText variant="Body" style={styles.description}>
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </AppText>

          <View style={styles.form}>
            <Input
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              editable={!isSubmitting}
              error={errors.email}
              keyboardType="email-address"
              label="E-mail"
              onChangeText={setEmail}
              placeholder="seuemail@exemplo.com"
              textContentType="emailAddress"
              value={email}
            />
          </View>

          <View style={styles.actions}>
            {errorMessage ? (
              <AppText accessibilityRole="alert" variant="Small/Helper" style={styles.errorMessage}>
                {errorMessage}
              </AppText>
            ) : null}
            {successMessage ? (
              <AppText accessibilityRole="alert" variant="Small/Helper" style={styles.successMessage}>
                {successMessage}
              </AppText>
            ) : null}
            <Button loading={isSubmitting} loadingText="Enviando..." onPress={handleSubmit} variant="primary">
              Enviar link
            </Button>
            <Button
              disabled={isSubmitting}
              onPress={() => router.replace("/login")}
              variant="ghost"
            >
              Voltar para o login
            </Button>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: spacing[6],
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[3],
    paddingBottom: home.header.container.paddingBottom,
    paddingHorizontal: home.header.container.paddingHorizontal,
    paddingTop: home.header.container.paddingTop,
  },
  title: {
    color: colors.textPrimary,
    fontSize: home.header.title.fontSize,
    fontWeight: home.header.title.fontWeight,
    letterSpacing: home.header.title.letterSpacing,
  },
  body: {
    gap: spacing[5],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
  },
  description: {
    color: colors.textSecondary,
  },
  form: {
    gap: spacing[3],
  },
  actions: {
    alignItems: "center",
    gap: spacing[3],
  },
  errorMessage: {
    color: colors.error,
    textAlign: "center",
  },
  successMessage: {
    color: colors.success,
    textAlign: "center",
  },
});
