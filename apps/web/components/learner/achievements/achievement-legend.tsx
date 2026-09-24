import { CheckCircleIcon, CircleNotchIcon, LockKeyIcon, LockKeyOpenIcon } from "@phosphor-icons/react/dist/ssr";

const LEGEND = [
  {
    desc: "No info provided yet.",
    icon: LockKeyIcon,
    iconClass: "text-slate-400",
    title: "Locked",
    weight: "bold" as const,
  },
  {
    desc: "Shows how to complete it.",
    icon: LockKeyOpenIcon,
    iconClass: "text-sky-500",
    title: "Unlocked",
    weight: "bold" as const,
  },
  {
    desc: "You're working towards it.",
    icon: CircleNotchIcon,
    iconClass: "text-amber-500",
    title: "In Progress",
    weight: "bold" as const,
  },
  {
    desc: "Well done!",
    icon: CheckCircleIcon,
    iconClass: "text-emerald-500",
    title: "Completed",
    weight: "fill" as const,
  },
];

export function AchievementLegend() {
  return (
    <aside className="w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-5">
      <h4 className="mb-4 font-semibold text-slate-900">Achievement Types</h4>
      <ul className="space-y-4">
        {LEGEND.map(({ icon: Icon, iconClass, title, desc, weight }) => (
          <li className="flex gap-3" key={title}>
            <Icon className={`mt-0.5 size-5 shrink-0 ${iconClass}`} weight={weight} />
            <div>
              <p className="text-sm font-medium text-slate-900">{title}</p>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <blockquote className="mt-6 border-t border-slate-100 pt-4 text-sm italic text-violet-600">
        &ldquo;Every milestone is a step towards a bigger you.&rdquo;
        <footer className="mt-1 text-xs not-italic text-slate-400">&mdash; Word Wizards</footer>
      </blockquote>
    </aside>
  );
}
