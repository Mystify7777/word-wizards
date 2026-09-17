"use client";

import { useState } from "react";

import { ThemeList } from "@/components/learner/theme-list";
import type { Theme } from "@/lib/catalogue/types";
import type { CatalogueProgress } from "@/lib/progress/types";

import { CatalogueProgressList } from "./catalogue-progress-list";

/**
 * Client-side wrapper that links catalogue card selection to the themes section.
 * Selecting a catalogue card filters the themes shown below to only that catalogue.
 */
export function ProgressDashboard({
  catalogueProgress,
  themesByCatalogue,
}: {
  catalogueProgress: CatalogueProgress[];
  themesByCatalogue: Record<string, Theme[]>;
}) {
  const [selectedCatalogueId, setSelectedCatalogueId] = useState<string>(
    catalogueProgress.length > 0 ? catalogueProgress[0].id : "",
  );

  const selectedCatalogue = catalogueProgress.find((c) => c.id === selectedCatalogueId);
  const themes = themesByCatalogue[selectedCatalogueId] ?? [];

  return (
    <>
      <CatalogueProgressList
        catalogueProgress={catalogueProgress}
        onSelect={setSelectedCatalogueId}
        selectedId={selectedCatalogueId}
      />

      {selectedCatalogue && (
        <section aria-labelledby="catalogue-themes-heading" className="space-y-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Themes browser</p>
            <h2 className="font-heading text-xl font-semibold" id="catalogue-themes-heading">
              Themes in {selectedCatalogue.name}
            </h2>
          </div>
          <ThemeList
            catalogueId={selectedCatalogueId}
            emptyMessage={`No themes found in ${selectedCatalogue.name}.`}
            themes={themes}
          />
        </section>
      )}
    </>
  );
}
