import type { Metadata } from "next";

import { JpgToPdfClient } from "./JpgToPdfClient";

export const metadata: Metadata = {
  title: "Images to PDF Free | Paperlab",
  description:
    "Convert JPG or PNG images into a PDF. No watermark, no upload, no sign-up.",
};

export default function JpgToPdfPage() {
  return <JpgToPdfClient />;
}
