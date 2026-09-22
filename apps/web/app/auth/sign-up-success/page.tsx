import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
          className="mx-auto mt-8 flex size-12 items-center justify-center rounded-full bg-[var(--ww-purple-soft)] text-[var(--ww-purple)]"
        >
          ✓
        </div>
        <h1 className="mt-5 font-heading text-2xl font-bold text-[var(--ww-navy)]">Check your email</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--ww-muted)]">
          Your account is ready. Confirm your email address, then sign in to start your learning journey.
        </p>
        <Link
          className="mt-7 inline-flex h-11 items-center justify-center rounded-md bg-[var(--ww-purple)] px-6 text-sm font-semibold text-white hover:bg-[var(--ww-purple-hover)]"
          href="/auth/login"
        >
          Continue to sign in
        </Link>
      </div>
    </main>
  );
}
