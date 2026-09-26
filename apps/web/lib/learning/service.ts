import { mockExerciseAttempts, mockExercises } from "./mock-data";
import type { Exercise, ExerciseAttempt } from "./types";

export async function getExercisesByLessonId(lessonId: string): Promise<Exercise[]> {
  return mockExercises
    .filter((exercise) => exercise.lessonId === lessonId && exercise.status === "published")
    .sort((a, b) => a.order - b.order);
}

export async function getExerciseById(lessonId: string, exerciseId: string): Promise<Exercise | null> {
  return (
    (await getExercisesByLessonId(lessonId)).find((exercise) => exercise.id === exerciseId) ?? null
  );
}

export async function getExerciseAttempts(exerciseId: string): Promise<ExerciseAttempt[]> {
  return mockExerciseAttempts
    .filter((attempt) => attempt.exerciseId === exerciseId)
    .sort((a, b) => a.startedAt.localeCompare(b.startedAt));
}

export async function getExerciseAttemptById(
  exerciseId: string,
  attemptId: string,
): Promise<ExerciseAttempt | null> {
  return (
    (await getExerciseAttempts(exerciseId)).find((attempt) => attempt.id === attemptId) ?? null
  );
}
