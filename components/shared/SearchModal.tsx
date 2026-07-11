"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { tools } from "@/config/tools";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter and sort tools alphabetically
  const filteredTools = tools
    .filter(
      (tool) =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (filteredTools.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const nextIndex = Math.min(prev + 1, filteredTools.length - 1);
          document.getElementById(`search-item-${nextIndex}`)?.scrollIntoView({ block: "nearest" });
          return nextIndex;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const nextIndex = Math.max(prev - 1, 0);
          document.getElementById(`search-item-${nextIndex}`)?.scrollIntoView({ block: "nearest" });
          return nextIndex;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selectedTool = filteredTools[selectedIndex];
        if (selectedTool) {
          router.push(`/${selectedTool.slug}`);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredTools, selectedIndex, router]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[10vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full max-w-2xl overflow-hidden rounded-none border border-border bg-bg-elevated shadow-2xl pointer-events-auto"
            >
              {/* Search Input Area */}
              <div className="flex items-center border-b border-border px-4 py-4">
                <Search className="h-5 w-5 text-text-secondary mr-3 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search tools or describe what you need..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mono-copy font-mono flex-1 bg-transparent text-text-primary placeholder:font-mono placeholder:text-text-muted focus:outline-none sm:text-base"
                />
                <button 
                  onClick={onClose}
                  className="hidden sm:flex items-center justify-center rounded-none border border-border bg-bg-subtle px-1.5 py-0 text-[10px] font-medium font-mono mono-copy text-text-secondary shadow-sm hover:bg-bg-elevated hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  ESC
                </button>
              </div>

              {/* Tools List */}
              <div data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {filteredTools.length === 0 ? (
                  <div className="py-14 text-center text-sm text-text-secondary">
                    No tools found for &quot;{query}&quot;
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredTools.map((tool, index) => {
                      const isSelected = index === selectedIndex;
                      return (
                        <Link
                          id={`search-item-${index}`}
                          key={tool.slug}
                          href={`/${tool.slug}`}
                          onClick={onClose}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`group flex items-center gap-4 rounded-none p-4 transition-all duration-200 ease-out border ${
                            isSelected ? "bg-bg-subtle border-border-hover" : "border-transparent hover:border-border-hover hover:bg-bg-subtle"
                          }`}
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none border bg-bg-subtle text-[#7b61ff] transition-colors ${isSelected ? "border-border-hover" : "border-border group-hover:border-border-hover"}`}>
                            <tool.icon className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="mono-copy text-sm font-medium text-text-primary">
                              {tool.name}
                            </span>
                            <span className="mono-copy mt-1 text-xs text-text-secondary">
                              {tool.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer Shortcuts */}
              <div className="flex items-center justify-start gap-4 border-t border-border bg-bg-subtle px-4 py-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <kbd className="mono-copy rounded-none border border-border bg-bg-elevated px-1.5 py-0.5 font-medium text-text-muted shadow-sm">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="mono-copy rounded-none border border-border bg-bg-elevated px-1.5 py-0.5 font-medium text-text-muted shadow-sm">↵</kbd>
                  Select
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
