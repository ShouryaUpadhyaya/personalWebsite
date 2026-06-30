"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export function Guarantee() {
  return (
    <section className="min-h-[50vh] flex justify-center items-center py-12 border-b border-white/10 bg-blue-950/20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-6 bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-blue-500/30 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)]"
        >
          <div className="flex-shrink-0 bg-blue-500/20 p-5 rounded-full">
            <ShieldCheck className="w-12 h-12 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              The 30-Day Zero-Bug Guarantee
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              I provide 30 days of post-launch bug fixing and support for all
              freelance projects. If any code I wrote breaks or crashes in
              production within the first month, I will fix it completely free
              of charge. Your peace of mind is my priority.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
