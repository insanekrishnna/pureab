"use client";

import { Unlock } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { Input } from "@/components/ui/Input";
import { usePdfTool } from "@/hooks/usePdfTool";

export function RemovePasswordClient() {
  const tool = usePdfTool();
  const [password, setPassword] = useState("");
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<Unlock className="h-5 w-5" aria-hidden="true" />} title="Remove Password" description="Unlock a PDF when you know the password.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tool.files.length === 0 || !password} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { decryptPdf } = await import("@/lib/pdf/encrypt");
            try {
              onProgress(20);
              const blob = await decryptPdf(file, password);
              onProgress(100);
              return { blob, filename: "unlocked.pdf" };
            } catch {
              throw new Error("Incorrect password");
            }
          })}>
            Remove password
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
