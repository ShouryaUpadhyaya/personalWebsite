"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Testimonials() {
  if (!portfolio.testimonials || portfolio.testimonials.length === 0) return null;

  return (
    <section className="py-24 border-b border-white/10 bg-neutral-950">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            What People Say
          </h2>
          <div className="w-12 h-1 bg-neutral-600 rounded"></div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {portfolio.testimonials.map((t, index) => (
            <motion.div key={index} variants={item} className="bg-neutral-900/50 p-8 rounded-xl border border-white/5 relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
              <p className="text-neutral-300 italic mb-6 leading-relaxed relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 font-bold uppercase">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-neutral-500 text-sm">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
