import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-background/70" id="about">
      <div className="relative z-10 mx-auto grid min-h-[600px] w-full max-w-[1400px] items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6 lg:px-14 lg:py-14">
        <div className="max-w-2xl lg:pb-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            Interactive language learning
          </p>

          <h1
            className="max-w-3xl text-[clamp(2.7rem,5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.05em] text-foreground"
            id="hero-heading"
          >
            Learn <span className="text-[#6C4CF6]">English</span>
            <span className="block">step by step.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Build practical language skills through structured practice, active recall, and immediate feedback, from
            your first words to real conversations.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-base"
              href="/auth/sign-up"
            >
              Get Started
              <ArrowRightIcon size={18} weight="bold" />
            </Link>

            <a
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-base"
              href="#how-it-works"
            >
              How It Works
            </a>
          </div>

          <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {["Learn at your own pace", "Active practice", "Immediate feedback"].map((benefit) => (
              <li className="flex items-center gap-2" key={benefit}>
                <span className="grid size-5 place-items-center rounded-full bg-[#EAF9F0] text-green-600">
                  <CheckIcon size={12} weight="bold" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
          {/* <div className="w-full px-2 sm:px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Your learning path
            </p>

            <p className="mt-1 text-sm font-semibold text-foreground">
              From words to conversations
            </p>
          </div> */}

          <Image
            alt="Word Wizards owl mascot"
            className="relative z-10 mt-1 h-auto w-[82%] max-w-[430px] object-contain drop-shadow-[0_16px_18px_rgba(17,26,70,0.08)] sm:mt-0"
            height={500}
            priority
            src="/assets-png/mascot/mascot-main.png"
            width={500}
          />
        </div>
      </div>
    </section>
  );
}
