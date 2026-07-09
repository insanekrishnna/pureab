"use client";

import { FilePlus2 } from "lucide-react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";

export function MergePdfClient() {
  const tool = usePdfTool({ multiple: true });
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<FilePlus2 className="h-5 w-5" aria-hidden="true" />}
      title="Merge PDF"
      description="Combine multiple PDFs into one. Drag to reorder before merging."
    >
      <div className="space-y-5">
        <FileDropzone
          accept={{ "application/pdf": [".pdf"] }}
          multiple
          onDrop={tool.onDrop}
          label="Drop PDF files here"
          sublabel="Select 2 or more files"
        />
        {tool.files.length > 0 ? (
          <FileList
            files={tool.files}
            onRemove={tool.removeFile}
            reorderable
            onReorder={tool.reorderFiles}
          />
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
            disabled={tool.files.length < 2}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async (files, onProgress) => {
                const { mergePdfs } = await import("@/lib/pdf/merge");

                onProgress(20);
                const blob = await mergePdfs(files);
                onProgress(100);

                return { blob, filename: "merged.pdf" };
              })
            }
          >
            Merge Files
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
