import {
  useCallback,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";

import {
  establishPasswordRecoverySession,
  isPasswordRecoveryUrl,
} from "../lib/auth-recovery";
import { supabase } from "../lib/supabase";

export type PasswordRecoveryLinkState = "idle" | "processing" | "valid" | "invalid";

export type AuthContextValue = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isPasswordRecovery: boolean;
  isPasswordRecoveryLinkReady: boolean;
  passwordRecoveryLinkState: PasswordRecoveryLinkState;
  beginPasswordRecovery: () => void;
  clearPasswordRecovery: () => void;
  abandonPasswordRecovery: () => Promise<void>;
  signOut: () => Promise<void>;
  clearLocalSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const passwordRecoveryStorageKey = "subtrack.password-recovery";

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [isPasswordRecoveryLinkReady, setIsPasswordRecoveryLinkReady] = useState(false);
  const [passwordRecoveryLinkState, setPasswordRecoveryLinkState] =
    useState<PasswordRecoveryLinkState>("idle");
  const passwordRecoveryRef = useRef(false);
  const hasValidatedRecoveryLinkRef = useRef(false);
  const isProcessingRecoveryLinkRef = useRef(false);

  const persistPasswordRecovery = useCallback(async (nextValue: boolean) => {
    try {
      if (nextValue) {
        await AsyncStorage.setItem(passwordRecoveryStorageKey, "true");
      } else {
        await AsyncStorage.removeItem(passwordRecoveryStorageKey);
      }
    } catch {
      // A sessão continua protegida em memória caso o armazenamento local falhe.
    }
  }, []);

  const setPasswordRecovery = useCallback((nextValue: boolean) => {
    if (passwordRecoveryRef.current === nextValue) {
      return;
    }

    passwordRecoveryRef.current = nextValue;
    setIsPasswordRecovery(nextValue);
    void persistPasswordRecovery(nextValue);
  }, [persistPasswordRecovery]);

  const beginPasswordRecovery = useCallback(() => {
    setPasswordRecovery(true);
  }, [setPasswordRecovery]);

  const clearPasswordRecovery = useCallback(() => {
    hasValidatedRecoveryLinkRef.current = false;
    setPasswordRecovery(false);
    setPasswordRecoveryLinkState("idle");
    void persistPasswordRecovery(false);
  }, [persistPasswordRecovery, setPasswordRecovery]);

  const abandonPasswordRecovery = useCallback(async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      throw error;
    }

    clearPasswordRecovery();
  }, [clearPasswordRecovery]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, []);

  const clearLocalSession = useCallback(async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
    } catch {
      // A conta pode já ter sido removida do Auth; o estado local ainda precisa ser limpo.
    } finally {
      hasValidatedRecoveryLinkRef.current = false;
      passwordRecoveryRef.current = false;
      setSession(null);
      setUser(null);
      setIsPasswordRecovery(false);
      setPasswordRecoveryLinkState("idle");

      try {
        await AsyncStorage.removeItem(passwordRecoveryStorageKey);
      } catch {
        // A rota protegida continua bloqueada em memória se o armazenamento local falhar.
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();
        const storedPasswordRecovery = await AsyncStorage.getItem(passwordRecoveryStorageKey).catch(
          () => null,
        );

        if (!isMounted) {
          return;
        }

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        const shouldKeepPasswordRecovery =
          passwordRecoveryRef.current ||
          (initialSession !== null && storedPasswordRecovery === "true");

        setPasswordRecovery(shouldKeepPasswordRecovery);

        if (!initialSession && storedPasswordRecovery === "true" && !passwordRecoveryRef.current) {
          void persistPasswordRecovery(false);
        }
      } catch {
        if (!isMounted) {
          return;
        }

        setSession(null);
        setUser(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return;
      }

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (_event === "PASSWORD_RECOVERY") {
        beginPasswordRecovery();
      } else if (_event === "SIGNED_OUT") {
        clearPasswordRecovery();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [beginPasswordRecovery, clearPasswordRecovery, persistPasswordRecovery, setPasswordRecovery]);

  useEffect(() => {
    let isMounted = true;

    async function processRecoveryUrl(url: string) {
      if (
        !isPasswordRecoveryUrl(url) ||
        isProcessingRecoveryLinkRef.current ||
        hasValidatedRecoveryLinkRef.current
      ) {
        return;
      }

      isProcessingRecoveryLinkRef.current = true;
      beginPasswordRecovery();
      setPasswordRecoveryLinkState("processing");

      try {
        const result = await establishPasswordRecoverySession(url);

        if (!isMounted) {
          return;
        }

        if (result.status === "success") {
          hasValidatedRecoveryLinkRef.current = true;
          setPasswordRecoveryLinkState("valid");
          return;
        }

        setPasswordRecovery(false);
        setPasswordRecoveryLinkState("invalid");
      } catch {
        if (isMounted) {
          setPasswordRecovery(false);
          setPasswordRecoveryLinkState("invalid");
        }
      } finally {
        isProcessingRecoveryLinkRef.current = false;
      }
    }

    async function processInitialUrl() {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl) {
          await processRecoveryUrl(initialUrl);
        }
      } catch {
        // A rota de recuperação exibirá o estado inválido se não houver uma URL processável.
      } finally {
        if (isMounted) {
          setIsPasswordRecoveryLinkReady(true);
        }
      }
    }

    void processInitialUrl();

    const subscription = Linking.addEventListener("url", ({ url }) => {
      void processRecoveryUrl(url);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [beginPasswordRecovery, setPasswordRecovery]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      isLoading,
      isPasswordRecovery,
      isPasswordRecoveryLinkReady,
      passwordRecoveryLinkState,
      beginPasswordRecovery,
      clearPasswordRecovery,
      abandonPasswordRecovery,
      signOut,
      clearLocalSession,
    }),
    [
      abandonPasswordRecovery,
      beginPasswordRecovery,
      clearPasswordRecovery,
      clearLocalSession,
      isLoading,
      isPasswordRecovery,
      isPasswordRecoveryLinkReady,
      passwordRecoveryLinkState,
      session,
      signOut,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
