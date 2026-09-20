import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getAuthErrorCode } from "@/components/auth/auth-errors";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"), "/protected/learner", origin);

  if (!code) return NextResponse.redirect(\`\${origin}/auth/error?error=missing_auth_code\`);

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const errorCode = getAuthErrorCode(error) ?? "oauth_callback_failed";
    console.error("Auth callback failed", { code: errorCode });
    return NextResponse.redirect(\`\${origin}/auth/error?error=\${encodeURIComponent(errorCode)}\`);
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  if (process.env.NODE_ENV === "development") return NextResponse.redirect(\`\${origin}\${next}\`);
  if (forwardedHost) return NextResponse.redirect(\`https://\${forwardedHost}\${next}\`);
  return NextResponse.redirect(\`\${origin}\${next}\`);
}
