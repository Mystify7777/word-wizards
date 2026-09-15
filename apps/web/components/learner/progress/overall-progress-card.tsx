import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OverallProgress } from "@/lib/progress/types";

export function OverallProgressCard({ progress }: { progress: OverallProgress }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Overall Progress</CardTitle>
        <CardDescription>
          {progress.completedThemes} of {progress.totalThemes} themes completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-3">
          <span className="font-heading text-4xl font-bold">{progress.percentage}%</span>
          <span className="pb-1 text-sm text-muted-foreground">overall mastery</span>
        </div>
        <div className="space-y-1.5">
          <div
            aria-label={`Overall progress ${progress.percentage}% complete`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress.percentage}
            className="h-2 bg-muted"
            role="progressbar"
          >
            <div className="h-full bg-primary" style={{ width: `${progress.percentage}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
