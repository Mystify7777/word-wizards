import { OverallProgressCard } from "@/components/learner/progress/overall-progress-card";
import { ProgressDashboard } from "@/components/learner/progress/progress-dashboard";
import { TodaysProgressCard } from "@/components/learner/progress/todays-progress-card";
import { WeeklyGoalCard } from "@/components/learner/progress/weekly-goal-card";
import { getCatalogues, getThemesByCatalogueId } from "@/lib/catalogue/service";
import type { Theme } from "@/lib/catalogue/types";
import {
  getCatalogueProgress,
  getOverallProgress,
  getTodaysProgress,
  getWeeklyGoal,
} from "@/lib/progress/progress-service";

export default async function ProgressPage() {
  const [overall, today, weekly, catalogueProgress, catalogues] = await Promise.all([
    getOverallProgress(),
    getTodaysProgress(),
    getWeeklyGoal(),
    getCatalogueProgress(),
    getCatalogues(),
  ]);

  // Build a map of catalogue ID → themes so the client component can switch instantly
  const themeEntries = await Promise.all(
    catalogues.map(async (cat) => {
      const themes = await getThemesByCatalogueId(cat.id);
      return [cat.id, themes] as [string, Theme[]];
    }),
  );
  const themesByCatalogue: Record<string, Theme[]> = Object.fromEntries(themeEntries);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Your progress</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Track your learning journey.</h1>
        <p className="max-w-2xl text-muted-foreground">
          Review your daily activities, streak goals, and overall theme mastery.
        </p>
      </section>

      <section aria-label="Summary statistics">
        <div className="grid gap-4 md:grid-cols-3">
          <OverallProgressCard progress={overall} />
          <TodaysProgressCard progress={today} />
          <WeeklyGoalCard goal={weekly} />
        </div>
      </section>

      <ProgressDashboard catalogueProgress={catalogueProgress} themesByCatalogue={themesByCatalogue} />
    </div>
  );
}
