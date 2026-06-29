"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Check } from "lucide-react";
import { Github } from "@/components/icons";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function Projects() {
  return (
    <section id="projects" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-neutral-600 rounded"></div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-24"
        >
          {portfolio.projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group">
                {/* Image Side */}
                <div className="lg:col-span-7 relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50">
                  <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
                
                {/* Content Side */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex flex-row items-center justify-between mb-2">
                    <h3 className="text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h3>
                    {project.year && (
                      <div className="px-3 py-1 bg-neutral-900/80 text-neutral-400 text-xs font-mono rounded-md border border-white/5">
                        {project.year}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-blue-400/90 font-mono text-sm uppercase tracking-wider mb-8">
                    {project.subtitle}
                  </p>
                  
                  <ul className="space-y-3 mb-10">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-neutral-400 gap-3">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                    <Button variant="default" className="bg-white text-neutral-950 hover:bg-neutral-200 uppercase tracking-widest font-mono text-xs rounded-none px-6" asChild>
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3.5 w-3.5" /> Live Link
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 uppercase tracking-widest font-mono text-xs rounded-none px-6 bg-transparent text-neutral-300" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-3.5 w-3.5" /> Github
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
