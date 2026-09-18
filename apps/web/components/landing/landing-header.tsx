import Image from "next/image";
import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="relative z-20 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          aria-label="Word Wizards home"
          className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href="/"
        >
          <Image
            alt="Word Wizards"
            className="h-auto w-35 sm:w-40"
            height={48}
            priority
            src="/asset-webp/brand/horizontal-logo.webp"
            width={170}
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          <a
            className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href="#about"
          >
            About
          </a>

          <a
            className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href="#how-it-works"
          >
            How It Works
          </a>

          <Link
            className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href="/coming-soon?feature=educators"
          >
            For Educators
          </Link>

          <span aria-hidden="true" className="h-5 w-px bg-border" />

          <Link
            className="text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href="/auth/login"
          >
            Log in
          </Link>

          <Link
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href="/auth/sign-up"
          >
            Get Started
          </Link>
        </nav>

        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            Menu
          </summary>

          <div className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-card p-3 shadow-xl">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              <a
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                href="#about"
              >
                About
              </a>

              <a
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                href="#how-it-works"
              >
                How It Works
              </a>

              <Link
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                href="/coming-soon?feature=educators"
              >
                For Educators
              </Link>

              <div className="my-1 h-px bg-border" />

              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                href="/auth/login"
              >
                Log in
              </Link>

              <Link
                className="mt-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                href="/auth/sign-up"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
