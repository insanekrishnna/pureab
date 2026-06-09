import { uint8ArrayToBlob } from "@/lib/utils/blob";

export async function mergePdfs(files: File[]): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const output = await PDFDocument.create();

  for (const file of files) {
    const source = await PDFDocument.load(await file.arrayBuffer());
    const pages = await output.copyPages(source, source.getPageIndices());

    for (const page of pages) {
      output.addPage(page);
    }
  }

  const bytes = await output.save();
  return uint8ArrayToBlob(bytes, "application/pdf");
}
