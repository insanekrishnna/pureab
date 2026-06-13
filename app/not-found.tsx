import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div className="glass-panel rounded-lg p-8">
        <h1 className="text-8xl font-semibold text-border">404</h1>
        <p className="mt-3 text-xl font-semibold text-text-primary">
          Page not found
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition-all duration-150 ease-out hover:bg-accent-hover"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
