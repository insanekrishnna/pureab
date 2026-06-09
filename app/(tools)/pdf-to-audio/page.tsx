import type { Metadata } from "next";

import { PdfToAudioClient } from "./PdfToAudioClient";

export const metadata: Metadata = {
  title: "PDF to Audio Free - No Watermark | Purelab",
  description:
    "Listen to PDF text with your browser voices. No watermark, no upload, no sign-up.",
};

export default function PdfToAudioPage() {
  return <PdfToAudioClient />;
}
