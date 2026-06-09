import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-elevated/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-[6px] bg-accent" aria-hidden="true" />
          <span className="text-sm font-semibold text-text-primary">purelab</span>
        </Link>
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
          <span className="truncate text-xs text-text-muted">
            Files never leave your device
          </span>
        </div>
      </div>
    </header>
  );
}
