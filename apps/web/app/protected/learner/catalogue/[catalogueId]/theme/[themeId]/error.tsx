"use client";

import { Button } from "@/components/ui/button";

export default function ThemeError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl border border-dashed border-border p-8 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Theme unavailable</p>
      <h1 className="mt-2 font-heading text-2xl font-semibold">We could not load this theme.</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Please try loading the theme again.</p>
      <Button className="mt-6" onClick={() => reset()} type="button">
        Try again
      </Button>
    </div>
  );
}
