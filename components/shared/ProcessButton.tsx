"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import { Spinner } from "@/components/ui/Spinner";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils/cn";

interface ProcessButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  progress?: number;
  children: ReactNode;
  className?: string;
}

export function ProcessButton({
  onClick,
  disabled = false,
  loading = false,
  progress = 0,
  children,
  className,
}: ProcessButtonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <button
        type="button"
        className={cn(
          "group relative inline-flex w-full items-center justify-center overflow-hidden bg-accent text-accent-foreground rounded-none px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !disabled 
            ? "active:scale-[0.99] hover:bg-accent-hover shadow-sm" 
            : "opacity-60 cursor-not-allowed"
        )}
        onClick={onClick}
        disabled={disabled || loading}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading && <Spinner size="sm" />}
          {children}
          {!loading && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Progress value={progress} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
