"use client";

import { categories } from "@/config/tools";
import { cn } from "@/lib/utils/cn";

interface CategoryFilterProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 ease-out",
              active === category.id
                ? "bg-accent text-white"
                : "border border-border bg-bg-subtle text-text-secondary hover:border-border-hover",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
