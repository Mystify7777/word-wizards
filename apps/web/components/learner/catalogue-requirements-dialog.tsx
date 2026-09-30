"use client";

import { XIcon } from "@phosphor-icons/react";
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
        className="inline-flex min-h-10 items-center justify-center border border-border px-4 py-2.5 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        onClick={() => dialogRef.current?.showModal()}
        type="button"
      >
        View requirements
      </button>
      <dialog
        aria-labelledby={titleId}
        className="m-auto w-[min(92vw,32rem)] border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/30"
        ref={dialogRef}
      >
        <div className="space-y-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Requirements
              </p>
              <h2 className="font-heading text-xl font-semibold" id={titleId}>
                {catalogueName}
              </h2>
            </div>
            <button
              aria-label={`Close requirements for ${catalogueName}`}
              className="inline-flex size-10 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              onClick={() => dialogRef.current?.close()}
              type="button"
            >
              <XIcon size={18} />
            </button>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{requirement}</p>
          <button
            className="inline-flex min-h-10 w-full items-center justify-center border border-border px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
