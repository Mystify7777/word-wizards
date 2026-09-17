import { ArrowRightIcon, CheckIcon, LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLearnerOverview } from "@/lib/learner/service";

export default async function LearnerOverviewPage() {
  const overview = await getLearnerOverview();
  const todayPercent = Math.round((overview.today.completedExercises / overview.today.goal) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Your learning space</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Keep learning, {overview.learnerName}.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Build your language skills step by step through words, sentences, and conversations.
        </p>
      </section>

      <section aria-labelledby="catalogue-heading" className="space-y-3">
        <h2 className="font-heading text-xl font-semibold" id="catalogue-heading">
          Explore learning
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Browse the catalogue</CardTitle>
            <CardDescription>
              Explore Letters &amp; Words, Phrases &amp; Sentences, and Conversations, then choose a theme to study.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              className="inline-flex h-10 items-center justify-center gap-1.5 bg-primary px-6 text-xs font-semibold tracking-widest text-primary-foreground uppercase transition-all hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
              href="/protected/learner/catalogue"
            >
              Explore catalogues <ArrowRightIcon size={16} />
            </Link>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="continue-learning" className="space-y-3">
        <h2 className="font-heading text-xl font-semibold" id="continue-learning">
          Continue Learning
        </h2>
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {overview.currentLearning.catalogue}
            </p>
            <CardTitle>{overview.currentLearning.theme}</CardTitle>
            <CardDescription>{overview.currentLearning.lesson}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lesson progress</span>
                <span className="font-medium">{overview.currentLearning.progress}%</span>
              </div>
              <div
                aria-label={`${overview.currentLearning.progress}% complete`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={overview.currentLearning.progress}
                className="h-2 bg-muted"
                role="progressbar"
              >
                <div className="h-full bg-primary" style={{ width: `${overview.currentLearning.progress}%` }} />
              </div>
            </div>
            <Link
              className="inline-flex h-10 items-center justify-center gap-1.5 bg-primary px-6 text-xs font-semibold tracking-widest text-primary-foreground uppercase transition-all hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
              href={`/protected/learner/catalogue/${overview.currentLearning.catalogueId}/theme/${overview.currentLearning.themeId}`}
            >
              Continue <ArrowRightIcon size={16} />
            </Link>
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Progress</CardTitle>
            <CardDescription>
              {overview.today.completedExercises} of {overview.today.goal} exercises completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3">
              <span className="font-heading text-4xl font-bold">{todayPercent}%</span>
              <span className="pb-1 text-sm text-muted-foreground">of today&apos;s target</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Goal</CardTitle>
            <CardDescription>Keep a steady learning rhythm.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckIcon size={18} weight="bold" />
            </div>
            <div>
              <p className="font-medium">{overview.today.goal} exercises</p>
              <p className="text-sm text-muted-foreground">Daily practice target</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>
              {overview.weekly.completedDays} of {overview.weekly.targetDays} practice days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>{overview.weekly.streak}-day streak</span>
              <span>
                {overview.weekly.completedDays}/{overview.weekly.targetDays}
              </span>
            </div>
            <div
              aria-label={`${overview.weekly.completedDays} of ${overview.weekly.targetDays} practice days completed`}
              className="flex gap-2"
              role="img"
            >
              {Array.from({ length: overview.weekly.targetDays }, (_, index) => ({
                completed: index < overview.weekly.completedDays,
                id: `day-${index + 1}`,
              })).map(({ completed, id }) => (
                <span aria-hidden="true" className="h-2 flex-1 bg-muted" key={id}>
                  <span className="block h-full bg-primary" style={{ width: completed ? "100%" : "0%" }} />
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Unlock</CardTitle>
            <CardDescription>What you&apos;re working toward</CardDescription>
          </CardHeader>
          <CardContent className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <LockKeyIcon size={18} weight="duotone" />
            </div>
            <div>
              <p className="font-medium">{overview.nextUnlock.title}</p>
              <p className="text-sm text-muted-foreground">{overview.nextUnlock.requirement}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
