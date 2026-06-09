import { uint8ArrayToBlob } from "@/lib/utils/blob";

export interface PageRange {
  start: number;
  end: number;
}

export async function splitPdf(
  file: File,
  ranges: PageRange[],
): Promise<Blob[]> {
  const { PDFDocument } = await import("pdf-lib");
  const source = await PDFDocument.load(await file.arrayBuffer());
  const pageCount = source.getPageCount();
  const outputs: Blob[] = [];

  for (const range of ranges) {
    const start = Math.max(1, Math.min(pageCount, range.start));
    const end = Math.max(start, Math.min(pageCount, range.end));
    const output = await PDFDocument.create();
    const pageIndices = Array.from(
      { length: end - start + 1 },
      (_, index) => start - 1 + index,
    );
    const pages = await output.copyPages(source, pageIndices);

    for (const page of pages) {
      output.addPage(page);
    }

    const bytes = await output.save();
    outputs.push(uint8ArrayToBlob(bytes, "application/pdf"));
  }

  return outputs;
}
