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
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span className="font-medium text-foreground">{progress}%</span>
      </div>
      <div
        aria-label={progress + "% complete"}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: progress + "%" }}
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
      <div className="rounded-lg border border-dashed border-border bg-card/60 p-8 text-center">
        <h2 className="font-heading text-lg font-semibold">No catalogues available</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          There is no learning content available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {catalogues.map((catalogue) => {
        const artwork = catalogueArtwork[catalogue.id];
        const isLocked = catalogue.availability === "locked";
        const actionLabel = getActionLabel(catalogue);

        const card = (
          <Card
            className={
              "h-full overflow-hidden rounded-xl py-0 transition-[transform,box-shadow,opacity] duration-200 ease-out " +
              (isLocked
                ? "bg-muted/30 ring-1 ring-border/70"
                : "group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-1 group-hover:ring-primary/15")
            }
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              {artwork ? (
                <Image
                  alt=""
                  className={
                    "object-cover transition-transform duration-300 ease-out " +
                    (!isLocked ? "group-hover:scale-[1.02]" : "")
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
                <div className="absolute inset-0 flex items-center justify-center bg-background/45">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase shadow-sm">
                    <LockKeyIcon size={14} />
                    Locked
                  </span>
                </div>
              )}
            </div>

            <CardHeader className="gap-2 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <CardTitle className="leading-snug">{catalogue.name}</CardTitle>
                  <CardDescription className="leading-6">{catalogue.description}</CardDescription>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                  {catalogue.progress}%
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 pb-6">
              <ProgressBar progress={catalogue.progress} />
              {isLocked ? (
                catalogue.requirement ? (
                  <CatalogueRequirementsDialog catalogueName={catalogue.name} requirement={catalogue.requirement} />
                ) : null
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
                  {actionLabel}
                  <ArrowRightIcon size={15} />
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
            className="group block h-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            href={"/protected/learner/catalogue/" + catalogue.id}
            key={catalogue.id}
          >
            {card}
          </Link>
        );
      })}
    </div>
  );
}
