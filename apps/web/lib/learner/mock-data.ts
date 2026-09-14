import type { LearnerOverview } from "./types";

export const mockLearnerOverview: LearnerOverview = {
  currentLearning: {
    catalogue: "Letters & Words",
    lesson: "Common Animal Words",
    progress: 60,
    theme: "Everyday Animals",
  },
  learnerName: "Learner",
  nextUnlock: {
    requirement: "Complete 2 more lessons in Letters & Words",
    title: "Food & Drinks",
  },
  today: {
    completedExercises: 6,
    goal: 10,
  },
  weekly: {
    completedDays: 4,
    streak: 4,
    targetDays: 5,
  },
};
