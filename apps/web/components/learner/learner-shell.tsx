import { BookOpen, ChartLineUp, Gear, Trophy } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/logout-button";
import type { LearnerNavItem } from "@/lib/learner/types";

const navigation: Array<LearnerNavItem & { icon: typeof BookOpen }> = [
  { label: "Overview", href: "/protected/learner", icon: BookOpen },
  { label: "Progress", href: "/protected/learner/progress", icon: ChartLineUp },
  { label: "Achievements", href: "/protected/learner/achievements", icon: Trophy },
  { label: "Settings", href: "/protected/learner/settings", icon: Gear },
];

export function LearnerShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link className="font-heading text-xl font-bold tracking-wider uppercase" href="/protected/learner">
            Word Wizards
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Learner</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row">
        <nav aria-label="Learner navigation" className="border-b sm:w-52 sm:shrink-0 sm:border-r sm:border-b-0">
          <div className="flex gap-1 overflow-x-auto px-4 py-3 sm:sticky sm:top-0 sm:flex-col sm:gap-2 sm:px-3 sm:py-6">
            {navigation.map(({ href, icon: Icon, label }) => (
              <Link
                className="flex shrink-0 items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
