import { Crop } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoonTool } from "@/components/shared/ComingSoonTool";

export const metadata: Metadata = {
  title: "Crop & Resize Free - No Watermark | Paperlab",
  description:
    "Trim margins or resize PDF pages. No watermark, no upload, no sign-up.",
};

export default function CropPdfPage() {
  return (
    <ComingSoonTool
      icon={<Crop className="h-5 w-5" aria-hidden="true" />}
      title="Crop & Resize"
      description="Trim margins or resize PDF pages."
    />
  );
}
