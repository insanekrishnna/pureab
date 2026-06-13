import type { Metadata } from "next";

import { MergePdfClient } from "./MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF Free - No Watermark | Paperlab",
  description:
    "Combine multiple PDF files into one. No watermark, no upload, no sign-up.",
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
