import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = { children: ReactNode; footer: ReactNode; mode: "login" | "sign-up" };

export function AuthShell({ children, footer, mode }: AuthShellProps) {
  const login = mode === "login";

  return (
    <main className="min-h-svh bg-[var(--ww-page)]">
      <div className="grid min-h-svh w-full lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden min-h-svh overflow-hidden bg-[var(--ww-cream)] px-8 py-8 lg:flex lg:flex-col lg:px-10 lg:py-10 xl:px-14">
          <Link aria-label="Word Wizards home" className="relative z-10 w-fit" href="/">
            <Image
              alt="Word Wizards"
              className="h-auto w-[175px]"
              height={64}
              priority
              src="/asset-webp/brand/horizontal-logo.webp"
              width={220}
            />
          </Link>

          <div className="relative z-10 mt-8 flex min-h-0 flex-1 flex-col">
            <h2 className="max-w-md font-heading text-2xl font-bold leading-tight text-[var(--ww-navy)] sm:text-3xl">
              {login ? "Learn the magic of communication" : "Start your language learning adventure today"}
            </h2>

            <ul className="mt-5 grid gap-2.5 text-sm text-[var(--ww-slate)]">
              {(login
                ? ["Interactive lessons", "Track your progress", "Unlock new content", "Build a brighter you"]
                : ["Learn at your own pace", "Fun and effective", "Achieve real progress", "Join a global community"]
              ).map((item) => (
                <li className="flex items-start gap-2.5" key={item}>
                  <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--ww-gold)]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex min-h-0 flex-1 items-center justify-center py-6 xl:py-8">
              <Image
                alt={
                  login ? "Wizard owl sitting on learning books" : "Learning path leading toward a purple-roofed castle"
                }
                className={
                  login
                    ? "h-auto max-h-[330px] w-full max-w-[430px] object-contain"
                    : "h-auto max-h-[340px] w-full max-w-[560px] object-contain"
                }
                height={700}
                priority
                src={login ? "/auth/login-owl-wizard.png" : "/auth/signup-learning-landscape.png"}
                width={900}
              />
            </div>

            <p className="mx-auto max-w-sm text-center font-heading text-sm font-semibold italic leading-6 text-[var(--ww-slate)] sm:text-base">
              “{login ? "Small words create big opportunities!" : "Every learner is a wizard in the making!"}”
            </p>
          </div>
        </section>

        <section className="flex min-h-svh items-center justify-center bg-[var(--ww-surface)] px-5 py-8 sm:px-8 sm:py-10 lg:min-h-0 lg:px-12 lg:py-10 xl:px-16">
          <div className="w-full max-w-md">
            <Link aria-label="Word Wizards home" className="mb-7 block w-fit lg:hidden" href="/">
              <Image
                alt="Word Wizards"
                className="h-auto w-[155px]"
                height={64}
                priority
                src="/asset-webp/brand/horizontal-logo.webp"
                width={220}
              />
            </Link>

            <div className="relative mb-7 sm:mb-8">
              <Image
                alt=""
                aria-hidden="true"
                className="absolute -right-2 -top-9 hidden w-[120px] lg:block sm:-right-4 sm:-top-10 sm:w-[140px]"
                height={100}
                src={login ? "/auth/login-speech-bubble.svg" : "/auth/signup-speech-bubble.svg"}
                width={180}
              />
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--ww-navy)] sm:text-[2rem]">
                {login ? "Welcome back!" : "Create your account"}
              </h1>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--ww-muted)]">
                {login
                  ? "Glad you're here. Sign in to continue your learning journey."
                  : "Join Word Wizards and start learning."}
              </p>
            </div>

            {children}

            <div className="mt-6 text-center text-sm text-[var(--ww-muted)]">{footer}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
