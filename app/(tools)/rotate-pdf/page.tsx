import type { Metadata } from "next";

import { RotatePdfClient } from "./RotatePdfClient";

export const metadata: Metadata = {
  title: "Rotate PDF Free | Purelab",
  description:
    "Rotate PDF pages online in your browser. No watermark, no upload, no sign-up.",
};

export default function RotatePdfPage() {
  return <RotatePdfClient />;
}
