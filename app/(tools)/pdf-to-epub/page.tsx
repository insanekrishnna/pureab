import type { Metadata } from "next";

import { PdfToEpubClient } from "./PdfToEpubClient";

export const metadata: Metadata = {
  title: "PDF to EPUB Free - No Watermark | Paperlab",
  description:
    "Convert PDF text to EPUB for e-readers. No watermark, no upload, no sign-up.",
};

export default function PdfToEpubPage() {
  return <PdfToEpubClient />;
}
