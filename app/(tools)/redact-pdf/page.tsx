import type { Metadata } from "next";

import { RedactPdfClient } from "./RedactPdfClient";

export const metadata: Metadata = {
  title: "Redact PDF Free - No Watermark | Paperlab",
  description:
    "Cover sensitive PDF regions before sharing. No watermark, no upload, no sign-up.",
};

export default function RedactPdfPage() {
  return <RedactPdfClient />;
}
