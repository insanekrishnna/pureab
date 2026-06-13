"use client";

import { Droplets } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/utils/cn";
import { usePdfTool } from "@/hooks/usePdfTool";

export function AddWatermarkClient() {
  const tool = usePdfTool();
  const [text, setText] = useState("Confidential");
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(48);
  const [rotation, setRotation] = useState(-45);
  const [position, setPosition] = useState<"center" | "tile">("center");
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<Droplets className="h-5 w-5" aria-hidden="true" />}
      title="Add Watermark"
      description="Stamp text across every page of your PDF."
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
        <div className="glass-card space-y-4 rounded-lg p-4">
          <Input
            label="Watermark text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Slider
            label="Opacity"
            min={0.1}
            max={1}
            step={0.1}
            value={opacity}
            showValue
            onChange={setOpacity}
          />
          <Slider
            label="Font size"
            min={24}
            max={96}
            step={1}
            value={fontSize}
            showValue
            onChange={setFontSize}
          />
          <Input
            label="Rotation"
            type="number"
            min={-90}
            max={90}
            value={rotation}
            onChange={(event) => setRotation(Number(event.target.value))}
          />
          <div className="flex gap-2">
            {(["center", "tile"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPosition(item)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium capitalize shadow-sm transition-all duration-150 ease-out",
                  position === item
                    ? "bg-accent text-accent-foreground"
                    : "section-label text-text-secondary hover:border-border-hover hover:text-text-primary",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? (
          <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} />
        ) : (
          <ProcessButton
            disabled={tool.files.length === 0 || !text.trim()}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async ([file], onProgress) => {
                const { addWatermark } = await import("@/lib/pdf/watermark");
                const color =
                  getComputedStyle(document.documentElement)
                    .getPropertyValue("--text-primary")
                    .trim() || "#09090B";

                onProgress(20);
                const blob = await addWatermark(file, {
                  text,
                  opacity,
                  fontSize,
                  color,
                  rotation,
                  position,
                });
                onProgress(100);

                return { blob, filename: "watermarked.pdf" };
              })
            }
          >
            Add watermark
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
