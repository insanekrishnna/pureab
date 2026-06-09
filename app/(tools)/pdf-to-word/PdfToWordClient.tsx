"use client";

import { FileDown } from "lucide-react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";

export function PdfToWordClient() {
  const tool = usePdfTool();
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<FileDown className="h-5 w-5" aria-hidden="true" />} title="PDF to Word" description="Create a best-effort .docx from extracted PDF text.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        <p className="rounded-[10px] border border-border bg-bg-subtle p-3 text-xs text-text-secondary">Formatting may vary. Complex layouts work best with copy-paste.</p>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const [{ extractText }, docx] = await Promise.all([
              import("@/lib/pdf/extract-text"),
              import("docx"),
            ]);
            onProgress(30);
            const text = await extractText(file);
            const children = text.split(/\n+/).filter(Boolean).map((line) => new docx.Paragraph({ children: [new docx.TextRun(line)] }));
            const document = new docx.Document({ sections: [{ children: children.length ? children : [new docx.Paragraph("")] }] });
            const blob = await docx.Packer.toBlob(document);
            onProgress(100);
            return { blob, filename: `${baseName(file.name)}.docx` };
          })}>
            Convert to Word
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}
