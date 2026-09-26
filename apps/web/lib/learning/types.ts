import type { ContentStatus } from "@/lib/catalogue/types";

export type ExerciseType =
  | "direct_manipulation"
  | "multiple_choice"
  | "recognition"
  | "spelling";

export type Exercise = {
  id: string;
  lessonId: string;
  type: ExerciseType;
  title: string;
  order: number;
  status: ContentStatus;
};

export type ExerciseAttemptStatus = "in_progress" | "completed";

export type ExerciseAttempt = {
  id: string;
  learnerId: string;
  exerciseId: string;
  status: ExerciseAttemptStatus;
  score?: number;
  startedAt: string;
  completedAt?: string;
};
