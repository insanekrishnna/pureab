import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "blue" | "green" | "red";
}

const variants = {
  default: "bg-bg-subtle text-text-secondary",
  blue: "bg-accent-subtle text-accent-text",
  green: "bg-success-subtle text-success",
  red: "bg-error-subtle text-error",
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
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-150 ease-out",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
