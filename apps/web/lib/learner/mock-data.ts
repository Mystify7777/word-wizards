import type { LearnerOverview } from "./types";

export const mockLearnerOverview: LearnerOverview = {
  learnerName: "Learner",
  currentLearning: {
    catalogue: "Letters & Words",
    theme: "Everyday Animals",
    lesson: "Common Animal Words",
    progress: 60,
  },
  today: {
    completedExercises: 6,
    goal: 10,
  },
  weekly: {
    completedDays: 4,
    targetDays: 5,
    streak: 4,
  },
  nextUnlock: {
    title: "Food & Drinks",
    requirement: "Complete 2 more lessons in Letters & Words",
  },
};
