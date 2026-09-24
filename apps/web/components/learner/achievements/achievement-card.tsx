"use client";

import {
  BookOpenIcon,
  ChatCircleTextIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  CompassIcon,
  FlameIcon,
  GlobeIcon,
  type Icon,
  LockKeyIcon,
  LockKeyOpenIcon,
  QuestionIcon,
  StarIcon,
  TargetIcon,
  TrophyIcon,
} from "@phosphor-icons/react";

import type { Achievement } from "@/lib/achievements/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Achievement["status"], string> = {
  completed: "bg-emerald-50 border-emerald-200",
  "in-progress": "bg-amber-50 border-amber-200",
  locked: "bg-slate-50 border-slate-200",
  unlocked: "bg-sky-50 border-sky-200",
};

const STATUS_BADGE: Record<Achievement["status"], { label: string; className: string }> = {
  completed: { className: "bg-emerald-200 text-emerald-700", label: "Completed" },
  "in-progress": { className: "bg-amber-200 text-amber-700", label: "In Progress" },
  locked: { className: "bg-slate-200 text-slate-500", label: "Locked" },
  unlocked: { className: "bg-sky-200 text-sky-700", label: "Unlocked" },
};

const ICON_MAP: Record<string, Icon> = {
  Award: TrophyIcon,
  BookOpen: BookOpenIcon,
  Compass: CompassIcon,
  Flame: FlameIcon,
  Globe: GlobeIcon,
  MessageCircle: ChatCircleTextIcon,
  Star: StarIcon,
  Target: TargetIcon,
};

function StatusIcon({ status }: { status: Achievement["status"] }) {
  switch (status) {
    case "locked":
      return <LockKeyIcon className="size-5 text-slate-400" weight="bold" />;
    case "unlocked":
      return <LockKeyOpenIcon className="size-5 text-sky-500" weight="bold" />;
    case "in-progress":
      return <CircleNotchIcon className="size-5 animate-spin text-amber-500" weight="bold" />;
    case "completed":
      return <CheckCircleIcon className="size-5 text-emerald-500" weight="fill" />;
  }
}

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const badge = STATUS_BADGE[achievement.status];
  const IconComponent = ICON_MAP[achievement.icon] ?? QuestionIcon;

  return (
    <div className={cn("relative flex flex-col gap-2 rounded-2xl border p-4", STATUS_STYLES[achievement.status])}>
      <div className="flex items-start justify-between">
        <IconComponent className="size-6 text-slate-700" weight="duotone" />
        {achievement.status === "in-progress" && achievement.progress != null && (
          <span className="text-xs font-semibold text-amber-600">{achievement.progress}%</span>
        )}
      </div>

      <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
      <p className="text-sm text-slate-500">{achievement.description}</p>

      {achievement.status === "in-progress" && achievement.progress != null && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
          <div className="h-full rounded-full bg-amber-400" style={{ width: `${achievement.progress}%` }} />
        </div>
      )}

      <div className="mt-auto flex items-center gap-1.5 pt-1">
        <StatusIcon status={achievement.status} />
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", badge.className)}>{badge.label}</span>
      </div>
    </div>
  );
}
