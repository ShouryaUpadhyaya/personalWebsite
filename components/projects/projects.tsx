"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { domains, ProjectItem, projects } from "@/data/portfolio";
import { caseStudies } from "@/data/case-studies";
import { matchesFilter, useProjectFilter } from "@/lib/project-filter";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { OpenPumtaDiagram } from "@/components/ui/openpumta-diagram";

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 30 : 60, index % 2 === 0 ? -30 : -60],
  );
  const hasCaseStudy = Boolean(caseStudies[project.slug]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <SpotlightCard className="p-8 md:p-10 flex flex-col justify-between group hover:border-white/[0.15] transition-colors duration-500 h-full">
        <div>
          <div className="flex justify-between items-start mb-8 gap-4">
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
              {project.type}
            </span>
            <div className="flex items-center gap-4 shrink-0">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live site`}
                  className="relative z-20 flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
                >
                  Live
                  <ArrowUpRight size={14} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source on GitHub`}
                className="relative z-20 flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
              >
                Source
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <h4 className="text-2xl font-medium tracking-tight mb-4 text-white group-hover:text-gray-300 transition-colors">
            {hasCaseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h4>

          <p className="text-white/60 text-sm leading-relaxed mb-8 font-light">
            {project.description}
          </p>
        </div>

        <div>
          <ul
            className="flex flex-col gap-2 mb-8 border-t border-white/[0.05] pt-6"
            aria-label={`${project.title} key metrics`}
          >
            {project.metrics.map((metric) => (
              <li
                key={metric}
                className="font-mono text-xs text-white/80 flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                {metric}
              </li>
            ))}
          </ul>

          <div className="flex items-end justify-between gap-4">
            <ul
              className="flex flex-wrap gap-2"
              aria-label={`${project.title} technologies`}
            >
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[10px] tracking-wider text-white/40"
                >
                  {t}
                </li>
              ))}
            </ul>
            {hasCaseStudy && (
              <span
                aria-hidden="true"
                className="shrink-0 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-white/60 group-hover:text-white transition-colors"
              >
                Case study
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function Projects() {
  const { filter, setFilter } = useProjectFilter();
  const visible = projects.filter((project) => matchesFilter(project, filter));
  const centerpiece = visible.find((p) => p.featured);
  const secondaryProjects = visible.filter((p) => !p.featured);

  return (
    <section id="work" className="py-24 border-t border-white/[0.05]">
      <div className="mb-12 flex flex-col gap-8">
        <div>
          <h2 className="font-mono text-xs tracking-[0.2em] text-white/50 mb-4">
            02. WORK
          </h2>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Selected Projects
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              aria-pressed={filter === null}
              onClick={() => setFilter(null)}
              className={`px-3.5 py-1.5 rounded-full border font-mono text-xs tracking-wider transition-colors cursor-pointer ${
                filter === null
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              All
            </button>
            {domains.map((domain) => {
              const active =
                filter?.type === "domain" && filter.value === domain;
              return (
                <button
                  key={domain}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setFilter(active ? null : { type: "domain", value: domain })
                  }
                  className={`px-3.5 py-1.5 rounded-full border font-mono text-xs tracking-wider transition-colors cursor-pointer ${
                    active
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {domain}
                </button>
              );
            })}
            {filter?.type === "tech" && (
              <button
                type="button"
                onClick={() => setFilter(null)}
                aria-label={`Clear ${filter.value} filter`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/30 bg-white/10 font-mono text-xs tracking-wider text-white cursor-pointer"
              >
                {filter.value}
                <X size={12} />
              </button>
            )}
          </div>

          <span
            aria-live="polite"
            className="font-mono text-xs tracking-widest text-white/50"
          >
            {visible.length} / {projects.length} PROJECTS
          </span>
        </div>
      </div>

      {/* Centerpiece Project */}
      {centerpiece && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <SpotlightCard className="p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block font-mono text-[10px] tracking-widest text-white px-3 py-1 bg-white/10 rounded-full uppercase">
                  {centerpiece.type}
                </div>
                <h4 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                  {centerpiece.title}
                </h4>
                <p className="text-white/60 leading-relaxed font-light text-lg">
                  {centerpiece.description}
                </p>

                <ul
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.05]"
                  aria-label={`${centerpiece.title} key metrics`}
                >
                  {centerpiece.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="font-mono text-xs text-white/90"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>

                <ul
                  className="flex flex-wrap gap-2 pt-4"
                  aria-label={`${centerpiece.title} technologies`}
                >
                  {centerpiece.tech.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-xs text-white/60 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex flex-wrap items-center gap-8">
                  <Link
                    href={`/projects/${centerpiece.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white pb-1 border-b border-white/30 hover:border-white transition-colors"
                  >
                    Case study <ArrowRight size={14} />
                  </Link>
                  {centerpiece.live && (
                    <a
                      href={centerpiece.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors pb-1"
                    >
                      Live Site <ArrowUpRight size={14} />
                    </a>
                  )}
                  <a
                    href={centerpiece.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors pb-1"
                  >
                    Source <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Interactive System Diagram */}
              <div className="h-full min-h-[300px] rounded-xl border border-white/[0.05] bg-[#050505] p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <OpenPumtaDiagram />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      )}

      {/* Secondary Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        {secondaryProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
