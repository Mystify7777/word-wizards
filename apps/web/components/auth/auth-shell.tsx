"use client";

import {
  BookOpenIcon,
  ChartBarIcon,
  GlobeIcon,
  HeartIcon,
  KeyIcon,
  SparkleIcon,
  TargetIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = { children: ReactNode; footer: ReactNode; mode: "login" | "sign-up" };

const marketingContent = {
  login: {
    benefits: [
      { color: "text-[#35a853]", icon: BookOpenIcon, label: "Interactive lessons" },
      { color: "text-[#4b9fe8]", icon: ChartBarIcon, label: "Track your progress" },
      { color: "text-[#f5b82e]", icon: KeyIcon, label: "Unlock new content" },
      { color: "text-[var(--ww-purple)]", icon: GlobeIcon, label: "Build a brighter you" },
    ],
    heading: "Learn the magic of communication",
    image: "/auth/login-owl-wizard.png",
    imageAlt: "Wizard owl sitting on learning books",
    quote: "Small words create big opportunities!",
  },
  "sign-up": {
    benefits: [
      { color: "text-[#f5b82e]", icon: SparkleIcon, label: "Learn at your own pace" },
      { color: "text-[#4b9fe8]", icon: UsersThreeIcon, label: "Fun and effective" },
      { color: "text-[#ef5b63]", icon: TargetIcon, label: "Achieve real progress" },
      { color: "text-[#ef5b63]", icon: HeartIcon, label: "Join a global community" },
    ],
    heading: "Start your language learning adventure today",
    image: "/auth/signup-learning-landscape.png",
    imageAlt: "Learning path leading toward a purple-roofed castle",
    quote: "Every learner is a wizard in the making!",
  },
} as const;

export function AuthShell({ children, footer, mode }: AuthShellProps) {
  const login = mode === "login";
  const content = marketingContent[mode];

  return (
    <main className="min-h-svh bg-[var(--ww-page)] md:p-3 lg:p-5">
      <div className="mx-auto grid min-h-svh w-full overflow-hidden border border-[var(--ww-border)] bg-white shadow-[0_24px_70px_rgb(72_52_140_/_12%)] md:min-h-[calc(100svh-1.5rem)] md:max-w-[1440px] md:rounded-2xl lg:min-h-[calc(100svh-2.5rem)] md:grid-cols-[0.96fr_1.04fr]">
        <section className="relative hidden min-h-0 overflow-hidden bg-[var(--ww-cream)] md:flex md:flex-col">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-16 top-[28%] size-36 rounded-full bg-[var(--ww-purple-soft)]/65" />
            <div className="absolute -left-10 top-[24%] size-20 rounded-full bg-[var(--ww-purple-soft)]/45" />
            <div className="absolute left-8 top-[31%] size-14 rounded-full bg-white/70" />
            <div className="absolute -right-20 bottom-[-3rem] size-56 rounded-full bg-[var(--ww-purple-soft)]/50" />
            <div className="absolute -right-4 bottom-10 size-24 rounded-full bg-white/55" />
            <div className="absolute right-16 bottom-[-1rem] size-16 rounded-full bg-[var(--ww-purple-soft)]/35" />
            <div className="absolute left-[42%] top-[-5rem] h-32 w-64 rounded-full bg-white/70 blur-2xl" />
          </div>

          <Link aria-label="Word Wizards home" className="relative z-20 mx-auto mt-7 w-fit md:mt-8 lg:mt-9" href="/">
            <Image
              alt="Word Wizards"
              className="h-auto w-[145px] md:w-[165px] lg:w-[185px] xl:w-[205px]"
              height={220}
              priority
              src="/asset-webp/brand/vertical-logo.webp"
              width={180}
            />
          </Link>

          <div className="relative z-20 mx-auto mt-3 w-full max-w-[340px] px-6 text-center md:mt-2 lg:mt-3 lg:max-w-[390px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 top-[-0.75rem] -z-10 h-[15rem] rounded-[40%] bg-[var(--ww-cream)]/80 blur-xl"
            />
            <h2 className="font-heading text-xl font-extrabold leading-tight text-[var(--ww-navy)] md:text-2xl lg:text-[1.7rem]">
              {content.heading}
            </h2>

            <ul className="mx-auto mt-4 grid w-fit gap-2.5 text-left text-sm text-[var(--ww-slate)] lg:mt-5 lg:gap-3">
              {content.benefits.map(({ color, icon: Icon, label }) => (
                <li className="flex items-center gap-3" key={label}>
                  <Icon aria-hidden="true" className={`size-6 shrink-0 ${color}`} weight="duotone" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[50%] md:h-[51%] lg:h-[47%]">
            <Image
              alt={content.imageAlt}
              className={
                login
                  ? "absolute bottom-[-1.5rem] right-[-1rem] h-auto w-[76%] max-w-[520px] object-contain lg:bottom-[-0.75rem] lg:right-0 lg:w-[56%] lg:max-w-[405px] xl:right-[-0.5rem] xl:w-[59%] xl:max-w-[435px]"
                  : "absolute bottom-[-0.5rem] left-1/2 h-auto w-[108%] max-w-[700px] -translate-x-1/2 object-contain lg:w-[84%] lg:max-w-[565px] xl:w-[89%] xl:max-w-[610px]"
              }
              height={700}
              priority
              src={content.image}
              width={900}
            />
          </div>

          <div
            className={
              login
                ? "absolute bottom-7 left-7 z-20 max-w-[190px] -rotate-2 text-left md:bottom-8 md:left-7 lg:bottom-8 lg:left-8"
                : "absolute bottom-[25%] right-6 z-20 max-w-[175px] rotate-[-3deg] text-left md:bottom-[24%] md:right-6 lg:bottom-[22%] lg:right-9"
            }
          >
            <SparkleIcon aria-hidden="true" className="mb-1 size-5 text-[var(--ww-gold)]" weight="fill" />
            <p className="font-heading text-sm font-bold italic leading-5 text-[var(--ww-navy)] lg:text-[15px]">
              “{content.quote}”
            </p>
            <span aria-hidden="true" className="mt-1 block h-1 w-16 -rotate-2 rounded-full bg-[var(--ww-purple)]/70" />
          </div>
        </section>

        <section className="flex min-h-svh items-center justify-center bg-[var(--ww-surface)] px-5 py-7 sm:px-8 sm:py-9 md:min-h-0 md:px-8 md:py-8 lg:px-10 lg:py-9 xl:px-14">
          <div className="w-full max-w-[460px]">
            <Link aria-label="Word Wizards home" className="mb-6 block w-fit md:hidden" href="/">
              <Image
                alt="Word Wizards"
                className="h-auto w-[155px]"
                height={64}
                priority
                src="/asset-webp/brand/horizontal-logo.webp"
                width={220}
              />
            </Link>

            <div className="relative mb-5 sm:mb-6">
              <Image
                alt=""
                aria-hidden="true"
                className="absolute -right-1 -top-9 hidden w-[125px] md:block lg:-right-5 lg:-top-12 lg:w-[165px]"
                height={100}
                src={login ? "/auth/login-speech-bubble.svg" : "/auth/signup-speech-bubble.svg"}
                width={180}
              />
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--ww-navy)] sm:text-[2rem]">
                {login ? "Welcome back!" : "Create your account"}
              </h1>
              <p className="mt-1.5 max-w-sm text-sm leading-5 text-[var(--ww-muted)]">
                {login
                  ? "Glad you're here. Sign in to continue your learning journey."
                  : "Join Word Wizards and start learning."}
              </p>
            </div>

            {children}

            <div className="mt-5 text-center text-sm text-[var(--ww-muted)]">{footer}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
