"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CatalogueProgress } from "@/lib/progress/types";
import { cn } from "@/lib/utils";

export function CatalogueProgressList({
  catalogueProgress,
  selectedId,
  onSelect,
}: {
  catalogueProgress: CatalogueProgress[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <section aria-labelledby="catalogue-progress-heading" className="space-y-3">
      <h2 className="font-heading text-xl font-semibold" id="catalogue-progress-heading">
        Catalogue Progress
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {catalogueProgress.map((cat) => {
          const isSelected = selectedId === cat.id;
          const isClickable = !!onSelect;

          return (
            <Card
              aria-current={isSelected ? "true" : undefined}
              className={cn(
                "transition-all",
                isClickable && "cursor-pointer hover:-translate-y-1 hover:shadow-md",
                isSelected && "ring-2 ring-primary shadow-md",
              )}
              key={cat.id}
              onClick={() => onSelect?.(cat.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect?.(cat.id);
                }
              }}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
            >
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
          );
        })}
      </div>
    </section>
  );
}
