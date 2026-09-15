import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CatalogueProgress } from "@/lib/progress/types";

export function CatalogueProgressList({ catalogueProgress }: { catalogueProgress: CatalogueProgress[] }) {
  return (
    <section aria-labelledby="catalogue-progress-heading" className="space-y-3">
      <h2 className="font-heading text-xl font-semibold" id="catalogue-progress-heading">
        Catalogue Progress
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {catalogueProgress.map((cat) => (
          <Card key={cat.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{cat.name}</CardTitle>
              <CardDescription>
                {cat.completedThemes} of {cat.totalThemes} themes completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mastery</span>
                <span className="font-medium text-foreground">{cat.percentage}%</span>
              </div>
              <div
                aria-label={`${cat.name} ${cat.percentage}% complete`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={cat.percentage}
                className="h-2 bg-muted"
                role="progressbar"
              >
                <div className="h-full bg-primary" style={{ width: `${cat.percentage}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
