import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { CatalogueList } from "@/components/learner/catalogue-list";
import { getCatalogues } from "@/lib/catalogue/service";

export default async function CataloguePage() {
  const catalogues = await getCatalogues();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-3">
        <Link
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          href="/protected/learner"
        >
          <ArrowRightIcon className="rotate-180" size={14} />
          Learner overview
        </Link>
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Learning catalogue</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Choose what to learn next.</h1>
          <p className="max-w-2xl text-muted-foreground">
            Explore the learning areas available to you, then choose a theme to continue or start practising.
          </p>
        </div>
      </section>

      <CatalogueList catalogues={catalogues} />
    </div>
  );
}
