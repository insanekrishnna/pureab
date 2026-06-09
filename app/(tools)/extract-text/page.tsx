import type { Metadata } from "next";

import { ExtractTextClient } from "./ExtractTextClient";

export const metadata: Metadata = {
  title: "Extract Text Free - No Watermark | Purelab",
  description:
    "Extract selectable text from PDF files. No watermark, no upload, no sign-up.",
};

export default function ExtractTextPage() {
  return <ExtractTextClient />;
}
