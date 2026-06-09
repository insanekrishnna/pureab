import { getPdfPageCount, renderPageToCanvas } from "@/lib/pdf/worker";

export async function ocrPdf(
  file: File,
  onProgress: (p: number) => void,
): Promise<string> {
  const Tesseract = await import("tesseract.js");
  const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
  const pageCount = isPdf ? await getPdfPageCount(file) : 1;
  const output: string[] = [];

  for (let pageNum = 1; pageNum <= pageCount; pageNum += 1) {
    const canvas = isPdf
      ? await renderPageToCanvas(file, pageNum, 2)
      : await imageFileToCanvas(file);
    const result = await Tesseract.recognize(canvas, "eng", {
      logger: (message) => {
        if (message.status === "recognizing text") {
          const pageProgress = (pageNum - 1) / pageCount;
          onProgress(Math.round((pageProgress + message.progress / pageCount) * 100));
        }
      },
    });

    output.push(result.data.text);
    onProgress(Math.round((pageNum / pageCount) * 100));
  }

  return output.join("\n\n").trim();
}

async function imageFileToCanvas(file: File): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas rendering is not available");
  }

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  context.drawImage(bitmap, 0, 0);

  return canvas;
}
