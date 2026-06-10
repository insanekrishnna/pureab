import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { NavbarActions } from "@/components/layout/NavbarActions";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-elevated/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Purelab home">
          <BrandLogo priority />
          <span className="text-sm font-semibold text-text-primary">purelab</span>
        </Link>
        <NavbarActions />
      </div>
    </header>
  );
}
