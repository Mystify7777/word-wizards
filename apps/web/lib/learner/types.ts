export type LearnerNavItem = {
  label: string;
  href: string;
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
