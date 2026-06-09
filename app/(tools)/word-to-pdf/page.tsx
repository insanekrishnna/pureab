import type { Metadata } from "next";

import { WordToPdfClient } from "./WordToPdfClient";

export const metadata: Metadata = {
  title: "Word to PDF Free - No Watermark | Purelab",
  description:
    "Convert Word documents to PDF in your browser. No watermark, no upload, no sign-up.",
};

export default function WordToPdfPage() {
  return <WordToPdfClient />;
}
