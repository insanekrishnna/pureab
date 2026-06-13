import type { Metadata } from "next";

import { OcrPdfClient } from "./OcrPdfClient";

export const metadata: Metadata = {
  title: "OCR PDF Free - No Watermark | Paperlab",
  description:
    "Run OCR on scanned PDFs and images. No watermark, no upload, no sign-up.",
};

export default function OcrPdfPage() {
  return <OcrPdfClient />;
}
