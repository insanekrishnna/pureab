export default function Loading() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <div className="animate-pulse">
        <div className="h-4 w-20 rounded-full bg-bg-subtle" />
        <div className="mt-6 flex items-start gap-3">
          <div className="h-10 w-10 rounded-[10px] bg-bg-subtle" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-40 rounded-[6px] bg-bg-subtle" />
            <div className="h-4 w-64 max-w-full rounded-[6px] bg-bg-subtle" />
          </div>
        </div>
        <div className="mt-8 h-48 rounded-[14px] bg-bg-subtle sm:h-56" />
      </div>
    </section>
  );
}
