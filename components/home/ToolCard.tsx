import Link from "next/link";

import type { Tool } from "@/config/tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/${tool.slug}`}
      className="block rounded-[14px] border border-border bg-bg-elevated p-5 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-border-hover hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-[8px] bg-accent-subtle p-2 text-accent">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="min-w-0 truncate text-sm font-medium text-text-primary">
          {tool.name}
        </h3>
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
        {tool.description}
      </p>
    </Link>
  );
}
