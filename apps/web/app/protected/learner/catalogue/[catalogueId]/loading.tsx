export default function Loading() {
  return (
    <div aria-busy="true" className="mx-auto max-w-6xl space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="h-10 w-72 max-w-full animate-pulse bg-muted" />
        <div className="h-5 w-full max-w-2xl animate-pulse bg-muted" />
      </div>

      <div className="space-y-4">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="h-8 w-32 animate-pulse bg-muted" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <div className="h-48 animate-pulse bg-muted" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-80 animate-pulse bg-muted" />
          <div className="h-80 animate-pulse bg-muted" />
        </div>
      </div>

      <span className="sr-only">Loading themes</span>
    </div>
  );
}
