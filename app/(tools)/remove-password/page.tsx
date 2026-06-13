import type { Metadata } from "next";

import { RemovePasswordClient } from "./RemovePasswordClient";

export const metadata: Metadata = {
  title: "Remove Password Free - No Watermark | Paperlab",
  description:
    "Remove known PDF passwords in your browser. No watermark, no upload, no sign-up.",
};

export default function RemovePasswordPage() {
  return <RemovePasswordClient />;
}
