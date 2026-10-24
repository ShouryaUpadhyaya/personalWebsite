"use client";

import { motion } from "motion/react";
import { profile } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function About() {
  return (
    <section id="about" className="py-24 border-t border-white/[0.05]">
      <div className="mb-16">
        <p
          aria-hidden="true"
          className="font-mono text-xs tracking-[0.2em] text-white/50 mb-4"
        >
          01. ABOUT
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
          Background
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <SpotlightCard className="h-full p-8 md:p-12 flex flex-col justify-between">
            <h3 className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase mb-8">
              Profile
            </h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80">
              {profile.bio}
            </p>
          </SpotlightCard>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <SpotlightCard className="h-full p-8 flex flex-col justify-between">
              <h3 className="font-mono text-[10px] tracking-widest text-white/50 mb-2 uppercase">
                Location
              </h3>
              <div className="text-xl font-medium text-white mt-4">
                {profile.location}
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <SpotlightCard className="h-full p-8 flex flex-col justify-between">
              <h3 className="font-mono text-[10px] tracking-widest text-white/50 mb-2 uppercase">
                Education
              </h3>
              <div className="mt-4">
                <div className="text-lg font-medium text-white">
                  {profile.education.institution}
                </div>
                <div className="text-sm text-white/60 mt-1">
                  {profile.education.degree}
                </div>
                <div className="font-mono text-xs text-white/50 mt-4">
                  {profile.education.period}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
