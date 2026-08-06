import { corsHeaders } from "npm:@supabase/supabase-js@2.111.0/cors";
import { createClient } from "npm:@supabase/supabase-js@2.111.0";

type FunctionConfiguration = {
  supabaseUrl: string;
  publishableKey: string;
  serviceRoleKey: string;
};

type FunctionResponse = { success: true } | { error: string };

Deno.serve(async (request: Request): Promise<Response> => {
  if (request.method === "OPTIONS") {
    return createResponse({ success: true });
  }

  if (request.method !== "POST") {
    return createResponse(
      { error: "Método não permitido." },
      405,
      { Allow: "POST, OPTIONS" },
    );
  }

  const accessToken = getAccessToken(request);

  if (!accessToken) {
    return createResponse({ error: "Não autorizado." }, 401);
  }

  const configuration = getFunctionConfiguration();

  if (!configuration) {
    return createResponse({ error: "Não foi possível concluir a exclusão da conta." }, 500);
  }

  try {
    const userSupabase = createClient(configuration.supabaseUrl, configuration.publishableKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
    const {
      data: { user: authenticatedUser },
      error: userError,
    } = await userSupabase.auth.getUser(accessToken);

    if (userError || !authenticatedUser) {
      return createResponse({ error: "Não autorizado." }, 401);
    }

    const supabaseAdmin = createClient(
      configuration.supabaseUrl,
      configuration.serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(
      authenticatedUser.id,
    );

    if (deleteUserError) {
      return createResponse({ error: "Não foi possível concluir a exclusão da conta." }, 500);
    }

    return createResponse({ success: true });
  } catch {
    return createResponse({ error: "Não foi possível concluir a exclusão da conta." }, 500);
  }
});

function createResponse(
  body: FunctionResponse,
  status = 200,
  additionalHeaders: Record<string, string> = {},
): Response {
  return Response.json(body, {
    status,
    headers: {
      ...corsHeaders,
      ...additionalHeaders,
    },
  });
}

function getAccessToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization");

  if (!authorization) {
    return null;
  }

  const matches = /^Bearer\s+(.+)$/.exec(authorization.trim());
  const accessToken = matches?.[1]?.trim();

  return accessToken || null;
}

function getFunctionConfiguration(): FunctionConfiguration | null {
  const supabaseUrl = getNonEmptyEnvironmentValue("SUPABASE_URL");
  const publishableKey = getSupabaseKey(
    "SUPABASE_PUBLISHABLE_KEYS",
    ["SUPABASE_PUBLISHABLE_KEY", "SUPABASE_ANON_KEY"],
  );
  const serviceRoleKey = getSupabaseKey(
    "SUPABASE_SECRET_KEYS",
    ["SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
  );

  if (!supabaseUrl || !publishableKey || !serviceRoleKey) {
    return null;
  }

  return {
    supabaseUrl,
    publishableKey,
    serviceRoleKey,
  };
}

function getSupabaseKey(
  keysEnvironmentName: string,
  fallbackEnvironmentNames: readonly string[],
): string | null {
  const keyFromDictionary = getDefaultKeyFromDictionary(
    Deno.env.get(keysEnvironmentName),
  );

  if (keyFromDictionary) {
    return keyFromDictionary;
  }

  for (const environmentName of fallbackEnvironmentNames) {
    const key = getNonEmptyEnvironmentValue(environmentName);

    if (key) {
      return key;
    }
  }

  return null;
}

function getDefaultKeyFromDictionary(serializedKeys: string | undefined): string | null {
  if (!serializedKeys) {
    return null;
  }

  try {
    const parsedKeys: unknown = JSON.parse(serializedKeys);

    if (!isRecord(parsedKeys)) {
      return null;
    }

    const defaultKey = parsedKeys.default;

    return typeof defaultKey === "string" && defaultKey.trim() ? defaultKey : null;
  } catch {
    return null;
  }
}

function getNonEmptyEnvironmentValue(environmentName: string): string | null {
  const value = Deno.env.get(environmentName)?.trim();

  return value || null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
