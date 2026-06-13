import type { Metadata } from "next";

import { PdfToWordClient } from "./PdfToWordClient";

export const metadata: Metadata = {
  title: "PDF to Word Free - No Watermark | Paperlab",
  description:
    "Export PDF text as an editable Word document. No watermark, no upload, no sign-up.",
};

export default function PdfToWordPage() {
  return <PdfToWordClient />;
}
