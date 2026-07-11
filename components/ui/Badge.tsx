import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "blue" | "green" | "red";
}

const variants = {
  default: "section-label text-text-secondary",
  blue: "border border-border bg-accent-subtle text-accent-text",
  green: "border border-border bg-success-subtle text-success",
  red: "border border-border bg-error-subtle text-error",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none px-2.5 py-1 text-xs font-medium transition-all duration-150 ease-out",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
