import { mockLearnerOverview } from "./mock-data";
import type { LearnerOverview } from "./types";

export async function getLearnerOverview(): Promise<LearnerOverview> {
  return mockLearnerOverview;
}
