import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <AuthShell
      description="Create your account and start building practical English skills."
      eyebrow="Get started"
      footer={
        <>
          Already have an account?{" "}
          <Link className="font-semibold text-[#6C4CF6] hover:underline" href="/auth/login">
            Log in
          </Link>
        </>
      }
      title="Start learning English"
    >
      <SignUpForm />
    </AuthShell>
  );
}
