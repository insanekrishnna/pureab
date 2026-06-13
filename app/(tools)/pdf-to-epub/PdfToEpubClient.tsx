"use client";

import { BookOpen } from "lucide-react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";
import { uint8ArrayToBlob } from "@/lib/utils/blob";

type EpubGenerator = (
  options: { title: string; author?: string; publisher?: string },
  content: { title: string; content: string }[],
) => Promise<Blob | Uint8Array | ArrayBuffer>;

export function PdfToEpubClient() {
  const tool = usePdfTool();
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<BookOpen className="h-5 w-5" aria-hidden="true" />} title="PDF to EPUB" description="Create a simple EPUB from extracted PDF text.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const [{ extractText }, epubModule] = await Promise.all([
              import("@/lib/pdf/extract-text"),
              import("epub-gen-memory/dist/bundle.min.js"),
            ]);
            const text = await extractText(file);
            const content = `<p>${escapeHtml(text).replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br />")}</p>`;
            const bundled = epubModule.default as
              | EpubGenerator
              | { default?: EpubGenerator };
            const epub =
              typeof bundled === "function"
                ? bundled
                : bundled.default ??
                  ((window as unknown as { epubGen?: { default?: EpubGenerator } })
                    .epubGen?.default as EpubGenerator);
            onProgress(60);
            const output = await epub(
              { title: baseName(file.name), author: "Paperlab", publisher: "Paperlab" },
              [{ title: baseName(file.name), content }],
            );
            const blob = output instanceof Blob
              ? output
              : output instanceof Uint8Array
                ? uint8ArrayToBlob(output, "application/epub+zip")
                : new Blob([output], { type: "application/epub+zip" });
            onProgress(100);
            return { blob, filename: `${baseName(file.name)}.epub` };
          })}>
            Convert to EPUB
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
