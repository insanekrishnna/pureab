import type { Metadata } from "next";

import { AddWatermarkClient } from "./AddWatermarkClient";

export const metadata: Metadata = {
  title: "Add Watermark Free - No Watermark | Purelab",
  description:
    "Add a text watermark to PDF pages. No watermark, no upload, no sign-up.",
};

export default function AddWatermarkPage() {
  return <AddWatermarkClient />;
}
