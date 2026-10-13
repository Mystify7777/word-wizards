import type { ContentUnlock, LearnerOverview, LearnerProfile, LearnerWallet } from "./types";

export const mockLearnerProfile: LearnerProfile = {
  displayName: "Learner",
  email: "learner@example.com",
  id: "learner-1",
};

export const mockLearnerWallet: LearnerWallet = {
  keyBalance: 120,
  learnerId: mockLearnerProfile.id,
};

export const mockContentUnlocks: ContentUnlock[] = [
  {
    contentId: "everyday-animals",
    contentType: "theme",
    id: "unlock-1",
    learnerId: mockLearnerProfile.id,
    unlockedAt: "2026-09-20T10:00:00.000Z",
  },
  {
    contentId: "food-and-drinks",
    contentType: "theme",
    id: "unlock-2",
    learnerId: mockLearnerProfile.id,
    unlockedAt: "2026-09-23T10:00:00.000Z",
  },
  {
    contentId: "daily-routines",
    contentType: "theme",
    id: "unlock-3",
    learnerId: mockLearnerProfile.id,
    unlockedAt: "2026-09-24T10:00:00.000Z",
  },
  {
    contentId: "introductions",
    contentType: "theme",
    id: "unlock-4",
    learnerId: mockLearnerProfile.id,
    unlockedAt: "2026-09-25T10:00:00.000Z",
  },
];

export const mockLearnerOverview: LearnerOverview = {
  currentLearning: {
    catalogue: "Letters & Words",
    catalogueId: "letters-and-words",
    lesson: "Common Animal Words",
    progress: 60,
    theme: "Everyday Animals",
    themeId: "everyday-animals",
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
