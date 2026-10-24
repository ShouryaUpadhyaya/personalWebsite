"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { profile } from "@/data/portfolio";
import { scrollToSection, useActiveSection } from "@/lib/hooks";

const navItems = [
  { name: "About", id: "about" },
  { name: "Work", id: "work" },
  { name: "Experience", id: "experience" },
  { name: "Stack", id: "stack" },
] as const;

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeSection = useActiveSection(sectionIds, pathname);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const highlighted =
    hoveredItem ?? (pathname.startsWith("/projects/") ? "work" : activeSection);

  const handleNavClick = (id: string) => {
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
    >
      <div
        onMouseLeave={() => setHoveredItem(null)}
        className="flex items-center justify-between px-3 py-2 rounded-full border border-white/[0.08] bg-[#0A0A0A]/70 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center gap-0.5 sm:gap-1 font-mono text-[11px] sm:text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHighlighted = highlighted === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative px-2.5 sm:px-4 py-1.5 transition-colors duration-300 ${
                  isHighlighted ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {isHighlighted && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.08] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          })}
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="px-3 sm:px-4 py-1.5 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs font-medium hover:bg-gray-200 transition-colors"
        >
          GitHub
        </a>
      </div>
    </motion.nav>
  );
}
