import { ChatCircleDots, Notebook, TextAa } from "@phosphor-icons/react/dist/ssr";

const learningStages = [
  {
    className: "bg-[#FFF0E3] text-primary",
    description: "Build a strong foundation with vocabulary and everyday words.",
    icon: TextAa,
    title: "Letters & Words",
  },
  {
    className: "bg-secondary text-primary",
    description: "Connect words into useful phrases and complete sentences.",
    icon: Notebook,
    title: "Phrases & Sentences",
  },
  {
    className: "bg-[#EAF9F0] text-green-700",
    description: "Put what you learn into natural, real-world conversations.",
    icon: ChatCircleDots,
    title: "Conversations",
  },
];

export function LearningPath() {
  return (
    <section aria-labelledby="learning-path-heading" className="border-y border-border/60 bg-card/55" id="how-it-works">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
            How learning works
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" id="learning-path-heading">
            Start small. Build naturally.
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Follow a clear path from words to sentences to real-life conversations.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {learningStages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <article
                className="relative rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                key={stage.title}
              >
                {index < learningStages.length - 1 ? (
                  <div aria-hidden="true" className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border lg:block" />
                ) : null}

                <div className={`grid size-11 place-items-center rounded-2xl ${stage.className}`}>
                  <Icon size={23} weight="duotone" />
                </div>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-xs font-bold tracking-widest text-muted-foreground">0{index + 1}</span>

                  <h3 className="text-lg font-bold text-foreground">{stage.title}</h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">{stage.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
