export default function Loading() {
  return (
    <div aria-busy="true" className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="h-10 w-72 max-w-full animate-pulse bg-muted" />
        <div className="h-5 w-full max-w-2xl animate-pulse bg-muted" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-56 animate-pulse bg-muted" />
        <div className="h-56 animate-pulse bg-muted" />
        <div className="h-56 animate-pulse bg-muted" />
      </div>
      <span className="sr-only">Loading catalogues</span>
    </div>
  );
}
