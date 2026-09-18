import { ChatCircleDotsIcon, NotebookIcon, TextAaIcon } from "@phosphor-icons/react/dist/ssr";

const learningStages = [
  {
    className: "bg-[#FFF0E3] text-primary",
    description: "Build a strong foundation with vocabulary and everyday words.",
    icon: TextAaIcon,
    title: "Letters & Words",
  },
  {
    className: "bg-secondary text-[#6C4CF6]",
    description: "Connect words into useful phrases and complete sentences.",
    icon: NotebookIcon,
    title: "Phrases & Sentences",
  },
  {
    className: "bg-[#EAF9F0] text-green-700",
    description: "Put what you learn into natural, real-world conversations.",
    icon: ChatCircleDotsIcon,
    title: "Conversations",
  },
];

export function LearningPath() {
  return (
    <section aria-labelledby="learning-path-heading" className="border-y border-border/60 bg-card/45" id="how-it-works">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
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

        <div className="mt-12 grid gap-0 lg:grid-cols-3">
          {learningStages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <article
                className={["px-6 py-6", index > 0 ? "border-t border-border/70 lg:border-l lg:border-t-0" : ""].join(
                  " ",
                )}
                key={stage.title}
              >
                <div className={`grid size-12 place-items-center rounded-xl ${stage.className}`}>
                  <Icon size={25} weight="duotone" />
                </div>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-xs font-bold tracking-widest text-primary">0{index + 1}</span>

                  <h3 className="text-lg font-bold text-foreground">{stage.title}</h3>
                </div>

                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{stage.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
