import { ArrowRightIcon, CheckCircleIcon, LockKeyIcon, PlayCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCatalogueById, getLearnerLessonById, getThemeById } from "@/lib/catalogue/service";

export default async function LessonPage({
  params,
}: PageProps<"/protected/learner/catalogue/[catalogueId]/theme/[themeId]/lesson/[lessonId]">) {
  const { catalogueId, themeId, lessonId } = await params;
  const [catalogue, theme, lesson] = await Promise.all([
    getCatalogueById(catalogueId),
    getThemeById(catalogueId, themeId),
    getLearnerLessonById(themeId, lessonId),
  ]);

  if (!catalogue || !theme || !lesson) {
    notFound();
  }

  if (lesson.availability === "locked") {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <section className="space-y-3">
          <Link
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
            href={`/protected/learner/catalogue/${catalogue.id}/theme/${theme.id}`}
          >
            <ArrowRightIcon className="rotate-180" size={14} />
            {theme.name}
          </Link>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Lesson</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{lesson.title}</h1>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyIcon size={20} />
              Lesson locked
            </CardTitle>
            <CardDescription>This lesson is represented in the mock learner data but is not available yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              className="inline-flex h-10 items-center justify-center gap-1.5 border border-border px-6 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
              href={`/protected/learner/catalogue/${catalogue.id}/theme/${theme.id}`}
            >
              Back to lessons
              <ArrowRightIcon className="rotate-180" size={15} />
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressLabel =
    lesson.progress.status === "completed"
      ? "Completed"
      : lesson.progress.status === "in_progress"
        ? "In progress"
        : "Not started";

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="space-y-3">
        <Link
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          href={`/protected/learner/catalogue/${catalogue.id}/theme/${theme.id}`}
        >
          <ArrowRightIcon className="rotate-180" size={14} />
          {theme.name}
        </Link>
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Lesson {lesson.order}</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{lesson.title}</h1>
        <p className="max-w-xl text-muted-foreground">{lesson.description}</p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {lesson.progress.status === "completed" ? (
              <CheckCircleIcon className="text-primary" size={20} />
            ) : (
              <PlayCircleIcon className="text-primary" size={20} />
            )}
            {progressLabel}
          </CardTitle>
          <CardDescription>The interactive lesson experience will be implemented in the next learning phase.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Lesson progress</span>
              <span className="font-medium">{lesson.progress.progress}%</span>
            </div>
            <div
              aria-label={`${lesson.progress.progress}% complete`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={lesson.progress.progress}
              className="h-2 bg-muted"
              role="progressbar"
            >
              <div className="h-full bg-primary" style={{ width: `${lesson.progress.progress}%` }} />
            </div>
          </div>

          <div className="border border-dashed border-border bg-muted/40 p-5">
            <p className="text-sm font-medium">Lesson selection complete.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              This route establishes the boundary for the future lesson player without introducing exercise or completion logic.
            </p>
          </div>

          <Link
            className="inline-flex h-10 items-center justify-center gap-1.5 border border-border px-6 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
            href={`/protected/learner/catalogue/${catalogue.id}/theme/${theme.id}`}
          >
            Back to lessons
            <ArrowRightIcon className="rotate-180" size={15} />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
