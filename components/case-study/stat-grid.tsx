"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { CaseStudyStat } from "@/data/case-studies";

function format(stat: CaseStudyStat, n: number) {
  const number = n.toLocaleString("en-US", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  });
  return `${stat.prefix ?? ""}${number}${stat.suffix ?? ""}`;
}

function Counter({ stat }: { stat: CaseStudyStat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const animated = typeof stat.value === "number" && !prefersReducedMotion;

  useEffect(() => {
    if (animated && !inView && ref.current) {
      ref.current.textContent = format(stat, 0);
    }
  }, [animated, inView, stat]);

  useEffect(() => {
    if (!animated || !inView || typeof stat.value !== "number") return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(stat, n);
      },
    });
    return () => controls.stop();
  }, [animated, inView, stat]);

  return (
    <span ref={ref}>
      {typeof stat.value === "number" ? format(stat, stat.value) : stat.value}
    </span>
  );
}

export function StatGrid({ stats }: { stats: CaseStudyStat[] }) {
  return (
    <dl
      className={`grid ${
        stats.length === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-2 lg:grid-cols-4"
      } gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]`}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#070707] p-6 md:p-8 flex flex-col gap-3"
        >
          <dt className="order-2 font-mono text-[11px] tracking-wide text-white/50 leading-relaxed">
            {stat.label}
          </dt>
          <dd className="order-1 text-3xl md:text-4xl font-medium tracking-tight text-white tabular-nums">
            <Counter stat={stat} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
