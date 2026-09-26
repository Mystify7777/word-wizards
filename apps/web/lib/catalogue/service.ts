import { mockCatalogues, mockLessonProgress, mockLessons, mockThemes } from "./mock-data";
import type { Catalogue, LearnerLesson, Lesson, LessonAvailability, LessonProgress, Theme } from "./types";

const mockLessonAvailability: Record<string, LessonAvailability> = {
  "wild-animals": "locked",
};

export async function getCatalogues(): Promise<Catalogue[]> {
  return mockCatalogues.filter((catalogue) => catalogue.status === "published").sort((a, b) => a.order - b.order);
}

export async function getCatalogueById(id: string): Promise<Catalogue | null> {
  return (await getCatalogues()).find((catalogue) => catalogue.id === id) ?? null;
}

export async function getThemesByCatalogueId(catalogueId: string): Promise<Theme[]> {
  return mockThemes
    .filter((theme) => theme.catalogueId === catalogueId && theme.status === "published")
    .sort((a, b) => a.order - b.order);
}

export async function getThemeById(catalogueId: string, themeId: string): Promise<Theme | null> {
  return (await getThemesByCatalogueId(catalogueId)).find((theme) => theme.id === themeId) ?? null;
}

export async function getLessonsByThemeId(themeId: string): Promise<Lesson[]> {
  return mockLessons
    .filter((lesson) => lesson.themeId === themeId && lesson.status === "published")
    .sort((a, b) => a.order - b.order);
}

export async function getLessonById(themeId: string, lessonId: string): Promise<Lesson | null> {
  return (await getLessonsByThemeId(themeId)).find((lesson) => lesson.id === lessonId) ?? null;
}

export async function getLessonProgress(lessonId: string): Promise<LessonProgress> {
  return (
    mockLessonProgress.find((progress) => progress.lessonId === lessonId) ?? {
      lessonId,
      progress: 0,
      status: "not_started",
    }
  );
}

export async function getLearnerLessonsByThemeId(
  catalogueId: string,
  themeId: string,
): Promise<LearnerLesson[]> {
  const theme = await getThemeById(catalogueId, themeId);

  if (!theme) {
    return [];
  }

  const lessons = await getLessonsByThemeId(themeId);

  return Promise.all(
    lessons.map(async (lesson) => ({
      ...lesson,
      availability: theme.availability === "locked" ? "locked" : (mockLessonAvailability[lesson.id] ?? "available"),
      progress: await getLessonProgress(lesson.id),
    })),
  );
}

export async function getLearnerLessonById(
  catalogueId: string,
  themeId: string,
  lessonId: string,
): Promise<LearnerLesson | null> {
  const theme = await getThemeById(catalogueId, themeId);

  if (!theme) {
    return null;
  }

  return (await getLearnerLessonsByThemeId(catalogueId, themeId)).find(
    (lesson) => lesson.id === lessonId,
  ) ?? null;
}
