import { CatalogueProgressList } from "@/components/learner/progress/catalogue-progress-list";
import { OverallProgressCard } from "@/components/learner/progress/overall-progress-card";
import { TodaysProgressCard } from "@/components/learner/progress/todays-progress-card";
import { WeeklyGoalCard } from "@/components/learner/progress/weekly-goal-card";
import { ThemeList } from "@/components/learner/theme-list";
import { getCatalogues, getThemesByCatalogueId } from "@/lib/catalogue/service";
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

  const themesNested = await Promise.all(catalogues.map((cat) => getThemesByCatalogueId(cat.id)));
  const allThemes = themesNested.flat();

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

      <CatalogueProgressList catalogueProgress={catalogueProgress} />

      <section aria-labelledby="in-progress-themes-heading" className="space-y-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Themes browser</p>
          <h2 className="font-heading text-xl font-semibold" id="in-progress-themes-heading">
            In-Progress Themes
          </h2>
        </div>
        <ThemeList
          emptyMessage="You do not have any themes currently in progress."
          filter="in-progress"
          themes={allThemes}
        />
      </section>
    </div>
  );
}
