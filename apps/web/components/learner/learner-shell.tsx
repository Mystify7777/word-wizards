import {
  BookOpenIcon,
  BooksIcon,
  CaretDownIcon,
  ChartLineUpIcon,
  GearIcon,
  KeyIcon,
  TrophyIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/logout-button";
import { getLearnerProfile, getLearnerWallet } from "@/lib/learner/service";
import type { LearnerNavItem } from "@/lib/learner/types";

const navigation: Array<LearnerNavItem & { icon: typeof BookOpenIcon }> = [
  { href: "/protected/learner", icon: BookOpenIcon, label: "Overview" },
  { href: "/protected/learner/catalogue", icon: BooksIcon, label: "Catalogue" },
  { href: "/protected/learner/progress", icon: ChartLineUpIcon, label: "Progress" },
  { href: "/protected/learner/achievements", icon: TrophyIcon, label: "Achievements" },
  { href: "/protected/learner/settings", icon: GearIcon, label: "Settings" },
];

export async function LearnerShell({ children }: { children: ReactNode }) {
  const [profile, wallet] = await Promise.all([getLearnerProfile(), getLearnerWallet()]);

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/80 bg-card">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            className="shrink-0 font-heading text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
            href="/protected/learner"
          >
            Word Wizards
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div
              aria-label="Current language"
              className="hidden min-h-10 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground sm:flex"
            >
              <span aria-hidden="true" className="mr-2 text-base">
                🇬🇧
              </span>
              English
              <CaretDownIcon className="ml-2 text-muted-foreground" size={14} weight="bold" />
            </div>

            <div
              aria-label={`${wallet.keyBalance} keys`}
              className="flex min-h-10 items-center gap-2 px-2.5 text-sm font-semibold text-foreground"
            >
              <KeyIcon className="text-primary" size={20} weight="fill" />
              <span>{wallet.keyBalance}</span>
            </div>

            <details className="group relative">
              <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-lg border border-border bg-background px-2.5 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                <UserCircleIcon className="text-primary" size={28} weight="duotone" />
                <span className="hidden max-w-28 truncate text-sm font-semibold sm:inline">{profile.displayName}</span>
                <CaretDownIcon
                  className="text-muted-foreground transition-transform group-open:rotate-180"
                  size={14}
                  weight="bold"
                />
              </summary>

              <div className="absolute top-full right-0 z-50 mt-2 w-52 rounded-xl border border-border bg-card p-2 shadow-lg">
                <div className="border-b border-border px-3 py-2">
                  <p className="truncate text-sm font-semibold">{profile.displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                    href="/protected/learner"
                  >
                    Overview
                  </Link>
                  <Link
                    className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                    href="/protected/learner/achievements"
                  >
                    Achievements
                  </Link>
                  <Link
                    className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                    href="/protected/learner/settings"
                  >
                    Settings
                  </Link>
                </div>

                <div className="border-t border-border pt-1">
                  <LogoutButton />
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row">
        <nav
          aria-label="Learner navigation"
          className="border-b border-border/80 bg-card sm:w-52 sm:shrink-0 sm:border-r sm:border-b-0"
        >
          <div className="flex gap-1 overflow-x-auto px-4 py-3 sm:sticky sm:top-0 sm:flex-col sm:gap-2 sm:px-3 sm:py-6">
            {navigation.map(({ href, icon: Icon, label }) => (
              <Link
                className="flex min-h-10 shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                href={href}
                key={href}
              >
                <Icon size={18} weight="duotone" />
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
