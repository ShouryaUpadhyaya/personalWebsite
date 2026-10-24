"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { domains, ProjectItem, projects } from "@/data/portfolio";
import { caseStudies } from "@/data/case-studies";
import { matchesFilter, useProjectFilter } from "@/lib/project-filter";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProjectArchitectureDiagram } from "@/components/ui/project-architecture-diagram";

function ShowcaseProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const hasCaseStudy = Boolean(caseStudies[project.slug]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.2) }}
    >
      <SpotlightCard className="p-8 md:p-14 hover:border-white/[0.14] transition-colors duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-block font-mono text-[10px] tracking-widest text-white px-3 py-1 bg-white/10 rounded-full uppercase">
                {project.type}
              </span>
              <span className="font-mono text-[11px] tracking-widest text-white/40">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div>
              <h4 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                {project.title}
              </h4>
              <p className="font-mono text-xs tracking-wide text-white/45 mt-2">
                {project.subtitle}
              </p>
            </div>

            <p className="text-white/65 leading-relaxed font-light text-base md:text-lg max-w-[65ch]">
              {project.description}
            </p>

            <ul
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-white/[0.06]"
              aria-label={`${project.title} key metrics`}
            >
              {project.metrics.map((metric) => (
                <li
                  key={metric}
                  className="font-mono text-xs text-white/90 leading-snug"
                >
                  {metric}
                </li>
              ))}
            </ul>

            <ul
              className="flex flex-wrap gap-2 pt-2"
              aria-label={`${project.title} technologies`}
            >
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="font-mono text-xs text-white/60 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="pt-3 flex flex-wrap items-center gap-8">
              {hasCaseStudy && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/link inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white pb-1 border-b border-white/30 hover:border-white transition-colors"
                >
                  Case study{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-0.5 transition-transform"
                  />
                </Link>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors pb-1"
                >
                  Live Site <ArrowUpRight size={14} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors pb-1"
              >
                Source <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Interactive System Architecture Tracer */}
          <div className="h-full min-h-[320px] rounded-xl border border-white/[0.06] bg-[#050505] p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <ProjectArchitectureDiagram slug={project.slug} />
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function Projects() {
  const { filter, setFilter } = useProjectFilter();
  const visible = projects.filter((project) => matchesFilter(project, filter));

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

      {/* Full-Width Interactive Architecture Cards for All Projects */}
      <div className="flex flex-col gap-10">
        {visible.map((project, index) => (
          <ShowcaseProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
