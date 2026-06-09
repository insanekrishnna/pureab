import { ShoppingCart } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoonTool } from "@/components/shared/ComingSoonTool";

export const metadata: Metadata = {
  title: "POS Billing Free - No Watermark | Purelab",
  description:
    "Create point-of-sale receipts in your browser. No watermark, no upload, no sign-up.",
};

export default function PosBillingPage() {
  return (
    <ComingSoonTool
      icon={<ShoppingCart className="h-5 w-5" aria-hidden="true" />}
      title="POS Billing"
      description="Create point-of-sale receipts in your browser."
    />
  );
}
