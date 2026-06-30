"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!portfolio.faq || portfolio.faq.length === 0) return null;

  return (
    <section className="py-24 border-b border-white/10 bg-neutral-900/30">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-neutral-600 rounded"></div>
        </div>

        <div className="space-y-4">
          {portfolio.faq.map((faqItem, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <button
                  className="w-full text-left px-6 py-5 md:py-6 flex items-center justify-between gap-4 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-white text-lg">{faqItem.question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-neutral-300 leading-relaxed pt-2">
                        {faqItem.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
