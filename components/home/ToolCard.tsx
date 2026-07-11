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
      className="group relative block min-h-[80px] sm:min-h-[110px] border border-border bg-bg-elevated p-3 sm:p-4 transition-all duration-200 ease-out hover:border-border-hover hover:bg-bg-subtle"
    >
      <div className="relative flex items-center gap-2 sm:gap-3">
        <GlassIcon icon={Icon} className="h-4 w-4 text-[#7b61ff]" aria-hidden="true" />
        <h3 className="mono-copy min-w-0 truncate text-sm font-medium text-text-primary">
          {tool.name}
        </h3>
      </div>
      <p className="mono-copy relative mt-2 sm:mt-4 line-clamp-2 text-[10px] sm:text-xs leading-4 sm:leading-5 text-text-secondary">
        {tool.description}
      </p>
    </Link>
  );
}
