"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/layout/BrandLogo";

export function Footer() {
  const pathname = usePathname();

  const descriptions: Record<string, string> = {
    blog: "Read our latest articles on PDF workflows, productivity tips, and updates about our features.",
    portfolio: "Explore the cutting-edge projects and architectural design experiments crafted by the creator of Paperlab.",
    about: "We are a team of designers and engineers dedicated to simplifying complex PDF workflows forever.",
    help: "Find answers to frequently asked questions, tutorials, and get support for all your PDF needs."
  };
  const renderDescBox = (key: string) => (
    <div 
      className="absolute bottom-full left-0 mb-2 w-56 p-3 text-[10px] normal-case tracking-normal border border-dashed border-border/80 bg-white text-text-primary leading-relaxed opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 shadow-sm pointer-events-none"
    >
      {descriptions[key]}
    </div>
  );

  return (
    <footer className="relative overflow-hidden bg-bg-base text-sm text-text-muted">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-center opacity-[0.15]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {pathname === '/merge-pdf' && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 border border-dashed border-border/80 bg-bg-base/40 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.02)]"
          >
            {[
              {
                title: "Local Processing",
                desc: "Your files never leave your browser. Total privacy and maximum speed without server uploads."
              },
              {
                title: "Visual Reordering",
                desc: "Drag and drop thumbnails to organize your PDFs perfectly before instantly combining them."
              },
              {
                title: "Zero Compression",
                desc: "Merged documents retain their original quality and structure with absolutely no degradation."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`relative px-8 py-12 flex flex-col justify-center group overflow-hidden ${idx !== 2 ? 'border-b md:border-b-0 md:border-r border-dashed border-border/80' : ''}`}
              >
                 {/* Architectural corner ticks */}
                 <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-text-muted/30 z-10 transition-colors group-hover:border-[#7b61ff]/50" />
                 <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-text-muted/30 z-10 transition-colors group-hover:border-[#7b61ff]/50" />
                 
                 {/* Soft glow on hover */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#7b61ff]/0 via-transparent to-[#7b61ff]/0 group-hover:from-[#7b61ff]/10 group-hover:to-transparent transition-all duration-700 z-0" />
                 
                 <div className="flex items-center gap-3 mb-5 z-10">
                   <div className="h-1.5 w-1.5 bg-text-primary/20 rounded-full group-hover:bg-[#7b61ff] group-hover:shadow-[0_0_12px_rgba(123,97,255,0.8)] transition-all duration-300" />
                   <h3 className="hero-display text-xl tracking-tight text-text-primary">{feature.title}</h3>
                 </div>
                 
                 <p className="mono-copy text-xs text-text-secondary leading-relaxed z-10 pr-4">
                   {feature.desc}
                 </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {pathname === '/' && (
          <>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="border border-dashed border-border/80 bg-bg-base/40 backdrop-blur-3xl px-6 py-6 sm:px-12 sm:py-10 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.02)]"
          >
            {/* Ambient Breathing Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] sm:w-[80%] sm:h-[80%] bg-gradient-to-tr from-[#7b61ff]/15 via-transparent to-[#7b61ff]/5 blur-[60px] sm:blur-[100px] rounded-[100%] pointer-events-none z-0"
            />

            {/* Architectural accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-text-muted/30 z-10" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-text-muted/30 z-10" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-text-muted/30 z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-text-muted/30 z-10" />

            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="hero-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-text-primary max-w-4xl leading-[1.1] z-10"
            >
              Ready to simplify your PDF workflows?
            </motion.h2>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="mono-copy mt-6 max-w-2xl text-text-secondary text-sm leading-relaxed z-10 drop-shadow-sm"
            >
              Clean, fast, and highly structured. Process files directly in your browser. <br className="hidden sm:block" /> No compromises on privacy or speed.
            </motion.p>

            <motion.div
               variants={{ hidden: { opacity: 0, y: 10, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
               className="mt-8 z-10"
            >
              <Link 
                href="/merge-pdf" 
                className="group relative inline-flex items-center justify-center overflow-hidden bg-transparent border border-[#7b61ff] px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-text-primary transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(123,97,255,0.15)]"
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  Get started 
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
              <BrandLogo className="h-15 w-20 opacity-80" />
              <span className="hero-display text-xl text-text-primary font-black -ml-5 tracking-tight ">Paperlab</span>
            </Link>
            <div className="mt-8">
             
              <p className="mono-copy text-[9px] uppercase tracking-widest pl-3 text-text-muted/90">
                Precision tools for your PDF workflows.
              </p>
            </div>
          </div>

          {/* Links 1 */}
          <div className="p-6 border-b md:border-b-0 border-dashed border-border/80 md:border-r flex flex-col gap-3 mono-copy text-xs uppercase tracking-wider">
             <div className="text-text-primary/40 mb-1 text-[10px]">Product</div>
             
             <Link href="/" className="hover:text-text-primary transition-colors w-fit group">
                <span className="relative">Tools<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
             </Link>

             <div className="relative group/tooltip w-fit">
               <button className="text-left hover:text-text-primary transition-colors w-fit group">
                  <span className="relative">Blog<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
               </button>
               {renderDescBox('blog')}
             </div>

             <div className="relative group/tooltip w-fit">
               <button className="text-left hover:text-text-primary transition-colors w-fit group">
                  <span className="relative">Portfolio<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
               </button>
               {renderDescBox('portfolio')}
             </div>
          </div>

          {/* Links 2 */}
          <div className="p-6 border-b md:border-b-0 border-dashed border-border/80 md:border-r flex flex-col gap-3 mono-copy text-xs uppercase tracking-wider">
             <div className="text-text-primary/40 mb-1 text-[10px]">Company</div>
             
             <div className="relative group/tooltip w-fit">
               <button className="text-left hover:text-text-primary transition-colors w-fit group">
                  <span className="relative">About us<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
               </button>
               {renderDescBox('about')}
             </div>

             <div className="relative group/tooltip w-fit">
               <button className="text-left hover:text-text-primary transition-colors w-fit group">
                  <span className="relative">Help centre<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
               </button>
               {renderDescBox('help')}
             </div>
          </div>

          {/* Socials & Contact */}
          <div className="p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-3 mono-copy text-xs uppercase tracking-wider">
               <div className="text-text-primary/40 mb-1 text-[10px]">Connect</div>
               <Link href="https://prathm.me/" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors w-fit group">
                  <span className="relative">Contact<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-text-primary transition-all group-hover:w-full"/></span>
               </Link>
            </div>
            
            <div className="flex items-start gap-2 mt-8">
              <a href="https://www.linkedin.com/in/prathamyadavv" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center border border-border text-text-muted transition-all hover:border-text-primary hover:text-text-primary hover:-translate-y-1 bg-bg-elevated/30" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://x.com/prathamyadavv" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center border border-border text-text-muted transition-all hover:border-text-primary hover:text-text-primary hover:-translate-y-1 bg-bg-elevated/30" aria-label="Twitter">
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
          </>
        )}


      </div>
    </footer>
  );
}
