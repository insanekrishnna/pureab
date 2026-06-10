"use client";

import { AnimatePresence, motion, Reorder } from "framer-motion";
import { FileText, GripVertical, X } from "lucide-react";
import { useEffect, useState } from "react";

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
        className="h-9 w-9 shrink-0 rounded-[6px] border border-border object-cover"
      />
    );
  }

  return (
    <span className="frost-icon-surface flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]">
      <FileText className="h-5 w-5" aria-hidden="true" />
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
      className="flex items-center gap-3 rounded-[10px] border border-border bg-bg-elevated px-3 py-2.5 shadow-sm"
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
        <p className="truncate text-sm font-medium text-text-primary">
          {file.name}
        </p>
        <p className="text-xs text-text-muted">{formatBytes(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(files.findIndex((item) => item === file))}
        className="rounded-[6px] p-1 text-text-muted transition-all duration-150 ease-out hover:bg-bg-subtle hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/10"
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
