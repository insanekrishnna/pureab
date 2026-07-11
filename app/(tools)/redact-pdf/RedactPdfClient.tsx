"use client";

import { EyeOff } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { Input } from "@/components/ui/Input";
import { usePdfTool } from "@/hooks/usePdfTool";
import { uint8ArrayToBlob } from "@/lib/utils/blob";

export function RedactPdfClient() {
  const tool = usePdfTool();
  const [text, setText] = useState("");
  const [rect, setRect] = useState({ x: 72, y: 72, w: 220, h: 36 });
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<EyeOff className="h-5 w-5" aria-hidden="true" />} title="Redact PDF" description="Black out a repeated region on each page.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        <div className="glass-card space-y-3 rounded-none p-4">
          <Input label="Text to redact" value={text} onChange={(event) => setText(event.target.value)} placeholder="Optional label for this redaction" />
          <p className="text-xs text-text-muted">For precise redaction, use our Edit PDF tool to manually blackout text.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(["x", "y", "w", "h"] as const).map((key) => (
              <Input key={key} label={key.toUpperCase()} type="number" value={rect[key]} onChange={(event) => setRect((current) => ({ ...current, [key]: Number(event.target.value) }))} />
            ))}
          </div>
        </div>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? (
          <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} />
        ) : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { PDFDocument, rgb } = await import("pdf-lib");
            const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
            pdf.getPages().forEach((page) => {
              page.drawRectangle({ x: rect.x, y: rect.y, width: rect.w, height: rect.h, color: rgb(0, 0, 0) });
            });
            onProgress(90);
            const bytes = await pdf.save();
            onProgress(100);
            return { blob: uint8ArrayToBlob(bytes, "application/pdf"), filename: "redacted.pdf" };
          })}>
            Redact PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
