import Link from "next/link";


import { BrandLogo } from "@/components/layout/BrandLogo";
import { GlassIcon } from "@/components/ui/GlassIcon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-base pt-16 text-sm text-text-muted">
      {/* Large Background Text */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 select-none text-[15vw] font-bold uppercase leading-none text-text-primary/[0.02]">
        Purelab
      </div>

      <div className="mx-auto max-w-5xl border-x border-border">
        {/* CTA Banner Section */}
        <div className="mx-4 mb-16 rounded-2xl bg-gradient-to-br from-[#7b61ff]/10 to-transparent p-1 border border-[#7b61ff]/20 text-center sm:mx-8 sm:text-left">
          <div className="rounded-xl bg-bg-elevated px-8 py-12 sm:p-16 relative overflow-hidden">
            {/* Subtle light effect inside the CTA box */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#7b61ff]/10 blur-[80px]" />
            
            <div className="relative z-10">
              <h2 className="hero-display max-w-lg text-3xl text-text-primary sm:text-4xl">
                Ready to simplify your PDF workflows?
              </h2>
              <p className="mono-copy mt-4 max-w-sm text-text-secondary text-sm">
                Clean, fast, and completely free. <br /> Process files directly in your browser.
              </p>
              <Link 
                href="/merge-pdf" 
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[#7b61ff] px-6 py-2 text-sm font-medium text-white  shadow-[#7b61ff]/20 transition-all hover:-translate-y-0.1 hover:bg-[#6a4fef] focus:outline-none focus:ring-2 focus:ring-[#7b61ff] focus:ring-offset-2 focus:ring-offset-bg-base "
              >
                Try for Free
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links & Navigation */}
        <div className="flex flex-col items-center gap-12 px-8 text-center sm:text-left lg:flex-row lg:items-start lg:justify-between">
          
          {/* Left: Brand */}
          <div className="flex flex-col items-center lg:items-start">
            <Link
              href="/"
              className="flex items-center gap-0"
              aria-label="Purelab home"
            >
              <BrandLogo className="h-16 w-16" />
              <span className="hero-display text-2xl text-text-primary -ml-3">purelab</span>
            </Link>
          </div>

          {/* Middle: Links Grid */}
          <div className="flex w-full flex-col justify-center gap-8 sm:flex-row sm:justify-center lg:w-auto lg:gap-24">
            <div className="flex flex-col gap-4">
              <Link href="/merge-pdf" className="hover:text-text-primary transition-colors">Tools</Link>
              <Link href="/compress-pdf" className="hover:text-text-primary transition-colors">Blog</Link>
              <Link href="/split-pdf" className="hover:text-text-primary transition-colors">Portfolio</Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="#" className="hover:text-text-primary transition-colors">Jobs</Link>
              <Link href="#" className="hover:text-text-primary transition-colors">Help centre</Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="#" className="hover:text-text-primary transition-colors">About us</Link>
              <Link href="#" className="hover:text-text-primary transition-colors">Contact</Link>
            </div>
          </div>

          {/* Right: Socials */}
          <div className="flex items-start gap-4 justify-center">
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-[#7b61ff]/50 hover:bg-[#7b61ff]/10 hover:text-[#7b61ff]" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-[#7b61ff]/50 hover:bg-[#7b61ff]/10 hover:text-[#7b61ff]" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-[#7b61ff]/50 hover:bg-[#7b61ff]/10 hover:text-[#7b61ff]" aria-label="Youtube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.5 6 3 5.4 3.7 4.7 4.5 4.7 4.9 4.6 8 4.4 12 4.4 12 4.4s4 0 7.1.2c.4.1 1.2.1 1.9.8.5.6.5 1.7.5 1.7s.2 1.4.2 2.7v1.8c0 1.3-.2 2.7-.2 2.7s0 1.1-.5 1.7c-.7.7-1.6.7-2 .8-3.5.3-7.3.3-7.3.3s-4 0-7.1-.2c-.4-.1-1.2-.1-1.9-.8-.5-.6-.5-1.7-.5-1.7S2.3 11 2.3 9.7V7.9c.1-1.3.2-2.7.2-2.7z"/><path d="M9.8 14.1v-6l5.7 3-5.7 3z"/></svg>
            </a>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-16 border-t border-border px-8 py-6 text-center text-xs text-text-muted">
           &copy; {new Date().getFullYear()} purelab &middot; Free PDF tools, forever.
        </div>
      </div>
    </footer>
  );
}
