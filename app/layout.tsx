import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paperlab - Free PDF Tools, No Watermark",
  description:
    "46 free PDF tools. No watermark. No upload. No sign-up. Files never leave your device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScrollProvider>
          {children}
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
