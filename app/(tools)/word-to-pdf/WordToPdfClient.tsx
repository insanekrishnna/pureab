"use client";

import { FileText } from "lucide-react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";

export function WordToPdfClient() {
  const tool = usePdfTool();
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<FileText className="h-5 w-5" aria-hidden="true" />} title="Word to PDF" description="Convert .doc and .docx documents into PDF.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"], "application/msword": [".doc"] }} onDrop={tool.onDrop} label="Drop a Word file here" sublabel="Select .doc or .docx" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { wordToPdf } = await import("@/lib/convert/word-to-pdf");
            onProgress(20);
            const blob = await wordToPdf(file);
            onProgress(100);
            return { blob, filename: `${baseName(file.name)}.pdf` };
          })}>
            Convert to PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}
