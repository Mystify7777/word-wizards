import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Catalogue } from "@/lib/catalogue/types";

export function CatalogueList({ catalogues }: { catalogues: Catalogue[] }) {
  if (catalogues.length === 0) {
    return (
      <div className="border border-dashed border-border p-8 text-center">
        <h2 className="font-heading text-lg font-semibold">No catalogues available</h2>
        <p className="mt-2 text-sm text-muted-foreground">There is no learning content available right now.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {catalogues.map((catalogue) => (
        <Link className="group block h-full focus-visible:outline-none" href={`/protected/learner/catalogue/${catalogue.id}`} key={catalogue.id}>
          <Card className="h-full transition-transform group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring/40">
            <CardHeader>
              <div aria-hidden="true" className="mb-2 flex size-14 items-center justify-center border border-border bg-muted font-heading text-xl font-bold text-primary">
                {catalogue.visual}
              </div>
              <CardTitle>{catalogue.name}</CardTitle>
              <CardDescription>{catalogue.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
                Explore themes
                <ArrowRightIcon size={15} />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
