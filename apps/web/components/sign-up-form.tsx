"use client";

import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { getFriendlyAuthError } from "@/components/auth/auth-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_LEARNER_ROUTE = "/protected/learner";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      const message = getFriendlyAuthError("password_mismatch");
      setError(message);
      toast.error("Passwords don't match", { description: message });
      return;
    }

    if (!acceptTerms) {
      const message = "Please agree to the Terms of Service and Privacy Policy to continue.";
      setError(message);
      toast.error("Terms required", { description: message });
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const next = safeNextPath(new URLSearchParams(window.location.search).get("next"), DEFAULT_LEARNER_ROUTE);
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        options: {
          data: { username },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
        password,
      });

      if (authError) {
        console.error("Password sign-up failed", authError);
        throw authError;
      }

      if (data.session) {
        toast.success("Account created", { description: "Welcome to Word Wizards." });
        router.push(next);
      } else {
        toast.success("Check your email", { description: "Confirm your account before signing in." });
        router.push("/auth/sign-up-success");
      }
    } catch (authError) {
      const message = getFriendlyAuthError(authError, "We couldn't create your account. Please try again.");
      setError(message);
      toast.error("Sign-up failed", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const supabase = createClient();
    setIsGoogleLoading(true);
    setError(null);

    try {
      const next = safeNextPath(new URLSearchParams(window.location.search).get("next"), DEFAULT_LEARNER_ROUTE);
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error: authError } = await supabase.auth.signInWithOAuth({ options: { redirectTo }, provider: "google" });
      if (authError) {
        console.error("Google sign-up failed", authError);
        throw authError;
      }
    } catch (authError) {
      const message = getFriendlyAuthError(authError, "We couldn't start Google sign-up. Please try again.");
      setError(message);
      toast.error("Google sign-up failed", { description: message });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Button
        className="h-12 w-full rounded-md border-[#DCE0EA] bg-white font-semibold normal-case tracking-normal text-[#111A46] shadow-none hover:bg-[#F8F6FF]"
        disabled={isLoading || isGoogleLoading}
        onClick={handleGoogleSignUp}
        type="button"
        variant="outline"
      >
        <Image alt="" aria-hidden="true" height={20} src="/auth/google-g.svg" width={20} />
        {isGoogleLoading ? "Connecting to Google..." : "Sign up with Google"}
      </Button>
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="h-px flex-1 bg-[#E4E7EE]" />
        <span className="text-xs font-medium text-[#94A3B8]">or</span>
        <span className="h-px flex-1 bg-[#E4E7EE]" />
      </div>

      <form onSubmit={handleSignUp}>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label className="normal-case tracking-normal text-sm font-medium text-[#334155]" htmlFor="signup-email">
              Email
            </Label>
            <div className="relative">
              <EnvelopeSimpleIcon
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#94A3B8]"
              />
              <Input
                autoComplete="email"
                className="h-11 rounded-md border border-[#DCE0EA] bg-white px-10 text-sm shadow-none focus-visible:border-[#6C4CF6] focus-visible:ring-[#6C4CF6]/20"
                id="signup-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="normal-case tracking-normal text-sm font-medium text-[#334155]" htmlFor="signup-username">
              Username
            </Label>
            <div className="relative">
              <UserIcon
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#94A3B8]"
              />
              <Input
                autoComplete="username"
                className="h-11 rounded-md border border-[#DCE0EA] bg-white px-10 text-sm shadow-none focus-visible:border-[#6C4CF6] focus-visible:ring-[#6C4CF6]/20"
                id="signup-username"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                required
                type="text"
                value={username}
              />
            </div>
            <p className="text-xs text-[#94A3B8]">This will be your display name.</p>
          </div>
          <div className="grid gap-2">
            <Label className="normal-case tracking-normal text-sm font-medium text-[#334155]" htmlFor="signup-password">
              Password
            </Label>
            <div className="relative">
              <LockKeyIcon
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#94A3B8]"
              />
              <Input
                autoComplete="new-password"
                className="h-11 rounded-md border border-[#DCE0EA] bg-white px-10 pr-11 text-sm shadow-none focus-visible:border-[#6C4CF6] focus-visible:ring-[#6C4CF6]/20"
                id="signup-password"
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
                {showPassword ? (
                  <EyeSlashIcon aria-hidden="true" className="size-4" />
                ) : (
                  <EyeIcon aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label
              className="normal-case tracking-normal text-sm font-medium text-[#334155]"
              htmlFor="signup-repeat-password"
            >
              Confirm password
            </Label>
            <div className="relative">
              <LockKeyIcon
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-[#94A3B8]"
              />
              <Input
                autoComplete="new-password"
                className="h-11 rounded-md border border-[#DCE0EA] bg-white px-10 pr-11 text-sm shadow-none focus-visible:border-[#6C4CF6] focus-visible:ring-[#6C4CF6]/20"
                id="signup-repeat-password"
                onChange={(event) => setRepeatPassword(event.target.value)}
                required
                type={showRepeatPassword ? "text" : "password"}
                value={repeatPassword}
              />
              <button
                aria-label={showRepeatPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-sm text-[#94A3B8] hover:text-[#334155] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4CF6]"
                onClick={() => setShowRepeatPassword((visible) => !visible)}
                type="button"
              >
                {showRepeatPassword ? (
                  <EyeSlashIcon aria-hidden="true" className="size-4" />
                ) : (
                  <EyeIcon aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>
          {error ? (
            <p
              className="rounded-md border border-[#FECACA] bg-[#FFF7F7] px-3 py-2.5 text-sm leading-5 text-[#B91C1C]"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          <label className="flex items-start gap-2.5 text-xs leading-5 text-[#64748B]">
            <input
              checked={acceptTerms}
              className="mt-0.5 size-4 shrink-0 accent-[#6C4CF6]"
              onChange={(event) => setAcceptTerms(event.target.checked)}
              type="checkbox"
            />
            <span>
              I agree to the{" "}
              <Link className="font-semibold text-[#6C4CF6] hover:underline" href="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="font-semibold text-[#6C4CF6] hover:underline" href="/privacy">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <Button
            className="h-12 w-full rounded-md bg-[#6C4CF6] font-semibold normal-case tracking-normal text-white shadow-none hover:bg-[#5B3FE0]"
            disabled={isLoading || isGoogleLoading}
            type="submit"
          >
            {isLoading ? "Creating account..." : "Create account"}
            <ArrowRightIcon aria-hidden="true" className="size-4" weight="bold" />
          </Button>
        </div>
      </form>
    </div>
  );
}
