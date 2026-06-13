import type { Metadata } from "next";

import { SummarizePdfClient } from "./SummarizePdfClient";

export const metadata: Metadata = {
  title: "Summarize PDF Free - No Watermark | Paperlab",
  description:
    "Summarize PDF documents with AI. No watermark, no upload, no sign-up.",
};

export default function SummarizePdfPage() {
  return <SummarizePdfClient />;
}
