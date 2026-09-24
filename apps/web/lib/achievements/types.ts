export type AchievementStatus = "locked" | "unlocked" | "in-progress" | "completed";

export type AchievementFilter = "all" | "in-progress" | "completed" | "locked";

export interface Achievement {
  description: string;
  /** Phosphor icon key, e.g. "BookOpen" | "Star" | "Target" | "MessageCircle" */
  icon: string;
  id: string;
  /** 0-100. Only meaningful when status is "in-progress". */
  progress?: number;
  status: AchievementStatus;
  title: string;
}
