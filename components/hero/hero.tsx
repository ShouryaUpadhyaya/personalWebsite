"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Typewriter } from "@/components/ui/typewriter";
import { scrollToSection } from "@/lib/hooks";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--hero-x", `${e.clientX - rect.left}px`);
    section.style.setProperty("--hero-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Pointer-following radial spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(800px circle at var(--hero-x, 50%) var(--hero-y, 50%), rgba(255,255,255,0.03), transparent 40%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-10 relative z-10"
      >
        <span className="relative flex h-2 w-2">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <span className="font-mono text-xs tracking-widest text-white/60">
          second-year CS &middot; {profile.education.institution} &middot;{" "}
          <span className="text-white">Software Engineering</span>
        </span>
      </motion.div>

      <div className="space-y-6 max-w-5xl relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600 pb-2"
        >
          {profile.name.split(" ")[0]} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600">
            {profile.name.split(" ")[1]}.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed pt-6 tracking-wide"
        >
          <span className="text-gray-200 font-normal">
            Software Engineer &amp; Distributed Systems
          </span>
          <br />
          <span className="text-base md:text-lg text-gray-500 mt-2 block">
            <Typewriter text={profile.tagline} delay={800} speed={25} />
          </span>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 flex flex-wrap items-center gap-8 relative z-10"
      >
        <button
          type="button"
          onClick={() => scrollToSection("work")}
          className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white pb-2 border-b border-white/20 hover:border-white transition-colors cursor-pointer"
        >
          View Work
          <ArrowDownRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
          />
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors pb-2 cursor-pointer"
        >
          Get in touch
        </button>

        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors pb-2"
        >
          Résumé <ArrowUpRight size={13} />
        </a>
      </motion.div>
    </section>
  );
}
