"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { getFriendlyAuthError } from "@/components/auth/auth-errors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (authError) throw authError;
      setSuccess(true);
      toast.success("Reset email sent", { description: "Check your inbox for the password reset link." });
    } catch (authError) {
      const message = getFriendlyAuthError(authError, "We couldn't send the reset email. Please try again.");
      setError(message);
      toast.error("Password reset failed", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{success ? "Check Your Email" : "Reset Your Password"}</CardTitle>
          <CardDescription>{success ? "Password reset instructions sent." : "Enter your email and we'll send you a reset link."}</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-sm text-muted-foreground">Check your inbox, then follow the link to choose a new password.</p>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" onChange={(event) => setEmail(event.target.value)} placeholder="m@example.com" required type="email" value={email} />
                </div>
                {error ? <p className="text-sm text-red-500" role="alert">{error}</p> : null}
                <Button className="w-full" disabled={isLoading} type="submit">
                  {isLoading ? "Sending..." : "Send reset email"}
                </Button>
              </div>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link className="underline underline-offset-4" href="/auth/login">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
