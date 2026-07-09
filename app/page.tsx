"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { CategoryFilter } from "@/components/home/CategoryFilter";
import { Hero } from "@/components/home/Hero";
import { ToolGrid } from "@/components/home/ToolGrid";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SearchModal } from "@/components/shared/SearchModal";
import { Input } from "@/components/ui/Input";
import { tools } from "@/config/tools";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const featuredTools = useMemo(
    () => tools.filter((tool) => tool.featured),
    [],
  );
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      return activeCategory === "all" || tool.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="w-full flex-1">
        <Hero />
        <section
          id="tools"
          className="mx-auto max-w-5xl border-x border-border px-4 py-6 pb-16"
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 relative group">
              <Input
                value=""
                readOnly
                onClick={() => setIsSearchOpen(true)}
                placeholder="Search tools..."
                className="w-full cursor-pointer text-text-muted mono-copy rounded-none border border-border bg-bg-elevated h-10 pr-10"
                aria-label="Search tools"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary group-hover:text-[#7b61ff] transition-colors">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <div className="shrink-0">
              <CategoryFilter
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </div>

          <div className="space-y-10">
            <section id="featured-tools" className="scroll-mt-24">
              <h2 className="mono-copy mb-3 text-sm font-medium text-text-primary">
                Featured tools
              </h2>
              <ToolGrid tools={featuredTools} />
            </section>

            <section id="all-tools" className="scroll-mt-24">
              <h2 className="mono-copy mb-3 text-sm font-medium text-text-primary">
                All tools
              </h2>
              <ToolGrid tools={filteredTools} />
            </section>
          </div>
        </section>
      </main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
