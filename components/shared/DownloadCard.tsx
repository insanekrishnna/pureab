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
      className="glass-card rounded-lg p-5"
    >
      <div className="flex items-start gap-4">
        <span className="frost-icon-surface rounded-md p-2.5 text-success">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="mono-copy text-sm font-medium text-text-primary">
            Ready to download
          </h3>
          <p className="mt-1 truncate text-sm text-text-secondary">
            {filename} - {formatBytes(blob.size)}
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button
              icon={<Download className="h-4 w-4" aria-hidden="true" />}
              onClick={() => triggerDownload(blob, filename)}
            >
              Download
            </Button>
            <Button variant="secondary" onClick={onReset}>
              Process another
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
