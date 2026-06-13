"use client";

import { Minimize2 } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { formatBytes } from "@/lib/utils/file";
import { cn } from "@/lib/utils/cn";
import { usePdfTool } from "@/hooks/usePdfTool";

const levels = [
  { id: "light", label: "Light", description: "Fastest, keeps full quality" },
  { id: "medium", label: "Medium", description: "Balanced cleanup and size" },
  { id: "heavy", label: "Heavy", description: "Smallest best-effort output" },
] as const;

export function CompressPdfClient() {
  const tool = usePdfTool();
  const [level, setLevel] = useState<(typeof levels)[number]["id"]>("medium");
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<Minimize2 className="h-5 w-5" aria-hidden="true" />}
      title="Compress PDF"
      description="Reduce file size with metadata cleanup and optimized saving."
    >
      <div className="space-y-5">
        <FileDropzone
          accept={{ "application/pdf": [".pdf"] }}
          onDrop={tool.onDrop}
          label="Drop a PDF file here"
          sublabel="Select one PDF"
        />
        {tool.files.length > 0 ? (
          <div className="space-y-3">
            <FileList files={tool.files} onRemove={tool.removeFile} />
            <p className="text-xs text-text-muted">
              Original size: {formatBytes(tool.files[0].size)}
            </p>
          </div>
        ) : null}
        <div className="grid gap-2 sm:grid-cols-3">
          {levels.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setLevel(option.id)}
              className={cn(
                "rounded-md border p-3 text-left shadow-sm transition-all duration-150 ease-out",
                level === option.id
                  ? "border-accent bg-accent-subtle"
                  : "border-border bg-bg-elevated hover:border-border-hover",
              )}
            >
              <span className="block text-sm font-medium text-text-primary">
                {option.label}
              </span>
              <span className="mt-1 block text-xs text-text-secondary">
                {option.description}
              </span>
            </button>
          ))}
        </div>
        {tool.error ? (
          <p className="text-sm font-medium text-error">{tool.error}</p>
        ) : null}
        {tool.result ? (
          <div className="space-y-3">
            <DownloadCard
              blob={tool.result.blob}
              filename={tool.result.filename}
              onReset={tool.reset}
            />
            <p className="text-center text-xs text-text-muted">
              {formatBytes(tool.files[0]?.size ?? 0)} to{" "}
              {formatBytes(tool.result.blob.size)}
            </p>
          </div>
        ) : (
          <ProcessButton
            disabled={tool.files.length === 0}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async ([file], onProgress) => {
                const { compressPdf } = await import("@/lib/pdf/compress");

                onProgress(20);
                const blob = await compressPdf(file, level);
                onProgress(100);

                return { blob, filename: "compressed.pdf" };
              })
            }
          >
            Compress PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
