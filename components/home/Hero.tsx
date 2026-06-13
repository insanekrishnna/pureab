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
    <section className="mx-auto max-w-5xl border-x border-border">
      <div className="relative isolate min-h-[500px] overflow-hidden border-b border-border px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="linework pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute right-4 top-24 hidden select-none text-[18rem] leading-none text-text-primary/[0.025] lg:block">
          PDF
        </div>
        <div className="pointer-events-none absolute bottom-14 right-16 hidden h-64 w-44 rotate-12 rounded-[32px] border border-border bg-bg-subtle/40 shadow-lg lg:block" />
        <div className="pointer-events-none absolute bottom-0 right-52 hidden h-44 w-32 -rotate-6 rounded-[28px] border border-border bg-bg-subtle/50 shadow-md lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative z-10 max-w-2xl"
        >
          <span className="section-label px-2.5 py-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-[oklch(0.795_0.184_86.047)] text-[oklch(0.795_0.184_86.047)]" />
            46
          </span>
          <h1 className="hero-display mt-8 max-w-3xl text-6xl leading-[0.92] text-[var(--hero-muted)] sm:text-7xl">
            <span className="text-text-primary">PDF tools</span> that
            don&apos;t get in <span className="text-text-primary">your way</span>.
          </h1>
          <p className="mono-copy mt-6 max-w-xl text-sm leading-6 text-text-secondary">
            No watermark. No upload. No sign-up. Your files never leave your
            browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/merge-pdf">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover">
                Get Started
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/#all-tools">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-subtle px-4 py-2 text-sm font-medium text-text-primary shadow-sm transition-colors hover:bg-bg-elevated">
                Open Tools
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <span
                  key={badge.label}
                  className="section-label px-2.5 py-1 text-xs"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {badge.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="grid border-b border-border md:grid-cols-3">
        {featureCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="border-border p-5 md:border-r md:last:border-r-0"
            >
              <h2 className="mono-copy flex items-center gap-2 text-sm font-medium text-text-primary">
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                {card.label}
              </h2>
              <p className="mono-copy mt-4 text-xs leading-5 text-text-secondary">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
