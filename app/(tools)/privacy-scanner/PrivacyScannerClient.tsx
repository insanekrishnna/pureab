"use client";

import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ToolShell } from "@/components/shared/ToolShell";
import { Button } from "@/components/ui/Button";
import { triggerDownload } from "@/lib/utils/download";
import { uint8ArrayToBlob } from "@/lib/utils/blob";

interface Finding {
  label: string;
  value: string;
}

export function PrivacyScannerClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function scan(nextFiles: File[]) {
    setFiles(nextFiles);
    setFindings([]);
    setError("");
    if (!nextFiles[0]) return;

    setLoading(true);
    try {
      const [{ PDFDocument }, { getPdfPageCount }] = await Promise.all([
        import("pdf-lib"),
        import("@/lib/pdf/worker"),
      ]);
      const doc = await PDFDocument.load(await nextFiles[0].arrayBuffer(), {
        ignoreEncryption: true,
      });
      const pageCount = await getPdfPageCount(nextFiles[0]);

      setFindings([
        { label: "Author name", value: doc.getAuthor() ?? "" },
        { label: "Title", value: doc.getTitle() ?? "" },
        { label: "Creator application", value: doc.getCreator() ?? "" },
        { label: "Creation date", value: doc.getCreationDate()?.toLocaleString() ?? "" },
        { label: "Modification date", value: doc.getModificationDate()?.toLocaleString() ?? "" },
        { label: "Producer", value: doc.getProducer() ?? "" },
        { label: "Keywords", value: doc.getKeywords() ?? "" },
        { label: "Number of pages", value: String(pageCount) },
      ]);
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : "Scan failed");
    } finally {
      setLoading(false);
    }
  }

  async function cleanAndDownload() {
    if (!files[0]) return;

    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(await files[0].arrayBuffer(), {
      ignoreEncryption: true,
    });
    doc.setTitle("");
    doc.setAuthor("");
    doc.setSubject("");
    doc.setKeywords([]);
    doc.setCreator("");
    doc.setProducer("");

    const bytes = await doc.save();
    triggerDownload(uint8ArrayToBlob(bytes, "application/pdf"), "cleaned.pdf");
  }

  return (
    <ToolShell
      icon={<Shield className="h-5 w-5" aria-hidden="true" />}
      title="Privacy Scanner"
      description="Find hidden PDF metadata before sharing a document."
    >
      <div className="space-y-5">
        <FileDropzone
          accept={{ "application/pdf": [".pdf"] }}
          onDrop={scan}
          label="Drop a PDF file here"
          sublabel="Scan starts automatically"
        />
        {files.length > 0 ? (
          <FileList files={files} onRemove={() => setFiles([])} />
        ) : null}
        {loading ? <p className="text-sm text-text-secondary">Scanning...</p> : null}
        {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
        {findings.length > 0 ? (
          <div className="space-y-3">
            <div className="glass-card divide-y divide-border overflow-hidden rounded-none">
              {findings.map((finding) => {
                const hasData = Boolean(finding.value);
                const safe = !hasData || finding.label === "Number of pages";

                return (
                  <div key={finding.label} className="flex items-start gap-3 p-3">
                    {safe ? (
                      <CheckCircle className="mt-0.5 h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary">{finding.label}</p>
                      <p className="break-words text-xs text-text-secondary">{finding.value || "Empty"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button className="w-full" onClick={cleanAndDownload}>
              Clean & Download
            </Button>
          </div>
        ) : null}
      </div>
    </ToolShell>
  );
}
