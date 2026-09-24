import {
  getComputedCatalogueProgress,
  getComputedOverallProgress,
  getComputedTodaysProgress,
  getComputedWeeklyGoal,
} from "./mock-progress-data";
import type { CatalogueProgress, OverallProgress, TodaysProgress, WeeklyGoal } from "./types";

export async function getOverallProgress(): Promise<OverallProgress> {
  return getComputedOverallProgress();
}

export async function getTodaysProgress(): Promise<TodaysProgress> {
  return getComputedTodaysProgress();
}

export async function getWeeklyGoal(): Promise<WeeklyGoal> {
  return getComputedWeeklyGoal();
}

export async function getCatalogueProgress(): Promise<CatalogueProgress[]> {
  return getComputedCatalogueProgress();
}
