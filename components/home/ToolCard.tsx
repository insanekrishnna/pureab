import Link from "next/link";

import { GlassIcon } from "@/components/ui/GlassIcon";
import type { Tool } from "@/config/tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative block h-full min-h-[132px] border border-border bg-bg-elevated p-4 transition-all duration-150 ease-out hover:border-border-hover hover:bg-bg-subtle"
    >
      <div className="relative flex items-center gap-3">
        <GlassIcon icon={Icon} className="h-5 w-5 text-[#7b61ff]" aria-hidden="true" />
        <h3 className="mono-copy min-w-0 truncate text-sm font-medium text-text-primary">
          {tool.name}
        </h3>
      </div>
      <p className="mono-copy relative mt-4 line-clamp-2 text-xs leading-5 text-text-secondary">
        {tool.description}
      </p>
    </Link>
  );
}
