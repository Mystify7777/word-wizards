export function LearnerPlaceholder({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-3xl space-y-3">
      <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Learner area</p>
      <h1 className="font-heading text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">This area is reserved for a later learning experience update.</p>
    </section>
  );
}
