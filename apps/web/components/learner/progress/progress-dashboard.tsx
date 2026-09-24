"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { type ThemeFilter, ThemeList } from "@/components/learner/theme-list";
import type { Theme } from "@/lib/catalogue/types";
import type { CatalogueProgress } from "@/lib/progress/types";
import { cn } from "@/lib/utils";

import { CatalogueProgressList } from "./catalogue-progress-list";

const FILTER_OPTIONS: { label: string; value: ThemeFilter }[] = [
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Locked", value: "locked" },
  { label: "All", value: "all" },
];

/**
 * Client-side wrapper that links catalogue card selection to the themes section.
 * Selecting a catalogue card filters the themes shown below to only that catalogue.
 * Filter pills and search box control which themes within that catalogue are shown.
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
  const [activeFilter, setActiveFilter] = useState<ThemeFilter>("in-progress");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCatalogue = catalogueProgress.find((c) => c.id === selectedCatalogueId);

  // Apply search on top of the full catalogue theme list; ThemeList handles filter internally.
  const allThemes = themesByCatalogue[selectedCatalogueId] ?? [];
  const searchedThemes = searchQuery.trim()
    ? allThemes.filter((t) => t.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : allThemes;

  const handleCatalogueSelect = (id: string) => {
    setSelectedCatalogueId(id);
    setSearchQuery("");
    setActiveFilter("in-progress");
  };

  return (
    <>
      <CatalogueProgressList
        catalogueProgress={catalogueProgress}
        onSelect={handleCatalogueSelect}
        selectedId={selectedCatalogueId}
      />

      {selectedCatalogue && (
        <section aria-labelledby="catalogue-themes-heading" className="space-y-4">
          {/* Section header */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Themes browser</p>
            <h2 className="font-heading text-xl font-semibold" id="catalogue-themes-heading">
              Themes in {selectedCatalogue.name}
            </h2>
          </div>

          {/* Controls row: filter pills left, search right */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filter pills */}
            <fieldset className="flex flex-wrap gap-1">
              <legend className="sr-only">Filter themes</legend>
              {FILTER_OPTIONS.map(({ label, value }) => (
                <button
                  aria-pressed={activeFilter === value}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeFilter === value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80",
                  )}
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </fieldset>

            {/* Search input */}
            <label className="relative flex items-center">
              <span className="sr-only">Search themes</span>
              <MagnifyingGlassIcon aria-hidden="true" className="absolute left-3 size-4 text-muted-foreground" />
              <input
                className="h-9 w-48 rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-56"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search themes..."
                type="search"
                value={searchQuery}
              />
            </label>
          </div>

          {/* Theme grid */}
          <ThemeList
            catalogueId={selectedCatalogueId}
            emptyMessage={`No themes match your search in ${selectedCatalogue.name}.`}
            filter={activeFilter}
            themes={searchedThemes}
          />
        </section>
      )}
    </>
  );
}
