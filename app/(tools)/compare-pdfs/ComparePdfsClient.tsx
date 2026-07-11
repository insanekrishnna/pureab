"use client";

import { GitCompare } from "lucide-react";
import { useState } from "react";

import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ToolShell } from "@/components/shared/ToolShell";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface DiffItem {
  text: string;
  status: "same" | "added" | "removed";
}

export function ComparePdfsClient() {
  const [fileA, setFileA] = useState<File[]>([]);
  const [fileB, setFileB] = useState<File[]>([]);
  const [left, setLeft] = useState<DiffItem[]>([]);
  const [right, setRight] = useState<DiffItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function compare() {
    if (!fileA[0] || !fileB[0]) return;
    setLoading(true);

    try {
      const { extractText } = await import("@/lib/pdf/extract-text");
      const [textA, textB] = await Promise.all([
        extractText(fileA[0]),
        extractText(fileB[0]),
      ]);
      const sentencesA = splitSentences(textA);
      const sentencesB = splitSentences(textB);
      const setA = new Set(sentencesA);
      const setB = new Set(sentencesB);

      setLeft(
        sentencesA.map((text) => ({
          text,
          status: setB.has(text) ? "same" : "removed",
        })),
      );
      setRight(
        sentencesB.map((text) => ({
          text,
          status: setA.has(text) ? "same" : "added",
        })),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      icon={<GitCompare className="h-5 w-5" aria-hidden="true" />}
      title="Compare PDFs"
      description="Find sentence-level differences between two documents."
    >
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <FileDropzone
              accept={{ "application/pdf": [".pdf"] }}
              onDrop={setFileA}
              label="Document A"
              sublabel="Drop the first PDF"
            />
            {fileA.length > 0 ? (
              <FileList files={fileA} onRemove={() => setFileA([])} />
            ) : null}
          </div>
          <div className="space-y-3">
            <FileDropzone
              accept={{ "application/pdf": [".pdf"] }}
              onDrop={setFileB}
              label="Document B"
              sublabel="Drop the second PDF"
            />
            {fileB.length > 0 ? (
              <FileList files={fileB} onRemove={() => setFileB([])} />
            ) : null}
          </div>
        </div>
        <Button
          className="w-full"
          loading={loading}
          disabled={!fileA[0] || !fileB[0]}
          onClick={compare}
        >
          Compare
        </Button>
        {left.length > 0 || right.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <DiffColumn title="Document A" items={left} />
            <DiffColumn title="Document B" items={right} />
          </div>
        ) : null}
      </div>
    </ToolShell>
  );
}

function DiffColumn({ title, items }: { title: string; items: DiffItem[] }) {
  return (
    <div className="glass-card max-h-96 overflow-y-auto rounded-none p-4">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">{title}</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <p
            key={`${item.status}-${index}`}
            className={cn(
              "rounded-none px-3 py-2 text-sm leading-relaxed text-text-primary",
              item.status === "added" && "bg-success-subtle",
              item.status === "removed" && "bg-error-subtle",
              item.status === "same" && "bg-bg-subtle",
            )}
          >
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}
