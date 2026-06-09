import type { Metadata } from "next";

import { ExcelToPdfClient } from "./ExcelToPdfClient";

export const metadata: Metadata = {
  title: "Excel to PDF Free - No Watermark | Purelab",
  description:
    "Convert spreadsheets to PDF in your browser. No watermark, no upload, no sign-up.",
};

export default function ExcelToPdfPage() {
  return <ExcelToPdfClient />;
}
