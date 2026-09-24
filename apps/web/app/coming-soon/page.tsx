import Link from "next/link";

type ComingSoonPageProps = {
  searchParams: Promise<{
    feature?: string;
  }>;
};

const featureNames: Record<string, string> = {
  educators: "The educator experience",
  privacy: "The Privacy Policy",
  terms: "The Terms of Service",
};

export default async function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
  const params = await searchParams;
  const feature = params.feature ? (featureNames[params.feature] ?? params.feature) : "This area";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-foreground/5 sm:p-10">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary">
          <span className="text-xl font-bold">✦</span>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Coming soon</p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">{feature} is in progress.</h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          We&apos;re building this part of Word Wizards now. The learning experience comes first, because apparently
          software occasionally benefits from being built in an order that makes sense.
        </p>

        <Link
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href="/"
        >
          Back to Word Wizards
        </Link>
      </section>
    </main>
  );
}
