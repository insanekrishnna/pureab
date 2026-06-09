import { Layers } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoonTool } from "@/components/shared/ComingSoonTool";

export const metadata: Metadata = {
  title: "Organize Pages Free - No Watermark | Purelab",
  description:
    "Reorder, delete, or rearrange PDF pages. No watermark, no upload, no sign-up.",
};

export default function OrganizePagesPage() {
  return (
    <ComingSoonTool
      icon={<Layers className="h-5 w-5" aria-hidden="true" />}
      title="Organize Pages"
      description="Reorder, delete, or rearrange PDF pages."
    />
  );
}
