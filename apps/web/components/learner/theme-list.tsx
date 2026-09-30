"use client";

import {
  ArrowRightIcon,
  CaretDownIcon,
  CheckCircleIcon,
  FunnelIcon,
  LockKeyIcon,
  MagnifyingGlassIcon,
  ShuffleIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  filterThemes,
  getRandomAvailableTheme,
  searchThemes,
  sortThemes,
  type ThemeFilter,
  type ThemeSort,
} from "@/lib/catalogue/theme-service";
import type { Theme } from "@/lib/catalogue/types";

const themeArtwork: Record<string, string> = {
  "at-the-restaurant": "/themes/theme-at-the-restaurant.webp",
  "daily-life": "/themes/theme-daily-life.webp",
  "daily-routines": "/themes/theme-daily-routines.webp",
  "everyday-animals": "/themes/theme-everyday-animals.webp",
  "food-and-drinks": "/themes/theme-food-and-drinks.webp",
  introductions: "/themes/theme-introductions.webp",
  "making-plans": "/themes/theme-making-plans.webp",
  shopping: "/themes/theme-shopping.webp",
  travel: "/themes/theme-travel.webp",
};

const filters: { value: ThemeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "not-started", label: "Not started" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const sorts: { value: ThemeSort; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "a-z", label: "A–Z" },
  { value: "z-a", label: "Z–A" },
  { value: "progress", label: "Progress" },
];

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

function ThemeCard({ catalogueId, theme }: { catalogueId: string; theme: Theme }) {
  const isLocked = theme.availability === "locked";
  const artwork = themeArtwork[theme.id];

  const card = (
    <Card
      className={
        "h-full overflow-hidden transition-transform " +
        (isLocked ? "opacity-70" : "group-hover:-translate-y-1")
      }
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {artwork ? (
          <Image
            alt=""
            className={"object-cover " + (isLocked ? "grayscale" : "")}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={artwork}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">{theme.visual}</div>
        )}
        <div className="absolute right-3 top-3">
          {isLocked ? (
            <span className="inline-flex items-center gap-1.5 border border-border bg-background/90 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              <LockKeyIcon size={13} />
              Locked
            </span>
          ) : theme.progress === 100 ? (
            <span className="inline-flex items-center gap-1.5 border border-primary/30 bg-background/90 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
              <CheckCircleIcon size={13} />
              Complete
            </span>
          ) : null}
        </div>
      </div>

      <CardHeader>
        <CardTitle>{theme.name}</CardTitle>
        <CardDescription>{theme.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ProgressBar progress={theme.progress} />
        {isLocked ? (
          <p className="text-xs text-muted-foreground">This theme is not available yet.</p>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
            {theme.progress > 0 ? "Continue theme" : "Start theme"}
            <ArrowRightIcon size={15} />
          </span>
        )}
      </CardContent>
    </Card>
  );

  if (isLocked) {
    return (
      <div aria-disabled="true" className="h-full" key={theme.id}>
        {card}
      </div>
    );
  }

  return (
    <Link
      className="group block h-full rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      href={"/protected/learner/catalogue/" + catalogueId + "/theme/" + theme.id}
    >
      {card}
    </Link>
  );
}

export function ThemeList({ catalogueId, themes }: { catalogueId: string; themes: Theme[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ThemeFilter>("all");
  const [sort, setSort] = useState<ThemeSort>("recommended");

  const visibleThemes = useMemo(() => {
    const searched = searchThemes(themes, query);
    return sortThemes(filterThemes(searched, filter), sort);
  }, [filter, query, sort, themes]);

  const handleSurpriseMe = () => {
    const theme = getRandomAvailableTheme(themes);

    if (theme) {
      router.push(
        "/protected/learner/catalogue/" + catalogueId + "/theme/" + theme.id,
      );
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start" aria-label="Theme filters">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FunnelIcon className="text-primary" size={16} />
            <h3 className="text-sm font-semibold">Browse themes</h3>
          </div>
          <nav aria-label="Theme status">
            <div className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {filters.map((item) => (
                <button
                  aria-pressed={filter === item.value}
                  className={
                    "shrink-0 px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 " +
                    (filter === item.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground")
                  }
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <button
          aria-label={themes.some((theme) => theme.availability === "available") ? "Choose a random available theme" : "No themes are currently available for Surprise Me"}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 border border-primary/30 px-3 py-2.5 text-xs font-semibold tracking-wide text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!themes.some((theme) => theme.availability === "available")}
          title={
            themes.some((theme) => theme.availability === "available")
              ? "Open a random available theme"
              : "No available themes"
          }
          onClick={handleSurpriseMe}
          type="button"
        >
          <ShuffleIcon size={15} />
          Surprise Me
        </button>
      </aside>

      <div className="min-w-0 space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search themes</span>
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={17}
            />
            <input
              className="h-10 w-full border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search themes..."
              type="search"
              value={query}
            />
          </label>

          <label className="relative sm:w-48">
            <span className="sr-only">Sort themes</span>
            <select
              className="h-10 w-full min-h-10 appearance-none border border-border bg-background px-3 pr-9 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
              onChange={(event) => setSort(event.target.value as ThemeSort)}
              value={sort}
            >
              {sorts.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <CaretDownIcon
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={15}
            />
          </label>
        </div>

        {visibleThemes.length === 0 ? (
          <div className="border border-dashed border-border p-8 text-center">
            <h2 className="font-heading text-lg font-semibold">
              {query.trim() ? "No themes match your search" : "No themes in this view"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {query.trim()
                ? "Try a different search term."
                : "There are no themes matching the selected status."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {visibleThemes.map((theme) => (
              <ThemeCard catalogueId={catalogueId} key={theme.id} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
