import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden" id="about">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_75%_25%,rgba(108,76,246,0.12),transparent_38%),radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.08),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
            Interactive language learning
          </p>

          <h1
            className="max-w-3xl text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground"
            id="hero-heading"
          >
            Learn English,
            <span className="block text-primary">step by step.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:text-xl">
            Build practical language skills through structured practice, active recall, and immediate feedback, from
            your first words to real conversations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-base"
              href="/auth/sign-up"
            >
              Get Started
              <ArrowRight size={18} weight="bold" />
            </Link>

            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-base"
              href="#how-it-works"
            >
              How It Works
            </a>
          </div>

          <ul className="mt-7 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {["Learn at your own pace", "Active practice", "Immediate feedback"].map((benefit) => (
              <li className="flex items-center gap-2" key={benefit}>
                <span className="grid size-5 place-items-center rounded-full bg-soft-green text-green-600">
                  <Check size={12} weight="bold" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-4 top-4 size-28 rounded-full bg-secondary/70 blur-2xl sm:size-40" />
          <div className="absolute -left-5 bottom-10 size-24 rounded-full bg-primary/10 blur-2xl sm:size-32" />

          <div className="relative rounded-[2rem] border border-border/70 bg-card p-5 shadow-[0_24px_70px_rgba(17,26,70,0.10)] sm:p-7">
            <div className="overflow-hidden rounded-[1.5rem] bg-secondary/55">
              <div className="flex items-center justify-between px-5 pt-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Your learning path</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">From words to conversations</p>
                </div>

                <div className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
                  3 stages
                </div>
              </div>

              <div className="relative flex justify-center px-5 pb-3 pt-4 sm:px-8">
                <Image
                  alt="Word Wizards owl mascot"
                  className="relative z-10 h-auto w-[72%] max-w-85 object-contain drop-shadow-[0_18px_20px_rgba(17,26,70,0.10)]"
                  height={500}
                  priority
                  src="/asset-webp/mascot/mascot-main.webp"
                  width={500}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-soft-orange p-3">
                <p className="text-xs font-bold text-primary">01</p>
                <p className="mt-1 text-xs font-semibold text-foreground">Words</p>
              </div>

              <div className="rounded-2xl bg-secondary p-3">
                <p className="text-xs font-bold text-primary">02</p>
                <p className="mt-1 text-xs font-semibold text-foreground">Phrases</p>
              </div>

              <div className="rounded-2xl bg-soft-green p-3">
                <p className="text-xs font-bold text-green-700">03</p>
                <p className="mt-1 text-xs font-semibold text-foreground">Conversations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
