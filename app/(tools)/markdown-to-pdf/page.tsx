import type { Metadata } from "next";

import { MarkdownToPdfClient } from "./MarkdownToPdfClient";

export const metadata: Metadata = {
  title: "Markdown to PDF Free - No Watermark | Purelab",
  description:
    "Convert Markdown text or files to PDF. No watermark, no upload, no sign-up.",
};

export default function MarkdownToPdfPage() {
  return <MarkdownToPdfClient />;
}
