import type { Metadata } from "next";

import { PdfToJpgClient } from "./PdfToJpgClient";

export const metadata: Metadata = {
  title: "PDF to JPG Free - No Watermark | Paperlab",
  description:
    "Export PDF pages as high-quality JPG images. No watermark, no upload, no sign-up.",
};

export default function PdfToJpgPage() {
  return <PdfToJpgClient />;
}
