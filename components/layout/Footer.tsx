"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { BrandLogo } from "@/components/layout/BrandLogo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg-base text-sm text-text-muted">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-center opacity-[0.15]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Massive Structured CTA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="border-t border-b border-dashed border-border/80 bg-bg-base backdrop-blur-md px-6 py-12 sm:px-12 sm:py-20 flex flex-col items-center justify-center text-center relative overflow-hidden group"
        >
          {/* Architectural accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-text-muted/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-text-muted/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-text-muted/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-text-muted/30" />

          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="hero-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-text-primary max-w-4xl leading-[1.1] z-10"
          >
            Ready to simplify your PDF workflows?
          </motion.h2>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="mono-copy mt-6 max-w-2xl text-text-secondary text-sm leading-relaxed z-10"
          >
            Clean, fast, and highly structured. Process files directly in your browser. <br className="hidden sm:block" /> No compromises on privacy or speed.
          </motion.p>

          <motion.div
             variants={{ hidden: { opacity: 0, y: 10, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
             className="mt-8 z-10"
          >
            <Link 
              href="/merge-pdf" 
              className="group relative inline-flex items-center justify-center overflow-hidden bg-text-primary px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-bg-base transition-transform active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Building 
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </span>
              <div className="absolute inset-0 z-0 h-full w-0 bg-[#7b61ff] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Grid */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="border-x border-b border-dashed border-border/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        >
          {/* Brand Column */}
          <div className="p-6 sm:col-span-2 md:col-span-1 border-b sm:border-b-0 border-dashed border-border/80 md:border-r flex flex-col justify-between">
            <Link href="/" className="flex items-center gap-0 -ml-2" aria-label="Paperlab home">
              <BrandLogo className="h-8 w-8 opacity-80" />
              <span className="hero-display text-xl text-text-primary -ml-1 tracking-tight">Paperlab</span>
            </Link>
            <div className="mt-8">
              <div className="h-1.5 w-1.5 bg-text-primary/20 mb-3" />
              <p className="mono-copy text-[10px] uppercase tracking-widest text-text-muted">
                Precision tools <br /> for modern workflows
              </p>
            </div>
          </div>

          {/* Links 1 */}
          <div className="p-6 border-b md:border-b-0 border-dashed border-border/80 md:border-r flex flex-col gap-3 mono-copy text-xs uppercase tracking-wider">
             <div className="text-text-primary/40 mb-1 text-[10px]">Product</div>
             <Link href="/merge-pdf" className="hover:text-text-primary transition-colors w-fit group">
                <span className="relative">Tools<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
             </Link>
             <Link href="/compress-pdf" className="hover:text-text-primary transition-colors w-fit group">
                <span className="relative">Blog<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
             </Link>
             <Link href="/split-pdf" className="hover:text-text-primary transition-colors w-fit group">
                <span className="relative">Portfolio<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
             </Link>
          </div>

          {/* Links 2 */}
          <div className="p-6 border-b md:border-b-0 border-dashed border-border/80 md:border-r flex flex-col gap-3 mono-copy text-xs uppercase tracking-wider">
             <div className="text-text-primary/40 mb-1 text-[10px]">Company</div>
             <Link href="#" className="hover:text-text-primary transition-colors w-fit group">
                <span className="relative">About us<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
             </Link>
             <Link href="#" className="hover:text-text-primary transition-colors w-fit group">
                <span className="relative">Jobs<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
             </Link>
             <Link href="#" className="hover:text-text-primary transition-colors w-fit group">
                <span className="relative">Help centre<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
             </Link>
          </div>

          {/* Socials & Contact */}
          <div className="p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-3 mono-copy text-xs uppercase tracking-wider">
               <div className="text-text-primary/40 mb-1 text-[10px]">Connect</div>
               <Link href="#" className="hover:text-text-primary transition-colors w-fit group">
                  <span className="relative">Contact<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
               </Link>
            </div>
            
            <div className="flex items-start gap-2 mt-8">
              <a href="#" className="flex h-8 w-8 items-center justify-center border border-border text-text-muted transition-all hover:border-text-primary hover:text-text-primary hover:-translate-y-1 bg-bg-elevated/30" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><rect width="20" height="20" x="2" y="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center border border-border text-text-muted transition-all hover:border-text-primary hover:text-text-primary hover:-translate-y-1 bg-bg-elevated/30" aria-label="Twitter">
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Absolute Bottom Strip */}
        <div className="relative border-x border-b border-dashed border-border/80 px-6 py-4 flex flex-col items-center justify-between gap-3 text-[10px] uppercase tracking-widest text-text-muted/60 sm:flex-row bg-bg-base mono-copy">
          <div>
            &copy; {new Date().getFullYear()} PAPERLAB. ALL RIGHTS RESERVED.
          </div>  
          
          <div className="flex items-center gap-2">
             <div className="h-1 w-1 bg-text-primary/40" />
             <a href="https://prathm.me/" className="text-text-primary font-medium hover:text-text-primary/80 transition-colors" >ENGINEERED BY PRATHAM</a>
          </div>
        </div>


      </div>
    </footer>
  );
}
