"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_LEARNER_ROUTE = "/protected/learner";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(DEFAULT_LEARNER_ROUTE)}` },
        password,
      });
      if (error) throw error;
      if (data.session) router.push(DEFAULT_LEARNER_ROUTE);
      else router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const supabase = createClient();
    setIsGoogleLoading(true);
    setError(null);
    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(DEFAULT_LEARNER_ROUTE)}`;
      const { error } = await supabase.auth.signInWithOAuth({ options: { redirectTo }, provider: "google" });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred during Google sign up");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_40px_rgba(17,26,70,0.06)] sm:p-6">
      <div className="flex flex-col gap-5">
        <Button className="h-11 w-full gap-2 rounded-md border-[#E5E7EB] bg-white text-[#111A46] hover:bg-[#F8F6FF]" disabled={isLoading || isGoogleLoading} onClick={handleGoogleSignUp} type="button" variant="outline">
          <span className="text-base font-bold text-[#4285F4]" aria-hidden="true">G</span>
          {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
        </Button>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-[#E5E7EB]" />
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#94A3B8]">or</span>
          <span className="h-px flex-1 bg-[#E5E7EB]" />
        </div>

        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label className="text-[#111A46]" htmlFor="email">Email</Label>
              <Input className="h-11 rounded-md border-[#E5E7EB] bg-[#FFFCF7] focus-visible:ring-[#6C4CF6]" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required type="email" value={email} />
            </div>
            <div className="grid gap-2">
              <Label className="text-[#111A46]" htmlFor="password">Password</Label>
              <Input className="h-11 rounded-md border-[#E5E7EB] bg-[#FFFCF7] focus-visible:ring-[#6C4CF6]" id="password" onChange={(e) => setPassword(e.target.value)} required type="password" value={password} />
            </div>
            <div className="grid gap-2">
              <Label className="text-[#111A46]" htmlFor="repeat-password">Repeat Password</Label>
              <Input className="h-11 rounded-md border-[#E5E7EB] bg-[#FFFCF7] focus-visible:ring-[#6C4CF6]" id="repeat-password" onChange={(e) => setRepeatPassword(e.target.value)} required type="password" value={repeatPassword} />
            </div>
            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">{error}</p>}
            <Button className="h-11 w-full rounded-md bg-[#F97316] font-semibold text-white hover:bg-[#ea650d]" disabled={isLoading || isGoogleLoading} type="submit">{isLoading ? "Creating account..." : "Create account"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
