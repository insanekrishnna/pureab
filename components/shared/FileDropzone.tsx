"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useDropzone, type Accept } from "react-dropzone";

import { PdfIcon } from "@/components/shared/PdfIcon";

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
          "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-border p-4 transition-colors sm:min-h-52",
          "hover:bg-bg-subtle focus:outline-none focus:ring-2 focus:ring-accent/50",
          isDragActive && "bg-bg-subtle border-accent",
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
              <span className="bg-bg-subtle mb-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 text-text-primary">
                <Upload className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] font-medium text-text-primary sm:mb-1.5 sm:text-xs">
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
              <span className="bg-bg-subtle mb-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 text-text-secondary">
                <PdfIcon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] font-medium text-text-primary sm:mb-1.5 sm:text-xs">
                {label}
              </span>
              <span className="text-[10px] text-text-muted">{sublabel}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
