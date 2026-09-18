import { ChartLineUp, GraduationCap, Heart, Target } from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    className: "bg-secondary text-[#6C4CF6]",
    description: "A clear path that builds your skills.",
    icon: GraduationCap,
    title: "Structured Learning",
  },
  {
    className: "bg-[#FFF0E3] text-primary",
    description: "Learn by doing, with instant feedback.",
    icon: Target,
    title: "Active Practice",
  },
  {
    className: "bg-[#EEF4FF] text-blue-600",
    description: "See how far you've come and stay motivated.",
    icon: ChartLineUp,
    title: "Track Your Progress",
  },
  {
    className: "bg-[#FFF0F5] text-pink-600",
    description: "Learning that feels good.",
    icon: Heart,
    title: "Fun & Engaging",
  },
];

export function FeatureHighlights() {
  return (
    <section aria-labelledby="features-heading" className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
            Built for learning
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" id="features-heading">
            A better way to practise
          </h2>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                className={[
                  "px-6 py-5 text-center",
                  index > 0 ? "border-t border-border/70 sm:border-l sm:border-t-0" : "",
                  index === 2 ? "lg:border-l" : "",
                ].join(" ")}
                key={feature.title}
              >
                <div className={`mx-auto grid size-11 place-items-center rounded-full ${feature.className}`}>
                  <Icon size={23} weight="duotone" />
                </div>

                <h3 className="mt-4 text-base font-bold text-foreground">{feature.title}</h3>

                <p className="mx-auto mt-2 max-w-48 text-sm leading-5 text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
