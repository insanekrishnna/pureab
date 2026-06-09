import { Fingerprint } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoonTool } from "@/components/shared/ComingSoonTool";

export const metadata: Metadata = {
  title: "Fingerprint PDF Free - No Watermark | Purelab",
  description:
    "Track document leaks with PDF fingerprinting. No watermark, no upload, no sign-up.",
};

export default function FingerprintPdfPage() {
  return (
    <ComingSoonTool
      icon={<Fingerprint className="h-5 w-5" aria-hidden="true" />}
      title="Fingerprint PDF"
      description="Track document leaks with PDF fingerprinting."
    />
  );
}
