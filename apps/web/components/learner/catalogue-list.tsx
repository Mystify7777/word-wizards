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
        <span>{progress}%</span>
      </div>
      <div
        aria-label={progress + "% complete"}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="h-2 overflow-hidden bg-muted"
        role="progressbar"
      >
        <div className="h-full bg-primary transition-[width]" style={{ width: progress + "%" }} />
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
      <div className="border border-dashed border-border p-8 text-center">
        <h2 className="font-heading text-lg font-semibold">No catalogues available</h2>
        <p className="mt-2 text-sm text-muted-foreground">
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
              "h-full overflow-hidden transition-transform " +
              (isLocked ? "opacity-75" : "group-hover:-translate-y-1")
            }
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              {artwork ? (
                <Image
                  alt=""
                  className="object-cover"
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
                  <span className="inline-flex items-center gap-1.5 border border-border bg-background/90 px-3 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    <LockKeyIcon size={14} />
                    Locked
                  </span>
                </div>
              )}
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle>{catalogue.name}</CardTitle>
                  <CardDescription>{catalogue.description}</CardDescription>
                </div>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {catalogue.progress}%
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <ProgressBar progress={catalogue.progress} />
              {isLocked ? (
                catalogue.requirement ? (
                  <CatalogueRequirementsDialog
                    catalogueName={catalogue.name}
                    requirement={catalogue.requirement}
                  />
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
            className="group block h-full focus-visible:outline-none"
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
