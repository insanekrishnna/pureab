"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils/cn";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 overflow-hidden rounded-none border border-border bg-bg-subtle shadow-sm",
        className,
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <motion.div
        className="h-full rounded-none bg-accent shadow-sm"
        initial={false}
        animate={{ width: `${safeValue}%` }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}
