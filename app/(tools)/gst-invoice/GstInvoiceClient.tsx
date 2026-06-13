"use client";

import { ChevronDown, Download, Eye, Plus, Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils/cn";

interface LineItem {
  id: string;
  description: string;
  hsn: string;
  qty: number;
  unit: string;
  rate: number;
  gst: number;
}

const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "West Bengal",
];

const today = new Date().toISOString().slice(0, 10);

export function GstInvoiceClient() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState("business");
  const [showPreview, setShowPreview] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [business, setBusiness] = useState({
    name: "Purelab Studio",
    gstin: "29ABCDE1234F1Z5",
    address: "MG Road, Bengaluru",
    state: "Karnataka",
    phone: "",
    email: "",
  });
  const [client, setClient] = useState({
    name: "Client Name",
    gstin: "",
    address: "",
    state: "Karnataka",
  });
  const [invoice, setInvoice] = useState({
    number: "INV-001",
    date: today,
    dueDate: today,
    placeOfSupply: "Karnataka",
  });
  const [notes, setNotes] = useState("Payment due within 15 days.");
  const [items, setItems] = useState<LineItem[]>([
    {
      id: crypto.randomUUID(),
      description: "Professional services",
      hsn: "9983",
      qty: 1,
      unit: "Nos",
      rate: 10000,
      gst: 18,
    },
  ]);
  const totals = useMemo(() => calculateTotals(items, business.state, invoice.placeOfSupply), [items, business.state, invoice.placeOfSupply]);

  async function downloadPdf() {
    if (!previewRef.current) return;

    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const image = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(image, "PNG", 0, 0, width, height);
    pdf.save(`${invoice.number || "invoice"}.pdf`);
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-3 py-8 sm:px-5 lg:grid-cols-[420px_1fr]">
      <div className="space-y-3">
        <Button
          className="w-full lg:hidden"
          variant="secondary"
          icon={<Eye className="h-4 w-4" />}
          onClick={() => setShowPreview((current) => !current)}
        >
          {showPreview ? "Hide preview" : "Preview"}
        </Button>
        <Section title="Business Details" id="business" open={open} onOpen={setOpen}>
          <Input label="Business Name" value={business.name} onChange={(event) => setBusiness({ ...business, name: event.target.value })} />
          <Input label="GSTIN" value={business.gstin} onChange={(event) => setBusiness({ ...business, gstin: event.target.value })} />
          <Input label="Address" value={business.address} onChange={(event) => setBusiness({ ...business, address: event.target.value })} />
          <Select label="State" value={business.state} onChange={(state) => setBusiness({ ...business, state })} options={states.map((state) => ({ value: state, label: state }))} />
          <Input label="Phone" value={business.phone} onChange={(event) => setBusiness({ ...business, phone: event.target.value })} />
          <Input label="Email" value={business.email} onChange={(event) => setBusiness({ ...business, email: event.target.value })} />
          <Input label="Logo" type="file" accept="image/*" onChange={(event) => readLogo(event.currentTarget.files?.[0], setLogo)} />
        </Section>
        <Section title="Client Details" id="client" open={open} onOpen={setOpen}>
          <Input label="Client Name" value={client.name} onChange={(event) => setClient({ ...client, name: event.target.value })} />
          <Input label="GSTIN" value={client.gstin} onChange={(event) => setClient({ ...client, gstin: event.target.value })} />
          <Input label="Address" value={client.address} onChange={(event) => setClient({ ...client, address: event.target.value })} />
          <Select label="State" value={client.state} onChange={(state) => setClient({ ...client, state })} options={states.map((state) => ({ value: state, label: state }))} />
        </Section>
        <Section title="Invoice Details" id="invoice" open={open} onOpen={setOpen}>
          <Input label="Invoice Number" value={invoice.number} onChange={(event) => setInvoice({ ...invoice, number: event.target.value })} />
          <Input label="Invoice Date" type="date" value={invoice.date} onChange={(event) => setInvoice({ ...invoice, date: event.target.value })} />
          <Input label="Due Date" type="date" value={invoice.dueDate} onChange={(event) => setInvoice({ ...invoice, dueDate: event.target.value })} />
          <Select label="Place of Supply" value={invoice.placeOfSupply} onChange={(placeOfSupply) => setInvoice({ ...invoice, placeOfSupply })} options={states.map((state) => ({ value: state, label: state }))} />
        </Section>
        <Section title="Line Items" id="items" open={open} onOpen={setOpen}>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="soft-panel space-y-2 rounded-lg p-3">
                <Input label="Description" value={item.description} onChange={(event) => updateItem(item.id, { description: event.target.value }, setItems)} />
                <div className="grid grid-cols-2 gap-2">
                  <Input label="HSN/SAC" value={item.hsn} onChange={(event) => updateItem(item.id, { hsn: event.target.value }, setItems)} />
                  <Select label="Unit" value={item.unit} onChange={(unit) => updateItem(item.id, { unit }, setItems)} options={["Nos", "Kg", "L", "m"].map((unit) => ({ value: unit, label: unit }))} />
                  <Input label="Qty" type="number" value={item.qty} onChange={(event) => updateItem(item.id, { qty: Number(event.target.value) }, setItems)} />
                  <Input label="Rate" type="number" value={item.rate} onChange={(event) => updateItem(item.id, { rate: Number(event.target.value) }, setItems)} />
                  <Select label="GST" value={String(item.gst)} onChange={(gst) => updateItem(item.id, { gst: Number(gst) }, setItems)} options={[0, 5, 12, 18, 28].map((gst) => ({ value: String(gst), label: `${gst}%` }))} />
                  <div className="field-surface flex items-end justify-between rounded-md px-3 py-2 text-sm font-medium text-text-primary">
                    {money(item.qty * item.rate)}
                    <button type="button" onClick={() => setItems((current) => current.filter((row) => row.id !== item.id))} className="text-text-muted hover:text-error" aria-label="Remove row">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="secondary" icon={<Plus className="h-4 w-4" />} onClick={() => setItems((current) => [...current, { id: crypto.randomUUID(), description: "", hsn: "", qty: 1, unit: "Nos", rate: 0, gst: 18 }])}>
              Add row
            </Button>
          </div>
        </Section>
        <Section title="Notes" id="notes" open={open} onOpen={setOpen}>
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="field-surface h-28 w-full resize-none rounded-md p-3 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15" />
        </Section>
      </div>
      <div
        className={cn(
          "space-y-4 overflow-x-auto pb-4 lg:block",
          showPreview ? "block" : "hidden",
        )}
      >
        <div className="flex justify-end">
          <Button icon={<Download className="h-4 w-4" />} onClick={downloadPdf}>
            Download PDF
          </Button>
        </div>
        <InvoicePreview refEl={previewRef} logo={logo} business={business} client={client} invoice={invoice} items={items} notes={notes} totals={totals} />
      </div>
    </div>
  );
}

function Section({ title, id, open, onOpen, children }: { title: string; id: string; open: string; onOpen: (id: string) => void; children: React.ReactNode }) {
  const active = open === id;

  return (
    <section className="glass-card overflow-hidden rounded-lg">
      <button type="button" onClick={() => onOpen(active ? "" : id)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-text-primary">
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", active && "rotate-180")} />
      </button>
      {active ? <div className="space-y-3 border-t border-border p-4">{children}</div> : null}
    </section>
  );
}

function InvoicePreview({ refEl, logo, business, client, invoice, items, notes, totals }: { refEl: React.RefObject<HTMLDivElement | null>; logo: string | null; business: Record<string, string>; client: Record<string, string>; invoice: Record<string, string>; items: LineItem[]; notes: string; totals: ReturnType<typeof calculateTotals> }) {
  return (
    <div ref={refEl} className="mx-auto min-h-[842px] w-[595px] bg-white p-10 text-zinc-950 shadow-sm ring-1 ring-zinc-200">
      <header className="flex justify-between gap-6 border-b border-zinc-200 pb-6">
        <div>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt=""
              className="mb-3 h-12 max-w-32 object-contain"
            />
          ) : null}
          <h1 className="text-2xl font-semibold">{business.name}</h1>
          <p className="mt-1 text-xs text-zinc-500">{business.address}</p>
          <p className="text-xs text-zinc-500">GSTIN: {business.gstin}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-zinc-200">INVOICE</p>
          <p className="mt-2 text-sm font-medium">{invoice.number}</p>
          <p className="text-xs text-zinc-500">Date: {invoice.date}</p>
          <p className="text-xs text-zinc-500">Due: {invoice.dueDate}</p>
        </div>
      </header>
      <section className="grid grid-cols-2 gap-8 py-6 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-zinc-400">Bill to</p>
          <p className="mt-2 font-semibold">{client.name}</p>
          <p className="text-zinc-500">{client.address}</p>
          {client.gstin ? <p className="text-zinc-500">GSTIN: {client.gstin}</p> : null}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-zinc-400">Supply</p>
          <p className="mt-2 text-zinc-500">Supplier: {business.state}</p>
          <p className="text-zinc-500">Place: {invoice.placeOfSupply}</p>
        </div>
      </section>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-y border-zinc-200 text-left text-xs uppercase text-zinc-400">
            <th className="py-2">Description</th>
            <th>HSN</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Rate</th>
            <th className="text-right">GST</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-zinc-100">
              <td className="py-3">{item.description}</td>
              <td>{item.hsn}</td>
              <td className="text-right">{item.qty} {item.unit}</td>
              <td className="text-right">{money(item.rate)}</td>
              <td className="text-right">{item.gst}%</td>
              <td className="text-right">{money(item.qty * item.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="ml-auto mt-6 w-64 space-y-2 text-sm">
        <TotalRow label="Subtotal" value={totals.subtotal} />
        {totals.cgst > 0 ? (
          <>
            <TotalRow label="CGST" value={totals.cgst} />
            <TotalRow label="SGST" value={totals.sgst} />
          </>
        ) : (
          <TotalRow label="IGST" value={totals.igst} />
        )}
        <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold">
          <span>Grand Total</span>
          <span>{money(totals.grandTotal)}</span>
        </div>
      </section>
      {notes ? <p className="mt-10 whitespace-pre-wrap text-xs text-zinc-500">{notes}</p> : null}
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: number }) {
  return <div className="flex justify-between"><span>{label}</span><span>{money(value)}</span></div>;
}

function calculateTotals(items: LineItem[], supplierState: string, placeOfSupply: string) {
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const gstTotal = items.reduce((sum, item) => sum + (item.qty * item.rate * item.gst) / 100, 0);
  const intrastate = supplierState === placeOfSupply;
  const cgst = intrastate ? gstTotal / 2 : 0;
  const sgst = intrastate ? gstTotal / 2 : 0;
  const igst = intrastate ? 0 : gstTotal;

  return { subtotal, cgst, sgst, igst, grandTotal: subtotal + gstTotal };
}

function updateItem(id: string, patch: Partial<LineItem>, setItems: React.Dispatch<React.SetStateAction<LineItem[]>>) {
  setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
}

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value || 0);
}

function readLogo(file: File | undefined, setLogo: (value: string | null) => void) {
  if (!file) {
    setLogo(null);
    return;
  }

  const reader = new FileReader();
  reader.onload = () => setLogo(String(reader.result));
  reader.readAsDataURL(file);
}
