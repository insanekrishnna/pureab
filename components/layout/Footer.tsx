import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-border text-xs text-text-muted">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 border-x border-border px-4 py-5 text-center sm:flex-row sm:text-left">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Purelab home"
        >
          <BrandLogo className="h-24 w-24" />
          <span className="hero-display text-lg text-text-primary">purelab</span>
        </Link>
        <p>
          &copy; 2025 purelab &middot; Free PDF tools, forever &middot; Files
          never leave your device
        </p>
      </div>
    </footer>
  );
}
