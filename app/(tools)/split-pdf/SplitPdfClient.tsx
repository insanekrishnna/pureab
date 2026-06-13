"use client";

import { Scissors } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { Input } from "@/components/ui/Input";
import { usePdfTool } from "@/hooks/usePdfTool";

type SplitMode = "all" | "range";

export function SplitPdfClient() {
  const tool = usePdfTool();
  const [mode, setMode] = useState<SplitMode>("all");
  const [rangeInput, setRangeInput] = useState("");
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<Scissors className="h-5 w-5" aria-hidden="true" />}
      title="Split PDF"
      description="Extract pages or split a document into smaller PDFs."
    >
      <div className="space-y-5">
        <FileDropzone
          accept={{ "application/pdf": [".pdf"] }}
          onDrop={tool.onDrop}
          label="Drop a PDF file here"
          sublabel="Select one PDF"
        />
        {tool.files.length > 0 ? (
          <FileList files={tool.files} onRemove={tool.removeFile} />
        ) : null}
        <div className="glass-card space-y-3 rounded-lg p-4">
          {[
            { id: "all", label: "Extract all pages" },
            { id: "range", label: "Extract page range" },
          ].map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-text-primary"
            >
              <input
                type="radio"
                name="split-mode"
                value={option.id}
                checked={mode === option.id}
                onChange={() => setMode(option.id as SplitMode)}
                className="accent-accent"
              />
              {option.label}
            </label>
          ))}
          {mode === "range" ? (
            <Input
              value={rangeInput}
              onChange={(event) => setRangeInput(event.target.value)}
              placeholder="Pages e.g. 1-3, 5, 7-9"
              aria-label="Page ranges"
            />
          ) : null}
        </div>
        {tool.error ? (
          <p className="text-sm font-medium text-error">{tool.error}</p>
        ) : null}
        {tool.result ? (
          <DownloadCard
            blob={tool.result.blob}
            filename={tool.result.filename}
            onReset={tool.reset}
          />
        ) : (
          <ProcessButton
            disabled={tool.files.length === 0 || (mode === "range" && !rangeInput)}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async ([file], onProgress) => {
                const [{ splitPdf }, { getPdfPageCount }, JSZip] =
                  await Promise.all([
                    import("@/lib/pdf/split"),
                    import("@/lib/pdf/worker"),
                    import("jszip"),
                  ]);
                const pageCount = await getPdfPageCount(file);
                const ranges =
                  mode === "all"
                    ? Array.from({ length: pageCount }, (_, index) => ({
                        start: index + 1,
                        end: index + 1,
                      }))
                    : parsePageRanges(rangeInput);

                onProgress(20);
                const blobs = await splitPdf(file, ranges);
                onProgress(80);

                if (blobs.length === 1) {
                  onProgress(100);
                  return { blob: blobs[0], filename: "split.pdf" };
                }

                const zip = new JSZip.default();
                blobs.forEach((blob, index) => {
                  zip.file(`page-${index + 1}.pdf`, blob);
                });
                const blob = await zip.generateAsync({ type: "blob" });
                onProgress(100);

                return { blob, filename: "split.zip" };
              })
            }
          >
            Split PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function parsePageRanges(input: string) {
  return input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [start, end] = part.split("-").map((value) => Number(value.trim()));

      if (!Number.isFinite(start) || start < 1) {
        throw new Error("Enter valid page ranges");
      }

      return { start, end: Number.isFinite(end) ? end : start };
    });
}
