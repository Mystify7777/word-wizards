import { ArrowRightIcon, LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Theme } from "@/lib/catalogue/types";

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div
        aria-label={`${progress}% complete`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="h-2 bg-muted"
        role="progressbar"
      >
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function ThemeList({ catalogueId, themes }: { catalogueId: string; themes: Theme[] }) {
  if (themes.length === 0) {
    return (
      <div className="border border-dashed border-border p-8 text-center">
        <h2 className="font-heading text-lg font-semibold">No themes available</h2>
        <p className="mt-2 text-sm text-muted-foreground">This catalogue does not have any themes to explore yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {themes.map((theme) => {
        const isAvailable = theme.availability === "available";

        if (!isAvailable) {
          return (
            <Card aria-disabled="true" className="h-full opacity-70" key={theme.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div
                    aria-hidden="true"
                    className="flex size-14 shrink-0 items-center justify-center border border-border bg-muted text-2xl grayscale"
                  >
                    {theme.visual}
                  </div>
                  <span className="inline-flex items-center gap-1 border border-border px-2.5 py-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    <LockKeyIcon size={13} />
                    Locked
                  </span>
                </div>
                <CardTitle>{theme.name}</CardTitle>
                <CardDescription>{theme.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar progress={theme.progress} />
                <p className="text-xs text-muted-foreground">This theme is not available yet.</p>
              </CardContent>
            </Card>
          );
        }

        return (
          <Link
            className="group block h-full focus-visible:outline-none"
            href={`/protected/learner/catalogue/${catalogueId}/theme/${theme.id}`}
            key={theme.id}
          >
            <Card className="h-full transition-transform group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring/40">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div
                    aria-hidden="true"
                    className="flex size-14 shrink-0 items-center justify-center border border-border bg-muted text-2xl"
                  >
                    {theme.visual}
                  </div>
                  <span className="border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
                    Available
                  </span>
                </div>
                <CardTitle>{theme.name}</CardTitle>
                <CardDescription>{theme.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <ProgressBar progress={theme.progress} />
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
                  {theme.progress > 0 ? "Continue theme" : "Start theme"}
                  <ArrowRightIcon size={15} />
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
