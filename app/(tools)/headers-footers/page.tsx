import type { Metadata } from "next";

import { HeadersFootersClient } from "./HeadersFootersClient";

export const metadata: Metadata = {
  title: "Headers & Footers Free - No Watermark | Purelab",
  description:
    "Add headers and footers to PDF pages. No watermark, no upload, no sign-up.",
};

export default function HeadersFootersPage() {
  return <HeadersFootersClient />;
}
