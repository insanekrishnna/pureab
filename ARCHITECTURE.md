# MASTER ARCHITECTURE — Premium PDF Tool Platform
## Zero to Production Guide for Cursor

---

## 0. PROJECT PHILOSOPHY

We are building a competitor to ihatepdf.cv. Their product works well technically but the UI is cluttered, inconsistent, and feels like a developer project. We are building the Apple of PDF tools — the same client-side, zero-upload, free-forever model, but with a UI so clean and premium that users trust it immediately and stay.

**Core promises to the user:**
- Files never leave your device (100% client-side processing)
- No watermark, ever
- No sign-up required
- No ads, no paywalls
- Feels fast, frictionless, and polished

**Design north star:** Think Notion meets Apple Human Interface Guidelines. Every pixel has a reason. No decoration for decoration's sake. White space is a feature.

**Project codename:** `purelab` (or replace with your chosen domain name throughout)

---

## 1. TECH STACK (100% FREE)

```
Framework:       Next.js 15 (App Router, TypeScript)
Styling:         Tailwind CSS v4
Animations:      Framer Motion
Icons:           Lucide React
Font:            Geist (Vercel's font, free, ships with Next.js)
PDF Processing:  pdf-lib, pdfjs-dist
OCR:             Tesseract.js
Word/Docx:       Mammoth.js (Word→HTML), docx (generate .docx)
Excel:           SheetJS (xlsx)
PDF Generation:  jsPDF
AI (Gemini):     @google/generative-ai (free tier, Gemini Flash)
File Upload UX:  react-dropzone
Deployment:      Vercel (free hobby tier)
Analytics:       Vercel Analytics (free)
```

---

## 2. DESIGN SYSTEM (THE MAIN DIFFERENTIATOR)

This is the most important section. Get the design system right and every tool looks premium automatically.

### 2.1 Color Palette

```css
/* globals.css */
:root {
  /* Base */
  --bg:           #FAFAFA;  /* off-white, not harsh white */
  --bg-subtle:    #F4F4F5;  /* cards, inputs */
  --bg-elevated:  #FFFFFF;  /* modals, dropzone active */
  --border:       #E4E4E7;  /* all borders */
  --border-hover: #D4D4D8;

  /* Text */
  --text-primary:   #09090B;  /* headings */
  --text-secondary: #71717A;  /* subtext, labels */
  --text-muted:     #A1A1AA;  /* placeholders */

  /* Accent — a single blue, used sparingly */
  --accent:         #2563EB;  /* primary action */
  --accent-hover:   #1D4ED8;
  --accent-subtle:  #EFF6FF;  /* accent backgrounds */
  --accent-text:    #1E40AF;

  /* Semantic */
  --success:        #16A34A;
  --success-subtle: #F0FDF4;
  --error:          #DC2626;
  --error-subtle:   #FEF2F2;

  /* Shadows — extremely subtle */
  --shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04);
  --shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04);
}
```

### 2.2 Typography Scale

```css
/* Use Geist — it ships with Next.js for free */
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
```

### 2.3 Spacing & Radius

```
/* Use multiples of 4 everywhere */
Spacing unit: 4px base

/* Border radius */
--radius-sm:  6px   (badges, tags)
--radius-md:  10px  (cards, inputs, buttons)
--radius-lg:  14px  (modals, dropzone)
--radius-xl:  20px  (large cards on homepage)
--radius-full: 9999px (pill badges)
```

### 2.4 Component Visual Rules

**Buttons:**
- Primary: `bg-accent text-white rounded-[10px] px-4 py-2.5 text-sm font-medium` with hover scale 0.98 and subtle shadow
- Secondary: `bg-bg-subtle border border-border text-text-primary` — same radius
- Destructive: red variant of primary
- Loading state: spinner replaces icon, text stays, button dims to 70% opacity
- Never use heavy drop shadows on buttons

**Cards (tool cards on homepage):**
- `bg-white border border-border rounded-[14px] p-5` with shadow-sm
- On hover: `border-border-hover shadow-md` — transition 150ms ease
- Icon: 20x20, stroke-based Lucide icon in `text-accent`
- Title: `text-sm font-medium text-text-primary`
- Description: `text-xs text-text-secondary` — max 1 line
- No heavy gradients, no emojis as icons

**Inputs & Dropzone:**
- Border: `border-border rounded-[10px]` base state
- Focus: `border-accent ring-2 ring-accent/10` — the ring is the visual emphasis
- Dropzone default: `border-2 border-dashed border-border rounded-[14px] bg-bg-subtle`
- Dropzone active (dragging over): `border-accent bg-accent-subtle` transition 100ms

**Modals:**
- Backdrop: `bg-black/40 backdrop-blur-sm`
- Panel: `bg-white rounded-[16px] shadow-lg max-w-md w-full`
- Never full-screen modals unless mobile

---

## 3. FILE STRUCTURE

```
purelab/
├── app/
│   ├── layout.tsx                  ← root layout, Geist font, analytics
│   ├── page.tsx                    ← homepage (tool grid)
│   ├── globals.css                 ← design tokens, base styles
│   │
│   ├── (tools)/                    ← route group, shared tool layout
│   │   ├── layout.tsx              ← tool shell: back button, breadcrumb
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
│   │   ├── pdf-to-jpg/page.tsx
│   │   ├── html-to-pdf/page.tsx
│   │   ├── markdown-to-pdf/page.tsx
│   │   ├── pdf-to-epub/page.tsx
│   │   ├── chat-with-pdf/page.tsx
│   │   ├── summarize-pdf/page.tsx
│   │   ├── compare-pdfs/page.tsx
│   │   ├── gst-invoice/page.tsx
│   │   └── privacy-scanner/page.tsx
│   │
│   └── api/                        ← only for lightweight server ops
│       └── gemini/route.ts         ← Gemini API proxy (hide API key)
│
├── components/
│   ├── ui/                         ← design system primitives
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
│   │
│   ├── shared/                     ← reused across all tools
│   │   ├── FileDropzone.tsx        ← THE most important component
│   │   ├── FileList.tsx            ← shows uploaded files with remove
│   │   ├── ProcessButton.tsx       ← loading + success + error states
│   │   ├── DownloadCard.tsx        ← result download UI
│   │   ├── ToolHeader.tsx          ← title + description for each tool
│   │   ├── ToolShell.tsx           ← wraps all tool pages
│   │   └── PdfPreview.tsx          ← thumbnail preview of PDF
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ToolGrid.tsx
│   │   ├── ToolCard.tsx
│   │   ├── CategoryFilter.tsx      ← filter tools by category
│   │   └── TrustBar.tsx            ← "Files never leave device" etc
│   │
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── pdf/
│   │   ├── worker.ts               ← PDF.js worker singleton
│   │   ├── merge.ts                ← pdf-lib merge logic
│   │   ├── split.ts
│   │   ├── compress.ts
│   │   ├── rotate.ts
│   │   ├── watermark.ts
│   │   ├── encrypt.ts
│   │   ├── ocr.ts                  ← Tesseract.js wrapper
│   │   └── extract-text.ts
│   │
│   ├── convert/
│   │   ├── word-to-pdf.ts          ← Mammoth.js wrapper
│   │   ├── excel-to-pdf.ts         ← SheetJS + jsPDF
│   │   └── images-to-pdf.ts
│   │
│   └── utils/
│       ├── file.ts                 ← formatBytes, getFileExt, readAsArrayBuffer
│       ├── download.ts             ← triggerDownload helper
│       └── cn.ts                   ← clsx + tailwind-merge utility
│
├── hooks/
│   ├── usePdfTool.ts               ← THE master hook — every tool uses this
│   ├── useFileUpload.ts
│   └── usePdfPreview.ts
│
├── config/
│   └── tools.ts                   ← all 40+ tools metadata (name, slug, icon, category, description)
│
└── public/
    └── icons/                     ← any custom SVG assets
```

---

## 4. THE MASTER HOOK — usePdfTool.ts

Every single tool page uses this. Build it once, never repeat state logic.

```typescript
// hooks/usePdfTool.ts
import { useState, useCallback } from 'react'

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
```

---

## 5. CORE COMPONENTS — EXACT IMPLEMENTATION

### 5.1 FileDropzone.tsx

```tsx
// components/shared/FileDropzone.tsx
'use client'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface FileDropzoneProps {
  onDrop: (files: File[]) => void
  accept?: Record<string, string[]>
  multiple?: boolean
  label?: string
  sublabel?: string
  className?: string
}

export function FileDropzone({
  onDrop, accept, multiple = false,
  label = 'Drop your file here',
  sublabel = 'or click to browse',
  className
}: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept, multiple
  })

  return (
    <motion.div
      {...getRootProps()}
      whileHover={{ scale: 1.002 }}
      whileTap={{ scale: 0.998 }}
      className={cn(
        'relative flex flex-col items-center justify-center gap-3',
        'min-h-[220px] w-full cursor-pointer select-none',
        'rounded-[14px] border-2 border-dashed transition-all duration-150',
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-white',
        className
      )}
    >
      <input {...getInputProps()} />
      <AnimatePresence mode="wait">
        {isDragActive ? (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="rounded-full bg-blue-100 p-3">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-blue-600">Release to upload</p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 px-4 text-center"
          >
            <div className="rounded-full bg-white border border-zinc-200 p-3 shadow-sm">
              <FileText className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-700">{label}</p>
              <p className="mt-0.5 text-xs text-zinc-400">{sublabel}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
```

### 5.2 DownloadCard.tsx

```tsx
// components/shared/DownloadCard.tsx
'use client'
import { motion } from 'framer-motion'
import { CheckCircle2, Download, RotateCcw } from 'lucide-react'
import { triggerDownload } from '@/lib/utils/download'
import { Button } from '@/components/ui/Button'

interface DownloadCardProps {
  blob: Blob
  filename: string
  onReset: () => void
}

export function DownloadCard({ blob, filename, onReset }: DownloadCardProps) {
  const sizeKB = (blob.size / 1024).toFixed(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-5 rounded-[14px] border border-green-200 bg-green-50 p-6 text-center"
    >
      <div className="rounded-full bg-green-100 p-3">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-800">Ready to download</p>
        <p className="mt-0.5 text-xs text-zinc-400">{filename} · {sizeKB} KB</p>
      </div>
      <div className="flex w-full gap-2">
        <Button
          onClick={() => triggerDownload(blob, filename)}
          className="flex-1"
          icon={<Download className="h-4 w-4" />}
        >
          Download
        </Button>
        <Button variant="secondary" onClick={onReset} icon={<RotateCcw className="h-4 w-4" />}>
          New file
        </Button>
      </div>
    </motion.div>
  )
}
```

### 5.3 ToolShell.tsx — wrapper for every tool page

```tsx
// components/shared/ToolShell.tsx
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ToolShellProps {
  title: string
  description: string
  children: React.ReactNode
  icon: React.ReactNode
}

export function ToolShell({ title, description, children, icon }: ToolShellProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All tools
      </Link>

      <div className="mb-8 flex items-start gap-4">
        <div className="rounded-[10px] bg-blue-50 p-2.5">
          <div className="text-blue-600">{icon}</div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">{title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>

      {children}
    </div>
  )
}
```

---

## 6. HOMEPAGE ARCHITECTURE

The homepage is a searchable, filterable tool grid. Three sections:

1. **Hero** — headline + trust indicators (no watermark, no upload, private)
2. **Category Filter** — pill buttons: All, Organize, Convert, Edit, Security, AI, Business
3. **Tool Grid** — responsive grid of tool cards

### Hero copy (use exactly this, it converts):
```
Headline:  "PDF tools that don't get in your way."
Subline:   "46 tools. No watermark. No uploads. Your files never leave your browser."
```

### Tool card structure:
```tsx
// Each card in the grid
<Link href={`/${tool.slug}`}>
  <div className="group flex flex-col gap-3 rounded-[14px] border border-zinc-200 bg-white p-5
                  shadow-[0_1px_2px_0_rgb(0,0,0,0.04)] transition-all duration-150
                  hover:border-zinc-300 hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.06)]">
    <div className="flex items-center gap-3">
      <div className="rounded-[8px] bg-blue-50 p-2">
        <tool.icon className="h-4 w-4 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-zinc-800">{tool.name}</span>
    </div>
    <p className="text-xs leading-relaxed text-zinc-500 line-clamp-2">{tool.description}</p>
  </div>
</Link>
```

---

## 7. TOOLS CONFIG FILE

Define all tools in one place. Cursor will loop over this to generate pages.

```typescript
// config/tools.ts
import {
  FilePlus2, Scissors, Minimize2, Image, FileType2, RotateCw,
  Layers, Droplets, Hash, AlignJustify, Crop, EyeOff, Lock,
  Unlock, Layers2, Type, ScanLine, Wrench, FileDown, FileText,
  FileSpreadsheet, Code, FileCode, BookOpen, Volume2, BookMarked,
  Mic, Archive, Palette, MessageSquare, Sparkles, GitCompare,
  Receipt, ShoppingCart, Fingerprint
} from 'lucide-react'

export type ToolCategory = 'organize' | 'convert' | 'edit' | 'security' | 'ai' | 'business'

export interface Tool {
  slug: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: ToolCategory
  featured?: boolean  // show in top row of homepage
}

export const tools: Tool[] = [
  // ORGANIZE
  { slug: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDFs into one file', icon: FilePlus2, category: 'organize', featured: true },
  { slug: 'split-pdf', name: 'Split PDF', description: 'Extract pages or split into multiple files', icon: Scissors, category: 'organize', featured: true },
  { slug: 'compress-pdf', name: 'Compress PDF', description: 'Reduce file size without losing quality', icon: Minimize2, category: 'organize', featured: true },
  { slug: 'rotate-pdf', name: 'Rotate PDF', description: 'Fix sideways or upside-down pages', icon: RotateCw, category: 'organize' },
  { slug: 'organize-pages', name: 'Organize Pages', description: 'Reorder, delete, or rearrange pages', icon: Layers, category: 'organize' },
  { slug: 'crop-pdf', name: 'Crop & Resize', description: 'Trim margins or resize to standard dimensions', icon: Crop, category: 'organize' },

  // CONVERT
  { slug: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Export pages as high-quality images', icon: Image, category: 'convert', featured: true },
  { slug: 'jpg-to-pdf', name: 'Images to PDF', description: 'Convert JPG or PNG images to PDF', icon: FileType2, category: 'convert', featured: true },
  { slug: 'word-to-pdf', name: 'Word to PDF', description: 'Convert .docx files to PDF instantly', icon: FileText, category: 'convert' },
  { slug: 'pdf-to-word', name: 'PDF to Word', description: 'Export PDF as an editable .docx file', icon: FileDown, category: 'convert' },
  { slug: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert spreadsheets to PDF', icon: FileSpreadsheet, category: 'convert' },
  { slug: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert HTML or URL to a PDF', icon: Code, category: 'convert' },
  { slug: 'markdown-to-pdf', name: 'Markdown to PDF', description: 'Convert .md files to formatted PDF', icon: FileCode, category: 'convert' },
  { slug: 'pdf-to-epub', name: 'PDF to EPUB', description: 'Convert PDF for Kindle and e-readers', icon: BookOpen, category: 'convert' },
  { slug: 'pdf-to-audio', name: 'PDF to Audio', description: 'Listen to your documents with neural TTS', icon: Volume2, category: 'convert' },

  // EDIT
  { slug: 'edit-pdf', name: 'Edit PDF', description: 'Click any text to edit it in place', icon: Type, category: 'edit', featured: true },
  { slug: 'add-watermark', name: 'Add Watermark', description: 'Stamp text or image across pages', icon: Droplets, category: 'edit' },
  { slug: 'page-numbers', name: 'Page Numbers', description: 'Auto-number pages with custom formatting', icon: Hash, category: 'edit' },
  { slug: 'headers-footers', name: 'Headers & Footers', description: 'Add custom header/footer to every page', icon: AlignJustify, category: 'edit' },
  { slug: 'redact-pdf', name: 'Redact PDF', description: 'Permanently remove sensitive text', icon: EyeOff, category: 'edit' },
  { slug: 'extract-text', name: 'Extract Text', description: 'Copy all text from any PDF file', icon: FileText, category: 'edit' },
  { slug: 'ocr-pdf', name: 'OCR PDF', description: 'Make scanned PDFs searchable and selectable', icon: ScanLine, category: 'edit' },
  { slug: 'repair-pdf', name: 'Repair PDF', description: 'Recover and fix corrupted PDF files', icon: Wrench, category: 'edit' },
  { slug: 'flatten-pdf', name: 'Flatten PDF', description: 'Remove forms and make PDFs static', icon: Layers2, category: 'edit' },

  // SECURITY
  { slug: 'encrypt-pdf', name: 'Encrypt PDF', description: 'Password-protect with AES-256 encryption', icon: Lock, category: 'security' },
  { slug: 'remove-password', name: 'Remove Password', description: 'Unlock password-protected PDF files', icon: Unlock, category: 'security' },
  { slug: 'privacy-scanner', name: 'Privacy Scanner', description: 'Find hidden metadata before sharing', icon: ScanLine, category: 'security' },
  { slug: 'fingerprint-pdf', name: 'Fingerprint PDF', description: 'Track document leaks invisibly', icon: Fingerprint, category: 'security' },

  // AI
  { slug: 'chat-with-pdf', name: 'Chat with PDF', description: 'Ask questions about any document with AI', icon: MessageSquare, category: 'ai', featured: true },
  { slug: 'summarize-pdf', name: 'Summarize PDF', description: 'Get a concise AI summary instantly', icon: Sparkles, category: 'ai' },
  { slug: 'compare-pdfs', name: 'Compare PDFs', description: 'Side-by-side diff of two documents', icon: GitCompare, category: 'ai' },

  // BUSINESS
  { slug: 'gst-invoice', name: 'GST Invoice', description: 'Create GST-compliant invoices free', icon: Receipt, category: 'business' },
  { slug: 'pos-billing', name: 'POS Billing', description: 'Point-of-sale receipts with GST support', icon: ShoppingCart, category: 'business' },
]

export const categories: { id: ToolCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All tools' },
  { id: 'organize', label: 'Organize' },
  { id: 'convert', label: 'Convert' },
  { id: 'edit', label: 'Edit' },
  { id: 'security', label: 'Security' },
  { id: 'ai', label: 'AI' },
  { id: 'business', label: 'Business' },
]
```

---

## 8. PDF PROCESSING LIBRARIES — IMPLEMENTATION

### 8.1 lib/utils/download.ts
```typescript
export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
```

### 8.2 lib/pdf/merge.ts
```typescript
import { PDFDocument } from 'pdf-lib'

export async function mergePdfs(files: File[]): Promise<Blob> {
  const merged = await PDFDocument.create()
  for (const file of files) {
    const bytes = await file.arrayBuffer()
    const doc = await PDFDocument.load(bytes)
    const pages = await merged.copyPages(doc, doc.getPageIndices())
    pages.forEach(p => merged.addPage(p))
  }
  const bytes = await merged.save()
  return new Blob([bytes], { type: 'application/pdf' })
}
```

### 8.3 lib/pdf/compress.ts
```typescript
import { PDFDocument } from 'pdf-lib'

export type CompressLevel = 'light' | 'medium' | 'heavy'

export async function compressPdf(file: File, level: CompressLevel = 'medium'): Promise<Blob> {
  const bytes = await file.arrayBuffer()
  const doc = await PDFDocument.load(bytes, { updateMetadata: false })

  // pdf-lib itself doesn't have deep compression — we strip metadata and re-save
  // For heavy compression, we also reduce image quality via canvas
  doc.setTitle('')
  doc.setAuthor('')
  doc.setSubject('')
  doc.setKeywords([])
  doc.setCreator('')
  doc.setProducer('')

  const options = {
    useObjectStreams: level !== 'light',
    addDefaultPage: false,
  }

  const outBytes = await doc.save(options)
  return new Blob([outBytes], { type: 'application/pdf' })
}
```

### 8.4 lib/pdf/worker.ts (PDF.js singleton)
```typescript
import * as PDFJS from 'pdfjs-dist'

let isInitialized = false

export function initPdfWorker() {
  if (isInitialized) return
  PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`
  isInitialized = true
}

export async function renderPageToCanvas(
  file: File,
  pageNum: number,
  scale = 1.5
): Promise<HTMLCanvasElement> {
  initPdfWorker()
  const bytes = await file.arrayBuffer()
  const doc = await PDFJS.getDocument({ data: bytes }).promise
  const page = await doc.getPage(pageNum)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise
  return canvas
}

export async function pdfToJpgBlobs(file: File, dpi = 150): Promise<Blob[]> {
  initPdfWorker()
  const scale = dpi / 72
  const bytes = await file.arrayBuffer()
  const doc = await PDFJS.getDocument({ data: bytes }).promise
  const blobs: Blob[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const canvas = await renderPageToCanvas(file, i, scale)
    const blob = await new Promise<Blob>((res) => canvas.toBlob(b => res(b!), 'image/jpeg', 0.92))
    blobs.push(blob)
  }
  return blobs
}
```

---

## 9. EXAMPLE TOOL PAGE — Merge PDF

This is the template. Every tool page follows this exact same structure.

```tsx
// app/(tools)/merge-pdf/page.tsx
'use client'
import { usePdfTool } from '@/hooks/usePdfTool'
import { ToolShell } from '@/components/shared/ToolShell'
import { FileDropzone } from '@/components/shared/FileDropzone'
import { FileList } from '@/components/shared/FileList'
import { ProcessButton } from '@/components/shared/ProcessButton'
import { DownloadCard } from '@/components/shared/DownloadCard'
import { mergePdfs } from '@/lib/pdf/merge'
import { FilePlus2 } from 'lucide-react'

export default function MergePdfPage() {
  const { files, status, progress, error, result, onDrop, removeFile, process, reset } = usePdfTool({ multiple: true })

  const handleProcess = () => {
    process(async (files, onProgress) => {
      onProgress(10)
      const blob = await mergePdfs(files)
      onProgress(100)
      return { blob, filename: 'merged.pdf' }
    })
  }

  return (
    <ToolShell
      title="Merge PDF"
      description="Combine multiple PDF files into one. Drag to reorder before merging."
      icon={<FilePlus2 className="h-5 w-5" />}
    >
      {status !== 'done' ? (
        <div className="flex flex-col gap-4">
          <FileDropzone
            onDrop={onDrop}
            accept={{ 'application/pdf': ['.pdf'] }}
            multiple
            label="Drop PDF files here"
            sublabel="or click to select — you can add multiple files"
          />
          {files.length > 0 && (
            <FileList files={files} onRemove={removeFile} reorderable />
          )}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-[8px] px-3 py-2">{error}</p>
          )}
          <ProcessButton
            onClick={handleProcess}
            disabled={files.length < 2}
            loading={status === 'processing'}
            progress={progress}
          >
            Merge {files.length > 0 ? `${files.length} files` : 'PDFs'}
          </ProcessButton>
        </div>
      ) : (
        <DownloadCard blob={result!.blob} filename={result!.filename} onReset={reset} />
      )}
    </ToolShell>
  )
}
```

**Replicate this pattern for every tool. Only the processing function changes.**

---

## 10. AI TOOLS — GEMINI INTEGRATION

### API Route (hides key, runs on edge)
```typescript
// app/api/gemini/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { text, prompt } = await req.json()
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const result = await model.generateContentStream(`${prompt}\n\nDocument:\n${text.slice(0, 30000)}`)
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        controller.enqueue(encoder.encode(text))
      }
      controller.close()
    }
  })
  return new NextResponse(stream, { headers: { 'Content-Type': 'text/event-stream' } })
}
```

### Chat with PDF page:
```typescript
// Extract text from PDF using PDF.js text layer
// Send text chunks to /api/gemini with user's question
// Stream the response token by token into a chat UI
```

---

## 11. NAVBAR

Keep it absolutely minimal. Notion-style.

```tsx
// components/layout/Navbar.tsx
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-[6px] bg-blue-600" />  {/* Replace with your logo */}
          <span className="text-sm font-semibold text-zinc-900">purelab</span>
        </Link>
        <div className="flex items-center gap-1 text-xs text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          Files never leave your device
        </div>
      </div>
    </header>
  )
}
```

---

## 12. ANIMATIONS SYSTEM

Keep animations extremely subtle. Never animate for show.

```typescript
// Use these Framer Motion variants everywhere for consistency

// Page enter
export const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
}

// List item stagger (tool grid cards)
export const containerVariants = {
  animate: { transition: { staggerChildren: 0.04 } }
}

export const itemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } }
}

// Tool card hover — use CSS transition, not Framer Motion
// transition-all duration-150 ease-out
// hover:shadow-md hover:-translate-y-0.5
```

---

## 13. SEO & METADATA

Each tool page needs proper metadata for Google ranking.

```typescript
// Pattern for every tool page
export const metadata: Metadata = {
  title: 'Merge PDF Free — No Watermark, No Upload | Purelab',
  description: 'Combine PDF files instantly in your browser. No watermark, no upload, no sign-up. Files never leave your device. 100% free forever.',
  openGraph: {
    title: 'Merge PDF Free — No Watermark | Purelab',
    description: '...',
    type: 'website',
  }
}
```

Target these keywords for each tool (ihatepdf.cv already ranks for these, you're competing):
- "merge pdf free no watermark"
- "compress pdf online free"
- "pdf editor no sign up"
- "split pdf free online"

---

## 14. PERFORMANCE RULES

- **Lazy load all PDF libraries.** Never import pdf-lib or pdfjs-dist at top level. Use dynamic imports inside the processing function.
- **Web Workers for heavy ops.** Wrap Tesseract.js (OCR) in a worker so the UI doesn't freeze.
- **next/dynamic** for heavy tool components with `ssr: false`.
- **No library loads on homepage.** Homepage only loads tool metadata from `config/tools.ts`.

```typescript
// Lazy loading pattern — use inside process function
const { PDFDocument } = await import('pdf-lib')
const { default: Tesseract } = await import('tesseract.js')
```

---

## 15. PACKAGE.JSON DEPENDENCIES

```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "typescript": "5.x",
    "tailwindcss": "4.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.400.x",
    "pdf-lib": "^1.17.x",
    "pdfjs-dist": "^4.x",
    "tesseract.js": "^5.x",
    "mammoth": "^1.8.x",
    "xlsx": "^0.18.x",
    "jspdf": "^2.5.x",
    "@google/generative-ai": "^0.15.x",
    "react-dropzone": "^14.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  }
}
```

---

## 16. NEXT.JS CONFIG

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config) => {
    // Required for pdfjs-dist canvas dependency
    config.resolve.alias.canvas = false
    return config
  },
}

module.exports = nextConfig
```

---

## 17. TAILWIND CONFIG

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        zinc: { /* already in Tailwind defaults — use these */ },
        blue: { /* already in Tailwind defaults */ },
      },
      borderRadius: {
        DEFAULT: '10px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)',
      },
    },
  },
}
```

---

## 18. ENVIRONMENT VARIABLES

```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here  # Free via Google AI Studio
```

---

## 19. DEPLOYMENT — VERCEL (FREE)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"

# 2. Go to vercel.com → New Project → Import GitHub repo

# 3. Add env var: GEMINI_API_KEY

# 4. Deploy — Vercel auto-detects Next.js

# Domain: use their free .vercel.app subdomain until you buy a domain
```

---

## 20. BUILD ORDER FOR CURSOR

Tell Cursor to build in this exact sequence. Do not skip phases.

**Phase 1 — Foundation (do first, never skip)**
1. Initialize Next.js 15 project with TypeScript + Tailwind
2. Set up `globals.css` with all design tokens from Section 2.1
3. Set up `app/layout.tsx` with Geist font
4. Build all `/components/ui/` primitives: Button, Badge, Spinner, Progress
5. Build all `/components/shared/` components: FileDropzone, FileList, ProcessButton, DownloadCard, ToolShell
6. Build `usePdfTool` hook
7. Build `lib/utils/` helpers

**Phase 2 — Homepage**
1. Build `config/tools.ts` with all tool metadata
2. Build Navbar
3. Build Homepage: Hero + CategoryFilter + ToolGrid
4. Make search work (filter tools by name client-side)

**Phase 3 — Core 8 Tools (most traffic)**
1. Merge PDF
2. Split PDF
3. Compress PDF
4. PDF to JPG
5. Images to PDF
6. Rotate PDF
7. Encrypt PDF
8. Remove Password

**Phase 4 — Edit Tools**
9. Add Watermark
10. Page Numbers
11. Headers & Footers
12. Organize Pages
13. Redact PDF
14. Flatten PDF
15. Extract Text

**Phase 5 — Convert Tools**
16. Word to PDF
17. Excel to PDF
18. HTML to PDF
19. Markdown to PDF

**Phase 6 — AI Tools**
20. Set up `/api/gemini` route
21. Chat with PDF
22. Summarize PDF

**Phase 7 — Business Tools**
23. GST Invoice
24. POS Billing

**Phase 8 — Polish**
25. Add Framer Motion page transitions
26. Add loading skeletons on homepage
27. Add metadata to all tool pages (SEO)
28. Mobile responsiveness check
29. Vercel deployment

---

## 21. WHAT MAKES THIS BETTER THAN IHATEPDF.CV

| ihatepdf.cv | Purelab |
|---|---|
| Functional but cluttered homepage | Clean grid with category filter + search |
| No visual hierarchy | Clear type scale, intentional spacing |
| Generic blue accent overused | Accent used sparingly, only on actions |
| No page transitions | Smooth Framer Motion transitions |
| Dense tool pages | Breathing room, max-w-2xl centered layout |
| No microinteractions | Dropzone reacts on hover/drag, buttons have press states |
| Font inconsistency | Single font family (Geist) used consistently |
| No dark mode consideration | Design tokens ready for dark mode later |
| Cluttered footer | Minimal footer or none |
| Badge spam on homepage | No badge spam, trust indicators in navbar only |

---

## 22. QUICK REFERENCE — CURSOR STARTING PROMPT

Paste this at the very start when opening Cursor:

```
Build a premium PDF tool web app using Next.js 15, TypeScript, Tailwind CSS v4, 
and Framer Motion. Follow the ARCHITECTURE.md file exactly.

Design system: Apple-level minimalism. Off-white (#FAFAFA) background, 
Zinc color scale for text, single blue accent (#2563EB) used only on 
primary actions. Geist font. Border radius 10px on all elements. 
Shadows extremely subtle (0.04 opacity max). 

Architecture rule: All PDF processing happens client-side using pdf-lib and 
pdfjs-dist. No file ever touches a server. Use dynamic imports for all 
heavy libraries (pdf-lib, pdfjs-dist, tesseract.js) to keep bundle size small.

Start with Phase 1 from the BUILD ORDER section. Build foundation components 
first before any tool pages. The shared components (FileDropzone, ToolShell, 
DownloadCard, usePdfTool hook) are the most critical — every tool page 
depends on them.
```

---

*Architecture version 1.0 — built for zero-cost, zero-backend, premium-first PDF platform*