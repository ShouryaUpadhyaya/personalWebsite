"use client";

import { motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { User } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  const { personal } = portfolio;

  return (
    <section
      id="about"
      className="py-24 border-b border-white/10 bg-neutral-950/50"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={item} className="mb-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              About
            </h2>
            <div className="w-12 h-1 bg-neutral-600 rounded"></div>
          </motion.div>

          <motion.p
            variants={item}
            className="text-lg text-neutral-300 leading-relaxed"
          >
            {personal.about}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 border border-white/10 rounded-full px-4 py-1.5 bg-white/5">
              <User className="w-4 h-4 text-neutral-500" />
              {personal.subtitle}
            </span>
            <a
              href={`mailto:${personal.email}`}
              className="text-sm font-medium text-neutral-400 border border-white/10 rounded-full px-4 py-1.5 bg-white/5 hover:text-white hover:border-white/30 transition-colors"
            >
              {personal.email}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
