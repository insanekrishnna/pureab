"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children" | "size"> {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "md";
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

const variants = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-accent-hover disabled:hover:bg-accent",
  secondary:
    "border border-border bg-bg-subtle text-text-primary hover:border-border-hover hover:bg-bg-elevated",
  destructive: "bg-error text-white shadow-sm disabled:hover:bg-error",
  ghost: "bg-transparent text-text-secondary hover:bg-bg-subtle hover:text-text-primary",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/10 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        sizes[size],
        loading && "opacity-70",
        className,
      )}
      {...props}
    >
      {loading ? <Spinner size={size === "sm" ? "sm" : "md"} /> : icon}
      {children}
    </motion.button>
  );
}
