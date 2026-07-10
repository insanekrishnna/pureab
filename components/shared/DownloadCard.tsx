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
      className="rounded-none border border-neutral-800 bg-bg-base p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <span className="inline-flex shrink-0 items-center justify-center text-neutral-900 mt-1">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-text-primary">
            Ready to download
          </h3>
          <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
            {filename} - {formatBytes(blob.size)}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => triggerDownload(blob, filename)}
              className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-2.5 text-sm font-medium transition-all bg-[#7b61ff] text-white hover:bg-[#6a52e5] hover:shadow-[0_0_20px_rgba(123,97,255,0.25)] active:scale-[0.99] rounded-none w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="h-3 w-4" aria-hidden="true" />
                Download
              </span>
            </button>
            <button 
              onClick={onReset}
              className="group relative inline-flex items-center justify-center overflow-hidden bg-transparent text-text-primary border border-[#7b61ff] px-6 py-2.5 text-sm font-medium transition-all active:scale-[0.99] active:bg-neutral-100 hover:bg-neutral-50/50 rounded-none w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Process another
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
