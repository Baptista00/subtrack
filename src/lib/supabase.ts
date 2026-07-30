import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  const missingVariables = [
    !supabaseUrl ? "EXPO_PUBLIC_SUPABASE_URL" : null,
    !supabasePublishableKey ? "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY" : null,
  ].filter((variableName): variableName is string => variableName !== null);

  throw new Error(
    `Configuração do Supabase ausente. Configure: ${missingVariables.join(", ")}.`,
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
