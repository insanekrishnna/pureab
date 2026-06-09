import { initPdfWorker } from "@/lib/pdf/worker";

interface TextItem {
  str?: string;
}

export async function extractText(file: File): Promise<string> {
  await initPdfWorker();

  const pdfjs = await import("pdfjs-dist");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const pages: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? (item as TextItem).str ?? "" : ""))
      .join(" ");

    pages.push(text);
  }

  const destroy = (pdf as { destroy?: () => Promise<void> }).destroy;

  if (destroy) {
    await destroy.call(pdf);
  }

  return pages.join("\n\n").trim();
}
