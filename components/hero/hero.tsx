"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, FileText } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Stats } from "@/components/stats/stats";

const AnimatedTerminal = dynamic(() => import("@/components/terminal/terminal").then(mod => mod.AnimatedTerminal), { ssr: false });

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8 flex-grow flex flex-col">
        <div className="flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              <motion.div variants={item}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                  {portfolio.personal.name}
                </h1>
                <h2 className="text-xl md:text-2xl text-neutral-400 mt-4 font-medium leading-relaxed max-w-2xl">
                  I build scalable, high-performance web applications that don't crash when your traffic spikes.
                </h2>
              </motion.div>
              
              <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-white text-neutral-950 hover:bg-neutral-200 uppercase tracking-widest font-mono text-xs rounded-none px-8" asChild>
                  <a href="https://calendly.com/shouryaupadhyaya79" target="_blank" rel="noopener noreferrer">
                    Book a Discovery Call
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 uppercase tracking-widest font-mono text-xs rounded-none px-8 bg-neutral-900/50 text-neutral-300" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Get Resume <FileText className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full relative hidden lg:block"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-neutral-800 to-neutral-700 rounded-xl blur opacity-20"></div>
              <div className="relative">
                <AnimatedTerminal />
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16 md:mt-0 pt-8">
          <Stats />
        </div>
      </div>
    </section>
  );
}
