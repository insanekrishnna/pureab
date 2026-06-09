"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Heart, Shield } from "lucide-react";

const badges = [
  { label: "No watermark", icon: CheckCircle2 },
  { label: "Files stay local", icon: Shield },
  { label: "Always free", icon: Heart },
];

export function Hero() {
  return (
    <section className="px-4 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="mx-auto max-w-lg text-4xl font-bold leading-none text-text-primary"
      >
        PDF tools that don&apos;t get in your way.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
        className="mx-auto mt-3 max-w-md text-base leading-relaxed text-text-secondary"
      >
        46 tools. No watermark. No upload. No sign-up. Your files never leave
        your browser.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        {badges.map((badge) => {
          const Icon = badge.icon;

          return (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-subtle px-3 py-1 text-xs font-medium text-text-secondary"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {badge.label}
            </span>
          );
        })}
      </motion.div>
    </section>
  );
}
