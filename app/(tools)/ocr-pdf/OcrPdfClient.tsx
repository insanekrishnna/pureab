"use client";

import { ScanLine } from "lucide-react";
import { useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { TextResult } from "@/components/shared/TextResult";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";

export function OcrPdfClient() {
  const tool = usePdfTool();
  const [text, setText] = useState("");
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<ScanLine className="h-5 w-5" aria-hidden="true" />} title="OCR PDF" description="Make scanned PDFs and images searchable.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"], "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }} onDrop={tool.onDrop} label="Drop a PDF or image here" sublabel="Select one file" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {text ? (
          <TextResult text={text} filename="ocr-text.txt" />
        ) : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { ocrPdf } = await import("@/lib/pdf/ocr");
            const output = await ocrPdf(file, onProgress);
            setText(output);
            return { blob: new Blob([output], { type: "text/plain" }), filename: "ocr-text.txt" };
          })}>
            Run OCR
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
