"use client";

import { Lock } from "lucide-react";
import { useState } from "react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { Input } from "@/components/ui/Input";
import { usePdfTool } from "@/hooks/usePdfTool";

export function EncryptPdfClient() {
  const tool = usePdfTool();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const mismatch = password.length > 0 && confirm.length > 0 && password !== confirm;
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<Lock className="h-5 w-5" aria-hidden="true" />} title="Encrypt PDF" description="Add password protection to your PDF.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/pdf": [".pdf"] }} onDrop={tool.onDrop} label="Drop a PDF file here" sublabel="Select one PDF" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        <div className="grid gap-3 rounded-[14px] border border-border bg-bg-elevated p-4 sm:grid-cols-2">
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <Input label="Confirm password" type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} error={mismatch ? "Passwords do not match" : undefined} />
        </div>
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tool.files.length === 0 || !password || mismatch} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { encryptPdf } = await import("@/lib/pdf/encrypt");
            onProgress(20);
            const blob = await encryptPdf(file, password);
            onProgress(100);
            return { blob, filename: "encrypted.pdf" };
          })}>
            Encrypt PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}
