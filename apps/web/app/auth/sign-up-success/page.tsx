import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#F4F1FF] p-5">
      <div className="w-full max-w-md rounded-2xl border border-[#E7E3F3] bg-white p-7 text-center shadow-[0_24px_70px_rgba(72,52,140,0.12)] sm:p-10">
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
          className="mx-auto mt-8 flex size-12 items-center justify-center rounded-full bg-[#EDE9FF] text-[#6C4CF6]"
        >
          ✓
        </div>
        <h1 className="mt-5 font-heading text-2xl font-bold text-[#111A46]">Check your email</h1>
        <p className="mt-3 text-sm leading-6 text-[#64748B]">
          Your account is ready. Confirm your email address, then sign in to start your learning journey.
        </p>
        <Link
          className="mt-7 inline-flex h-11 items-center justify-center rounded-md bg-[#6C4CF6] px-6 text-sm font-semibold text-white hover:bg-[#5B3FE0]"
          href="/auth/login"
        >
          Continue to sign in
        </Link>
      </div>
    </main>
  );
}
