"use client";

import { useMemo, useState } from "react";

import { CategoryFilter } from "@/components/home/CategoryFilter";
import { Hero } from "@/components/home/Hero";
import { ToolGrid } from "@/components/home/ToolGrid";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/Input";
import { tools } from "@/config/tools";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredTools = useMemo(
    () => tools.filter((tool) => tool.featured),
    [],
  );
  const filteredTools = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        tool.name.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4">
        <Hero />
        <section className="pb-16">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search tools..."
              className="sm:max-w-xs"
              aria-label="Search tools"
            />
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="mb-3 text-sm font-semibold text-text-primary">
                Featured tools
              </h2>
              <ToolGrid tools={featuredTools} />
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold text-text-primary">
                All tools
              </h2>
              <ToolGrid tools={filteredTools} />
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
