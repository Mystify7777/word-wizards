import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden" id="about">
      {/* Atmospheric background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-24 size-130 rounded-full bg-[#FFF0E3] opacity-70 blur-3xl" />
        <div className="absolute right-[-10%] top-[-15%] size-170 rounded-full bg-secondary opacity-70 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[35%] size-130 rounded-full bg-[#F4F1FF] opacity-70 blur-3xl" />
      </div>

      {/* Decorative foliage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-2px] left-[-20px] z-0 w-48 sm:w-64 lg:w-80"
      >
        <Image alt="" className="h-auto w-full" height={300} src="/asset-webp/decorative/foliage.webp" width={500} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4px] right-[-30px] z-0 w-44 scale-x-[-1] sm:w-60 lg:w-76"
      >
        <Image alt="" className="h-auto w-full" height={300} src="/asset-webp/decorative/foliage.webp" width={500} />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-[1400px] items-center gap-12 px-6 py-14 sm:px-10 sm:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:px-14 lg:py-20">
        <div className="max-w-2xl lg:pb-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Interactive language learning
          </p>

          <h1
            className="max-w-3xl text-[clamp(2.75rem,5.2vw,4.7rem)] font-extrabold leading-[0.97] tracking-[-0.05em] text-foreground"
            id="hero-heading"
          >
            Learn <span className="text-[#6C4CF6]">English</span>
            <span className="block">step by step.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:text-xl">
            Build practical language skills through structured practice, active recall, and immediate feedback, from
            your first words to real conversations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-base"
              href="/auth/sign-up"
            >
              Get Started
              <ArrowRight size={18} weight="bold" />
            </Link>

            <a
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-base"
              href="#how-it-works"
            >
              How It Works
            </a>
          </div>

          <ul className="mt-7 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {["Learn at your own pace", "Active practice", "Immediate feedback"].map((benefit) => (
              <li className="flex items-center gap-2" key={benefit}>
                <span className="grid size-5 place-items-center rounded-full bg-[#EAF9F0] text-green-600">
                  <Check size={12} weight="bold" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          {/* Loose decorative foliage around the illustration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-10px] left-[-12px] z-20 w-28 sm:w-36"
          >
            <Image
              alt=""
              className="h-auto w-full"
              height={300}
              src="/asset-webp/decorative/foliage.webp"
              width={500}
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-12px] right-[-12px] z-20 w-32 scale-x-[-1] sm:w-40"
          >
            <Image
              alt=""
              className="h-auto w-full"
              height={300}
              src="/asset-webp/decorative/foliage.webp"
              width={500}
            />
          </div>

          <div className="relative rounded-2xl border border-border/70 bg-card p-5 shadow-[0_24px_70px_rgba(17,26,70,0.09)] sm:p-7">
            <div className="overflow-hidden rounded-xl bg-[#F3F0FF]">
              <div className="flex items-center justify-between px-5 pt-5 sm:px-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your learning path</p>

                  <p className="mt-1 text-sm font-semibold text-foreground">From words to conversations</p>
                </div>
              </div>

              <div className="relative flex justify-center px-4 pb-1 pt-3 sm:px-8 sm:pt-1">
                <Image
                  alt="Word Wizards owl mascot"
                  className="relative z-10 h-auto w-[78%] max-w-105 object-contain drop-shadow-[0_18px_20px_rgba(17,26,70,0.10)]"
                  height={500}
                  priority
                  src="/asset-webp/mascot/mascot-main.webp"
                  width={500}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 divide-x divide-border/70">
              <div className="px-3 py-2 sm:px-4">
                <p className="text-xs font-semibold text-primary">01</p>
                <p className="mt-1 text-xs font-semibold text-foreground sm:text-sm">Words</p>
              </div>

              <div className="px-3 py-2 sm:px-4">
                <p className="text-xs font-semibold text-primary">02</p>
                <p className="mt-1 text-xs font-semibold text-foreground sm:text-sm">Phrases</p>
              </div>

              <div className="px-3 py-2 sm:px-4">
                <p className="text-xs font-semibold text-green-700">03</p>
                <p className="mt-1 text-xs font-semibold text-foreground sm:text-sm">Conversations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
