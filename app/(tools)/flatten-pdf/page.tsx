import type { Metadata } from "next";

import { FlattenPdfClient } from "./FlattenPdfClient";

export const metadata: Metadata = {
  title: "Flatten PDF Free - No Watermark | Purelab",
  description:
    "Flatten PDF forms and annotations into static pages. No watermark, no upload, no sign-up.",
};

export default function FlattenPdfPage() {
  return <FlattenPdfClient />;
}
