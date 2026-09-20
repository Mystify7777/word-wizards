import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { getAuthErrorCode } from "@/components/auth/auth-errors";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(searchParams.get("next"), "/protected/learner", origin);

  if (!tokenHash || !type) redirect("/auth/error?error=missing_confirmation_token");

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });

  if (error) {
    const errorCode = getAuthErrorCode(error) ?? "confirmation_failed";
    console.error("Email confirmation failed", { code: errorCode });
    redirect(`/auth/error?error=${encodeURIComponent(errorCode)}`);
  }

  redirect(next);
}
