import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { getAuthErrorMessage } from "../src/auth";
import {
  AppText,
  Button,
  Input,
  LegalAgreementFooter,
  PasswordInput,
  ScreenContainer,
} from "../src/components";
import { supabase } from "../src/lib/supabase";
import { colors, spacing } from "../src/theme";

type CadastroFieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

// Este destino é exclusivo da confirmação de cadastro; recovery usa auth-recovery.ts.
const SIGNUP_CONFIRMATION_REDIRECT_URL =
  "https://subtrackbr.com.br/conta-verificada.html";

function validateCadastro(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): CadastroFieldErrors {
  const errors: CadastroFieldErrors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    errors.name = "Informe seu nome.";
  } else if (trimmedName.length < 2) {
    errors.name = "Informe pelo menos 2 caracteres.";
  }

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

  if (!confirmPassword) {
    errors.confirmPassword = "Confirme sua senha.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "As senhas não coincidem.";
  }

  return errors;
}

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<CadastroFieldErrors>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const nextErrors = validateCadastro(name, email, password, confirmPassword);
    setErrors(nextErrors);
    setAuthError(null);
    setSuccessMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: SIGNUP_CONFIRMATION_REDIRECT_URL,
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (error) {
        setAuthError(getAuthErrorMessage(error.message, "Não foi possível criar a conta. Tente novamente."));
      } else if (!data.session) {
        setSuccessMessage("Conta criada. Verifique seu e-mail para confirmar o cadastro.");
      }
    } catch {
      setAuthError("Não foi possível criar a conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenContainer scrollable style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <AppText variant="Heading 1" style={styles.title}>
            Criar conta
          </AppText>
        </View>

        <View style={styles.form}>
          <Input
            autoComplete="name"
            error={errors.name}
            label="Nome"
            onChangeText={setName}
            placeholder="Seu nome"
            textContentType="name"
            value={name}
          />
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
            autoComplete="new-password"
            error={errors.password}
            label="Senha"
            onChangeText={setPassword}
            placeholder="Crie uma senha"
            textContentType="newPassword"
            value={password}
          />
          <PasswordInput
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirmar senha"
            onChangeText={setConfirmPassword}
            placeholder="Repita sua senha"
            textContentType="newPassword"
            value={confirmPassword}
          />
        </View>

        <View style={styles.actions}>
          {authError ? (
            <AppText accessibilityRole="alert" variant="Small/Helper" style={styles.errorMessage}>
              {authError}
            </AppText>
          ) : null}
          {successMessage ? (
            <AppText accessibilityRole="alert" variant="Small/Helper" style={styles.successMessage}>
              {successMessage}
            </AppText>
          ) : null}
          <Button loading={isSubmitting} onPress={handleSubmit} variant="primary">
            Criar conta
          </Button>
          <Button disabled={isSubmitting} onPress={() => router.push("/login")} variant="ghost">
            Já tenho uma conta
          </Button>
          <LegalAgreementFooter />
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
