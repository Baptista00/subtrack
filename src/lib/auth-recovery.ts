import * as Linking from "expo-linking";
import { Platform } from "react-native";

import { supabase } from "./supabase";

type RecoveryTokens = {
  accessToken: string;
  refreshToken: string;
};

export type PasswordRecoveryResult =
  | { status: "success" }
  | { status: "invalid" };

const passwordRecoveryPath = "/redefinir-senha";

export function getPasswordRecoveryRedirectUrl(): string {
  if (Platform.OS === "web") {
    return Linking.createURL(passwordRecoveryPath);
  }

  return "subtrack://redefinir-senha";
}

export async function establishPasswordRecoverySession(
  url: string,
): Promise<PasswordRecoveryResult> {
  const parameters = getRecoveryParameters(url);

  if (!parameters) {
    return { status: "invalid" };
  }

  const code =
    getNonEmptyParameter(parameters.query, "code") ??
    getNonEmptyParameter(parameters.fragment, "code");

  if (code) {
    return await establishSessionFromCode(code);
  }

  if (!hasRecoveryType(parameters)) {
    return { status: "invalid" };
  }

  const tokens =
    getRecoveryTokens(parameters.query) ?? getRecoveryTokens(parameters.fragment);

  if (!tokens) {
    return { status: "invalid" };
  }

  return await establishSessionFromTokens(tokens);
}

function getRecoveryParameters(url: string): {
  query: URLSearchParams;
  fragment: URLSearchParams;
} | null {
  try {
    const parsedUrl = new URL(url);

    return {
      query: parsedUrl.searchParams,
      fragment: new URLSearchParams(parsedUrl.hash.replace(/^#/, "")),
    };
  } catch {
    return null;
  }
}

function getNonEmptyParameter(parameters: URLSearchParams, name: string): string | null {
  const value = parameters.get(name);

  return value && value.trim() ? value : null;
}

function hasRecoveryType(parameters: {
  query: URLSearchParams;
  fragment: URLSearchParams;
}): boolean {
  return (
    parameters.query.get("type") === "recovery" ||
    parameters.fragment.get("type") === "recovery"
  );
}

function getRecoveryTokens(parameters: URLSearchParams): RecoveryTokens | null {
  const accessToken = getNonEmptyParameter(parameters, "access_token");
  const refreshToken = getNonEmptyParameter(parameters, "refresh_token");

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

async function establishSessionFromCode(code: string): Promise<PasswordRecoveryResult> {
  let didReceivePasswordRecovery = false;
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event) => {
    if (event === "PASSWORD_RECOVERY") {
      didReceivePasswordRecovery = true;
    }
  });

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session || !didReceivePasswordRecovery) {
      if (data.session) {
        await supabase.auth.signOut({ scope: "local" });
      }

      return { status: "invalid" };
    }

    return { status: "success" };
  } catch {
    return { status: "invalid" };
  } finally {
    subscription.unsubscribe();
  }
}

async function establishSessionFromTokens(
  tokens: RecoveryTokens,
): Promise<PasswordRecoveryResult> {
  try {
    const { data, error } = await supabase.auth.setSession({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });

    if (error || !data.session) {
      return { status: "invalid" };
    }

    return { status: "success" };
  } catch {
    return { status: "invalid" };
  }
}
