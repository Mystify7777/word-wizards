export default function Loading() {
  return (
    <div aria-busy="true" className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse bg-muted" />
        <div className="h-10 w-80 max-w-full animate-pulse bg-muted" />
        <div className="h-5 w-full max-w-2xl animate-pulse bg-muted" />
      </div>

      <div className="border border-border">
        <div className="h-24 w-24 animate-pulse bg-muted" />
        <div className="space-y-4 p-6">
          <div className="h-6 w-48 animate-pulse bg-muted" />
          <div className="h-4 w-full animate-pulse bg-muted" />
          <div className="h-2 w-full animate-pulse bg-muted" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-7 w-32 animate-pulse bg-muted" />
        <div className="h-32 animate-pulse bg-muted" />
        <div className="h-32 animate-pulse bg-muted" />
      </div>

      <span className="sr-only">Loading theme</span>
    </div>
  );
}
