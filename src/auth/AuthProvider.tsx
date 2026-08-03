import {
  useCallback,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

export type AuthContextValue = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isPasswordRecovery: boolean;
  beginPasswordRecovery: () => void;
  clearPasswordRecovery: () => void;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const passwordRecoveryRef = useRef(false);

  const setPasswordRecovery = useCallback((nextValue: boolean) => {
    if (passwordRecoveryRef.current === nextValue) {
      return;
    }

    passwordRecoveryRef.current = nextValue;
    setIsPasswordRecovery(nextValue);
  }, []);

  const beginPasswordRecovery = useCallback(() => {
    setPasswordRecovery(true);
  }, [setPasswordRecovery]);

  const clearPasswordRecovery = useCallback(() => {
    setPasswordRecovery(false);
  }, [setPasswordRecovery]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        setSession(initialSession);
        setUser(initialSession?.user ?? null);
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
        setPasswordRecovery(true);
      } else if (_event === "SIGNED_OUT") {
        setPasswordRecovery(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setPasswordRecovery]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      isLoading,
      isPasswordRecovery,
      beginPasswordRecovery,
      clearPasswordRecovery,
      signOut,
    }),
    [
      beginPasswordRecovery,
      clearPasswordRecovery,
      isLoading,
      isPasswordRecovery,
      session,
      signOut,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
