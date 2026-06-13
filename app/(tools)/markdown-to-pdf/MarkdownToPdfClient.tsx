"use client";

import { FileCode } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";
import { cn } from "@/lib/utils/cn";

type Tab = "paste" | "upload";

export function MarkdownToPdfClient() {
  const tool = usePdfTool();
  const [tab, setTab] = useState<Tab>("paste");
  const [markdown, setMarkdown] = useState("# Untitled\n\nPaste markdown here.");
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<FileCode className="h-5 w-5" aria-hidden="true" />} title="Markdown to PDF" description="Convert Markdown into a clean formatted PDF.">
      <div className="space-y-5">
        <Tabs active={tab} onChange={setTab} labels={{ paste: "Paste Markdown", upload: "Upload .md file" }} />
        {tab === "paste" ? (
          <textarea value={markdown} onChange={(event) => setMarkdown(event.target.value)} className="soft-panel h-64 w-full resize-none rounded-lg p-4 font-mono text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15" />
        ) : (
          <>
            <FileDropzone accept={{ "text/markdown": [".md"], "text/plain": [".md"] }} onDrop={tool.onDrop} label="Drop a Markdown file here" sublabel="Select .md" />
            {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
          </>
        )}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tab === "paste" ? !markdown.trim() : tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async (files, onProgress) => {
            const [{ marked }, { htmlToPdf }] = await Promise.all([
              import("marked"),
              import("@/lib/convert/html-to-pdf"),
            ]);
            const source = tab === "paste" ? markdown : await files[0].text();
            const html = `<main style="font-family: var(--font-geist-sans), system-ui, sans-serif; line-height: 1.6; max-width: 680px;">${await marked.parse(source)}</main>`;
            onProgress(40);
            const blob = await htmlToPdf(html);
            onProgress(100);
            return { blob, filename: "markdown.pdf" };
          })}>
            Convert to PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function Tabs({ active, onChange, labels }: { active: Tab; onChange: (tab: Tab) => void; labels: Record<Tab, string> }) {
  return (
    <div className="flex gap-2">
      {(Object.keys(labels) as Tab[]).map((tab) => (
        <button key={tab} type="button" onClick={() => onChange(tab)} className={cn("rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-all duration-150 ease-out", active === tab ? "bg-accent text-accent-foreground" : "section-label text-text-secondary hover:border-border-hover hover:text-text-primary")}>
          {labels[tab]}
        </button>
      ))}
    </div>
  );
}
