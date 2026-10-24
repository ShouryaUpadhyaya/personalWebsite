"use client";

import React, { createContext, useContext, useState } from "react";

export type ProjectFilter = {
  type: "domain" | "tech";
  value: string;
} | null;

interface ProjectFilterContextValue {
  filter: ProjectFilter;
  setFilter: React.Dispatch<React.SetStateAction<ProjectFilter>>;
}

export const ProjectFilterContext = createContext<ProjectFilterContextValue>({
  filter: null,
  setFilter: () => {},
});

export function ProjectFilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<ProjectFilter>(null);
  return (
    <ProjectFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </ProjectFilterContext.Provider>
  );
}

export function useProjectFilter() {
  return useContext(ProjectFilterContext);
}

export function matchesFilter(
  project: { domains: string[]; tech: string[] },
  filter: ProjectFilter,
): boolean {
  if (!filter) return true;
  if (filter.type === "domain") return project.domains.includes(filter.value);
  return project.tech.some((t) => t.toLowerCase() === filter.value.toLowerCase());
}
