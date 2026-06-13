import type { ReactNode } from "react";

import { ToolShell } from "@/components/shared/ToolShell";

interface ComingSoonToolProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function ComingSoonTool({
  icon,
  title,
  description,
}: ComingSoonToolProps) {
  return (
    <ToolShell icon={icon} title={title} description={description}>
      <div className="glass-card mono-copy rounded-lg p-6 text-xs leading-5 text-text-secondary">
        This tool is in the catalog and will use the same local-only processing
        model as the rest of Paperlab.
      </div>
    </ToolShell>
  );
}
