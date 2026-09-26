export type LearnerNavItem = {
  label: string;
  href: string;
};

export type LearnerProfile = {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
};

export type LearnerWallet = {
  learnerId: string;
  keyBalance: number;
};

export type UnlockableContentType = "theme" | "lesson";

export type ContentUnlock = {
  id: string;
  learnerId: string;
  contentId: string;
  contentType: UnlockableContentType;
  unlockedAt: string;
};

export type LearnerOverview = {
  learnerName: string;
  currentLearning: {
    catalogue: string;
    catalogueId: string;
    theme: string;
    themeId: string;
    lesson: string;
    progress: number;
  };
  today: {
    completedExercises: number;
    goal: number;
  };
  weekly: {
    completedDays: number;
    targetDays: number;
    streak: number;
  };
  nextUnlock: {
    title: string;
    requirement: string;
  };
};
