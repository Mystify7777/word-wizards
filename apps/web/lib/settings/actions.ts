"use server";

import type { SettingsActionResult } from "@/lib/settings/types";
import { createClient } from "@/lib/supabase/server";

const DEFERRED_ERROR = "Profile persistence is not yet available.";

export async function updateProfile(input: { displayName: string }): Promise<SettingsActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You are not signed in.", ok: false };
  }

  const displayName = typeof input?.displayName === "string" ? input.displayName.trim() : "";

  if (!displayName) {
    return { error: "Display name is required.", ok: false };
  }
  if (displayName.length > 60) {
    return { error: "Display name must be 60 characters or fewer.", ok: false };
  }

  return { deferred: true, error: DEFERRED_ERROR, ok: false };
}

export async function softDeleteAccount(): Promise<SettingsActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You are not signed in.", ok: false };
  }

  return { deferred: true, error: DEFERRED_ERROR, ok: false };
}
