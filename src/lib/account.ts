import { supabase } from "./supabase";

export type DeleteCurrentAccountResult =
  | { status: "success" }
  | { status: "error" };

type DeleteAccountFunctionResponse = {
  success: true;
};

export async function deleteCurrentAccount(): Promise<DeleteCurrentAccountResult> {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.access_token) {
      return { status: "error" };
    }

    const { data, error } = await supabase.functions.invoke<unknown>("delete-account", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error || !isDeleteAccountFunctionResponse(data)) {
      return { status: "error" };
    }

    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}

function isDeleteAccountFunctionResponse(value: unknown): value is DeleteAccountFunctionResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    value.success === true
  );
}
