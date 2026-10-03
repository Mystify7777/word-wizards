import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ThemeList } from "@/components/learner/theme-list";
import { getCatalogueById, getCatalogues, getLessonsByThemeId, getThemesByCatalogueId } from "@/lib/catalogue/service";

export default async function CatalogueDetailPage({ params }: PageProps<"/protected/learner/catalogue/[catalogueId]">) {
  const { catalogueId } = await params;
  const [catalogue, catalogues] = await Promise.all([getCatalogueById(catalogueId), getCatalogues()]);

  if (!catalogue) {
    notFound();
  }

  const themes = await getThemesByCatalogueId(catalogue.id);
  const themesWithLessonCounts = await Promise.all(
    themes.map(async (theme) => ({
      ...theme,
      lessonCount: (await getLessonsByThemeId(theme.id)).length,
    })),
  );
  const otherCatalogues = catalogues.filter((item) => item.id !== catalogue.id);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="space-y-4">
        <Link
          className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          href="/protected/learner/catalogue"
        >
          <ArrowRightIcon className="rotate-180" size={14} />
          All catalogues
        </Link>
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div className="min-w-0 space-y-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Catalogue</p>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{catalogue.name}</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{catalogue.description}</p>
          </div>
          <div
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/5 font-heading text-xl font-bold text-primary"
          >
            {catalogue.visual}
          </div>
        </div>
      </section>

      <section aria-labelledby="themes-heading" className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Choose a theme</p>
          <h2 className="font-heading text-2xl font-semibold" id="themes-heading">
            Explore themes
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Browse the themes in this catalogue, then choose a lesson path that fits where you are.
          </p>
        </div>
        <ThemeList catalogueId={catalogue.id} themes={themesWithLessonCounts} />
      </section>

      {otherCatalogues.length > 0 && (
        <section aria-labelledby="other-catalogues-heading" className="space-y-5 border-t border-border pt-10">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Keep exploring</p>
            <h2 className="font-heading text-2xl font-semibold" id="other-catalogues-heading">
              Other catalogues
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {otherCatalogues.map((item) => (
              <Link
                className="inline-flex min-h-10 items-center rounded-md border border-border bg-card px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                href={`/protected/learner/catalogue/${item.id}`}
                key={item.id}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
