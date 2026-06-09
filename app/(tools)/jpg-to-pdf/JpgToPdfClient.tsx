"use client";

import { FileType2 } from "lucide-react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";

export function JpgToPdfClient() {
  const tool = usePdfTool({ multiple: true });
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<FileType2 className="h-5 w-5" aria-hidden="true" />}
      title="Images to PDF"
      description="Convert JPG or PNG images into one PDF."
    >
      <div className="space-y-5">
        <FileDropzone
          accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
          multiple
          onDrop={tool.onDrop}
          label="Drop images here"
          sublabel="Select JPG or PNG files"
        />
        {tool.files.length > 0 ? (
          <FileList files={tool.files} onRemove={tool.removeFile} />
        ) : null}
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
            disabled={tool.files.length === 0}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async (files, onProgress) => {
                const { imagesToPdf } = await import(
                  "@/lib/convert/images-to-pdf"
                );

                onProgress(20);
                const blob = await imagesToPdf(files);
                onProgress(100);

                return { blob, filename: "images.pdf" };
              })
            }
          >
            Convert to PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
