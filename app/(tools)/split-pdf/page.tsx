import type { Metadata } from "next";

import { SplitPdfClient } from "./SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF Free - Extract Pages | Purelab",
  description:
    "Extract PDF pages or split documents into parts. No watermark, no upload, no sign-up.",
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
