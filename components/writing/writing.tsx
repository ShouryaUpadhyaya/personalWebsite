"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { writing } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Writing() {
  return (
    <section id="writing" className="py-24 border-t border-white/[0.05]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <p
            aria-hidden="true"
            className="font-mono text-xs tracking-[0.2em] text-white/50 mb-4"
          >
            05. WRITING
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Engineering Notes
          </h2>
          <p className="mt-4 text-sm text-white/50 font-light leading-relaxed max-w-xs">
            Write-ups on production infrastructure, state synchronization, and
            backend architecture.
          </p>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {writing.map((article, index) => (
            <motion.a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group block"
            >
              <SpotlightCard className="p-6 md:p-8 hover:border-white/[0.15] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-gray-200 transition-colors flex items-center gap-2">
                    <span>{article.title}</span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </h3>
                  <span className="font-mono text-[11px] tracking-widest text-white/45 shrink-0">
                    {article.readTime}
                  </span>
                </div>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {article.description}
                </p>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
