import { ArrowRightIcon, LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LessonList } from "@/components/learner/lesson-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCatalogueById, getLearnerLessonsByThemeId, getThemeById } from "@/lib/catalogue/service";

const themeArtwork: Record<string, string> = {
  "at-the-restaurant": "/themes/theme-at-the-restaurant.webp",
  "daily-life": "/themes/theme-daily-life.webp",
  "daily-routines": "/themes/theme-daily-routines.webp",
  "everyday-animals": "/themes/theme-everyday-animals.webp",
  "food-and-drinks": "/themes/theme-food-and-drinks.webp",
  introductions: "/themes/theme-introductions.webp",
  "making-plans": "/themes/theme-making-plans.webp",
  shopping: "/themes/theme-shopping.webp",
  travel: "/themes/theme-travel.webp",
};

export default async function ThemePage({
  params,
}: PageProps<"/protected/learner/catalogue/[catalogueId]/theme/[themeId]">) {
  const { catalogueId, themeId } = await params;
  const [catalogue, theme] = await Promise.all([getCatalogueById(catalogueId), getThemeById(catalogueId, themeId)]);

  if (!catalogue || !theme) {
    notFound();
  }

  const isAvailable = theme.availability === "available";
  const lessons = isAvailable ? await getLearnerLessonsByThemeId(catalogue.id, theme.id) : [];
  const artwork = themeArtwork[theme.id];

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <section className="space-y-4">
        <Link
          className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          href={`/protected/learner/catalogue/${catalogue.id}`}
        >
          <ArrowRightIcon className="rotate-180" size={14} />
          {catalogue.name}
        </Link>
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Theme</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{theme.name}</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{theme.description}</p>
        </div>
      </section>

      <section className="space-y-4">
        <Card className="overflow-hidden rounded-xl py-0 shadow-sm">
          <CardHeader className="gap-3 p-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              {artwork ? (
                <Image
                  alt=""
                  className={`object-cover transition-transform duration-300 ease-out ${isAvailable ? "hover:scale-[1.01]" : "grayscale"}`}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  src={artwork}
                />
              ) : (
                <div aria-hidden="true" className="flex h-full items-center justify-center text-5xl">
                  {theme.visual}
                </div>
              )}
              {!isAvailable && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase shadow-sm">
                  <LockKeyIcon size={13} />
                  Locked
                </div>
              )}
            </div>
            <div className="px-6 pt-3 sm:px-7">
              <CardTitle className="leading-snug">{isAvailable ? "Your learning path" : "Theme unavailable"}</CardTitle>
              <CardDescription className="mt-1 leading-6">
                {isAvailable
                  ? `${lessons.length} learning activities in this theme. Tutorials build skills; labs apply them.`
                  : "This theme is represented in the catalogue, but it is not available to start yet."}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
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
                className="h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                  style={{ width: `${theme.progress}%` }}
                />
              </div>
            </div>

            {!isAvailable && (
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                <LockKeyIcon className="mt-0.5 shrink-0 text-primary" size={20} />
                <span>Availability is presentational for now. No unlock rules are evaluated here.</span>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {isAvailable && <LessonList catalogueId={catalogue.id} lessons={lessons} themeId={theme.id} />}

      <Link
        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-border bg-card px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
        href={`/protected/learner/catalogue/${catalogue.id}`}
      >
        Back to themes
        <ArrowRightIcon className="rotate-180" size={15} />
      </Link>
    </div>
  );
}
