"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/icons";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 bg-neutral-950">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-xl font-bold tracking-tight text-white mb-1">
              Shourya<span className="text-neutral-500">.dev</span>
            </Link>
            <p className="text-sm text-neutral-500 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Open to new opportunities
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href={portfolio.personal.github} target="_blank" className="text-neutral-500 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href={portfolio.personal.linkedin} target="_blank" className="text-neutral-500 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href={portfolio.personal.twitter} target="_blank" className="text-neutral-500 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href={`mailto:${portfolio.personal.email}`} className="text-neutral-500 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>

          <div className="text-sm text-neutral-500">
            &copy; {currentYear} Shourya Upadhyaya. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
