import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { CatalogueList } from "@/components/learner/catalogue-list";
import { getLearnerCatalogues } from "@/lib/catalogue/service";

export default async function CataloguePage() {
  const catalogues = await getLearnerCatalogues();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-2">
        <Link
          className="inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          href="/protected/learner"
        >
          <ArrowRightIcon className="rotate-180" size={14} />
          Learner overview
        </Link>

        <div className="pt-2">
          <p className="text-sm font-semibold text-primary">Learning catalogue</p>
          <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Choose what to learn next.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Explore a catalogue, then choose a theme that interests you.
          </p>
        </div>
      </section>

      <CatalogueList catalogues={catalogues} />
    </div>
  );
}
