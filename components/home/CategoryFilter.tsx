"use client";

import { categories } from "@/config/tools";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";

interface CategoryFilterProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="relative">
      <select
        value={active}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mono-copy appearance-none w-full sm:w-[160px] rounded-none border border-border bg-bg-elevated h-[46px] pl-3 pr-10 text-sm font-medium text-text-primary transition-all duration-150 ease-out focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer",
        )}
        aria-label="Filter by category"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}
