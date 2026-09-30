import { mockThemes } from "./mock-data";
import type { Theme } from "./types";

export type ThemeFilter = "all" | "not-started" | "in-progress" | "completed";
export type ThemeSort = "recommended" | "a-z" | "z-a" | "progress";

export async function getLearnerThemes(catalogueId: string): Promise<Theme[]> {
  return mockThemes
    .filter((theme) => theme.catalogueId === catalogueId && theme.status === "published")
    .sort((a, b) => a.order - b.order);
}

export function filterThemes(themes: Theme[], filter: ThemeFilter): Theme[] {
  return themes.filter((theme) => {
    if (filter === "not-started") {
      return theme.availability === "available" && theme.progress === 0;
    }

    if (filter === "in-progress") {
      return theme.availability === "available" && theme.progress > 0 && theme.progress < 100;
    }

    if (filter === "completed") {
      return theme.availability === "available" && theme.progress === 100;
    }

    return true;
  });
}

export function searchThemes(themes: Theme[], query: string): Theme[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return themes;
  }

  return themes.filter((theme) =>
    [theme.name, theme.description].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
}

export function sortThemes(themes: Theme[], sort: ThemeSort): Theme[] {
  const sorted = [...themes];

  if (sort === "a-z") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "z-a") {
    return sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sort === "progress") {
    return sorted.sort((a, b) => b.progress - a.progress || a.order - b.order);
  }

  return sorted.sort((a, b) => a.order - b.order);
}

export function getRandomAvailableTheme(themes: Theme[]): Theme | null {
  const availableThemes = themes.filter((theme) => theme.availability === "available");

  if (availableThemes.length === 0) {
    return null;
  }

  return availableThemes[Math.floor(Math.random() * availableThemes.length)] ?? null;
}
