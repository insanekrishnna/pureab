# Paperlab

Premium, local-first PDF tools with no watermark, no upload, and no sign-up.

Built with Next.js 15, pdf-lib, pdfjs-dist. All processing is 100% client-side.

## Setup

```bash
npm install
```

Create `.env.local` and add:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the app:

```bash
npm run dev
```

## Deploy

Push to GitHub, import the project into Vercel, and add the `GEMINI_API_KEY`
environment variable.
