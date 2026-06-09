import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-text-primary px-2 py-1 text-xs font-medium text-bg-elevated opacity-0 shadow-sm transition-all duration-150 ease-out group-hover:opacity-100"
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}
