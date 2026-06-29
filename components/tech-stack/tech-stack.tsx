"use client";

import { motion } from "motion/react";
import { Wrench } from "lucide-react";
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
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 flex items-center gap-3">
          <Wrench className="w-8 h-8 text-neutral-400" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Arsenal
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {portfolio.stack.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={index} variants={item} className="flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <Icon className="w-5 h-5 text-neutral-400" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    {category.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="px-4 py-2 text-sm border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
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
