"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const itemClass =
  "rounded-md px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative lg:hidden" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        className="flex cursor-pointer items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        Menu
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-12 w-56 rounded-md border border-border bg-card p-2 shadow-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <button
              className={itemClass}
              onClick={() => scrollToSection("about")}
              type="button"
            >
              About
            </button>

            <button
              className={itemClass}
              onClick={() => scrollToSection("how-it-works")}
              type="button"
            >
              How It Works
            </button>

            <div className="my-0.5 h-px bg-border" />

            <Link
              className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              href="/coming-soon?feature=educators"
              onClick={closeMenu}
            >
              For Educators
            </Link>

            <div className="my-1 h-px bg-border" />

            <Link
              className="rounded-sm border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              href="/auth/login"
              onClick={closeMenu}
            >
              Log in
            </Link>

            <Link
              className="mt-1 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
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
