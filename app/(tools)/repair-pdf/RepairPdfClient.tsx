"use client";

import { Wrench } from "lucide-react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";
import { uint8ArrayToBlob } from "@/lib/utils/blob";

export function RepairPdfClient() {
  const tool = usePdfTool();
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<Wrench className="h-5 w-5" aria-hidden="true" />} title="Repair PDF" description="Attempt to recover and re-save a damaged PDF.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { PDFDocument } = await import("pdf-lib");
            const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
            onProgress(80);
            const bytes = await pdf.save();
            onProgress(100);
            return { blob: uint8ArrayToBlob(bytes, "application/pdf"), filename: "repaired.pdf" };
          })}>
            Repair PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
