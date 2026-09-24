"use client";

import type { AchievementFilter } from "@/lib/achievements/types";
import { cn } from "@/lib/utils";

const TABS: { value: AchievementFilter; label: string }[] = [
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Locked", value: "locked" },
  { label: "All", value: "all" },
];

interface Props {
  active: AchievementFilter;
  onChange: (filter: AchievementFilter) => void;
}

export function AchievementFilterTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {TABS.map((tab) => (
        <button
          aria-pressed={active === tab.value}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === tab.value
              ? "border-violet-300 bg-violet-100 text-violet-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
          )}
          key={tab.value}
          onClick={() => onChange(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
