"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Send, Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/icons";
import { portfolio } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Contact() {
  return (
    <section id="contact" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Contact Me
          </h2>
          <div className="w-12 h-1 bg-neutral-600 rounded"></div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div variants={item}>
            <Card className="bg-neutral-900/50 border-white/10">
              <CardContent className="p-6 md:p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-300">
                      Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Your Name" 
                      className="bg-neutral-950 border-white/10 text-white focus-visible:ring-neutral-700" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-300">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-neutral-950 border-white/10 text-white focus-visible:ring-neutral-700" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-neutral-300">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="How can I help?" 
                      rows={5}
                      className="bg-neutral-950 border-white/10 text-white focus-visible:ring-neutral-700 resize-none" 
                    />
                  </div>
                  <Button className="w-full bg-white text-neutral-950 hover:bg-neutral-200">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-neutral-400 mb-8 leading-relaxed max-w-md">
              I'm always open to discussing product design work or partnership opportunities. Feel free to reach out through any of these platforms.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <Link 
                href={`mailto:${portfolio.personal.email}`}
                className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-medium text-lg">{portfolio.personal.email}</span>
              </Link>
              
              <Link 
                href={portfolio.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span className="font-medium text-lg">LinkedIn</span>
              </Link>
              
              <Link 
                href={portfolio.personal.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Twitter className="h-5 w-5" />
                </div>
                <span className="font-medium text-lg">X (Twitter)</span>
              </Link>

              <Link 
                href={portfolio.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Github className="h-5 w-5" />
                </div>
                <span className="font-medium text-lg">GitHub</span>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto bg-white text-neutral-950 hover:bg-neutral-200 uppercase tracking-widest font-mono text-xs rounded-full px-8 py-6 shadow-[0_0_30px_-10px_rgba(255,255,255,0.4)] transition-all hover:scale-105" asChild>
                <a href="https://calendly.com/shouryaupadhyaya79" target="_blank" rel="noopener noreferrer">
                  Book a Discovery Call
                </a>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/10 uppercase tracking-widest font-mono text-xs rounded-full px-8 py-6 bg-white/5 backdrop-blur-sm text-neutral-200 transition-all hover:scale-105" asChild>
                <Link href="/resume.pdf" target="_blank">
                  Download Resume
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
