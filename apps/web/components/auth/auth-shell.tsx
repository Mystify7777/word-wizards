import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  footer: ReactNode;
};

export function AuthShell({ children, eyebrow, title, description, footer }: AuthShellProps) {
  return (
    <main className="min-h-svh bg-[#FFFCF7] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
      <section className="relative hidden overflow-hidden bg-[#F8F6FF] lg:flex lg:min-h-svh lg:flex-col lg:justify-between lg:p-10 xl:p-14">
        <Link href="/" aria-label="Word Wizards home" className="relative z-10">
          <Image src="/asset-webp/brand/horizontal-logo.webp" alt="Word Wizards" width={220} height={64} className="h-auto w-[180px]" priority />
        </Link>
        <div className="relative z-10 mx-auto flex max-w-lg flex-1 flex-col items-center justify-center text-center">
          <Image src="/asset-webp/mascot/mascot-main.webp" alt="" width={420} height={420} className="mb-8 h-auto w-[min(68%,420px)] object-contain" priority />
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6C4CF6]">Learn with purpose</p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#111A46] xl:text-4xl">Small steps. Real progress.</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-[#64748B]">Build practical English skills through structured practice, active recall, and immediate feedback.</p>
        </div>
        <p className="relative z-10 text-sm text-[#64748B]">Letters &amp; Words · Phrases &amp; Sentences · Conversations</p>
      </section>

      <section className="flex min-h-svh items-center justify-center px-5 py-8 sm:px-8 lg:px-12 xl:px-20">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" aria-label="Word Wizards home">
              <Image src="/asset-webp/brand/horizontal-logo.webp" alt="Word Wizards" width={220} height={64} className="h-auto w-[160px]" priority />
            </Link>
          </div>
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6C4CF6]">{eyebrow}</p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#111A46] sm:text-4xl">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-[#64748B] sm:text-base">{description}</p>
          </div>
          {children}
          <div className="mt-7 text-center text-sm text-[#64748B]">{footer}</div>
        </div>
      </section>
    </main>
  );
}
