"use client";

import { FileText } from "lucide-react";
import { useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { TextResult } from "@/components/shared/TextResult";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";

export function ExtractTextClient() {
  const tool = usePdfTool();
  const [text, setText] = useState("");
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<FileText className="h-5 w-5" aria-hidden="true" />} title="Extract Text" description="Copy all selectable text from a PDF.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {text ? (
          <TextResult text={text} filename="extracted-text.txt" />
        ) : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { extractText } = await import("@/lib/pdf/extract-text");
            onProgress(20);
            const output = await extractText(file);
            setText(output);
            onProgress(100);
            return { blob: new Blob([output], { type: "text/plain" }), filename: "extracted-text.txt" };
          })}>
            Extract text
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
