import type { Metadata } from "next";

import { ChatWithPdfClient } from "./ChatWithPdfClient";

export const metadata: Metadata = {
  title: "Chat with PDF Free - No Watermark | Purelab",
  description:
    "Ask AI questions about a PDF document. No watermark, no upload, no sign-up.",
};

export default function ChatWithPdfPage() {
  return <ChatWithPdfClient />;
}
