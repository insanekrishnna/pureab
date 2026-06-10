import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-border py-6 text-xs text-text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:text-left">
        <Link href="/" className="flex items-center gap-2" aria-label="Purelab home">
          <BrandLogo className="h-8 w-8" />
          <span className="font-semibold text-text-primary">purelab</span>
        </Link>
        <p>
          &copy; 2025 purelab &middot; Free PDF tools, forever &middot; Files
          never leave your device
        </p>
      </div>
    </footer>
  );
}
