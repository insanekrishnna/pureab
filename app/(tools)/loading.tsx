export default function Loading() {
  return (
    <section className="mx-auto max-w-5xl border-x border-border px-4 py-8 sm:px-8">
      <div className="animate-pulse">
        <div className="h-4 w-20 rounded-full bg-bg-subtle" />
        <div className="mt-6 flex items-start gap-3">
          <div className="h-11 w-11 rounded-md bg-bg-subtle" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-40 rounded-[6px] bg-bg-subtle" />
            <div className="h-4 w-64 max-w-full rounded-[6px] bg-bg-subtle" />
          </div>
        </div>
        <div className="mt-8 h-48 rounded-lg bg-bg-subtle sm:h-56" />
      </div>
    </section>
  );
}
