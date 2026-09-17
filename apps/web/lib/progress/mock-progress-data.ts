import { mockCatalogues, mockThemes } from "../catalogue/mock-data";
import type { CatalogueProgress, DayStreak, OverallProgress, TodayActivity, TodaysProgress, WeeklyGoal } from "./types";

// ─── Progress-specific mock data ─────────────────────────────────────────────
// Only data that is genuinely unique to the Progress feature lives here.
// Catalogue and theme data (names, IDs, progress values) are read directly
// from lib/catalogue/mock-data so there is a single source of truth.

export const rawTodayActivities: TodayActivity[] = [
  { completed: true, id: "act-1", title: "Complete Everyday Animals review" },
  { completed: true, id: "act-2", title: "Learn 5 new words in Food & Drinks" },
  { completed: true, id: "act-3", title: "Practice Daily Routines audio exercise" },
  { completed: false, id: "act-4", title: "Complete quiz: At the Restaurant" },
];

export const rawWeeklyDays: DayStreak[] = [
  { completed: true, date: "2026-09-14", day: "Mon" },
  { completed: true, date: "2026-09-15", day: "Tue" },
  { completed: true, date: "2026-09-16", day: "Wed", isToday: true },
  { completed: false, date: "2026-09-17", day: "Thu" },
  { completed: false, date: "2026-09-18", day: "Fri" },
  { completed: false, date: "2026-09-19", day: "Sat" },
  { completed: false, date: "2026-09-20", day: "Sun" },
];

// ─── Computed progress functions ──────────────────────────────────────────────

export function getComputedOverallProgress(): OverallProgress {
  const totalThemes = mockThemes.length;
  const completedThemes = mockThemes.filter((t) => t.progress === 100).length;
  const percentage = totalThemes > 0 ? Math.round((completedThemes / totalThemes) * 100) : 0;

  return { completedThemes, percentage, totalThemes };
}

export function getComputedTodaysProgress(): TodaysProgress {
  const activities = [...rawTodayActivities];
  const completedCount = activities.filter((act) => act.completed).length;
  const totalCount = activities.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return { activities, completedCount, percentage, totalCount };
}

export function getComputedWeeklyGoal(): WeeklyGoal {
  const days = [...rawWeeklyDays];
  const completedDaysCount = days.filter((d) => d.completed).length;
  const targetDays = 5;

  let streakCount = 0;
  for (const d of days) {
    if (d.completed) {
      streakCount++;
    } else {
      break;
    }
  }

  return { completedDaysCount, days, streakCount, targetDays };
}

export function getComputedCatalogueProgress(): CatalogueProgress[] {
  return mockCatalogues
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((catalogue) => {
      const themes = mockThemes.filter((t) => t.catalogueId === catalogue.id);
      const totalThemes = themes.length;
      const completedThemes = themes.filter((t) => t.progress === 100).length;
      const totalProgressSum = themes.reduce((acc, t) => acc + t.progress, 0);
      const percentage = totalThemes > 0 ? Math.round(totalProgressSum / totalThemes) : 0;

      return { completedThemes, id: catalogue.id, name: catalogue.name, percentage, totalThemes };
    });
}
