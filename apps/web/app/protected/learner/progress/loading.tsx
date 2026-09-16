export default function ProgressLoading() {
  return (
    <div aria-busy="true" className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="h-10 w-72 max-w-full animate-pulse bg-muted" />
        <div className="h-5 w-full max-w-2xl animate-pulse bg-muted" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-44 animate-pulse bg-muted" />
        <div className="h-44 animate-pulse bg-muted" />
        <div className="h-44 animate-pulse bg-muted" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-48 animate-pulse bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-32 animate-pulse bg-muted" />
          <div className="h-32 animate-pulse bg-muted" />
          <div className="h-32 animate-pulse bg-muted" />
        </div>
      </div>
      <span className="sr-only">Loading progress</span>
    </div>
  );
}
