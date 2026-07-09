"use client";

import { categories } from "@/config/tools";
import { cn } from "@/lib/utils/cn";
import { 
  ChevronDown, 
  LayoutGrid, 
  Component, 
  Combine, 
  PenTool, 
  Fingerprint, 
  BrainCircuit, 
  Gem 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryFilterProps {
  active: string;
  onChange: (id: string) => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case "all": return LayoutGrid;
    case "organize": return Component;
    case "convert": return Combine;
    case "edit": return PenTool;
    case "security": return Fingerprint;
    case "ai": return BrainCircuit;
    case "business": return Gem;
    default: return LayoutGrid;
  }
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCategory = categories.find((c) => c.id === active) || categories[0];
  const ActiveIcon = getCategoryIcon(activeCategory.id);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-[200px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "mono-copy flex w-full items-center justify-between rounded-none border border-border bg-bg-elevated h-10 px-3 text-sm font-medium text-text-primary transition-all duration-150 ease-out focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer",
          isOpen && "border-border-hover ring-1 ring-accent"
        )}
        aria-label="Filter by category"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2.5">
          <ActiveIcon className="h-4 w-4 text-[#7b61ff]" />
          {activeCategory.label}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-text-secondary transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-[60] mt-1 w-full rounded-none border border-border bg-bg-elevated shadow-lg"
          >
            <div className="flex flex-col py-1">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.id);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      onChange(category.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "group flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-bg-subtle",
                      active === category.id ? "bg-bg-subtle text-text-primary" : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#7b61ff] group-hover:scale-110 transition-transform" />
                    <span className="mono-copy font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
