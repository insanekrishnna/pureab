import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { NavbarActions } from "@/components/layout/NavbarActions";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-dashed border-border bg-bg/90 backdrop-blur-sm ">
      <div className="mx-auto flex h-[51px] max-w-5xl items-center justify-between gap-3 border-x border-dashed border-border px-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-0 py-3 text-text-primary transition-colors hover:text-text-primary/80"
          aria-label="Paperlab home"
        >
          <BrandLogo priority />
          <span className="hero-display truncate text-xl text-text-primary -ml-5 ">
            Paperlab
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="mono-copy hidden items-center gap-1 text-xs text-text-secondary md:flex" 
        >
          <Link
            href="/"
            className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-bg-subtle hover:text-text-primary "
          >
            Home
          </Link>
          <Link
            href="/#featured-tools"
            className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-bg-subtle hover:text-text-primary "
          >
            Featured
          </Link>
          <Link
            href="/#all-tools"
            className="rounded-md px-2.5 py-1.5 transition-colors hover:bg-bg-subtle hover:text-text-primary "
          >
            Tools
          </Link>
        </nav>
        <NavbarActions />
      </div>
    </header>
  );
}
