"use client";

import { useDropzone, type Accept } from "react-dropzone";

interface UseFileUploadOptions {
  accept?: Accept;
  multiple?: boolean;
  onDrop: (accepted: File[]) => void;
}

export function useFileUpload({
  accept,
  multiple = false,
  onDrop,
}: UseFileUploadOptions) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop,
  });

  return { getRootProps, getInputProps, isDragActive };
}
