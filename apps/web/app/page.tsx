import { ArrowRight, ChatCircleDots, TextAa, TextT } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const learningAreas = [
  { description: "Build a practical foundation with vocabulary and everyday words.", icon: TextAa, title: "Letters & Words" },
  { description: "Connect words into useful phrases and complete sentences.", icon: TextT, title: "Phrases & Sentences" },
  { description: "Put what you learn into natural, useful conversations.", icon: ChatCircleDots, title: "Conversations" },
];

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <Link className="font-heading text-xl font-bold tracking-wider uppercase" href="/">Word Wizards</Link>
        <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/auth/login">Continue</Link>
      </header>
      <div className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
          <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl space-y-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Interactive language learning</p>
              <div className="space-y-4">
                <h1 className="font-heading text-4xl leading-tight font-bold tracking-tight sm:text-6xl">Learn language by using it.</h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Word Wizards helps you build language skills through structured practice, active recall, and useful learning steps that move from words to real conversations.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link className="inline-flex h-11 items-center justify-center gap-2 bg-primary px-8 text-sm font-semibold tracking-widest text-primary-foreground uppercase transition-all hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none" href="/auth/sign-up">Get Started <ArrowRight size={17} /></Link>
                <Link className="inline-flex h-11 items-center justify-center border border-border px-8 text-sm font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none" href="/auth/login">Continue</Link>
              </div>
            </div>
            <section aria-labelledby="learning-approach" className="border border-border bg-card p-6 sm:p-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">How learning works</p>
                <h2 className="font-heading text-2xl font-semibold" id="learning-approach">Start small. Build naturally.</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">Practice actively, get immediate feedback, and reinforce what you need before moving forward.</p>
              </div>
              <div className="mt-7 space-y-3">
                {learningAreas.map(({ description, icon: Icon, title }) => (
                  <div className="flex gap-4 border-t border-border pt-4" key={title}>
                    <Icon className="mt-0.5 shrink-0 text-primary" size={21} weight="duotone" />
                    <div className="space-y-1"><h3 className="font-medium">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></div>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
