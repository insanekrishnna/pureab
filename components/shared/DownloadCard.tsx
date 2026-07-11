"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { formatBytes } from "@/lib/utils/file";
import { triggerDownload } from "@/lib/utils/download";

interface DownloadCardProps {
  blob: Blob;
  filename: string;
  onReset: () => void;
}

export function DownloadCard({ blob, filename, onReset }: DownloadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="rounded-none border border-border bg-bg-elevated p-4 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-success/10 text-success rounded-none">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="mono-copy text-sm font-semibold uppercase tracking-wider text-text-primary">
              Ready to download
            </h3>
            <p className="mono-copy mt-0.5 truncate text-xs text-text-muted">
              {filename} &middot; {formatBytes(blob.size)}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col sm:flex-row gap-2">
          <button
            onClick={() => triggerDownload(blob, filename)}
            className="mono-copy group flex items-center justify-center gap-2 rounded-none bg-accent px-5 py-2 text-xs font-medium text-accent-foreground transition-all hover:bg-accent-hover shadow-sm active:scale-[0.99]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download
          </button>
          <button 
            onClick={onReset}
            className="mono-copy group flex items-center justify-center gap-2 rounded-none border border-border bg-bg-subtle px-5 py-2 text-xs font-medium text-text-primary transition-all hover:bg-bg-elevated hover:border-border-hover active:scale-[0.99] shadow-sm"
          >
            Process another
          </button>
        </div>
      </div>
    </motion.div>
  );
}
