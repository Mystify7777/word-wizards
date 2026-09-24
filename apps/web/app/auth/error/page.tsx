import Image from "next/image";
import Link from "next/link";

import { getFriendlyAuthError } from "@/components/auth/auth-errors";

type ErrorPageProps = { searchParams: Promise<{ error?: string }> };

export default async function Page({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const message = getFriendlyAuthError(
    params.error,
    "We couldn't complete that authentication step. Please try again.",
  );

  return (
    <main className="flex min-h-svh items-center justify-center bg-[var(--ww-page)] p-5">
      <div className="w-full max-w-md rounded-xl border border-[var(--ww-border)] bg-white p-7 text-center shadow-[0_24px_70px_rgb(72_52_140_/_12%)] sm:p-10">
        <Link aria-label="Word Wizards home" className="mx-auto block w-fit" href="/">
          <Image
            alt="Word Wizards"
            className="h-auto w-[170px]"
            height={64}
            src="/asset-webp/brand/horizontal-logo.webp"
            width={220}
          />
        </Link>
        <div
          aria-hidden="true"
          className="mx-auto mt-8 flex size-12 items-center justify-center rounded-full bg-[var(--ww-error-bg)] text-xl text-[var(--ww-error-text)]"
        >
          !
        </div>
        <h1 className="mt-5 font-heading text-2xl font-bold text-[var(--ww-navy)]">We hit a snag</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--ww-muted)]">{message}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--ww-purple)] px-6 text-sm font-semibold text-white hover:bg-[var(--ww-purple-hover)]"
            href="/auth/login"
          >
            Back to sign in
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--ww-input-border)] px-6 text-sm font-semibold text-[var(--ww-slate)] hover:bg-[var(--ww-input-hover)]"
            href="/"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
