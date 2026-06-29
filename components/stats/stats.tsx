"use client";

import { motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Stats() {
  return (
    <section className="py-12 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {portfolio.stats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-transparent border-none shadow-none text-center sm:text-left">
                <CardContent className="p-0">
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
