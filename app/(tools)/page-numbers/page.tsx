import type { Metadata } from "next";

import { PageNumbersClient } from "./PageNumbersClient";

export const metadata: Metadata = {
  title: "Page Numbers Free - No Watermark | Purelab",
  description:
    "Add page numbers to every PDF page. No watermark, no upload, no sign-up.",
};

export default function PageNumbersPage() {
  return <PageNumbersClient />;
}
