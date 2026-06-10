"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Upload } from "lucide-react";
import { useDropzone, type Accept } from "react-dropzone";

import { cn } from "@/lib/utils/cn";

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function FileDropzone({
  onDrop,
  accept,
  multiple = false,
  label = "Drop files here",
  sublabel = "or click to browse",
  className,
}: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop,
  });
  const rootProps = getRootProps();

  return (
    <motion.div whileHover={{ scale: 1.002 }} whileTap={{ scale: 0.998 }}>
      <div
        {...rootProps}
        className={cn(
          "flex min-h-[180px] cursor-pointer items-center justify-center rounded-[14px] border-2 border-dashed border-border bg-bg-subtle p-6 text-center transition-all duration-150 ease-out sm:min-h-[220px]",
          "hover:border-border-hover hover:bg-bg-elevated focus:outline-none focus:ring-2 focus:ring-accent/10",
          isDragActive && "border-border-hover bg-bg-elevated",
          className,
        )}
      >
        <input {...getInputProps()} />
        <AnimatePresence mode="wait" initial={false}>
          {isDragActive ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="frost-icon-surface rounded-full p-3">
                <Upload className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-text-primary">
                Release to upload
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="frost-icon-surface rounded-[12px] p-3">
                <FileText className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-text-primary">
                {label}
              </span>
              <span className="text-xs text-text-muted">{sublabel}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
