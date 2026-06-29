"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Writing() {
  return (
    <section id="writing" className="py-24 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-neutral-400" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Writing
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {portfolio.writing.map((article, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex flex-col bg-transparent border-white/10 hover:border-white/30 transition-all duration-300 group hover:-translate-y-1">
                <CardHeader>
                  <div className="text-sm text-neutral-500 mb-2 font-mono">
                    {article.date}
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-neutral-200 leading-tight transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-neutral-400">
                    {article.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-white group-hover:text-neutral-300" asChild>
                    <Link href={article.url}>
                      Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
