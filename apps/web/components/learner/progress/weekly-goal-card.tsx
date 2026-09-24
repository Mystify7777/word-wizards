import { CheckIcon, PencilSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeeklyGoal } from "@/lib/progress/types";

export function WeeklyGoalCard({ goal }: { goal: WeeklyGoal }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>This Week&apos;s Goal</CardTitle>
            <CardDescription>
              {goal.completedDaysCount} of {goal.targetDays} practice days completed
            </CardDescription>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-primary uppercase hover:underline focus-visible:outline-none"
            href="/protected/learner/settings"
          >
            Edit <PencilSimpleIcon size={14} />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{goal.streakCount}-day streak</span>
          <span className="text-muted-foreground">
            {goal.completedDaysCount}/{goal.targetDays} days
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {goal.days.map((day) => (
            <div className="flex flex-col items-center gap-1.5" key={day.date}>
              <span className="text-[11px] font-medium text-muted-foreground">{day.day}</span>
              <div
                aria-label={`${day.day}: ${day.completed ? "completed" : "not completed"}`}
                className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${
                  day.completed
                    ? "bg-primary text-primary-foreground"
                    : day.isToday
                      ? "border-2 border-primary text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
                role="img"
              >
                {day.completed ? <CheckIcon size={14} weight="bold" /> : day.day.slice(0, 1)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
