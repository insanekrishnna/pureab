let workerConfigured = false;

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");

  if (!workerConfigured) {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    workerConfigured = true;
  }

  return pdfjs;
}

export async function initPdfWorker() {
  await loadPdfJs();
}

export async function renderPageToCanvas(
  file: File,
  pageNum = 1,
  scale = 1,
): Promise<HTMLCanvasElement> {
  const pdfjs = await loadPdfJs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas rendering is not available");
  }

  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  await page.render({ canvas, canvasContext: context, viewport }).promise;
  await destroyPdf(pdf);

  return canvas;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const pdfjs = await loadPdfJs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const count = pdf.numPages;

  await destroyPdf(pdf);

  return count;
}

export async function pdfToJpgBlobs(file: File, dpi = 150): Promise<Blob[]> {
  const pageCount = await getPdfPageCount(file);
  const scale = dpi / 72;
  const blobs: Blob[] = [];

  for (let pageNum = 1; pageNum <= pageCount; pageNum += 1) {
    const canvas = await renderPageToCanvas(file, pageNum, scale);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (output) => {
          if (output) {
            resolve(output);
          } else {
            reject(new Error("Failed to render page image"));
          }
        },
        "image/jpeg",
        0.92,
      );
    });

    blobs.push(blob);
  }

  return blobs;
}

async function destroyPdf(pdf: unknown) {
  const destroy = (pdf as { destroy?: () => Promise<void> }).destroy;

  if (destroy) {
    await destroy.call(pdf);
  }
}
