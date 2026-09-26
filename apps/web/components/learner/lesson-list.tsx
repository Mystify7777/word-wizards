import { ArrowRightIcon, CheckCircleIcon, LockKeyIcon, PlayCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearnerLesson } from "@/lib/catalogue/types";

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div
        aria-label={`${progress}% complete`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="h-2 bg-muted"
        role="progressbar"
      >
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function ProgressLabel({ lesson }: { lesson: LearnerLesson }) {
  if (lesson.availability === "locked") {
    return (
      <span className="inline-flex items-center gap-1 border border-border px-2.5 py-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        <LockKeyIcon size={13} />
        Locked
      </span>
    );
  }

  if (lesson.progress.status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
        <CheckCircleIcon size={13} />
        Complete
      </span>
    );
  }

  if (lesson.progress.status === "in_progress") {
    return (
      <span className="inline-flex items-center gap-1 border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
        <PlayCircleIcon size={13} />
        In progress
      </span>
    );
  }

  return (
    <span className="border border-border px-2.5 py-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
      Available
    </span>
  );
}

export function LessonList({
  catalogueId,
  themeId,
  lessons,
}: {
  catalogueId: string;
  themeId: string;
  lessons: LearnerLesson[];
}) {
  if (lessons.length === 0) {
    return (
      <div className="border border-dashed border-border p-8 text-center">
        <h2 className="font-heading text-lg font-semibold">No lessons available</h2>
        <p className="mt-2 text-sm text-muted-foreground">This theme does not have any published lessons yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson) => {
        const isLocked = lesson.availability === "locked";

        if (isLocked) {
          return (
            <Card aria-disabled="true" className="opacity-70" key={lesson.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center border border-border bg-muted font-heading text-sm font-bold text-muted-foreground">
                    {lesson.order}
                  </span>
                  <ProgressLabel lesson={lesson} />
                </div>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar progress={lesson.progress.progress} />
                <p className="text-xs text-muted-foreground">This lesson is not available yet.</p>
              </CardContent>
            </Card>
          );
        }

        return (
          <Link
            className="group block focus-visible:outline-none"
            href={`/protected/learner/catalogue/${catalogueId}/theme/${themeId}/lesson/${lesson.id}`}
            key={lesson.id}
          >
            <Card className="transition-transform group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-ring/40">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center border border-border bg-muted font-heading text-sm font-bold text-primary">
                    {lesson.order}
                  </span>
                  <ProgressLabel lesson={lesson} />
                </div>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar progress={lesson.progress.progress} />
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
                  {lesson.progress.status === "completed"
                    ? "Review lesson"
                    : lesson.progress.status === "in_progress"
                      ? "Continue lesson"
                      : "Start lesson"}
                  <ArrowRightIcon size={15} />
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
