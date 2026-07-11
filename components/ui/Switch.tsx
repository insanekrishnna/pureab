"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils/cn";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Switch({ checked, onChange, label, className }: SwitchProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-text-primary",
        className,
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-none border border-border shadow-sm transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-accent/15",
          checked ? "bg-accent" : "bg-border",
        )}
      >
        <motion.span
          className="absolute left-0.5 top-0.5 h-5 w-5 rounded-none bg-bg-elevated shadow-md"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </button>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
