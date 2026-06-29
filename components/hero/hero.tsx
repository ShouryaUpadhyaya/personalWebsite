"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { AnimatedTerminal } from "@/components/terminal/terminal";
import Link from "next/link";

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
    <section className="min-h-[90vh] flex items-center pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <h2 className="text-2xl md:text-3xl text-neutral-400 mt-2 font-medium">
                {portfolio.personal.subtitle}
              </h2>
            </motion.div>
            
            <motion.p variants={item} className="text-lg text-neutral-400 max-w-lg leading-relaxed">
              {portfolio.personal.description}
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-white text-neutral-950 hover:bg-neutral-200" asChild>
                <Link href="#projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                <Link href="#contact">
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-neutral-800 to-neutral-700 rounded-xl blur opacity-20"></div>
            <div className="relative">
              <AnimatedTerminal />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
