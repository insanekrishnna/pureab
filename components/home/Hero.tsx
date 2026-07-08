"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Heart,
  Layers2,
  Shield,
  Star,
} from "lucide-react";
import Link from "next/link";

const featureCards = [
  {
    label: "Beautiful",
    description:
      "Clean PDF workflows with focused controls, clear outputs, and no visual clutter.",
    icon: FileText,
  },
  {
    label: "Free & Unlimited",
    description:
      "Merge, split, compress, convert, and export as often as you need.",
    icon: Heart,
  },
  {
    label: "Safe & Local",
    description:
      "Files stay in your browser. No upload, no sign-up, no watermark.",
    icon: Shield,
  },
];

const trustBadges = [
  { label: "No watermark", icon: CheckCircle2 },
  { label: "Files stay local", icon: Shield },
  { label: "46 tools", icon: Layers2 },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl border-x border-dashed border-border">
      <div className="relative flex min-h-[calc(100svh-64px-150px)] flex-row items-center overflow-hidden border-b border-dashed border-border py-16 lg:py-0">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="linework pointer-events-none absolute inset-0 opacity-70" />
        </div>

        <div className="z-10 flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2 px-6">
            <span className="section-label px-2.5 py-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-[oklch(0.795_0.184_86.047)] text-[oklch(0.795_0.184_86.047)]" />
              46
            </span>
            <div className="flex flex-row items-center">
              <div className="from-border h-px w-40 bg-gradient-to-r to-transparent" />
            </div>
          </div>

          <div className="hero-display flex flex-col gap-2 px-6 text-6xl sm:text-7xl">
            <h1 className="text-text-secondary">
              Everything your PDFs need, <br />
              <span className="text-text-primary">in one click.</span>
            </h1>
          </div>

          <div className="mt-4 flex flex-row gap-4 px-6">
            <Link href="/merge-pdf">
              <button
                data-slot="button"
                className="cursor-pointer select-none inline-flex items-center duration-200 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm h-8 px-4 py-1 has-[>svg]:px-2.5"
              >
                <span>Get Started</span>
                <svg
                  height="18"
                  width="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-rotate-45"
                >
                  <g fill="currentColor">
                    <path
                      d="M9 1C4.589 1 1 4.589 1 9C1 13.411 4.589 17 9 17C13.411 17 17 13.411 17 9C17 4.589 13.411 1 9 1Z"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <path
                      d="M8.47 11.72C8.177 12.013 8.177 12.488 8.47 12.781C8.616 12.927 8.808 13.001 9 13.001C9.192 13.001 9.384 12.928 9.53 12.781L12.78 9.53103C13.073 9.23803 13.073 8.76299 12.78 8.46999L9.53 5.21999C9.237 4.92699 8.762 4.92699 8.469 5.21999C8.176 5.51299 8.176 5.98803 8.469 6.28103L10.439 8.251H1.75C1.336 8.251 1 8.587 1 9.001C1 9.415 1.336 9.751 1.75 9.751H10.439L8.469 11.721L8.47 11.72Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </button>
            </Link>
            <div className="relative">
              <div>
                <Link href="/#all-tools">
                  <button
                    data-slot="button"
                    className="cursor-pointer select-none inline-flex items-center duration-200 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border border-border bg-bg-subtle text-text-primary hover:bg-bg-elevated shadow-sm h-8 px-4 py-1 has-[>svg]:px-2.5"
                  >
                    <span>Open Tools</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </Link>
              </div>
              <span className="mono-copy text-text-muted/40 pointer-events-none absolute -top-10 left-32 size-full -rotate-[34deg] text-[10px] leading-tight">
                Give Star <br /> please :3 <br /> for cookie
              </span>
              <svg
                className="text-text-muted/40 pointer-events-none absolute top-2 left-22 size-full rotate-[190deg]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 323.057 323.057"
                xmlSpace="preserve"
                fill="currentColor"
              >
                <path d="M281.442 256.312c-47.124 59.364-139.536 44.676-160.956-29.376-1.224-3.672-1.836-7.956-2.448-11.628 49.572-11.016 97.92-47.124 102.204-90.576 3.672-39.168-36.108-50.796-62.424-28.764-31.212 26.316-53.244 64.872-55.08 105.875-31.824 4.284-63.036-4.284-80.172-35.496-28.764-52.631 9.792-123.624 61.2-144.432 5.508-1.836 3.06-10.404-2.448-8.568C10.326 33.544-26.394 132.688 21.954 191.439c18.972 22.645 49.572 29.988 81.396 26.316 4.284 41.616 36.72 74.664 75.275 87.516 44.676 14.688 85.68-6.731 111.996-41.616 4.285-5.508-4.896-12.239-9.179-7.343M144.354 132.688c9.792-13.464 22.644-28.764 39.168-34.272 15.911-5.508 21.42 16.524 22.031 26.316.612 12.24-7.956 23.256-15.912 31.824-16.523 18.971-44.063 35.496-72.215 42.839 1.836-23.868 13.464-47.123 26.928-66.707" />
                <path d="M315.713 233.668c-17.136 0-34.884 1.224-51.408 5.508-6.731 1.836-3.672 11.016 3.061 9.792 13.464-2.448 27.54-1.836 41.004-1.224-.612 7.955-1.224 16.523-2.448 24.479-1.224 6.12-5.508 15.3-1.836 21.42 1.836 3.061 4.896 3.061 7.956 1.836 7.344-3.06 7.344-15.912 8.568-22.644 1.836-11.017 2.447-21.42 2.447-32.437 0-3.67-3.672-6.73-7.344-6.73" />
              </svg>
            </div>
          </div>

          <p className="mono-copy mt-2 max-w-xl px-6 text-sm leading-6 text-text-secondary">
            No watermark. No upload. No sign-up. Your files never leave your browser.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 px-6">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <span key={badge.label} className="section-label px-2.5 py-1 text-xs">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {badge.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-flow-row sm:h-[150px] sm:grid-cols-3">
        {featureCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`flex h-40 flex-col gap-3 border-b border-dashed border-border p-4 sm:h-auto ${
                i !== 0 ? "sm:border-l" : ""
              }`}
            >
              <h2 className="mono-copy flex items-center gap-2 text-sm font-medium tracking-tight text-text-primary">
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                {card.label}
              </h2>
              <p className="mono-copy text-xs leading-5 tracking-tight text-text-secondary">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
