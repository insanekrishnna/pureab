import type { Metadata } from "next";

import { HtmlToPdfClient } from "./HtmlToPdfClient";

export const metadata: Metadata = {
  title: "HTML to PDF Free - No Watermark | Purelab",
  description:
    "Convert pasted HTML or .html files to PDF. No watermark, no upload, no sign-up.",
};

export default function HtmlToPdfPage() {
  return <HtmlToPdfClient />;
}
