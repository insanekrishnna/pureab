import { uint8ArrayToBlob } from "@/lib/utils/blob";

export async function rotatePdf(
  file: File,
  rotationDegrees: 90 | 180 | 270,
  pageIndices?: number[],
): Promise<Blob> {
  const { PDFDocument, degrees } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const pages = pdf.getPages();
  const targetIndices = pageIndices ?? pages.map((_, index) => index);

  for (const index of targetIndices) {
    const page = pages[index];
    if (page) {
      page.setRotation(degrees(rotationDegrees));
    }
  }

  const bytes = await pdf.save();
  return uint8ArrayToBlob(bytes, "application/pdf");
}
