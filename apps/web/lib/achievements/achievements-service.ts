import { MOCK_ACHIEVEMENTS } from "./mock-achievements-data";
import type { Achievement } from "./types";

export async function getAchievements(): Promise<Achievement[]> {
  return MOCK_ACHIEVEMENTS;
}
