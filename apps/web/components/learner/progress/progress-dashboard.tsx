"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { ThemeCard } from "@/components/learner/theme-list";
import type { ThemeFilter } from "@/lib/catalogue/theme-service";
import type { Theme } from "@/lib/catalogue/types";
import type { CatalogueProgress } from "@/lib/progress/types";
import { cn } from "@/lib/utils";

import { CatalogueProgressList } from "./catalogue-progress-list";

type ProgressThemeFilter = ThemeFilter | "locked";

const FILTER_OPTIONS: { label: string; value: ProgressThemeFilter }[] = [
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
  const [activeFilter, setActiveFilter] = useState<ProgressThemeFilter>("in-progress");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCatalogue = catalogueProgress.find((c) => c.id === selectedCatalogueId);

  const allThemes = themesByCatalogue[selectedCatalogueId] ?? [];
  const searchedThemes = searchQuery.trim()
    ? allThemes.filter((t) => t.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : allThemes;

  const filteredThemes = searchedThemes.filter((theme) => {
    switch (activeFilter) {
      case "in-progress":
        return theme.availability === "available" && theme.progress > 0 && theme.progress < 100;
      case "completed":
        return theme.availability === "available" && theme.progress === 100;
      case "locked":
        return theme.availability === "locked";
      case "all":
        return true;
      default:
        return true;
    }
  });

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
          {filteredThemes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card/60 p-8 text-center">
              <h3 className="font-heading text-lg font-semibold">No themes match your current filters.</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Try another filter or search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredThemes.map((theme) => (
                <ThemeCard catalogueId={selectedCatalogueId} key={theme.id} theme={theme} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
