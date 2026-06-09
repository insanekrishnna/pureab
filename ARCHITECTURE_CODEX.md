# ARCHITECTURE_CODEX.md
## Premium PDF Tool Platform — Codex Task Prompts (Zero to Production)

> HOW TO USE THIS FILE:
>  first only read whole file 
>  and do task one by one as mentioned below
>  Never skip a task. Never run two tasks at once.

---

## PROJECT CONTEXT (Codex reads this automatically)

We are building a competitor to ihatepdf.cv. Their product works well technically but the UI is cluttered, inconsistent, and feels like a developer project. We are building the Apple of PDF tools — the same client-side, zero-upload, free-forever model, but with a UI so clean and premium that users trust it immediately and stay.
Core promises to the user:

Files never leave your device (100% client-side processing)
No watermark, ever
No sign-up required
No ads, no paywalls
Feels fast, frictionless, and polished

Design north star: Think Notion meets Apple Human Interface Guidelines. Every pixel has a reason. No decoration for decoration's sake. White space is a feature.
Project codename: purelab 

**Tech stack:**
- Next.js 15, App Router, TypeScript
- Tailwind CSS v4
- Framer Motion (subtle animations only)
- Lucide React (icons)
- Geist font (via next/font/google)
- pdf-lib (PDF manipulation)
- pdfjs-dist (PDF rendering)
- Tesseract.js (OCR)
- Mammoth.js (Word to PDF)
- SheetJS / xlsx (Excel)
- jsPDF (PDF generation)
- @google/generative-ai — Gemini Flash (AI tools)
- react-dropzone (file upload UX)
- clsx + tailwind-merge

**Design north star:** Notion meets Apple HIG.both light and dark theme
Off-white background. Zinc text scale. Single blue accent (#2563EB) used only on primary actions. Geist font. 10px border radius everywhere. Shadows max 0.04 opacity. Breathing room over density.

**Deployment:** Vercel free tier.

---

## DESIGN TOKENS (reference for all tasks)

```css
/* globals.css — exact values, never deviate */
:root {
  --bg:             #FAFAFA;
  --bg-subtle:      #F4F4F5;
  --bg-elevated:    #FFFFFF;
  --border:         #E4E4E7;
  --border-hover:   #D4D4D8;
  --text-primary:   #09090B;
  --text-secondary: #71717A;
  --text-muted:     #A1A1AA;
  --accent:         #2563EB;
  --accent-hover:   #1D4ED8;
  --accent-subtle:  #EFF6FF;
  --accent-text:    #1E40AF;
  --success:        #16A34A;
  --success-subtle: #F0FDF4;
  --error:          #DC2626;
  --error-subtle:   #FEF2F2;
  --shadow-sm:      0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-md:      0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04);
  --shadow-lg:      0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04);
  --radius-sm:      6px;
  --radius-md:      10px;
  --radius-lg:      14px;
  --radius-xl:      20px;
}

 Typography Scale
css/* Use Geist — it ships with Next.js for free */
/* next/font/google → Geist, Geist_Mono */

--font-sans: 'Geist', system-ui, sans-serif;
--font-mono: 'Geist Mono', monospace;

/* Scale */
text-xs:   12px / 1.5  (labels, badges)
text-sm:   14px / 1.5  (body, descriptions)
text-base: 16px / 1.6  (default body)
text-lg:   18px / 1.4  (card titles)
text-xl:   20px / 1.3  (section titles)
text-2xl:  24px / 1.2  (page headings)
text-3xl:  30px / 1.1  (hero)
text-4xl:  36px / 1.0  (hero large)

/* Weight rules */
font-normal (400): body text
font-medium (500): labels, button text, card titles
font-semibold (600): page headings, section titles
font-bold (700): hero headline only
2.3 Spacing & Radius
/* Use multiples of 4 everywhere */
Spacing unit: 4px base

/* Border radius */
--radius-sm:  6px   (badges, tags)
--radius-md:  10px  (cards, inputs, buttons)
--radius-lg:  14px  (modals, dropzone)
--radius-xl:  20px  (large cards on homepage)
--radius-full: 9999px (pill badges)
2.4 Component Visual Rules
Buttons:

Primary: bg-accent text-white rounded-[10px] px-4 py-2.5 text-sm font-medium with hover scale 0.98 and subtle shadow
Secondary: bg-bg-subtle border border-border text-text-primary — same radius
Destructive: red variant of primary
Loading state: spinner replaces icon, text stays, button dims to 70% opacity
Never use heavy drop shadows on buttons

Cards (tool cards on homepage):

bg-white border border-border rounded-[14px] p-5 with shadow-sm
On hover: border-border-hover shadow-md — transition 150ms ease
Icon: 20x20, stroke-based Lucide icon in text-accent
Title: text-sm font-medium text-text-primary
Description: text-xs text-text-secondary — max 1 line
No heavy gradients, no emojis as icons

Inputs & Dropzone:

Border: border-border rounded-[10px] base state
Focus: border-accent ring-2 ring-accent/10 — the ring is the visual emphasis
Dropzone default: border-2 border-dashed border-border rounded-[14px] bg-bg-subtle
Dropzone active (dragging over): border-accent bg-accent-subtle transition 100ms

Modals:

Backdrop: bg-black/40 backdrop-blur-sm
Panel: bg-white rounded-[16px] shadow-lg max-w-md w-full
Never full-screen modals unless mobile
```

---

## FILE STRUCTURE (full reference)

```
purelab/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── (tools)/
│   │   ├── layout.tsx
│   │   ├── merge-pdf/page.tsx
│   │   ├── split-pdf/page.tsx
│   │   ├── compress-pdf/page.tsx
│   │   ├── pdf-to-jpg/page.tsx
│   │   ├── jpg-to-pdf/page.tsx
│   │   ├── rotate-pdf/page.tsx
│   │   ├── organize-pages/page.tsx
│   │   ├── add-watermark/page.tsx
│   │   ├── page-numbers/page.tsx
│   │   ├── headers-footers/page.tsx
│   │   ├── crop-pdf/page.tsx
│   │   ├── redact-pdf/page.tsx
│   │   ├── encrypt-pdf/page.tsx
│   │   ├── remove-password/page.tsx
│   │   ├── flatten-pdf/page.tsx
│   │   ├── edit-pdf/page.tsx
│   │   ├── ocr-pdf/page.tsx
│   │   ├── repair-pdf/page.tsx
│   │   ├── extract-text/page.tsx
│   │   ├── word-to-pdf/page.tsx
│   │   ├── pdf-to-word/page.tsx
│   │   ├── excel-to-pdf/page.tsx
│   │   ├── html-to-pdf/page.tsx
│   │   ├── markdown-to-pdf/page.tsx
│   │   ├── pdf-to-epub/page.tsx
│   │   ├── chat-with-pdf/page.tsx
│   │   ├── summarize-pdf/page.tsx
│   │   ├── compare-pdfs/page.tsx
│   │   ├── gst-invoice/page.tsx
│   │   └── privacy-scanner/page.tsx
│   └── api/
│       └── gemini/route.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Slider.tsx
│   │   ├── Select.tsx
│   │   ├── Switch.tsx
│   │   ├── Spinner.tsx
│   │   ├── Progress.tsx
│   │   └── Tooltip.tsx
│   ├── shared/
│   │   ├── FileDropzone.tsx
│   │   ├── FileList.tsx
│   │   ├── ProcessButton.tsx
│   │   ├── DownloadCard.tsx
│   │   ├── ToolHeader.tsx
│   │   ├── ToolShell.tsx
│   │   └── PdfPreview.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ToolGrid.tsx
│   │   ├── ToolCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── TrustBar.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── pdf/
│   │   ├── worker.ts
│   │   ├── merge.ts
│   │   ├── split.ts
│   │   ├── compress.ts
│   │   ├── rotate.ts
│   │   ├── watermark.ts
│   │   ├── encrypt.ts
│   │   ├── ocr.ts
│   │   └── extract-text.ts
│   ├── convert/
│   │   ├── word-to-pdf.ts
│   │   ├── excel-to-pdf.ts
│   │   └── images-to-pdf.ts
│   └── utils/
│       ├── file.ts
│       ├── download.ts
│       └── cn.ts
├── hooks/
│   ├── usePdfTool.ts
│   ├── useFileUpload.ts
│   └── usePdfPreview.ts
├── config/
│   └── tools.ts
└── public/
```

---
---

# CODEX TASK PROMPTS
## Copy each block exactly. One task at a time. complete one. Then next.

---

## TASK 1 — Project Init + Design Tokens

```
Read ARCHITECTURE_CODEX.md in this repo.

Do Task 1 only. Do not build any components or pages yet.

1. Initialize a Next.js 15 project with TypeScript, Tailwind CSS v4, and App Router. 
   Project name: purelab

2. Install all dependencies:
   npm install framer-motion lucide-react pdf-lib pdfjs-dist tesseract.js mammoth xlsx jspdf @google/generative-ai react-dropzone clsx tailwind-merge

3. Set up app/globals.css with the exact CSS design tokens from the DESIGN TOKENS section of ARCHITECTURE_CODEX.md. Also add:
   - body background: var(--bg)
   - body color: var(--text-primary)
   - * { box-sizing: border-box }
   - ::selection { background: var(--accent-subtle); color: var(--accent-text) }

4. Set up app/layout.tsx with:
   - Geist and Geist_Mono from next/font/google
   - Apply fonts as CSS variables --font-sans and --font-mono
   - metadata: title "Purelab — Free PDF Tools, No Watermark", description "46 free PDF tools. No watermark. No upload. No sign-up. Files never leave your device."
   - Import globals.css

5. Set up next.config.js:
   - optimizePackageImports: ['lucide-react']
   - webpack alias: config.resolve.alias.canvas = false (for pdfjs-dist)

6. Set up tailwind.config.js:
   - fontFamily: sans uses var(--font-geist-sans), mono uses var(--font-geist-mono)
   - extend borderRadius with sm:6px, md:10px, lg:14px, xl:20px
   - extend boxShadow: sm, md, lg using the values from DESIGN TOKENS

7. Create .env.local with:
   GEMINI_API_KEY=your_gemini_api_key_here

8. Create .env.example with the same but empty value.

Commit message: "task-1: project init, design tokens, next config"
```

---

## TASK 2 — Utility Functions + Master Hook

```
Read ARCHITECTURE_CODEX.md in this repo. Task 1 is merged.

Do Task 2 only.

Build these files exactly:

1. lib/utils/cn.ts
   - Export a cn() function using clsx and tailwind-merge
   - import { clsx, type ClassValue } from 'clsx'
   - import { twMerge } from 'tailwind-merge'
   - export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

2. lib/utils/download.ts
   - Export triggerDownload(blob: Blob, filename: string): void
   - Creates object URL, creates <a> tag, clicks it, revokes URL

3. lib/utils/file.ts
   - Export formatBytes(bytes: number): string → returns "1.2 MB", "430 KB" etc
   - Export getFileExt(filename: string): string → returns "pdf", "docx" etc
   - Export readAsArrayBuffer(file: File): Promise<ArrayBuffer>

4. hooks/usePdfTool.ts — THE master hook, build exactly this:

type Status = 'idle' | 'uploading' | 'processing' | 'done' | 'error'

interface UsePdfToolOptions {
  accept?: Record<string, string[]>
  multiple?: boolean
}

export function usePdfTool(options: UsePdfToolOptions = {}) {
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ blob: Blob; filename: string } | null>(null)

  const onDrop = useCallback((accepted: File[]) => {
    setFiles(options.multiple ? prev => [...prev, ...accepted] : accepted)
    setStatus('idle')
    setError(null)
    setResult(null)
  }, [options.multiple])

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const process = useCallback(async (
    processFn: (files: File[], onProgress: (p: number) => void) => Promise<{ blob: Blob; filename: string }>
  ) => {
    if (files.length === 0) return
    setStatus('processing')
    setProgress(0)
    setError(null)
    try {
      const output = await processFn(files, (p) => setProgress(p))
      setResult(output)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }, [files])

  const reset = useCallback(() => {
    setFiles([])
    setStatus('idle')
    setProgress(0)
    setError(null)
    setResult(null)
  }, [])

  return { files, status, progress, error, result, onDrop, removeFile, process, reset }
}

5. hooks/useFileUpload.ts
   - Simple hook wrapping react-dropzone
   - Accepts: accept, multiple, onDrop props
   - Returns: getRootProps, getInputProps, isDragActive

Commit message: "task-2: utils, download helper, usePdfTool hook"
```

---

## TASK 3 — UI Primitives (Design System Components)

```
Read ARCHITECTURE_CODEX.md in this repo. Task 2 is merged.

Do Task 3 only. Build all components/ui/ primitives.

Design rules for ALL components:
- Use cn() from lib/utils/cn.ts for className merging
- Use CSS variables from globals.css for all colors
- Border radius: rounded-[10px] default, rounded-[6px] for small
- Transitions: transition-all duration-150 ease-out
- Never use hard-coded hex colors

1. components/ui/Button.tsx
   Variants: primary (bg-[#2563EB] text-white), secondary (bg-[#F4F4F5] border border-[#E4E4E7] text-[#09090B]), destructive (bg-[#DC2626] text-white), ghost (no bg, text-[#71717A])
   Sizes: sm (px-3 py-1.5 text-xs), md (px-4 py-2.5 text-sm) — md is default
   Props: variant, size, loading (shows Spinner, dims to 70%), icon (ReactNode, placed left of text), disabled, onClick, children, className
   Hover: scale-[0.98] using framer-motion whileTap
   Loading state: show Spinner component inline, keep button text visible

2. components/ui/Spinner.tsx
   - SVG circle spinner, animated with CSS animation: spin
   - Sizes: sm (16px), md (20px), lg (24px)
   - Color inherits from parent (currentColor)

3. components/ui/Progress.tsx
   - Thin bar (h-1.5), background bg-[#F4F4F5], fill bg-[#2563EB]
   - Animated width with framer-motion layout animation
   - Props: value (0-100), className

4. components/ui/Badge.tsx
   - Variants: default (zinc), blue (accent), green (success), red (error)
   - Size: tiny, pill shape (rounded-full), text-xs font-medium
   - Padding: px-2 py-0.5

5. components/ui/Input.tsx
   - Full width, border border-[#E4E4E7], rounded-[10px], bg-white
   - Focus: border-[#2563EB] ring-2 ring-[#2563EB]/10 outline-none
   - Placeholder: text-[#A1A1AA]
   - Padding: px-3 py-2 text-sm
   - Props: label (shows above), error (shows below in red), ...rest HTMLInput props

6. components/ui/Slider.tsx
   - Native HTML range input, styled with Tailwind
   - Accent color: #2563EB
   - Props: min, max, step, value, onChange, label, showValue

7. components/ui/Select.tsx
   - Native HTML select, styled to match Input.tsx
   - Props: options: {value, label}[], value, onChange, label

8. components/ui/Switch.tsx
   - Toggle component, framer-motion for the sliding knob
   - Active: bg-[#2563EB], Inactive: bg-[#E4E4E7]
   - Props: checked, onChange, label

9. components/ui/Tooltip.tsx
   - Simple hover tooltip using CSS (no library)
   - Position: top by default
   - Dark bg (#09090B), white text, text-xs, rounded-[6px], px-2 py-1

Commit message: "task-3: ui primitives, button, input, spinner, progress, badge, slider, switch, tooltip"
```

---

## TASK 4 — Shared Tool Components

```
Read ARCHITECTURE_CODEX.md in this repo. Task 3 is merged.

Do Task 4 only. Build all components/shared/ — these are used by every single tool page.

1. components/shared/FileDropzone.tsx
   - Uses react-dropzone useDropzone hook
   - Props: onDrop, accept, multiple, label, sublabel, className
   - Default state: border-2 border-dashed border-[#E4E4E7] bg-[#F4F4F5] rounded-[14px] min-h-[220px]
   - Hover state: border-[#D4D4D8] bg-white
   - Drag active state: border-[#2563EB] bg-[#EFF6FF] — animate with framer-motion AnimatePresence
   - Center content: FileText lucide icon (zinc-400) + label text-sm font-medium text-zinc-700 + sublabel text-xs text-zinc-400
   - Drag active shows Upload icon in blue circle + "Release to upload" text
   - whileHover scale-[1.002], whileTap scale-[0.998] on the container

2. components/shared/FileList.tsx
   - Props: files: File[], onRemove: (index: number) => void, reorderable?: boolean
   - Each file row: white bg, border border-[#E4E4E7], rounded-[10px], px-3 py-2.5
   - Shows: file icon (FileText), filename (text-sm font-medium truncate), file size (formatBytes, text-xs text-zinc-400), X button to remove
   - If reorderable: show drag handle icon (GripVertical) on left, implement drag reorder with framer-motion Reorder.Group
   - Animate file rows in with framer-motion (opacity 0 to 1, y 4 to 0)

3. components/shared/ProcessButton.tsx
   - Props: onClick, disabled, loading, progress, children, className
   - Full width button using Button.tsx primary variant
   - When loading: show Progress bar below the button (animate in), show Spinner in button
   - When disabled and no files: slightly dimmed but still shows text
   - Text updates when loading: children stays the same (don't change text during processing)

4. components/shared/DownloadCard.tsx
   - Props: blob: Blob, filename: string, onReset: () => void
   - Container: border border-green-200 bg-[#F0FDF4] rounded-[14px] p-6
   - Shows: CheckCircle2 icon (green-600) in rounded green circle, "Ready to download" heading, filename + size subtitle
   - Two buttons: Download (primary, calls triggerDownload from lib/utils/download.ts) + "Process another" (secondary, calls onReset)
   - Animate in: framer-motion opacity 0→1, y 8→0

5. components/shared/ToolShell.tsx
   - Props: title, description, icon (ReactNode), children
   - Layout: mx-auto max-w-2xl px-4 py-10
   - Back link: "← All tools" in top-left, text-xs text-zinc-400 hover:text-zinc-700
   - Header row: icon in rounded-[10px] bg-[#EFF6FF] p-2.5, title text-xl font-semibold, description text-sm text-zinc-500
   - Children below header with mt-8

6. components/shared/PdfPreview.tsx
   - Props: file: File, pageNum?: number (default 1), className?
   - Renders a canvas using pdfjs-dist (lazy import)
   - Shows Spinner while rendering
   - Shows page as thumbnail in a rounded-[10px] border border-[#E4E4E7] container
   - Use lib/pdf/worker.ts renderPageToCanvas function

Commit message: "task-4: shared tool components, FileDropzone, FileList, ProcessButton, DownloadCard, ToolShell, PdfPreview"
```

---

## TASK 5 — PDF Processing Library

```
Read ARCHITECTURE_CODEX.md in this repo. Task 4 is merged.

Do Task 5 only. Build all lib/pdf/ and lib/utils/ processing functions.
Use dynamic imports inside every function (never top-level imports for pdf-lib or pdfjs-dist).

1. lib/pdf/worker.ts
   export function initPdfWorker() — sets GlobalWorkerOptions.workerSrc to cdnjs pdfjs worker URL
   export async function renderPageToCanvas(file, pageNum, scale) — renders one PDF page to HTMLCanvasElement
   export async function getPdfPageCount(file) — returns total page count
   export async function pdfToJpgBlobs(file, dpi) — returns Blob[] of all pages as JPEG

2. lib/pdf/merge.ts
   export async function mergePdfs(files: File[]): Promise<Blob>
   — load each file with PDFDocument.load(), copyPages into new doc, return as Blob

3. lib/pdf/split.ts
   export async function splitPdf(file: File, ranges: {start: number, end: number}[]): Promise<Blob[]>
   — for each range, create new PDFDocument, copy pages in range, return array of Blobs

4. lib/pdf/compress.ts
   export async function compressPdf(file: File, level: 'light'|'medium'|'heavy'): Promise<Blob>
   — strip all metadata (title, author, subject, keywords, creator, producer)
   — useObjectStreams: true for medium/heavy
   — return re-saved Blob

5. lib/pdf/rotate.ts
   export async function rotatePdf(file: File, degrees: 90|180|270, pageIndices?: number[]): Promise<Blob>
   — if pageIndices provided, rotate only those pages; otherwise rotate all
   — use page.setRotation(degrees(deg)) from pdf-lib

6. lib/pdf/watermark.ts
   export async function addWatermark(file: File, options: { text: string, opacity: number, fontSize: number, color: string, rotation: number, position: 'center'|'tile' }): Promise<Blob>
   — draw text on each page using pdf-lib's drawText

7. lib/pdf/encrypt.ts
   export async function encryptPdf(file: File, password: string): Promise<Blob>
   — use PDFDocument.load() then save with { ownerPassword: password, userPassword: password, permissions: {...} }
   export async function decryptPdf(file: File, password: string): Promise<Blob>
   — use PDFDocument.load(bytes, { password }) then save without password

8. lib/pdf/extract-text.ts
   export async function extractText(file: File): Promise<string>
   — use pdfjs-dist getTextContent() on each page, join all strings, return full text

9. lib/pdf/ocr.ts
   export async function ocrPdf(file: File, onProgress: (p: number) => void): Promise<string>
   — render each page to canvas using renderPageToCanvas()
   — run Tesseract.recognize() on each canvas imageData
   — return combined text from all pages

10. lib/convert/images-to-pdf.ts
    export async function imagesToPdf(files: File[]): Promise<Blob>
    — create new PDFDocument, embed each image (jpg/png), add page sized to image, return Blob

11. lib/convert/word-to-pdf.ts
    export async function wordToPdf(file: File): Promise<Blob>
    — use mammoth.convertToHtml() to get HTML string
    — create a hidden iframe, write HTML into it, call window.print() — OR
    — use jsPDF with the HTML string via jsPDF html() method
    — return PDF Blob

12. lib/convert/excel-to-pdf.ts
    export async function excelToPdf(file: File): Promise<Blob>
    — use SheetJS to parse workbook
    — convert each sheet to HTML table string
    — use jsPDF html() to render to PDF

Commit message: "task-5: pdf processing library, merge, split, compress, rotate, watermark, encrypt, ocr, convert"
```

---

## TASK 6 — Tools Config + Navbar + Homepage

```
Read ARCHITECTURE_CODEX.md in this repo. Task 5 is merged.

Do Task 6 only.

1. config/tools.ts — build the full tools array with these exact tools and categories:

Type definitions:
  type ToolCategory = 'organize' | 'convert' | 'edit' | 'security' | 'ai' | 'business'
  interface Tool { slug, name, description, icon, category, featured? }

Tools list (slug / name / description / lucide icon / category / featured?):
  merge-pdf / Merge PDF / Combine multiple PDFs into one file / FilePlus2 / organize / true
  split-pdf / Split PDF / Extract pages or split into parts / Scissors / organize / true
  compress-pdf / Compress PDF / Reduce file size without losing quality / Minimize2 / organize / true
  rotate-pdf / Rotate PDF / Fix sideways or upside-down pages / RotateCw / organize
  organize-pages / Organize Pages / Reorder, delete or rearrange pages / Layers / organize
  crop-pdf / Crop & Resize / Trim margins or resize pages / Crop / organize
  pdf-to-jpg / PDF to JPG / Export pages as high-quality images / Image / convert / true
  jpg-to-pdf / Images to PDF / Convert JPG or PNG to PDF / FileType2 / convert / true
  word-to-pdf / Word to PDF / Convert .docx files to PDF / FileText / convert
  pdf-to-word / PDF to Word / Export PDF as editable .docx / FileDown / convert
  excel-to-pdf / Excel to PDF / Convert spreadsheets to PDF / FileSpreadsheet / convert
  html-to-pdf / HTML to PDF / Convert HTML or URL to PDF / Code / convert
  markdown-to-pdf / Markdown to PDF / Convert .md to formatted PDF / FileCode / convert
  pdf-to-epub / PDF to EPUB / For Kindle and e-readers / BookOpen / convert
  pdf-to-audio / PDF to Audio / Listen with neural text-to-speech / Volume2 / convert
  edit-pdf / Edit PDF / Click any text to edit it / Type / edit / true
  add-watermark / Add Watermark / Stamp text or image on pages / Droplets / edit
  page-numbers / Page Numbers / Auto-number pages / Hash / edit
  headers-footers / Headers & Footers / Add to every page / AlignJustify / edit
  redact-pdf / Redact PDF / Permanently remove sensitive text / EyeOff / edit
  extract-text / Extract Text / Copy all text from any PDF / FileText / edit
  ocr-pdf / OCR PDF / Make scanned PDFs searchable / ScanLine / edit
  repair-pdf / Repair PDF / Recover corrupted PDF files / Wrench / edit
  flatten-pdf / Flatten PDF / Remove forms, make static / Layers2 / edit
  encrypt-pdf / Encrypt PDF / Password-protect with AES-256 / Lock / security
  remove-password / Remove Password / Unlock protected PDFs / Unlock / security
  privacy-scanner / Privacy Scanner / Find hidden metadata / Shield / security
  fingerprint-pdf / Fingerprint PDF / Track document leaks / Fingerprint / security
  chat-with-pdf / Chat with PDF / Ask AI questions about docs / MessageSquare / ai / true
  summarize-pdf / Summarize PDF / Get an AI summary instantly / Sparkles / ai
  compare-pdfs / Compare PDFs / Side-by-side document diff / GitCompare / ai
  gst-invoice / GST Invoice / GST-compliant invoices free / Receipt / business
  pos-billing / POS Billing / Point-of-sale receipts / ShoppingCart / business

Also export categories array: [{id:'all',label:'All tools'}, {id:'organize',label:'Organize'}, ...]

2. components/layout/Navbar.tsx
   - Sticky top, bg-white/80 backdrop-blur-md, border-b border-[#E4E4E7]
   - Max-width container mx-auto max-w-6xl px-4 py-3
   - Left: small square logo div (h-6 w-6 rounded-[6px] bg-[#2563EB]) + "purelab" text-sm font-semibold
   - Right: green dot (h-1.5 w-1.5 rounded-full bg-green-400) + "Files never leave your device" text-xs text-zinc-400
   - No navigation links. No hamburger menu. Just these two elements.

3. components/layout/Footer.tsx
   - Minimal: border-t border-[#E4E4E7], py-6, text-xs text-zinc-400 text-center
   - "© 2025 purelab · Free PDF tools, forever · Files never leave your device"

4. components/home/Hero.tsx
   - py-16 px-4 text-center
   - Headline: "PDF tools that don't get in your way." — text-4xl font-bold text-[#09090B] max-w-lg mx-auto
   - Subline: "46 tools. No watermark. No upload. No sign-up. Your files never leave your browser." — text-base text-[#71717A] mt-3 max-w-md mx-auto
   - Trust badges row below: 3 small pills with icons — "No watermark" (CheckCircle2), "Files stay local" (Shield), "Always free" (Heart) — bg-[#F4F4F5] border border-[#E4E4E7] rounded-full px-3 py-1 text-xs font-medium text-zinc-600
   - Animate in with framer-motion: headline opacity 0→1 y 10→0 delay 0, subline delay 0.1, badges delay 0.2

5. components/home/CategoryFilter.tsx
   - Props: active: string, onChange: (id: string) => void
   - Row of pill buttons, horizontally scrollable on mobile
   - Active pill: bg-[#2563EB] text-white
   - Inactive pill: bg-[#F4F4F5] border border-[#E4E4E7] text-[#71717A] hover:border-[#D4D4D8]
   - All pills: rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150

6. components/home/ToolCard.tsx
   - Props: tool: Tool
   - Link wrapping a card: bg-white border border-[#E4E4E7] rounded-[14px] p-5
   - Shadow: shadow-sm hover:shadow-md hover:border-[#D4D4D8] hover:-translate-y-0.5 transition-all duration-150
   - Inside: icon row (icon in rounded-[8px] bg-[#EFF6FF] p-2, tool.name text-sm font-medium text-[#09090B])
   - Description: text-xs text-[#71717A] mt-2 line-clamp-2
   - No emoji. No badge. No extra decoration.

7. components/home/ToolGrid.tsx
   - Props: tools: Tool[]
   - Responsive grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3
   - Wrap in framer-motion with staggerChildren 0.04, each card animates opacity 0→1 y 8→0
   - If tools array is empty: show "No tools found" centered message

8. app/page.tsx — Homepage
   - 'use client'
   - Import Hero, CategoryFilter, ToolGrid, Navbar, Footer
   - State: activeCategory (default 'all'), searchQuery (default '')
   - Search input: top of tool section, full width on mobile, max-w-xs on desktop, Input.tsx component, placeholder "Search tools..."
   - Filter tools: by activeCategory AND searchQuery (filter by tool.name and tool.description)
   - Featured tools row first (tools.filter(t => t.featured)), then "All tools" label, then filtered grid
   - Layout: Navbar at top, main content mx-auto max-w-6xl px-4, Footer at bottom

Commit message: "task-6: tools config, navbar, footer, hero, category filter, tool card, tool grid, homepage"
```

---

## TASK 7 — Tool Layout + Core 6 Tools

```
Read ARCHITECTURE_CODEX.md in this repo. Task 6 is merged.

Do Task 7 only. Build the tool route group layout and first 6 tools.

1. app/(tools)/layout.tsx
   - Import Navbar and Footer
   - Wrap children in: <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1">{children}</main><Footer /></div>

2. app/(tools)/merge-pdf/page.tsx
   metadata: title "Merge PDF Free — No Watermark | Purelab", description "Combine multiple PDF files into one. No watermark, no upload, no sign-up."
   Tool: 'use client', use usePdfTool({ multiple: true })
   ToolShell: icon=FilePlus2, title="Merge PDF", description="Combine multiple PDFs into one. Drag to reorder before merging."
   Dropzone: accept={{'application/pdf':['.pdf']}}, multiple, label="Drop PDF files here", sublabel="Select 2 or more files"
   FileList: show with reorderable=true when files.length > 0
   ProcessButton: disabled if files.length < 2, text "Merge {n} files"
   Processing: dynamic import pdf-lib, call mergePdfs(), output filename "merged.pdf"

3. app/(tools)/split-pdf/page.tsx
   metadata: title "Split PDF Free — Extract Pages | Purelab"
   Tool: single file upload
   Options UI: radio group — "Extract all pages" / "Extract page range" (shows Input for "Pages e.g. 1-3, 5, 7-9")
   Processing: parse page range input, call splitPdf(), if multiple outputs zip them with JSZip (install JSZip), download as split.zip. If single output download directly.

4. app/(tools)/compress-pdf/page.tsx
   metadata: title "Compress PDF Free — Reduce File Size | Purelab"
   Tool: single file upload
   Options: Slider or radio for level — Light / Medium / Heavy with description text for each
   Shows original file size after upload (formatBytes)
   After processing: show original vs compressed size comparison in DownloadCard
   Processing: call compressPdf() with selected level

5. app/(tools)/rotate-pdf/page.tsx
   metadata: title "Rotate PDF Free | Purelab"
   Tool: single file upload
   Options: 4 buttons for 90° / 180° / 270° / Custom per-page
   Simple version: rotate all pages by selected degrees
   Processing: call rotatePdf()

6. app/(tools)/pdf-to-jpg/page.tsx
   metadata: title "PDF to JPG Free — No Watermark | Purelab"
   Tool: single file upload
   Options: DPI select (72 / 150 / 300) — default 150
   After processing: show image thumbnails grid, "Download all as ZIP" button
   Processing: call pdfToJpgBlobs(), zip with JSZip, download as pdf-images.zip

7. app/(tools)/jpg-to-pdf/page.tsx
   metadata: title "Images to PDF Free | Purelab"
   Tool: multiple file upload, accept jpg/png
   Shows image previews in FileList
   Processing: call imagesToPdf() from lib/convert/images-to-pdf.ts

Install JSZip: npm install jszip @types/jszip

Commit message: "task-7: tool layout, merge-pdf, split-pdf, compress-pdf, rotate-pdf, pdf-to-jpg, jpg-to-pdf"
```

---

## TASK 8 — Edit & Organize Tools

```
Read ARCHITECTURE_CODEX.md in this repo. Task 7 is merged.

Do Task 8 only. Build these edit and organize tool pages.
All follow the same ToolShell + usePdfTool pattern.

1. app/(tools)/add-watermark/page.tsx
   Options: text input (watermark text), opacity Slider (0.1–1.0 default 0.3), font size Slider (24–96 default 48), rotation input (-90 to 90 default -45), position radio (Center / Tile)
   Processing: call addWatermark() from lib/pdf/watermark.ts

2. app/(tools)/page-numbers/page.tsx
   Options: position Select (Bottom Center / Bottom Right / Bottom Left / Top Center), starting number Input, font size Select (10/12/14pt), format Select (1 / Page 1 / 1 of N)
   Processing: use pdf-lib to drawText on each page at selected position

3. app/(tools)/headers-footers/page.tsx
   Options: two Input fields — Header text and Footer text. Position (left/center/right) selects for each. Font size select.
   Processing: use pdf-lib drawText at top/bottom of each page

4. app/(tools)/redact-pdf/page.tsx
   Simple version: file upload + text Input for "text to redact". Find and cover that text with a black rectangle.
   Note in UI: "For precise redaction, use our Edit PDF tool to manually blackout text"
   Processing: use pdf-lib to draw filled black rectangles — since client-side true text search in pdf-lib is limited, draw black rect over the page content area the user specifies (x,y,w,h inputs as fallback)

5. app/(tools)/extract-text/page.tsx
   No options needed. Just upload + process.
   Result: instead of DownloadCard, show extracted text in a <textarea readOnly> styled nicely (border border-[#E4E4E7] rounded-[10px] p-4 text-sm font-mono bg-[#F4F4F5] h-64)
   Two buttons: "Copy text" (copies to clipboard) and "Download as .txt" (creates txt Blob)
   Processing: call extractText() from lib/pdf/extract-text.ts

6. app/(tools)/ocr-pdf/page.tsx
   Single file upload (PDF or image)
   Shows progress bar during OCR (Tesseract reports %, pass through onProgress)
   Result: same textarea + copy + download as extract-text
   Processing: call ocrPdf() from lib/pdf/ocr.ts

7. app/(tools)/flatten-pdf/page.tsx
   No options. Upload + flatten.
   Processing: PDFDocument.load(), then save() — pdf-lib flattens annotations by default on re-save with flatten option

8. app/(tools)/encrypt-pdf/page.tsx
   Options: password Input (type="password") + confirm password Input. Show error if they don't match.
   Processing: call encryptPdf() from lib/pdf/encrypt.ts

9. app/(tools)/remove-password/page.tsx
   Options: single password Input
   Error handling: catch PDFDocument.load() failure and show "Incorrect password" error
   Processing: call decryptPdf() from lib/pdf/encrypt.ts

10. app/(tools)/repair-pdf/page.tsx
    No options. Upload + attempt repair.
    Processing: try PDFDocument.load(bytes, { ignoreEncryption: true }), then save. Show success or error message.

Commit message: "task-8: watermark, page-numbers, headers-footers, redact, extract-text, ocr, flatten, encrypt, remove-password, repair"
```

---

## TASK 9 — Convert Tools

```
Read ARCHITECTURE_CODEX.md in this repo. Task 8 is merged.

Do Task 9 only. Build conversion tool pages.

1. app/(tools)/word-to-pdf/page.tsx
   Accept: .doc, .docx
   Processing: call wordToPdf() from lib/convert/word-to-pdf.ts
   Output filename: replace extension with .pdf

2. app/(tools)/pdf-to-word/page.tsx
   Accept: .pdf
   Processing: use pdfjs-dist to extract text from all pages. Use the docx npm package to create a .docx file with the extracted text. This is a best-effort conversion.
   Show disclaimer in UI: "Formatting may vary. Complex layouts work best with copy-paste."
   Install: npm install docx

3. app/(tools)/excel-to-pdf/page.tsx
   Accept: .xlsx, .xls
   Processing: call excelToPdf() from lib/convert/excel-to-pdf.ts

4. app/(tools)/html-to-pdf/page.tsx
   Two tabs: "Paste HTML" and "Upload .html file"
   Paste HTML: textarea Input, convert button
   Upload: FileDropzone accepting .html files
   Processing: use jsPDF html() method. Render HTML string to PDF.

5. app/(tools)/markdown-to-pdf/page.tsx
   Accept: .md files OR paste markdown in textarea (two tabs)
   Processing: use marked (npm install marked) to convert MD to HTML, then jsPDF html() to PDF
   Apply minimal CSS for the HTML: font-family Geist, line-height 1.6, max-width 680px

6. app/(tools)/pdf-to-epub/page.tsx
   Accept: .pdf
   Processing: extract text with pdfjs-dist. Use epub-gen-memory package (npm install epub-gen-memory) to create EPUB.
   Output: filename.epub

7. app/(tools)/pdf-to-audio/page.tsx
   Accept: .pdf
   Processing: extract text with extractText(). Use Web Speech API SpeechSynthesis to read aloud OR create a simple audio player UI that reads text chunks.
   For download: use MediaRecorder to capture SpeechSynthesis output as WebM audio blob.
   Show disclaimer: "Audio uses your browser's built-in text-to-speech voices."
   UI: after text extraction show a play button + voice Select (window.speechSynthesis.getVoices()) + speed Slider

Commit message: "task-9: word-to-pdf, pdf-to-word, excel-to-pdf, html-to-pdf, markdown-to-pdf, pdf-to-epub, pdf-to-audio"
```

---

## TASK 10 — AI Tools + Gemini Route

```
Read ARCHITECTURE_CODEX.md in this repo. Task 9 is merged.

Do Task 10 only. Build the AI-powered tools.

Environment variable required: GEMINI_API_KEY (already in .env.local)

1. app/api/gemini/route.ts
   export const runtime = 'edge'
   POST handler: accepts { text: string, prompt: string }
   Uses GoogleGenerativeAI with model 'gemini-1.5-flash'
   Streams response tokens back as text/event-stream
   Truncate text to first 30000 characters before sending
   Handle errors: return 500 with error message JSON

2. app/(tools)/chat-with-pdf/page.tsx
   Two-column layout on desktop: left = PDF upload, right = chat interface
   On mobile: stack vertically
   
   Upload step: FileDropzone for PDF. After upload, automatically extract text using extractText() and store in state (extractedText).
   
   Chat UI:
   - Messages array state: {role: 'user'|'assistant', content: string}[]
   - Scrollable message list: user messages right-aligned (bg-[#2563EB] text-white rounded-[14px] rounded-tr-[4px]), assistant messages left-aligned (bg-[#F4F4F5] text-[#09090B] rounded-[14px] rounded-tl-[4px])
   - Input row at bottom: Input + Send button (Arrow icon)
   - On send: append user message, call /api/gemini with {text: extractedText, prompt: `Answer this question about the document: ${userQuestion}`}, stream response into assistant message
   - Show typing indicator (animated 3 dots) while streaming
   - Auto-scroll to bottom on new message
   
   System prompt for Gemini: "You are a helpful assistant. Answer questions based ONLY on the provided document text. Be concise and accurate. If the answer is not in the document, say so."

3. app/(tools)/summarize-pdf/page.tsx
   Single file upload
   Options: format radio — "Bullet points" / "Paragraph" / "Key takeaways (3 points)"
   After upload + click Summarize: extract text, send to /api/gemini with appropriate prompt
   Show streaming response in a styled result area (not DownloadCard — show text result with copy button + download as .txt button)
   Prompts per format:
   - Bullet points: "Summarize this document as a concise bulleted list of the most important points."
   - Paragraph: "Write a 2-3 paragraph summary of this document."
   - Key takeaways: "Extract exactly 3 key takeaways from this document. Number them 1, 2, 3."

4. app/(tools)/compare-pdfs/page.tsx
   Two FileDropzone components side by side (or stacked on mobile), each labeled "Document A" and "Document B"
   After both are uploaded: "Compare" button
   Result: side-by-side scrollable text view of both documents
   Highlight differences: find paragraphs in A not in B and vice versa using simple text diff (split by sentences, compare)
   Use a simple diff approach: green background for added, red for removed, neutral for same

Commit message: "task-10: gemini api route, chat-with-pdf, summarize-pdf, compare-pdfs"
```

---

## TASK 11 — Business Tools

```
Read ARCHITECTURE_CODEX.md in this repo. Task 10 is merged.

Do Task 11 only.

1. app/(tools)/gst-invoice/page.tsx
   'use client' — this is a standalone generator, no file upload needed
   Remove ToolShell wrapper for this page — it has its own full-width layout
   
   Layout: Two columns on desktop — left (form, ~420px wide), right (live invoice preview, rest of width)
   
   Form sections (accordion-style collapsible):
   Section A — Business Details: Business Name, GSTIN, Address, State, Phone, Email, Logo upload (optional)
   Section B — Client Details: Client Name, GSTIN (optional), Address, State
   Section C — Invoice Details: Invoice Number, Invoice Date (date picker), Due Date, Place of Supply
   Section D — Line Items: table with Add Row button. Each row: Description, HSN/SAC Code, Qty, Unit (Select: Nos/Kg/L/m), Rate, GST% (Select: 0/5/12/18/28), Amount (auto-calculated)
   Section E — Notes: textarea for payment terms / notes

   Auto-calculations:
   - Per line: Amount = Qty × Rate
   - If supplier state === place of supply: CGST + SGST (split equally)
   - If supplier state !== place of supply: IGST only
   - Subtotal, Total GST, Grand Total shown at bottom

   Live preview (right column):
   - Clean A4-proportion white card with subtle border
   - Shows formatted invoice with all form data
   - Updates in real-time as user types
   - "Download PDF" button: use jsPDF to capture the preview div

   Download: use html2canvas (npm install html2canvas) to capture preview, then add to jsPDF

2. app/(tools)/privacy-scanner/page.tsx
   Single PDF upload
   After upload: automatically scan and display results (no separate process button needed)
   
   Scan for using pdfjs-dist and pdf-lib:
   - Author name (doc.getAuthor())
   - Title (doc.getTitle())
   - Creator application (doc.getCreator())
   - Creation date (doc.getCreationDate())
   - Modification date (doc.getModificationDate())
   - Producer (doc.getProducer())
   - Keywords
   - Number of pages
   
   Show results as a list of findings. Each item: icon (green CheckCircle if empty/safe, yellow AlertTriangle if has data), field name, value
   
   "Clean & Download" button: strip all metadata fields (set to empty string), re-save PDF

Commit message: "task-11: gst-invoice, privacy-scanner"
```

---

## TASK 12 — Animations, Polish, SEO

```
Read ARCHITECTURE_CODEX.md in this repo. Task 11 is merged.

Do Task 12 only. Final polish pass.

1. Page transitions
   Add to app/(tools)/layout.tsx:
   Wrap children in <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:0.2,ease:'easeOut'}}>

2. Homepage scroll animation
   In ToolGrid.tsx: add framer-motion viewport detection so cards animate in as they scroll into view
   Use: whileInView={{opacity:1,y:0}} initial={{opacity:0,y:8}} viewport={{once:true,margin:'-50px'}}

3. SEO metadata for every tool page
   Pattern: title "[Tool Name] Free — No Watermark | Purelab", description one sentence about what it does + "No watermark, no upload, no sign-up."
   Add this metadata export to every single tool page that doesn't have it yet.

4. Sitemap
   Create app/sitemap.ts returning all tool URLs + homepage
   Use Next.js MetadataRoute.Sitemap type

5. robots.txt
   Create app/robots.ts allowing all crawlers, pointing to sitemap

6. Loading states
   Add loading.tsx inside app/(tools)/ that shows a skeleton:
   - ToolShell skeleton: gray rounded rect for icon, two gray rects for title/description
   - Gray rounded rect for the dropzone area
   Use Tailwind animate-pulse

7. Error boundary
   Add error.tsx inside app/(tools)/:
   Simple centered error message with "Try again" button (calls reset())
   Style: same ToolShell shell with an AlertCircle icon in red, error message, Button to retry

8. 404 page
   Add app/not-found.tsx:
   Centered, minimal: "404" in large text-8xl font-bold text-[#E4E4E7], "Page not found" subtitle, link back to homepage

9. Mobile responsiveness audit
   Check all tool pages on 375px viewport
   ToolShell: ensure px-4 and max-w-2xl work on mobile
   FileDropzone: min-h-[180px] on mobile (reduce from 220px)
   Navbar: reduce font sizes if needed, ensure green dot text truncates gracefully
   GST Invoice: on mobile show form only (hide live preview), add "Preview" toggle button

10. Vercel Analytics
    Add to app/layout.tsx: import { Analytics } from '@vercel/analytics/react' and render <Analytics />
    Install: npm install @vercel/analytics

Commit message: "task-12: page transitions, scroll animations, seo metadata, sitemap, robots, loading states, error boundary, 404, mobile audit, analytics"
```

---

## TASK 13 — Final QA + Deploy

```
Read ARCHITECTURE_CODEX.md in this repo. Task 12 is merged.

Do Task 13 only. Final QA sweep before production deploy.

1. Verify all imports resolve correctly. Run: npx tsc --noEmit and fix any TypeScript errors.

2. Verify all dynamic imports are correct (pdf-lib, pdfjs-dist should never be top-level imported in page files — always dynamic inside process functions).

3. Check next.config.js has canvas alias set to false (required for pdfjs-dist in Next.js).

4. Verify .env.example exists with GEMINI_API_KEY= (empty value, no actual key).

5. Verify .gitignore includes: .env.local, node_modules, .next

6. Run: npm run build — fix any build errors. Common ones:
   - "window is not defined": wrap in useEffect or add 'use client' directive
   - "canvas is not defined": check next.config.js webpack alias
   - Type errors in pdfjs-dist: add @types/pdfjs-dist or use ts-ignore with comment

7. Add README.md with:
   - Project name and one-line description
   - "Built with Next.js 15, pdf-lib, pdfjs-dist. All processing is 100% client-side."
   - Setup: npm install, add GEMINI_API_KEY to .env.local, npm run dev
   - Deploy: push to GitHub, import to Vercel, add env var

8. Create vercel.json:
   {
     "env": { "GEMINI_API_KEY": "@gemini_api_key" },
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {"key":"X-Content-Type-Options","value":"nosniff"},
           {"key":"X-Frame-Options","value":"DENY"},
           {"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"}
         ]
       }
     ]
   }

9. Final check: open localhost:3000 and verify:
   - Homepage loads with all tools visible
   - Category filter works
   - Search filters tools correctly
   - At least one tool works end to end (Merge PDF: upload 2 PDFs, click merge, file downloads)
   - Mobile: navbar, hero, tool grid all display correctly at 375px



---

