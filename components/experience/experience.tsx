"use client";

import { motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { GitBranch } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export function Experience() {
  return (
    <section id="experience" className="py-24 border-b border-white/10 bg-neutral-950/50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Experience
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
          {portfolio.experience.map((exp, index) => (
            <motion.div key={index} variants={item} className="mb-12 ml-8 relative group">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-neutral-950 bg-neutral-500 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <span className="text-neutral-400 font-medium hidden md:inline">•</span>
                {exp.companyUrl ? (
                  <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-neutral-300 font-medium hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                    {exp.company}
                  </a>
                ) : (
                  <span className="text-lg text-neutral-300 font-medium">{exp.company}</span>
                )}
                {exp.githubUrl && (
                  <a href={exp.githubUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors md:ml-2">
                    <GitBranch className="w-5 h-5" />
                  </a>
                )}
              </div>
              
              <div className="mb-4 text-sm font-mono text-neutral-500 bg-neutral-900/50 inline-block px-3 py-1 rounded-md border border-white/5">
                {exp.period}
              </div>
              
              <p className="text-neutral-400 mb-6 leading-relaxed max-w-2xl">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
