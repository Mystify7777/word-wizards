import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <AuthShell
      description="Sign in to continue learning where you left off."
      eyebrow="Welcome back"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link className="font-semibold text-[#6C4CF6] hover:underline" href="/auth/sign-up">
            Create one
          </Link>
        </>
      }
      title="Continue your learning"
    >
      <LoginForm />
    </AuthShell>
  );
}
