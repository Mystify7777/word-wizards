"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_LEARNER_ROUTE = "/protected/learner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(safeNextPath(next, DEFAULT_LEARNER_ROUTE));
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    setIsGoogleLoading(true);
    setError(null);
    try {
      const next = new URLSearchParams(window.location.search).get("next");
      const safeNext = safeNextPath(next, DEFAULT_LEARNER_ROUTE);
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;
      const { error } = await supabase.auth.signInWithOAuth({ options: { redirectTo }, provider: "google" });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred during Google login");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_40px_rgba(17,26,70,0.06)] sm:p-6">
      <div className="flex flex-col gap-5">
        <Button className="h-11 w-full gap-2 rounded-md border-[#E5E7EB] bg-white text-[#111A46] hover:bg-[#F8F6FF]" disabled={isLoading || isGoogleLoading} onClick={handleGoogleLogin} type="button" variant="outline">
          <span className="text-base font-bold text-[#4285F4]" aria-hidden="true">G</span>
          {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
        </Button>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-[#E5E7EB]" />
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#94A3B8]">or</span>
          <span className="h-px flex-1 bg-[#E5E7EB]" />
        </div>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label className="text-[#111A46]" htmlFor="email">Email</Label>
              <Input className="h-11 rounded-md border-[#E5E7EB] bg-[#FFFCF7] focus-visible:ring-[#6C4CF6]" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required type="email" value={email} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-4">
                <Label className="text-[#111A46]" htmlFor="password">Password</Label>
                <Link className="text-xs font-medium text-[#6C4CF6] hover:underline" href="/auth/forgot-password">Forgot password?</Link>
              </div>
              <Input className="h-11 rounded-md border-[#E5E7EB] bg-[#FFFCF7] focus-visible:ring-[#6C4CF6]" id="password" onChange={(e) => setPassword(e.target.value)} required type="password" value={password} />
            </div>
            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">{error}</p>}
            <Button className="h-11 w-full rounded-md bg-[#F97316] font-semibold text-white hover:bg-[#ea650d]" disabled={isLoading || isGoogleLoading} type="submit">{isLoading ? "Logging in..." : "Log in"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
