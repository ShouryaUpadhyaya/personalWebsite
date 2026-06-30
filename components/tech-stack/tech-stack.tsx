"use client";

import { motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export function TechStack() {
  return (
    <section id="stack" className="py-24 border-b border-white/10 bg-neutral-950/50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Arsenal
          </h2>
          <div className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs font-mono rounded">
            05
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
        >
          {portfolio.stack.map((category, index) => {
            return (
              <motion.div key={index} variants={item} className="flex flex-col">
                <h3 className="text-xs font-mono font-bold text-blue-400/90 uppercase tracking-widest mb-6">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                      <Badge 
                      key={i} 
                      variant="outline" 
                      className="rounded-full px-4 py-1.5 text-xs font-medium border-neutral-700 bg-transparent text-neutral-300 hover:text-white hover:border-neutral-500 transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
