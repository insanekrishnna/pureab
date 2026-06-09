"use client";

import { FileSpreadsheet } from "lucide-react";

import { DownloadCard } from "@/components/shared/DownloadCard";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { FileList } from "@/components/shared/FileList";
import { ProcessButton } from "@/components/shared/ProcessButton";
import { ToolShell } from "@/components/shared/ToolShell";
import { usePdfTool } from "@/hooks/usePdfTool";

export function ExcelToPdfClient() {
  const tool = usePdfTool();
  const loading = tool.status === "processing";

  return (
    <ToolShell icon={<FileSpreadsheet className="h-5 w-5" aria-hidden="true" />} title="Excel to PDF" description="Convert .xlsx or .xls spreadsheets into PDF.">
      <div className="space-y-5">
        <FileDropzone accept={{ "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"], "application/vnd.ms-excel": [".xls"] }} onDrop={tool.onDrop} label="Drop an Excel file here" sublabel="Select .xlsx or .xls" />
        {tool.files.length > 0 ? <FileList files={tool.files} onRemove={tool.removeFile} /> : null}
        {tool.error ? <p className="text-sm font-medium text-error">{tool.error}</p> : null}
        {tool.result ? <DownloadCard blob={tool.result.blob} filename={tool.result.filename} onReset={tool.reset} /> : (
          <ProcessButton disabled={tool.files.length === 0} loading={loading} progress={tool.progress} onClick={() => tool.process(async ([file], onProgress) => {
            const { excelToPdf } = await import("@/lib/convert/excel-to-pdf");
            onProgress(20);
            const blob = await excelToPdf(file);
            onProgress(100);
            return { blob, filename: `${baseName(file.name)}.pdf` };
          })}>
            Convert to PDF
          </ProcessButton>
        )}
      </div>
    </ToolShell>
  );
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "");
}
