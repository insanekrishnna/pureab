"use client";

import { Code } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";
import { cn } from "@/lib/utils/cn";

type Tab = "paste" | "upload";

export function HtmlToPdfClient() {
  const tool = usePdfTool();
  const [tab, setTab] = useState<Tab>("paste");
  const [html, setHtml] = useState("<h1>Hello</h1><p>Paste HTML here.</p>");
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<Code className="h-5 w-5" aria-hidden="true" />} title="HTML to PDF" description="Render pasted HTML or an uploaded file into a PDF.">
      <div className="space-y-5">
        <Tabs active={tab} onChange={setTab} labels={{ paste: "Paste HTML", upload: "Upload .html file" }} />
        {tab === "paste" ? (
          <textarea value={html} onChange={(event) => setHtml(event.target.value)} className="h-64 w-full resize-none rounded-[10px] border border-border bg-bg-subtle p-4 font-mono text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10" />
        ) : (
          <>
            <FileDropzone accept={{ "text/html": [".html", ".htm"] }} onDrop={tool.onDrop} label="Drop an HTML file here" sublabel="Select .html or .htm" />
            {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
          </>
        )}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tab === "paste" ? !html.trim() : tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async (files, onProgress) => {
            const { htmlToPdf } = await import("@/lib/convert/html-to-pdf");
            const source = tab === "paste" ? html : await files[0].text();
            onProgress(20);
            const blob = await htmlToPdf(source);
            onProgress(100);
            return { blob, filename: "converted.pdf" };
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
        <button key={tab} type="button" onClick={() => onChange(tab)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 ease-out", active === tab ? "bg-accent text-white" : "border border-border bg-bg-subtle text-text-secondary hover:border-border-hover")}>
          {labels[tab]}
        </button>
      ))}
    </div>
  );
}
