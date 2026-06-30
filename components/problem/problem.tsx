"use client";

import { motion } from "motion/react";
import { AlertCircle, Zap, ShieldCheck } from "lucide-react";

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

export function Problem() {
  return (
    <section className="py-24 border-b border-white/10 bg-neutral-900/20">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Pain Points */}
          <motion.div variants={item} className="flex flex-col gap-6">
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
                Struggling with slow page loads, dropped database connections, or delayed project delivery?
              </h2>
              <div className="w-12 h-1 bg-red-500/80 rounded"></div>
            </div>
            <p className="text-lg text-neutral-400 leading-relaxed">
              When your application scales, the cracks start to show. Unreliable freelancers, messy codebases, and backend systems that crash under traffic spikes cost you time and money.
            </p>
          </motion.div>

          {/* Outcome / Solution */}
          <motion.div variants={item} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-green-500" />
              The Solution
            </h3>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              I engineer systems that scale effortlessly, so you can focus on growing your business instead of fighting server fires.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-white font-semibold gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" /> High Performance
                </div>
                <p className="text-sm text-neutral-500">Sub-50ms response times and optimized database queries.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-white font-semibold gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" /> Reliable Delivery
                </div>
                <p className="text-sm text-neutral-500">Clean, maintainable code delivered on schedule.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
