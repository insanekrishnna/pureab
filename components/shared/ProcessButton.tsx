"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
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
      <Button
        className={cn(
          "w-full rounded-none py-5 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300",
          !disabled 
            ? "border border-[#7b61ff] bg-transparent text-text-primary hover:bg-[#7b61ff] hover:text-white hover:shadow-[0_0_30px_rgba(123,97,255,0.4)] hover:border-transparent active:scale-[0.99]" 
            : "border border-border/50 bg-bg-subtle/30 text-text-muted/50 cursor-not-allowed"
        )}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
      >
        {children}
      </Button>
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
