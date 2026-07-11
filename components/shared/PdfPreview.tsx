"use client";

import { useEffect, useRef, useState } from "react";

import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils/cn";
import { renderPageToCanvas } from "@/lib/pdf/worker";

interface PdfPreviewProps {
  file: File;
  pageNum?: number;
  className?: string;
}

export function PdfPreview({ file, pageNum = 1, className }: PdfPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!canvasRef.current) return;

      setLoading(true);
      setError(null);
      try {
        const renderedCanvas = await renderPageToCanvas(file, pageNum, 1);
        const targetCanvas = canvasRef.current;
        const context = targetCanvas?.getContext("2d");

        if (!targetCanvas || !context) {
          throw new Error("Canvas rendering is not available");
        }

        targetCanvas.width = renderedCanvas.width;
        targetCanvas.height = renderedCanvas.height;
        targetCanvas.style.width = renderedCanvas.style.width;
        targetCanvas.style.height = renderedCanvas.style.height;
        context.drawImage(renderedCanvas, 0, 0);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Preview failed");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [file, pageNum]);

  return (
    <div
      className={cn(
        "glass-card relative overflow-hidden rounded-none p-2",
        className,
      )}
    >
      {loading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-elevated">
          <Spinner />
        </div>
      ) : null}
      {error ? (
        <div className="flex min-h-40 items-center justify-center text-sm text-error">
          {error}
        </div>
      ) : (
        <canvas ref={canvasRef} className="mx-auto h-auto max-w-full" />
      )}
    </div>
  );
}
