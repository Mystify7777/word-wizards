export type ContentStatus = "draft" | "published";

export type Catalogue = {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  status: ContentStatus;
  visual: string;
};

export type ThemeAvailability = "available" | "locked";

export type Theme = {
  id: string;
  catalogueId: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  status: ContentStatus;
  progress: number;
  availability: ThemeAvailability;
  visual: string;
};

export type Lesson = {
  id: string;
  themeId: string;
  title: string;
  description: string;
  order: number;
  status: ContentStatus;
};

export type LessonProgressStatus = "not_started" | "in_progress" | "completed";

export type LessonProgress = {
  lessonId: string;
  status: LessonProgressStatus;
  progress: number;
  score?: number;
  attemptCount?: number;
};

export type LessonAvailability = "available" | "locked";

export type LearnerLesson = Lesson & {
  availability: LessonAvailability;
  progress: LessonProgress;
};
