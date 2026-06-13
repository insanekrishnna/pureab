"use client";

import { categories } from "@/config/tools";
import { cn } from "@/lib/utils/cn";

interface CategoryFilterProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto sm:w-full sm:overflow-visible">
      <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "mono-copy rounded-md px-3 py-2 text-xs font-medium transition-all duration-150 ease-out",
              active === category.id
                ? "bg-accent text-accent-foreground"
                : "border border-border bg-bg-subtle text-text-secondary hover:border-border-hover hover:text-text-primary",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
