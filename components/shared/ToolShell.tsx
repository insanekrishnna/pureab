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
    <section className="mx-auto max-w-5xl border-x border-border">
      <div className="relative overflow-hidden border-b border-border px-4 py-8 sm:px-8 lg:px-10">
        <div className="relative z-10 mx-auto max-w-3xl">
          <Link
            href="/"
            className="section-label px-2.5 py-1.5 text-xs font-medium transition-all duration-150 ease-out hover:text-text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All tools
          </Link>
          <header className="mt-7 flex items-start gap-3">
            <div className="mt-0.5 text-[#7b61ff]">
              {icon}
            </div>
            <div className="min-w-0">
              <h1 className="mono-copy text-lg font-medium leading-tight text-text-primary tracking-tight">
                {title}
              </h1>
              <p className="mono-copy mt-2 max-w-2xl text-xs leading-5 text-text-secondary">
                {description}
              </p>
            </div>
          </header>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
