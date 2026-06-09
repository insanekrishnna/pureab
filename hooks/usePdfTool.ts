"use client";

import { useCallback, useState } from "react";

type Status = "idle" | "uploading" | "processing" | "done" | "error";

interface UsePdfToolOptions {
  accept?: Record<string, string[]>;
  multiple?: boolean;
}

export function usePdfTool(options: UsePdfToolOptions = {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; filename: string } | null>(
    null,
  );

  const onDrop = useCallback(
    (accepted: File[]) => {
      setFiles(options.multiple ? (prev) => [...prev, ...accepted] : accepted);
      setStatus("idle");
      setError(null);
      setResult(null);
    },
    [options.multiple],
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const process = useCallback(
    async (
      processFn: (
        files: File[],
        onProgress: (p: number) => void,
      ) => Promise<{ blob: Blob; filename: string }>,
    ) => {
      if (files.length === 0) return;
      setStatus("processing");
      setProgress(0);
      setError(null);
      try {
        const output = await processFn(files, (p) => setProgress(p));
        setResult(output);
        setStatus("done");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus("error");
      }
    },
    [files],
  );

  const reset = useCallback(() => {
    setFiles([]);
    setStatus("idle");
    setProgress(0);
    setError(null);
    setResult(null);
  }, []);

  return {
    files,
    status,
    progress,
    error,
    result,
    onDrop,
    removeFile,
    process,
    reset,
  };
}
