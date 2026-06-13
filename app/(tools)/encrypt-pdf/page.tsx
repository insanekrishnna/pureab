import type { Metadata } from "next";

import { EncryptPdfClient } from "./EncryptPdfClient";

export const metadata: Metadata = {
  title: "Encrypt PDF Free - No Watermark | Paperlab",
  description:
    "Password-protect PDF files in your browser. No watermark, no upload, no sign-up.",
};

export default function EncryptPdfPage() {
  return <EncryptPdfClient />;
}
