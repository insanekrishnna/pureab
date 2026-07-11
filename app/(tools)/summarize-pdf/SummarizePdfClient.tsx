"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { TextResult } from "@/components/shared/TextResult";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";
import { streamGemini } from "@/lib/ai/streamGemini";
import { cn } from "@/lib/utils/cn";

const formats = [
  {
    id: "bullets",
    label: "Bullet points",
    prompt:
      "Summarize this document as a concise bulleted list of the most important points.",
  },
  {
    id: "paragraph",
    label: "Paragraph",
    prompt: "Write a 2-3 paragraph summary of this document.",
  },
  {
    id: "takeaways",
    label: "Key takeaways (3 points)",
    prompt:
      "Extract exactly 3 key takeaways from this document. Number them 1, 2, 3.",
  },
] as const;

export function SummarizePdfClient() {
  const tool = usePdfTool();
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("bullets");
  const [summary, setSummary] = useState("");
  const loading = tool.status === "processing";

  return (
    <ToolShell
      icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
      title="Summarize PDF"
      description="Generate a concise AI summary from extracted document text."
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
        <div className="glass-card space-y-2 rounded-none p-4">
          {formats.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFormat(option.id)}
              className={cn(
                "block w-full rounded-none border px-3 py-2.5 text-left text-sm font-medium shadow-sm transition-all duration-150 ease-out",
                format === option.id
                  ? "border-accent bg-accent-subtle text-accent-text"
                  : "border-border bg-bg-elevated text-text-secondary hover:border-border-hover",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {summary ? (
          <TextResult text={summary} filename="summary.txt" />
        ) : (
          <ProcessButton
            disabled={tool.files.length === 0}
            loading={loading}
            progress={tool.progress}
            onClick={() =>
              tool.process(async ([file], onProgress) => {
                const { extractText } = await import("@/lib/pdf/extract-text");
                const text = await extractText(file);
                const selected = formats.find((item) => item.id === format) ?? formats[0];
                let output = "";

                onProgress(40);
                await streamGemini(text, selected.prompt, (token) => {
                  output += token;
                  setSummary(output);
                });
                onProgress(100);

                return {
                  blob: new Blob([output], { type: "text/plain" }),
                  filename: "summary.txt",
                };
              })
            }
          >
            Summarize
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
