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
        className="w-full"
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
