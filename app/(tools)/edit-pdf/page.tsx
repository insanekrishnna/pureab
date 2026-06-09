import { Type } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoonTool } from "@/components/shared/ComingSoonTool";

export const metadata: Metadata = {
  title: "Edit PDF Free - No Watermark | Purelab",
  description:
    "Edit PDF text and page content. No watermark, no upload, no sign-up.",
};

export default function EditPdfPage() {
  return (
    <ComingSoonTool
      icon={<Type className="h-5 w-5" aria-hidden="true" />}
      title="Edit PDF"
      description="Edit PDF text and page content."
    />
  );
}
