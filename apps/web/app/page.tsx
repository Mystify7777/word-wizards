import Link from "next/link";

import { FeatureHighlights } from "@/components/landing/feature-highlights";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LearningPath } from "@/components/landing/learning-path";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <LandingHeader />

      <main>
        <HeroSection />
        <LearningPath />
        <FeatureHighlights />
      </main>

      <footer className="border-t border-border/60 bg-card/45">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div>
            <p className="text-sm font-semibold text-foreground">Word Wizards</p>

            <p className="mt-1 text-xs text-muted-foreground">Learn English, step by step.</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
            <Link
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href="/auth/login"
            >
              Log in
            </Link>

            <Link
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href="/auth/sign-up"
            >
              Get Started
            </Link>

            <Link
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              href="/coming-soon?feature=educators"
            >
              For Educators
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
