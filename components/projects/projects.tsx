"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Check } from "lucide-react";
import { Github } from "@/components/icons";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function Projects() {
  return (
    <section id="projects" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8 w-full max-w-[1400px]">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Featured Projects
          </h2>
          <div className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs font-mono rounded">
            01
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-12"
        >
          {portfolio.projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div key={index} variants={item}>
                <div className="bg-[#111] border border-white/5 p-6 md:p-12 group rounded-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    
                    {/* Image Side */}
                    <div className={cn("relative aspect-video overflow-hidden rounded-md border border-white/5 bg-black/50 shadow-2xl", 
                      isEven ? "lg:order-1" : "lg:order-2"
                    )}>
                      <Image 
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    
                    {/* Content Side */}
                    <div className={cn("flex flex-col justify-center", 
                      isEven ? "lg:order-2" : "lg:order-1"
                    )}>
                      <div className="flex flex-row items-center justify-between mb-2">
                        <h3 className="text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                          {project.title}
                        </h3>
                        {project.year && (
                          <div className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs font-mono rounded border border-white/5">
                            {project.year}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-blue-400/90 font-mono text-sm uppercase tracking-wider mb-8">
                        {project.subtitle}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-neutral-400 gap-3">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-10">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-neutral-800/80 border border-white/5 text-[10px] font-mono text-neutral-400 rounded-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-white/5">
                        <Button variant="default" className="bg-white text-neutral-950 hover:bg-neutral-200 uppercase tracking-widest font-mono text-xs rounded-none px-6 h-10" asChild>
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-3.5 w-3.5" /> Live Link
                          </Link>
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 uppercase tracking-widest font-mono text-xs rounded-none px-6 h-10 bg-neutral-900/50 text-neutral-300" asChild>
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-3.5 w-3.5" /> Github
                          </Link>
                        </Button>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
