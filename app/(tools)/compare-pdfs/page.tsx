import type { Metadata } from "next";

import { ComparePdfsClient } from "./ComparePdfsClient";

export const metadata: Metadata = {
  title: "Compare PDFs Free - No Watermark | Paperlab",
  description:
    "Compare two PDF documents side by side. No watermark, no upload, no sign-up.",
};

export default function ComparePdfsPage() {
  return <ComparePdfsClient />;
}
