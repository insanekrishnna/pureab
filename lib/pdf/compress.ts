import { uint8ArrayToBlob } from "@/lib/utils/blob";

export async function compressPdf(
  file: File,
  level: "light" | "medium" | "heavy",
): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });

  pdf.setTitle("");
  pdf.setAuthor("");
  pdf.setSubject("");
  pdf.setKeywords([]);
  pdf.setCreator("");
  pdf.setProducer("");

  const bytes = await pdf.save({
    useObjectStreams: level === "medium" || level === "heavy",
  });

  return uint8ArrayToBlob(bytes, "application/pdf");
}
