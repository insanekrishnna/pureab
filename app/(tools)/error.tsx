"use client";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-5xl border-x border-border px-4 py-8 sm:px-8">
      <div className="glass-panel rounded-lg p-6 text-center">
        <div className="frost-icon-surface mx-auto flex h-11 w-11 items-center justify-center rounded-md text-error">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-text-primary">
          Something went wrong
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
          {error.message || "The tool failed to load. Try again."}
        </p>
        <Button className="mt-5" onClick={reset}>
          Try again
        </Button>
      </div>
    </section>
  );
}
