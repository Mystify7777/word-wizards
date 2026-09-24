"use client";

import { useEffect, useMemo, useState } from "react";

import { getAchievements } from "@/lib/achievements/achievements-service";
import type { Achievement, AchievementFilter } from "@/lib/achievements/types";

import { AchievementCard } from "./achievement-card";
import { AchievementFilterTabs } from "./achievement-filter-tabs";
import { AchievementLegend } from "./achievement-legend";

export function AchievementsDashboard() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<AchievementFilter>("all");

  useEffect(() => {
    getAchievements()
      .then(setAchievements)
      .catch((err) => {
        console.error("Failed to load achievements:", err);
      });
  }, []);

  const visible = useMemo(() => {
    if (filter === "all") return achievements;
    return achievements.filter((a) => a.status === filter);
  }, [achievements, filter]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Achievements</h1>
            <p className="text-slate-500">Celebrate your progress and keep unlocking new milestones.</p>
          </div>
          <div className="rounded-xl bg-violet-50 px-4 py-2 text-sm text-violet-600">
            Every achievement brings you closer to fluency!
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <AchievementFilterTabs active={filter} onChange={setFilter} />
          <button
            className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            onClick={() => setFilter("all")}
            type="button"
          >
            <span>{achievements.length} achievements</span>
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((a) => (
            <AchievementCard achievement={a} key={a.id} />
          ))}
        </div>
      </div>

      <AchievementLegend />
    </div>
  );
}
