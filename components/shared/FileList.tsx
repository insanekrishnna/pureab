"use client";

import { AnimatePresence, motion, Reorder } from "framer-motion";
import { GripVertical, X } from "lucide-react";
import { useEffect, useState } from "react";

import { PdfIcon } from "@/components/shared/PdfIcon";

import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/file";

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
  reorderable?: boolean;
  onReorder?: (files: File[]) => void;
  className?: string;
}

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function FileIcon({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      setUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        className="h-10 w-10 shrink-0 rounded-md border border-border object-cover shadow-sm"
      />
    );
  }

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#7b61ff]/20 bg-[#7b61ff]/10 text-[#7b61ff] rounded-none">
      <PdfIcon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

export function FileList({
  files,
  onRemove,
  reorderable = false,
  onReorder,
  className,
}: FileListProps) {
  const [orderedFiles, setOrderedFiles] = useState(files);

  useEffect(() => {
    setOrderedFiles(files);
  }, [files]);

  const handleReorder = (nextFiles: File[]) => {
    setOrderedFiles(nextFiles);
    onReorder?.(nextFiles);
  };

  const items = reorderable ? orderedFiles : files;

  const row = (file: File, index: number, isReorderItem = false) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="flex items-center gap-4 rounded-none border-y border-r border-l-4 border-y-border border-r-border border-l-[#7b61ff] bg-bg-base px-4 py-3 hover:bg-bg-subtle transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
    >
      {reorderable ? (
        <GripVertical
          className={cn(
            "h-4 w-4 text-text-muted",
            isReorderItem && "cursor-grab active:cursor-grabbing",
          )}
          aria-hidden="true"
        />
      ) : null}
      <FileIcon file={file} />
      <div className="min-w-0 flex-1">
        <p className="font-mono truncate text-xs font-semibold uppercase tracking-wider text-text-primary">
          {file.name}
        </p>
        <p className="font-mono mt-0.5 text-[9px] uppercase tracking-widest text-text-muted">
          {formatBytes(file.size)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(files.findIndex((item) => item === file))}
        className="rounded-none border border-border bg-bg-base p-1.5 text-text-muted transition-all duration-150 ease-out hover:border-error hover:bg-error hover:text-white focus:outline-none focus:ring-2 focus:ring-error/20"
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.div>
  );

  if (reorderable) {
    return (
      <Reorder.Group
        axis="y"
        values={orderedFiles}
        onReorder={handleReorder}
        className={cn("space-y-2", className)}
      >
        <AnimatePresence initial={false}>
          {orderedFiles.map((file, index) => (
            <Reorder.Item key={fileKey(file)} value={file}>
              {row(file, index, true)}
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <AnimatePresence initial={false}>
        {items.map((file, index) => (
          <div key={fileKey(file)}>{row(file, index)}</div>
        ))}
      </AnimatePresence>
    </div>
  );
}
