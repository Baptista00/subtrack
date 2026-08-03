import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { getAuthErrorMessage } from "../src/auth";
import { AppText, Button, Input, PasswordInput, ScreenContainer } from "../src/components";
import { supabase } from "../src/lib/supabase";
import { colors, spacing } from "../src/theme";

type LoginFieldErrors = {
  email?: string;
  password?: string;
};

function validateLogin(email: string, password: string): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = "Informe seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!password) {
    errors.password = "Informe sua senha.";
  } else if (password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres.";
  }

  return errors;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
    setAuthError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthError(getAuthErrorMessage(error.message, "Não foi possível entrar. Tente novamente."));
      }
    } catch {
      setAuthError("Não foi possível entrar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenContainer scrollable style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <AppText variant="Heading 1" style={styles.title}>
            Entrar
          </AppText>
        </View>

        <View style={styles.form}>
          <Input
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            error={errors.email}
            keyboardType="email-address"
            label="E-mail"
            onChangeText={setEmail}
            placeholder="seuemail@exemplo.com"
            textContentType="emailAddress"
            value={email}
          />
          <PasswordInput
            autoComplete="password"
            error={errors.password}
            label="Senha"
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            textContentType="password"
            value={password}
          />
          <View style={styles.forgotPasswordAction}>
            <Pressable
              accessibilityLabel="Recuperar senha"
              accessibilityRole="button"
              disabled={isSubmitting}
              hitSlop={8}
              onPress={() => router.push("/esqueci-senha")}
            >
              <AppText variant="Label" style={styles.forgotPasswordText}>
                Esqueci minha senha?
              </AppText>
            </Pressable>
          </View>
        </View>

        <View style={styles.actions}>
          {authError ? (
            <AppText accessibilityRole="alert" variant="Small/Helper" style={styles.errorMessage}>
              {authError}
            </AppText>
          ) : null}
          <Button loading={isSubmitting} onPress={handleSubmit} variant="primary">
            Entrar
          </Button>
          <Button disabled={isSubmitting} onPress={() => router.push("/cadastro")} variant="ghost">
            Criar conta
          </Button>
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
    gap: spacing[5],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[5],
  },
  heading: {
    gap: spacing[1],
  },
  title: {
    color: colors.textPrimary,
  },
  form: {
    gap: spacing[3],
  },
  forgotPasswordAction: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: colors.primary,
  },
  actions: {
    alignItems: "center",
    gap: spacing[3],
  },
  errorMessage: {
    color: colors.error,
    textAlign: "center",
  },
});
