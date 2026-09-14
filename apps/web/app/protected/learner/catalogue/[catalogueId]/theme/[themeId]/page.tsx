import { ArrowRightIcon, LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCatalogueById, getThemeById } from "@/lib/catalogue/service";

export default async function ThemePage({
  params,
}: PageProps<"/protected/learner/catalogue/[catalogueId]/theme/[themeId]">) {
  const { catalogueId, themeId } = await params;
  const [catalogue, theme] = await Promise.all([getCatalogueById(catalogueId), getThemeById(catalogueId, themeId)]);

  if (!catalogue || !theme) {
    notFound();
  }

  const isAvailable = theme.availability === "available";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="space-y-3">
        <Link
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          href={`/protected/learner/catalogue/${catalogue.id}`}
        >
          <ArrowRightIcon className="rotate-180" size={14} />
          {catalogue.name}
        </Link>
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Theme</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{theme.name}</h1>
          <p className="max-w-2xl text-muted-foreground">{theme.description}</p>
        </div>
      </section>

      <Card>
        <CardHeader>
          <div
            aria-hidden="true"
            className="flex size-20 items-center justify-center border border-border bg-muted text-3xl"
          >
            {theme.visual}
          </div>
          <CardTitle className="mt-2">{isAvailable ? "Ready to learn" : "Theme unavailable"}</CardTitle>
          <CardDescription>
            {isAvailable
              ? "The lesson experience will open here when lesson implementation is available."
              : "This theme is represented in the catalogue, but it is not available to start yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Theme progress</span>
              <span className="font-medium">{theme.progress}%</span>
            </div>
            <div
              aria-label={`${theme.progress}% complete`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={theme.progress}
              className="h-2 bg-muted"
              role="progressbar"
            >
              <div className="h-full bg-primary" style={{ width: `${theme.progress}%` }} />
            </div>
          </div>

          {isAvailable ? (
            <div className="border border-dashed border-border bg-muted/40 p-5">
              <p className="text-sm font-medium">Lesson player coming next.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                For this issue, selecting a theme ends at this learner-facing placeholder.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 border border-border p-5 text-sm text-muted-foreground">
              <LockKeyIcon className="shrink-0" size={20} />
              <span>Availability is presentational for now. No unlock rules are evaluated here.</span>
            </div>
          )}

          <Link
            className="inline-flex h-10 items-center justify-center gap-1.5 border border-border px-6 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
            href={`/protected/learner/catalogue/${catalogue.id}`}
          >
            Back to themes
            <ArrowRightIcon className="rotate-180" size={15} />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
