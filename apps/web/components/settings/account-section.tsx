"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { softDeleteAccount } from "@/lib/settings/actions";
import { createClient } from "@/lib/supabase/client";

const MIN_PASSWORD_LENGTH = 6;

function changePasswordErrorMessage(error: unknown): string {
  const code = (error as { code?: string } | null)?.code;

  switch (code) {
    case "same_password":
      return "Choose a password you haven't used before.";
    case "weak_password":
      return "That password doesn't meet our security requirements. Try a longer one.";
    case "session_not_found":
    case "session_expired":
      return "Your session has expired. Please sign in again.";
    case "over_request_rate_limit":
      return "Too many attempts. Please wait a moment and try again.";
    case "reauthentication_needed":
      return "Please sign in again before changing your password.";
    default:
      return "We couldn't update your password. Please try again.";
  }
}

function ChangePasswordCard() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSaving) {
      return;
    }
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    setIsSaving(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        const message = changePasswordErrorMessage(updateError);
        setError(message);
        toast.error(message);
        return;
      }

      setPassword("");
      setConfirmPassword("");
      toast.success("Password updated.");
    } catch {
      const message = "We couldn't update your password. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Choose a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              aria-describedby={error ? "password-error" : undefined}
              aria-invalid={Boolean(error)}
              autoComplete="new-password"
              disabled={isSaving}
              id="new-password"
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
              }}
              required
              type="password"
              value={password}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              aria-describedby={error ? "password-error" : undefined}
              aria-invalid={Boolean(error)}
              autoComplete="new-password"
              disabled={isSaving}
              id="confirm-password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setError(null);
              }}
              required
              type="password"
              value={confirmPassword}
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" id="password-error" role="alert">
              {error}
            </p>
          ) : null}

          <Button disabled={isSaving} type="submit">
            {isSaving ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function SessionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session</CardTitle>
        <CardDescription>Sign out of Word Wizards on this device.</CardDescription>
      </CardHeader>
      <CardContent>
        <LogoutButton />
      </CardContent>
    </Card>
  );
}

function DangerZoneCard() {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivate = async () => {
    setError(null);
    setIsDeactivating(true);

    try {
      const result = await softDeleteAccount();
      if (!result.ok) {
        if (result.deferred) {
          toast.info(result.error);
          return;
        }
        setError(result.error);
        toast.error(result.error);
        return;
      }

      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError("Your account was deactivated, but signing out failed. Please sign out manually.");
        toast.error("We couldn't sign you out. Please sign out manually.");
        return;
      }

      toast.success("Your account has been deactivated.");
      router.push("/auth/login");
    } catch {
      const message = "We couldn't deactivate your account. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsDeactivating(false);
    }
  };

  const cancel = () => {
    setIsConfirming(false);
    setConfirmation("");
    setError(null);
  };

  return (
    <Card className="ring-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive">Deactivate account</CardTitle>
        <CardDescription>Deactivates your account and signs you out. Your learning progress is kept.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Not enabled yet — account deactivation arrives with the profile database.
        </p>
        {isConfirming ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="delete-confirmation">Type DEACTIVATE to confirm</Label>
              <Input
                autoComplete="off"
                id="delete-confirmation"
                onChange={(event) => setConfirmation(event.target.value)}
                value={confirmation}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <div className="flex flex-wrap gap-2">
              <Button
                disabled={confirmation !== "DEACTIVATE" || isDeactivating}
                onClick={handleDeactivate}
                type="button"
                variant="destructive"
              >
                {isDeactivating ? "Deactivating..." : "Deactivate account"}
              </Button>
              <Button onClick={cancel} type="button" variant="ghost">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <Button onClick={() => setIsConfirming(true)} type="button" variant="destructive">
            Deactivate account
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function AccountSection() {
  return (
    <section aria-labelledby="account-heading" className="space-y-4">
      <h2 className="font-heading text-xl font-semibold" id="account-heading">
        Account
      </h2>
      <ChangePasswordCard />
      <SessionCard />
      <DangerZoneCard />
    </section>
  );
}
