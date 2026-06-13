"use client";

import { Hash } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { usePdfTool } from "@/hooks/usePdfTool";
import { uint8ArrayToBlob } from "@/lib/utils/blob";

export function PageNumbersClient() {
  const tool = usePdfTool();
  const [position, setPosition] = useState("bottom-center");
  const [start, setStart] = useState(1);
  const [fontSize, setFontSize] = useState("12");
  const [format, setFormat] = useState("number");
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<Hash className="h-5 w-5" aria-hidden="true" />}
      title="Page Numbers"
      description="Add consistent page numbers to every page."
    >
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        <div className="glass-card grid gap-3 rounded-lg p-4 sm:grid-cols-2">
          <Select label="Position" value={position} onChange={setPosition} options={[
            { value: "bottom-center", label: "Bottom Center" },
            { value: "bottom-right", label: "Bottom Right" },
            { value: "bottom-left", label: "Bottom Left" },
            { value: "top-center", label: "Top Center" },
          ]} />
          <Input label="Starting number" type="number" min={1} value={start} onChange={(event) => setStart(Number(event.target.value))} />
          <Select label="Font size" value={fontSize} onChange={setFontSize} options={[
            { value: "10", label: "10 pt" },
            { value: "12", label: "12 pt" },
            { value: "14", label: "14 pt" },
          ]} />
          <Select label="Format" value={format} onChange={setFormat} options={[
            { value: "number", label: "1" },
            { value: "page", label: "Page 1" },
            { value: "of", label: "1 of N" },
          ]} />
        </div>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? (
          <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} />
        ) : (
          <ProcessButton
            disabled={tool.files.length === 0}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async ([file], onProgress) => {
                const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
                const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
                const font = await pdf.embedFont(StandardFonts.Helvetica);
                const pages = pdf.getPages();

                pages.forEach((page, index) => {
                  const { width, height } = page.getSize();
                  const pageNumber = start + index;
                  const text =
                    format === "page"
                      ? `Page ${pageNumber}`
                      : format === "of"
                        ? `${pageNumber} of ${pages.length}`
                        : `${pageNumber}`;
                  const size = Number(fontSize);
                  const textWidth = font.widthOfTextAtSize(text, size);
                  const x = position.endsWith("right")
                    ? width - textWidth - 36
                    : position.endsWith("left")
                      ? 36
                      : (width - textWidth) / 2;
                  const y = position.startsWith("top") ? height - 36 : 24;

                  page.drawText(text, { x, y, size, font, color: rgb(0.09, 0.09, 0.1) });
                });
                onProgress(90);
                const bytes = await pdf.save();
                onProgress(100);

                return { blob: uint8ArrayToBlob(bytes, "application/pdf"), filename: "page-numbers.pdf" };
              })
            }
          >
            Add page numbers
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
