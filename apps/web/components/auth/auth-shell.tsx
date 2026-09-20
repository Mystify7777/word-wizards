import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = { children: ReactNode; footer: ReactNode; mode: "login" | "sign-up" };

export function AuthShell({ children, footer, mode }: AuthShellProps) {
  const login = mode === "login";
  return (
    <main className="min-h-svh bg-[#F4F1FF] p-3 sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100svh-1.5rem)] w-full max-w-6xl overflow-hidden rounded-2xl border border-[#E7E3F3] bg-white shadow-[0_24px_70px_rgba(72,52,140,0.12)] sm:min-h-[calc(100svh-2.5rem)] lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative overflow-hidden bg-[#FFFDF7] px-6 py-7 sm:px-10 sm:py-9 lg:flex lg:flex-col lg:px-10 lg:py-10">
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
          <div className="relative z-10 mt-6 flex flex-1 flex-col sm:mt-8 lg:mt-6">
            <h2 className="max-w-md font-heading text-2xl font-bold leading-tight text-[#111A46] sm:text-3xl">
              {login ? "Learn the magic of communication" : "Start your language learning adventure today"}
            </h2>
            <ul className="mt-5 grid gap-2.5 text-sm text-[#334155] sm:grid-cols-2 lg:grid-cols-1">
              {(login
                ? ["Interactive lessons", "Track your progress", "Unlock new content", "Build a brighter you"]
                : ["Learn at your own pace", "Fun and effective", "Achieve real progress", "Join a global community"]
              ).map((item) => (
                <li className="flex items-start gap-2.5" key={item}>
                  <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-[#F5C33B]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-1 items-center justify-center py-6">
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
            <p className="mx-auto max-w-sm text-center font-heading text-sm font-semibold italic leading-6 text-[#334155] sm:text-base">
              “{login ? "Small words create big opportunities!" : "Every learner is a wizard in the making!"}”
            </p>
          </div>
        </section>
        <section className="flex items-center justify-center bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <div className="relative mb-7 sm:mb-8">
              <Image
                alt=""
                aria-hidden="true"
                className="absolute -right-2 -top-8 w-[120px] sm:-right-4 sm:-top-10 sm:w-[140px]"
                height={100}
                src={login ? "/auth/login-speech-bubble.svg" : "/auth/signup-speech-bubble.svg"}
                width={180}
              />
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[#111A46] sm:text-[2rem]">
                {login ? "Welcome back!" : "Create your account"}
              </h1>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#64748B]">
                {login
                  ? "Glad you're here. Sign in to continue your learning journey."
                  : "Join Word Wizards and start learning."}
              </p>
            </div>
            {children}
            <div className="mt-6 text-center text-sm text-[#64748B]">{footer}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
