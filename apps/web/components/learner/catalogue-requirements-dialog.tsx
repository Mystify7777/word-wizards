"use client";

import { InfoIcon, XIcon } from "@phosphor-icons/react";
import { useId, useRef } from "react";

export function CatalogueRequirementsDialog({
  catalogueName,
  requirement,
}: {
  catalogueName: string;
  requirement: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="inline-flex min-h-10 w-full items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-xs font-semibold tracking-wide text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        onClick={() => dialogRef.current?.showModal()}
        type="button"
      >
        View requirements
      </button>

      <dialog
        aria-labelledby={titleId}
        className="m-auto w-[min(calc(100vw-2rem),30rem)] rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-foreground/35 backdrop:backdrop-blur-[2px]"
        ref={dialogRef}
      >
        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-primary" />

          <div className="space-y-6 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                  <InfoIcon size={15} weight="fill" />
                  Unlock requirements
                </div>
                <h2 className="font-heading text-xl font-bold leading-tight sm:text-2xl" id={titleId}>
                  {catalogueName}
                </h2>
              </div>

              <button
                aria-label={`Close requirements for ${catalogueName}`}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                onClick={() => dialogRef.current?.close()}
                type="button"
              >
                <XIcon size={17} weight="bold" />
              </button>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-sm leading-6 text-foreground">{requirement}</p>
            </div>

            <p className="text-xs leading-5 text-muted-foreground">
              Unlocking is not connected to persistence yet. This screen only presents the requirement for the current
              learner experience.
            </p>

            <button
              className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-xs font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              onClick={() => dialogRef.current?.close()}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
