"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { experience, projects, skills } from "@/data/portfolio";
import { useProjectFilter } from "@/lib/project-filter";
import { scrollToSection } from "@/lib/hooks";

function getUsage(skill: string) {
  return {
    projects: projects.filter((project) =>
      project.tech.some((t) => t.toLowerCase() === skill.toLowerCase()),
    ),
    roles: experience.filter((role) =>
      role.tech.some((t) => t.toLowerCase() === skill.toLowerCase()),
    ),
  };
}

function UsagePanel({
  skill,
  onShowProjects,
  compact = false,
}: {
  skill: string | null;
  onShowProjects: (s: string) => void;
  compact?: boolean;
}) {
  const usage = skill ? getUsage(skill) : null;

  return (
    <div aria-live="polite" className={compact ? "" : "min-h-[200px]"}>
      <AnimatePresence mode="wait" initial={false}>
        {skill && usage ? (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col gap-4 ${
              compact
                ? "p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                : "gap-5"
            }`}
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-1.5">
                Where I&apos;ve used
              </div>
              <div className="text-2xl font-medium text-white tracking-tight">
                {skill}
              </div>
            </div>

            {usage.projects.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {usage.projects.map((project) => (
                  <li
                    key={project.id}
                    className="font-mono text-xs tracking-wide text-white/75"
                  >
                    {project.title}
                  </li>
                ))}
              </ul>
            )}

            {usage.roles.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {usage.roles.map((role) => (
                  <li
                    key={role.id}
                    className="font-mono text-xs tracking-wide text-white/50"
                  >
                    {role.role} &middot; {role.company}
                  </li>
                ))}
              </ul>
            )}

            {usage.projects.length > 0 && (
              <button
                type="button"
                onClick={() => onShowProjects(skill)}
                className="self-start flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-white pb-1 border-b border-white/25 hover:border-white transition-colors cursor-pointer"
              >
                View{" "}
                {usage.projects.length === 1
                  ? "project"
                  : `${usage.projects.length} projects`}{" "}
                <ArrowRight size={12} />
              </button>
            )}
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-white/50 font-light leading-relaxed max-w-xs"
          >
            Hover or tap any technology to see the projects and roles where
            I&apos;ve used it.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TechStack() {
  const [selected, setSelected] = useState<string | null>(null);
  const { setFilter } = useProjectFilter();

  const showProjects = (skill: string) => {
    setFilter({ type: "tech", value: skill });
    scrollToSection("work");
  };

  return (
    <section id="stack" className="py-24 border-t border-white/[0.05]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <div className="md:sticky md:top-32">
            <p
              aria-hidden="true"
              className="font-mono text-xs tracking-[0.2em] text-white/50 mb-4"
            >
              04. STACK
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              Technologies
            </h2>
            <div className="hidden md:block mt-10">
              <UsagePanel skill={selected} onShowProjects={showProjects} />
            </div>
            <div className="md:hidden mt-6">
              <UsagePanel
                skill={selected}
                onShowProjects={showProjects}
                compact
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-6"
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase border-b border-white/[0.06] pb-3">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {items.map((item) => {
                  const { projects: usedIn, roles } = getUsage(item);
                  const uses = usedIn.length + roles.length;
                  const isSelected = selected === item;

                  return (
                    <li key={item}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onMouseEnter={() => setSelected(item)}
                        onFocus={() => setSelected(item)}
                        onClick={() =>
                          setSelected((prev) => (prev === item ? null : item))
                        }
                        className={`group flex items-center gap-2 font-mono text-sm text-left transition-colors duration-300 cursor-pointer ${
                          isSelected
                            ? "text-white font-medium"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isSelected
                              ? "bg-white"
                              : "bg-white/40 group-hover:bg-white"
                          }`}
                        />
                        {item}
                        {uses > 0 && (
                          <span className="text-[10px] text-white/45 group-hover:text-white/70 tabular-nums">
                            {uses}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
