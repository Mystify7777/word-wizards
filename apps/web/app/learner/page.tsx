import { ArrowRight, Check, LockKey } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLearnerOverview } from "@/lib/learner/service";

export default async function LearnerOverviewPage() {
  const overview = await getLearnerOverview();
  const todayPercent = Math.round((overview.today.completedExercises / overview.today.goal) * 100);
  const weeklyPercent = Math.round((overview.weekly.completedDays / overview.weekly.targetDays) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Your learning space</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Keep learning, {overview.learnerName}.</h1>
        <p className="max-w-2xl text-muted-foreground">Build your language skills step by step through words, sentences, and conversations.</p>
      </section>

      <section aria-labelledby="continue-learning" className="space-y-3">
        <h2 className="font-heading text-xl font-semibold" id="continue-learning">Continue Learning</h2>
        <Card>
          <CardHeader>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{overview.currentLearning.catalogue}</p>
            <CardTitle>{overview.currentLearning.theme}</CardTitle>
            <CardDescription>{overview.currentLearning.lesson}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2" aria-label={`${overview.currentLearning.progress}% complete`}>
              <div className="flex justify-between text-sm">
                <span>Lesson progress</span>
                <span className="font-medium">{overview.currentLearning.progress}%</span>
              </div>
              <div className="h-2 bg-muted" role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={overview.currentLearning.progress}>
                <div className="h-full bg-primary" style={{ width: `${overview.currentLearning.progress}%` }} />
              </div>
            </div>
            <Button asChild>
              <Link href="/learner">
                Continue <ArrowRight data-icon="inline-end" size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Progress</CardTitle>
            <CardDescription>{overview.today.completedExercises} of {overview.today.goal} exercises completed</CardDescription>
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
              <Check size={18} weight="bold" />
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
            <CardDescription>{overview.weekly.completedDays} of {overview.weekly.targetDays} practice days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>{overview.weekly.streak}-day streak</span>
              <span>{weeklyPercent}%</span>
            </div>
            <div className="flex gap-2" aria-label={`${overview.weekly.completedDays} of ${overview.weekly.targetDays} practice days completed`}>
              {Array.from({ length: overview.weekly.targetDays }, (_, index) => (
                <span aria-hidden="true" className="h-2 flex-1 bg-muted" key={index}>
                  <span className="block h-full bg-primary" style={{ width: index < overview.weekly.completedDays ? "100%" : "0%" }} />
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
              <LockKey size={18} weight="duotone" />
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
