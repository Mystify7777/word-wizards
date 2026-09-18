import { ChartLineUp, CheckCircle, Lightning, Path } from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    description: "A clear path that builds your skills.",
    icon: Path,
    title: "Structured Learning",
  },
  {
    description: "Learn by doing, with immediate feedback.",
    icon: Lightning,
    title: "Active Practice",
  },
  {
    description: "See how far you've come and stay motivated.",
    icon: ChartLineUp,
    title: "Track Your Progress",
  },
  {
    description: "Learning that feels practical and rewarding.",
    icon: CheckCircle,
    title: "Engaging Lessons",
  },
];

export function FeatureHighlights() {
  return (
    <section aria-labelledby="features-heading" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
            Built for learning
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" id="features-heading">
            A better way to practise
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="p-4 sm:p-5" key={feature.title}>
                <div className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon size={21} weight="duotone" />
                </div>

                <h3 className="mt-4 text-base font-bold text-foreground">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
