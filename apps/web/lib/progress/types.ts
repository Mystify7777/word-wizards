export interface OverallProgress {
  completedThemes: number;
  percentage: number;
  totalThemes: number;
}

export interface TodayActivity {
  completed: boolean;
  id: string;
  title: string;
}

export interface TodaysProgress {
  activities: TodayActivity[];
  completedCount: number;
  percentage: number;
  totalCount: number;
}

export interface DayStreak {
  completed: boolean;
  date: string;
  day: string;
  isToday?: boolean;
}

export interface WeeklyGoal {
  completedDaysCount: number;
  days: DayStreak[];
  streakCount: number;
  targetDays: number;
}

export interface CatalogueProgress {
  completedThemes: number;
  id: string;
  name: string;
  percentage: number;
  totalThemes: number;
}
