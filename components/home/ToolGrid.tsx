"use client";

import { motion } from "framer-motion";

import { ToolCard } from "@/components/home/ToolCard";
import type { Tool } from "@/config/tools";

interface ToolGridProps {
  tools: Tool[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="mono-copy border border-border bg-bg-elevated py-12 text-center text-sm text-text-secondary">
        No tools found
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {tools.map((tool) => (
        <motion.div
          key={tool.slug}
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ToolCard tool={tool} />
        </motion.div>
      ))}
    </motion.div>
  );
}
