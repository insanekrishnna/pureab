"use client";

import { RotateCw } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { cn } from "@/lib/utils/cn";
import { usePdfTool } from "@/hooks/usePdfTool";

const rotations = [90, 180, 270] as const;

export function RotatePdfClient() {
  const tool = usePdfTool();
  const [degrees, setDegrees] = useState<(typeof rotations)[number]>(90);
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<RotateCw className="h-5 w-5" aria-hidden="true" />}
      title="Rotate PDF"
      description="Fix sideways or upside-down PDF pages."
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {rotations.map((rotation) => (
            <button
              key={rotation}
              type="button"
              onClick={() => setDegrees(rotation)}
              className={cn(
                "rounded-none border px-3 py-2.5 text-sm font-medium shadow-sm transition-all duration-150 ease-out",
                degrees === rotation
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-bg-elevated text-text-secondary hover:border-border-hover",
              )}
            >
              {rotation} deg
            </button>
          ))}
          <button
            type="button"
            disabled
            className="rounded-none border border-border bg-bg-subtle px-3 py-2.5 text-sm font-medium text-text-muted opacity-70"
          >
            Custom
          </button>
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
            disabled={tool.files.length === 0}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async ([file], onProgress) => {
                const { rotatePdf } = await import("@/lib/pdf/rotate");

                onProgress(20);
                const blob = await rotatePdf(file, degrees);
                onProgress(100);

                return { blob, filename: "rotated.pdf" };
              })
            }
          >
            Rotate PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
