"use client";

import { motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { GraduationCap, MapPin } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Education() {
  return (
    <section
      id="education"
      className="py-24 border-b border-white/10 bg-neutral-950/50"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Education
          </h2>
          <div className="w-12 h-1 bg-neutral-600 rounded"></div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-white/10 ml-3 md:ml-0"
        >
          {portfolio.education.map((edu, index) => (
            <motion.div
              key={index}
              variants={item}
              className="mb-12 ml-8 relative group"
            >
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-neutral-950 bg-neutral-500 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />

              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <span className="text-neutral-400 font-medium hidden md:inline">
                  •
                </span>
                <span className="text-lg text-neutral-300 font-medium">
                  {edu.school}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-mono text-neutral-500 bg-neutral-900/50 inline-block px-3 py-1 rounded-md border border-white/5">
                  {edu.period}
                </span>
                <span className="text-sm text-neutral-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {edu.location}
                </span>
              </div>

              <p className="text-neutral-400 mb-6 leading-relaxed max-w-2xl">
                {edu.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {edu.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 border border-white/10 rounded-full px-3 py-1 bg-white/5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
