"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Heart,
  Layers2,
  Shield,
  Star,
  PenLine,
} from "lucide-react";
import Link from "next/link";

const featureCards = [
  {
    label: "Clean",
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
  { label: "Sign pdfs", icon: PenLine },
  { label: "46 tools", icon: Layers2 },
];

const DocumentMockup = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] drop-shadow-md ${className}`}>
      {/* Document Base */}
      <div 
        className="absolute inset-0 bg-white [[data-theme=dark]_&]:bg-neutral-200"
        style={{ 
          clipPath: 'polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)',
          borderRadius: '12px'
        }}
      />
      
      {/* Folded Corner */}
      <div 
        className="absolute top-0 right-0 w-[60px] h-[60px] bg-[#6366f1] rounded-bl-2xl shadow-sm"
        style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-3 mt-1">
        <div className="w-2/5 h-2.5 sm:h-3 bg-[#818cf8] rounded-none" />
        <div className="w-3/4 h-2 sm:h-2.5 bg-neutral-200 [[data-theme=dark]_&]:bg-neutral-300 rounded-none" />
        
        <div className="mt-3 flex flex-col gap-2.5">
          <div className="w-full h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
          <div className="w-full h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
          <div className="w-full h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
          <div className="w-11/12 h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
          <div className="w-full h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
          <div className="w-4/5 h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
          <div className="w-full h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
          <div className="w-5/6 h-2 sm:h-2.5 bg-neutral-100 [[data-theme=dark]_&]:bg-neutral-300/60 rounded-none" />
        </div>

        {/* Squiggly line */}
        <div className="mt-4 sm:mt-5 self-end mr-4">
          <svg width="40" height="14" viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[50px] sm:h-[16px]">
            <path d="M2 10C8 10 12 2 18 2C24 2 28 14 34 14C40 14 44 6 48 6" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      {/* Light border overlay on the square edges */}
      <div 
        className="absolute inset-0 border border-neutral-200/50 pointer-events-none"
        style={{ 
          clipPath: 'polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)',
          borderRadius: '12px'
        }}
      />
    </div>
  )
}

const HeroDocsMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative w-full max-w-[500px] h-[350px] sm:h-[450px] flex items-center justify-center scale-[0.58] translate-y-[15%] -translate-x-[15%]"
    >
      {/* Left Document */}
      <motion.div
        className="absolute w-full h-full flex items-center justify-center z-0 -translate-x-[35%] sm:-translate-x-[45%] translate-y-[15%] -rotate-[15deg] scale-90 opacity-95"
      >
        <DocumentMockup />
      </motion.div>
      
      {/* Right Document */}
      <motion.div
        className="absolute w-full h-full flex items-center justify-center z-0 translate-x-[35%] sm:translate-x-[45%] translate-y-[10%] rotate-[12deg] scale-90 opacity-95"
      >
        <DocumentMockup />
      </motion.div>
      
      {/* Center Document */}
      <motion.div
        className="absolute w-full h-full flex items-center justify-center z-10 drop-shadow-lg scale-[1.05]"
      >
        <DocumentMockup />
      </motion.div>
    </motion.div>
  );
};


export function Hero() {
  const [stars, setStars] = useState<number | string>(2);

  useEffect(() => {
    fetch("https://api.github.com/repos/insanekrishnna/pureab")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Failed to fetch GitHub stars:", err));
  }, []);

  return (
    <section className="mx-auto max-w-5xl border-x border-dashed border-border">
      <div className="relative flex min-h-fit md:min-h-[calc(100svh-64px-150px)] flex-col md:flex-row items-center overflow-hidden border-b border-dashed border-border py-12 md:py-16 lg:py-0">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="linework pointer-events-none absolute inset-0 opacity-70" />
        </div>

        {/* Left Side Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            }
          }}
          className="z-10 flex w-full flex-col gap-4 md:w-[65%] lg:w-[70%]"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex flex-row items-center gap-2 px-6"
          >
            <span className="section-label px-2.5 py-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-[oklch(0.795_0.184_86.047)] text-[oklch(0.795_0.184_86.047)]" />
              {stars}
            </span>
            <div className="flex flex-row items-center">
              <div className="from-border h-px w-40 bg-gradient-to-r to-transparent" />
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="hero-display flex flex-col gap-2 px-6 text-5xl sm:text-7xl"
          >
            <h1 className="text-text-secondary">
              <span className="text-balance sm:whitespace-nowrap">Everything your PDFs need,</span> <br />
              <span className="text-text-primary whitespace-nowrap">in one click.</span>
            </h1>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="mt-4 flex flex-row items-center gap-4 px-6"
          >
            <Link href="/merge-pdf">
              <button
                data-slot="button"
                className="cursor-pointer select-none inline-flex items-center duration-200 justify-center gap-1.5 whitespace-nowrap rounded-none text-[10px] font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0 outline-none bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm h-7 px-3 py-1 has-[>svg]:px-2"
              >
                <span>Get Started</span>
                <svg
                  height="14"
                  width="14"
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
                <Link href="https://github.com/insanekrishnna/pureab" target="_blank" rel="noopener noreferrer">
                  <button
                    data-slot="button"
                    className="cursor-pointer select-none inline-flex items-center duration-200 justify-center gap-1.5 whitespace-nowrap rounded-none text-[10px] font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0 outline-none border border-border bg-bg-subtle text-text-primary hover:bg-bg-elevated shadow-sm h-7 px-3 py-1 has-[>svg]:px-2"
                  >
                    <span>Open Source</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </button>
                </Link>
              </div>
              <span className="mono-copy text-text-muted pointer-events-none absolute -top-12 left-40 size-full -rotate-[34deg] text-[10px] leading-tight">
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
          </motion.div>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="mono-copy mt-6 max-w-xl px-6 text-sm leading-6 text-text-secondary"
          >
            No watermark. No upload. No sign-up. <br /> Your files never leave your browser.
          </motion.p>

        </motion.div>

        {/* Right Side Image */}
        <div className="z-10 hidden w-full items-center justify-center p-8 md:flex md:w-[35%] lg:w-[30%] relative">
          <HeroDocsMockup />
        </div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          }
        }}
        className="grid grid-flow-row sm:h-[150px] sm:grid-cols-3"
      >
        {featureCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              key={card.label}
              className={`flex h-auto flex-col gap-3 border-b border-dashed border-border p-4 py-6 sm:py-4 ${
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
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
