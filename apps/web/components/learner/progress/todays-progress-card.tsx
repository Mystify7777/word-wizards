import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TodaysProgress } from "@/lib/progress/types";

export function TodaysProgressCard({ progress }: { progress: TodaysProgress }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Today&apos;s Progress</CardTitle>
        <CardDescription>
          {progress.completedCount} of {progress.totalCount} activities completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-3">
          <span className="font-heading text-4xl font-bold">{progress.percentage}%</span>
          <span className="pb-1 text-sm text-muted-foreground">of today&apos;s target</span>
        </div>
        <div className="space-y-2 pt-1">
          {progress.activities.map((activity) => (
            <div className="flex items-center gap-2.5 text-sm" key={activity.id}>
              <div
                className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                  activity.completed ? "bg-primary/10 text-primary" : "border border-border text-muted-foreground"
                }`}
              >
                {activity.completed && <CheckIcon size={12} weight="bold" />}
              </div>
              <span className={activity.completed ? "text-muted-foreground line-through" : "font-medium"}>
                {activity.title}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
