import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface ToolShellProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

export function ToolShell({
  title,
  description,
  icon,
  children,
}: ToolShellProps) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-all duration-150 ease-out hover:text-text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All tools
      </Link>
      <header className="mt-6 flex items-start gap-3">
        <span className="frost-icon-surface rounded-[10px] p-2.5">
          {icon}
        </span>
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        </div>
      </header>
      <div className="mt-8">{children}</div>
    </section>
  );
}
