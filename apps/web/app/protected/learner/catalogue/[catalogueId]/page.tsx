import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ThemeList } from "@/components/learner/theme-list";
import { getCatalogueById, getCatalogues, getThemesByCatalogueId } from "@/lib/catalogue/service";

export default async function CatalogueDetailPage({ params }: PageProps<"/protected/learner/catalogue/[catalogueId]">) {
  const { catalogueId } = await params;
  const [catalogue, catalogues] = await Promise.all([getCatalogueById(catalogueId), getCatalogues()]);

  if (!catalogue) {
    notFound();
  }

  const themes = await getThemesByCatalogueId(catalogue.id);
  const otherCatalogues = catalogues.filter((item) => item.id !== catalogue.id);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="space-y-3">
        <Link
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          href="/protected/learner/catalogue"
        >
          <ArrowRightIcon className="rotate-180" size={14} />
          All catalogues
        </Link>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Catalogue</p>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{catalogue.name}</h1>
            <p className="max-w-2xl text-muted-foreground">{catalogue.description}</p>
          </div>
          <div
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center border border-border bg-muted font-heading text-xl font-bold text-primary"
          >
            {catalogue.visual}
          </div>
        </div>
      </section>

      <section aria-labelledby="themes-heading" className="space-y-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Choose a theme</p>
          <h2 className="font-heading text-2xl font-semibold" id="themes-heading">
            Themes
          </h2>
        </div>
        <ThemeList catalogueId={catalogue.id} themes={themes} />
      </section>

      {otherCatalogues.length > 0 && (
        <section aria-labelledby="other-catalogues-heading" className="space-y-4 border-t border-border pt-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Keep exploring</p>
            <h2 className="font-heading text-2xl font-semibold" id="other-catalogues-heading">
              Other catalogues
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {otherCatalogues.map((item) => (
              <Link
                className="border border-border px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
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
