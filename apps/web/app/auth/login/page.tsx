import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <AuthShell
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link className="font-semibold text-[var(--ww-purple)] hover:underline" href="/auth/sign-up">
            Create your account
          </Link>
        </>
      }
      mode="login"
    >
      <LoginForm />
    </AuthShell>
  );
}
