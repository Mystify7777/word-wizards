import type { CatalogueProgress, DayStreak, OverallProgress, TodayActivity, TodaysProgress, WeeklyGoal } from "./types";

export interface RawThemeItem {
  catalogueId: string;
  catalogueName: string;
  id: string;
  name: string;
  progress: number;
}

export const rawThemeItems: RawThemeItem[] = [
  {
    catalogueId: "letters-and-words",
    catalogueName: "Letters & Words",
    id: "everyday-animals",
    name: "Everyday Animals",
    progress: 100,
  },
  {
    catalogueId: "letters-and-words",
    catalogueName: "Letters & Words",
    id: "food-and-drinks",
    name: "Food & Drinks",
    progress: 60,
  },
  {
    catalogueId: "letters-and-words",
    catalogueName: "Letters & Words",
    id: "daily-life",
    name: "Daily Life",
    progress: 0,
  },
  {
    catalogueId: "phrases-and-sentences",
    catalogueName: "Phrases & Sentences",
    id: "daily-routines",
    name: "Daily Routines",
    progress: 100,
  },
  {
    catalogueId: "phrases-and-sentences",
    catalogueName: "Phrases & Sentences",
    id: "at-the-restaurant",
    name: "At the Restaurant",
    progress: 35,
  },
  {
    catalogueId: "phrases-and-sentences",
    catalogueName: "Phrases & Sentences",
    id: "making-plans",
    name: "Making Plans",
    progress: 0,
  },
  {
    catalogueId: "conversations",
    catalogueName: "Conversations",
    id: "introductions",
    name: "Introductions",
    progress: 0,
  },
  {
    catalogueId: "conversations",
    catalogueName: "Conversations",
    id: "shopping",
    name: "Shopping",
    progress: 0,
  },
  {
    catalogueId: "conversations",
    catalogueName: "Conversations",
    id: "travel",
    name: "Travel",
    progress: 0,
  },
];

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

export function getComputedOverallProgress(): OverallProgress {
  const totalThemes = rawThemeItems.length;
  const completedThemes = rawThemeItems.filter((item) => item.progress === 100).length;
  const percentage = totalThemes > 0 ? Math.round((completedThemes / totalThemes) * 100) : 0;

  return {
    completedThemes,
    percentage,
    totalThemes,
  };
}

export function getComputedTodaysProgress(): TodaysProgress {
  const activities = [...rawTodayActivities];
  const completedCount = activities.filter((act) => act.completed).length;
  const totalCount = activities.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    activities,
    completedCount,
    percentage,
    totalCount,
  };
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
      if (d.isToday) {
        break;
      }
      break;
    }
  }

  return {
    completedDaysCount,
    days,
    streakCount,
    targetDays,
  };
}

export function getComputedCatalogueProgress(): CatalogueProgress[] {
  const catalogueMap = new Map<string, { id: string; name: string; items: RawThemeItem[] }>();

  for (const item of rawThemeItems) {
    if (!catalogueMap.has(item.catalogueId)) {
      catalogueMap.set(item.catalogueId, {
        id: item.catalogueId,
        items: [],
        name: item.catalogueName,
      });
    }
    catalogueMap.get(item.catalogueId)?.items.push(item);
  }

  return Array.from(catalogueMap.values()).map((cat) => {
    const totalThemes = cat.items.length;
    const completedThemes = cat.items.filter((item) => item.progress === 100).length;
    const totalProgressSum = cat.items.reduce((acc, item) => acc + item.progress, 0);
    const percentage = totalThemes > 0 ? Math.round(totalProgressSum / totalThemes) : 0;

    return {
      completedThemes,
      id: cat.id,
      name: cat.name,
      percentage,
      totalThemes,
    };
  });
}
