import { MOCK_ACHIEVEMENTS } from "./mock-achievements-data";
import type { Achievement, AchievementFilter } from "./types";

export async function getAchievements(): Promise<Achievement[]> {
  return MOCK_ACHIEVEMENTS;
}

export async function getAchievementsByFilter(filter: AchievementFilter): Promise<Achievement[]> {
  const all = await getAchievements();
  if (filter === "all") return all;
  return all.filter((a) => a.status === filter);
}
