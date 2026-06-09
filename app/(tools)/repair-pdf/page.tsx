import type { Metadata } from "next";

import { RepairPdfClient } from "./RepairPdfClient";

export const metadata: Metadata = {
  title: "Repair PDF Free - No Watermark | Purelab",
  description:
    "Attempt to recover and re-save damaged PDF files. No watermark, no upload, no sign-up.",
};

export default function RepairPdfPage() {
  return <RepairPdfClient />;
}
