import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <AuthShell
      footer={
        <>
          Already have an account?{" "}
          <Link className="font-semibold text-[var(--ww-purple)] hover:underline" href="/auth/login">
            Sign in
          </Link>
        </>
      }
      mode="sign-up"
    >
      <SignUpForm />
    </AuthShell>
  );
}
