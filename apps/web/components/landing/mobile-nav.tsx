"use client";

import Link from "next/link";
import { useState } from "react";

const itemClass =
  "rounded-md px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative lg:hidden">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex cursor-pointer items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        Menu
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 w-64 rounded-md border border-border bg-card p-3 shadow-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <a className={itemClass} href="#about" onClick={closeMenu}>
              About
            </a>

            <a className={itemClass} href="#how-it-works" onClick={closeMenu}>
              How It Works
            </a>

            <Link
              className={itemClass}
              href="/coming-soon?feature=educators"
              onClick={closeMenu}
            >
              For Educators
            </Link>

            <div className="my-1 h-px bg-border" />

            <Link
              className="rounded-sm border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              href="/auth/login"
              onClick={closeMenu}
            >
              Log in
            </Link>

            <Link
              className="mt-1 rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              href="/auth/sign-up"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
