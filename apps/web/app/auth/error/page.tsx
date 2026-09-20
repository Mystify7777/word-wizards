import Image from "next/image";
import Link from "next/link";

import { getFriendlyAuthError } from "@/components/auth/auth-errors";

type ErrorPageProps = { searchParams: Promise<{ error?: string }> };

export default async function Page({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const message = getFriendlyAuthError(params.error, "We couldn't complete that authentication step. Please try again.");

  return (
    <main className="flex min-h-svh items-center justify-center bg-[#F4F1FF] p-5">
      <div className="w-full max-w-md rounded-2xl border border-[#E7E3F3] bg-white p-7 text-center shadow-[0_24px_70px_rgba(72,52,140,0.12)] sm:p-10">
        <Link href="/" aria-label="Word Wizards home" className="mx-auto block w-fit">
          <Image src="/asset-webp/brand/horizontal-logo.webp" alt="Word Wizards" width={220} height={64} className="h-auto w-[170px]" />
        </Link>
        <div className="mx-auto mt-8 flex size-12 items-center justify-center rounded-full bg-[#FFF1F2] text-xl text-[#BE123C]" aria-hidden="true">!</div>
        <h1 className="mt-5 font-heading text-2xl font-bold text-[#111A46]">We hit a snag</h1>
        <p className="mt-3 text-sm leading-6 text-[#64748B]">{message}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link className="inline-flex h-11 items-center justify-center rounded-md bg-[#6C4CF6] px-6 text-sm font-semibold text-white hover:bg-[#5B3FE0]" href="/auth/login">Back to sign in</Link>
          <Link className="inline-flex h-11 items-center justify-center rounded-md border border-[#DCE0EA] px-6 text-sm font-semibold text-[#334155] hover:bg-[#F8F6FF]" href="/">Go home</Link>
        </div>
      </div>
    </main>
  );
}
