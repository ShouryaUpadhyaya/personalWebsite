"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Projects() {
  return (
    <section id="projects" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {portfolio.projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex flex-col bg-neutral-900/50 border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0 flex-grow">
                    <p className="text-neutral-400 mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-0 flex gap-4 pt-4 mt-auto border-t border-white/5">
                    <Button variant="default" className="bg-white text-neutral-950 hover:bg-neutral-200" asChild>
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Source
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
