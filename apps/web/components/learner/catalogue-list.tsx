import { ArrowRightIcon, LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CatalogueRequirementsDialog } from "@/components/learner/catalogue-requirements-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearnerCatalogue } from "@/lib/catalogue/types";

const catalogueArtwork: Record<string, string> = {
  conversations: "/catalogue/catalogue-comprehensions-and-conversations.webp",
  "letters-and-words": "/catalogue/catalogue-letters-and-words.webp",
  "phrases-and-sentences": "/catalogue/catalogue-phrases-and-sentences.webp",
};

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Overall progress</span>
        <span className="font-semibold text-foreground">{progress}%</span>
      </div>
      <div
        aria-label={`${progress}% complete`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="h-2.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function getActionLabel(catalogue: LearnerCatalogue) {
  if (catalogue.availability === "locked") {
    return "View requirements";
  }

  if (catalogue.progress === 0) {
    return "Start";
  }

  if (catalogue.progress === 100) {
    return "Review";
  }

  return "Continue";
}

export function CatalogueList({ catalogues }: { catalogues: LearnerCatalogue[] }) {
  if (catalogues.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <h2 className="font-heading text-lg font-semibold">No catalogues available</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          There is no learning content available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {catalogues.map((catalogue) => {
        const artwork = catalogueArtwork[catalogue.id];
        const isLocked = catalogue.availability === "locked";
        const actionLabel = getActionLabel(catalogue);

        const card = (
          <Card
            className={
              "h-full overflow-hidden rounded-2xl border-border/80 bg-card py-0 shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out " +
              (isLocked
                ? "bg-muted/20"
                : "group-hover:-translate-y-0.5 group-hover:border-primary/30 group-hover:shadow-md")
            }
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/50">
              {artwork ? (
                <Image
                  alt=""
                  className={
                    "object-cover transition-transform duration-300 ease-out " +
                    (!isLocked ? "group-hover:scale-[1.025]" : "")
                  }
                  fill
                  priority={catalogue.order <= 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  src={artwork}
                />
              ) : (
                <div className="flex h-full items-center justify-center font-heading text-3xl font-bold text-primary">
                  {catalogue.visual}
                </div>
              )}

              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                    <LockKeyIcon size={14} weight="bold" />
                    Locked
                  </span>
                </div>
              )}
            </div>

            <CardHeader className="gap-2 px-5 pt-5">
              <CardTitle className="text-lg leading-snug">{catalogue.name}</CardTitle>
              <CardDescription className="min-h-12 leading-6">{catalogue.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-5 pb-5">
              <ProgressBar progress={catalogue.progress} />

              {isLocked ? (
                catalogue.requirement ? (
                  <CatalogueRequirementsDialog
                    catalogueName={catalogue.name}
                    requirement={catalogue.requirement}
                  />
                ) : (
                  <span className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-md border border-border bg-muted/50 px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                    Currently locked
                  </span>
                )
              ) : (
                <span className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-semibold tracking-wide text-primary-foreground transition-opacity group-hover:opacity-90">
                  {actionLabel}
                  <ArrowRightIcon size={15} weight="bold" />
                </span>
              )}
            </CardContent>
          </Card>
        );

        if (isLocked) {
          return (
            <div className="group h-full" key={catalogue.id}>
              {card}
            </div>
          );
        }

        return (
          <Link
            aria-label={`${actionLabel} ${catalogue.name}`}
            className="group block h-full rounded-2xl focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            href={`/protected/learner/catalogue/${catalogue.id}`}
            key={catalogue.id}
          >
            {card}
          </Link>
        );
      })}
    </div>
  );
}
