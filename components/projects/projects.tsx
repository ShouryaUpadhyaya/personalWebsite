"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Check, BookOpen } from "lucide-react";
import { Github } from "@/components/icons";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectReadme } from "./project-readme";

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
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 p-6 md:p-12 group rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(120,119,198,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 mb-8">
                    
                    {/* Image Side */}
                    <div className={cn("relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-2xl", 
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
                      
                      <div className="space-y-4 mb-8 text-sm">
                        {project.goal && (
                          <div>
                            <span className="font-bold text-neutral-300 block mb-1">Goal</span>
                            <p className="text-neutral-400">{project.goal}</p>
                          </div>
                        )}
                        {project.challenge && (
                          <div>
                            <span className="font-bold text-neutral-300 block mb-1">Challenge</span>
                            <p className="text-neutral-400">{project.challenge}</p>
                          </div>
                        )}
                        {project.result && (
                          <div>
                            <span className="font-bold text-green-400 block mb-1 flex items-center gap-2">
                              <Check className="w-4 h-4" /> Result
                            </span>
                            <p className="text-neutral-400">{project.result}</p>
                          </div>
                        )}
                      </div>

                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-10">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-neutral-800/80 border border-white/5 text-[10px] font-mono text-neutral-400 rounded-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-white/10">
                        <Button variant="default" className="bg-white text-neutral-950 hover:bg-neutral-200 uppercase tracking-widest font-mono text-xs rounded-full px-6 h-10 transition-transform hover:scale-105" asChild>
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-3.5 w-3.5" /> Live Link
                          </Link>
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/10 uppercase tracking-widest font-mono text-xs rounded-full px-6 h-10 bg-white/5 text-neutral-300 transition-transform hover:scale-105" asChild>
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-3.5 w-3.5" /> Github
                          </Link>
                        </Button>
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-center relative z-10 pt-6 border-t border-white/10">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-white/20 hover:bg-white/10 uppercase tracking-widest font-mono text-xs rounded-full px-8 py-6 bg-white/5 text-neutral-200 transition-transform hover:scale-105 backdrop-blur-md">
                          <BookOpen className="mr-2 h-4 w-4" /> Read More Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl bg-neutral-950 border border-white/10 text-white rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl mb-2">{project.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 text-sm py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                          {/* Use Markdown README if available */}
                          {/* @ts-ignore - readmeUrl exists on our specific project type */}
                          {project.readmeUrl ? (
                            <ProjectReadme url={(project as any).readmeUrl} />
                          ) : (
                            <>
                              {project.goal && (
                                <div>
                                  <span className="font-bold text-neutral-300 block mb-2 text-base">Goal</span>
                                  <p className="text-neutral-400 leading-relaxed text-base">{project.goal}</p>
                                </div>
                              )}
                              {project.challenge && (
                                <div>
                                  <span className="font-bold text-neutral-300 block mb-2 text-base">Challenge</span>
                                  <p className="text-neutral-400 leading-relaxed text-base">{project.challenge}</p>
                                </div>
                              )}
                              {project.result && (
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                  <span className="font-bold text-green-400 flex items-center gap-2 mb-2 text-base">
                                    <Check className="w-5 h-5" /> Result
                                  </span>
                                  <p className="text-neutral-300 leading-relaxed text-base">{project.result}</p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 pt-4 border-t border-white/10">
                          <Button variant="outline" className="border-white/10 hover:bg-white/10 uppercase tracking-widest font-mono text-xs rounded-full px-6 h-10 bg-white/5 text-neutral-300 transition-transform hover:scale-105" asChild>
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-3.5 w-3.5" /> Live Link
                            </Link>
                          </Button>
                          <Button variant="outline" className="border-white/10 hover:bg-white/10 uppercase tracking-widest font-mono text-xs rounded-full px-6 h-10 bg-white/5 text-neutral-300 transition-transform hover:scale-105" asChild>
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-3.5 w-3.5" /> Github
                            </Link>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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
