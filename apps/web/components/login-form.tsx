"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRightIcon, EnvelopeSimpleIcon, EyeIcon, EyeSlashIcon, LockKeyIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import { getFriendlyAuthError } from "@/components/auth/auth-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_LEARNER_ROUTE = "/protected/learner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        console.error("Password sign-in failed", authError);
        throw authError;
      }
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(safeNextPath(next, DEFAULT_LEARNER_ROUTE));
    } catch (authError) {
      const message = getFriendlyAuthError(authError, "We couldn't sign you in. Please try again.");
      setError(message);
      toast.error("Sign-in failed", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    setIsGoogleLoading(true);
    setError(null);

    try {
      const next = safeNextPath(new URLSearchParams(window.location.search).get("next"), DEFAULT_LEARNER_ROUTE);
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error: authError } = await supabase.auth.signInWithOAuth({
        options: { redirectTo },
        provider: "google",
      });
      if (authError) {
        console.error("Google sign-in failed", authError);
        throw authError;
      }
    } catch (authError) {
      const message = getFriendlyAuthError(authError, "We couldn't start Google sign-in. Please try again.");
      setError(message);
      toast.error("Google sign-in failed", { description: message });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Button
        className="h-12 w-full rounded-md border-[#DCE0EA] bg-white font-semibold normal-case tracking-normal text-[#111A46] shadow-none hover:bg-[#F8F6FF]"
        disabled={isLoading || isGoogleLoading}
        onClick={handleGoogleLogin}
        type="button"
        variant="outline"
      >
        <Image src="/auth/google-g.svg" alt="" aria-hidden="true" width={20} height={20} />
        {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
      </Button>
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="h-px flex-1 bg-[#E4E7EE]" />
        <span className="text-xs font-medium text-[#94A3B8]">or</span>
        <span className="h-px flex-1 bg-[#E4E7EE]" />
      </div>

      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label className="normal-case tracking-normal text-sm font-medium text-[#334155]" htmlFor="login-email">
              Email
            </Label>
            <div className="relative">
              <EnvelopeSimpleIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                autoComplete="email"
                className="h-11 rounded-md border border-[#DCE0EA] bg-white px-10 text-sm shadow-none focus-visible:border-[#6C4CF6] focus-visible:ring-[#6C4CF6]/20"
                id="login-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label className="normal-case tracking-normal text-sm font-medium text-[#334155]" htmlFor="login-password">
                Password
              </Label>
              <Link className="text-xs font-semibold text-[#6C4CF6] hover:underline" href="/auth/forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <LockKeyIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                autoComplete="current-password"
                className="h-11 rounded-md border border-[#DCE0EA] bg-white px-10 pr-11 text-sm shadow-none focus-visible:border-[#6C4CF6] focus-visible:ring-[#6C4CF6]/20"
                id="login-password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-sm text-[#94A3B8] hover:text-[#334155] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4CF6]"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? <EyeSlashIcon aria-hidden="true" className="size-4" /> : <EyeIcon aria-hidden="true" className="size-4" />}
              </button>
            </div>
          </div>
          {error ? (
            <p className="rounded-md border border-[#FECACA] bg-[#FFF7F7] px-3 py-2.5 text-sm leading-5 text-[#B91C1C]" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            className="h-12 w-full rounded-md bg-[#6C4CF6] font-semibold normal-case tracking-normal text-white shadow-none hover:bg-[#5B3FE0]"
            disabled={isLoading || isGoogleLoading}
            type="submit"
          >
            {isLoading ? "Signing in..." : "Continue your journey"}
            <ArrowRightIcon aria-hidden="true" className="size-4" weight="bold" />
          </Button>
        </div>
      </form>
    </div>
  );
}
