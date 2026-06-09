import type { Metadata } from "next";

import { CompressPdfClient } from "./CompressPdfClient";

export const metadata: Metadata = {
  title: "Compress PDF Free - Reduce File Size | Purelab",
  description:
    "Reduce PDF file size without losing quality. No watermark, no upload, no sign-up.",
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
