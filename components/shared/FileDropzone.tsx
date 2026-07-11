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
    <motion.div>
      <div
        {...rootProps}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-none border border-dashed border-text-primary bg-bg-subtle/50 p-8 sm:min-h-64 transition-all duration-300",
          "hover:bg-bg-subtle hover:border-text-primary/70",
          "focus:outline-none focus:ring-1 focus:ring-accent",
          isDragActive && "bg-bg-subtle border-text-primary",
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
              <span className="mb-4 flex text-text-primary transition-transform duration-300 scale-110">
                <Upload className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-primary sm:text-xs mb-1.5">
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
              <span className="mb-4 flex text-text-muted">
                <PdfIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-primary sm:text-xs mb-1.5">
                {label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
                {sublabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
