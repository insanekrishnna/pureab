"use client";

import { AlignJustify } from "lucide-react";
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

const alignOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export function HeadersFootersClient() {
  const tool = usePdfTool();
  const [header, setHeader] = useState("");
  const [footer, setFooter] = useState("");
  const [headerAlign, setHeaderAlign] = useState("center");
  const [footerAlign, setFooterAlign] = useState("center");
  const [fontSize, setFontSize] = useState("12");
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<AlignJustify className="h-5 w-5" aria-hidden="true" />} title="Headers & Footers" description="Add repeated text to the top or bottom of every page.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        <div className="glass-card grid gap-3 rounded-lg p-4 sm:grid-cols-2">
          <Input label="Header text" value={header} onChange={(event) => setHeader(event.target.value)} />
          <Select label="Header position" value={headerAlign} onChange={setHeaderAlign} options={alignOptions} />
          <Input label="Footer text" value={footer} onChange={(event) => setFooter(event.target.value)} />
          <Select label="Footer position" value={footerAlign} onChange={setFooterAlign} options={alignOptions} />
          <Select label="Font size" value={fontSize} onChange={setFontSize} options={[
            { value: "10", label: "10 pt" },
            { value: "12", label: "12 pt" },
            { value: "14", label: "14 pt" },
          ]} />
        </div>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? (
          <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} />
        ) : (
          <ProcessButton disabled={tool.files.length === 0 || (!header && !footer)} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
            const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
            const font = await pdf.embedFont(StandardFonts.Helvetica);
            const size = Number(fontSize);

            pdf.getPages().forEach((page) => {
              const { width, height } = page.getSize();
              if (header) drawAlignedText(page, header, headerAlign, width, height - 36, size, font, rgb);
              if (footer) drawAlignedText(page, footer, footerAlign, width, 24, size, font, rgb);
            });
            onProgress(90);
            const bytes = await pdf.save();
            onProgress(100);

            return { blob: uint8ArrayToBlob(bytes, "application/pdf"), filename: "headers-footers.pdf" };
          })}>
            Add headers & footers
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function drawAlignedText(
  page: { drawText: (text: string, options: Record<string, unknown>) => void },
  text: string,
  align: string,
  pageWidth: number,
  y: number,
  size: number,
  font: { widthOfTextAtSize: (text: string, size: number) => number },
  rgb: (r: number, g: number, b: number) => unknown,
) {
  const textWidth = font.widthOfTextAtSize(text, size);
  const x = align === "right" ? pageWidth - textWidth - 36 : align === "left" ? 36 : (pageWidth - textWidth) / 2;
  page.drawText(text, { x, y, size, font, color: rgb(0.09, 0.09, 0.1) });
}
