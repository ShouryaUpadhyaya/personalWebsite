"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Typewriter({
  text,
  delay = 0,
  speed = 50,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || prefersReducedMotion || count >= text.length) return;

    const timeout = setTimeout(() => setCount((prev) => prev + 1), speed);
    return () => clearTimeout(timeout);
  }, [count, text, speed, started, prefersReducedMotion]);

  const shown = prefersReducedMotion ? text : text.slice(0, count);

  return (
    <span className="block relative">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {shown}
        <span className="motion-safe:animate-pulse ml-0.5 inline-block w-[0.6em] h-[1em] bg-white/70 align-middle -translate-y-[0.1em]" />
      </span>
    </span>
  );
}
