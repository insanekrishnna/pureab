import type { Metadata } from "next";

import { GstInvoiceClient } from "./GstInvoiceClient";

export const metadata: Metadata = {
  title: "GST Invoice Free - No Watermark | Paperlab",
  description:
    "Create GST-compliant invoices and export them to PDF. No watermark, no sign-up.",
};

export default function GstInvoicePage() {
  return <GstInvoiceClient />;
}
