"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
    });

    const renderChart = async () => {
      try {
        if (containerRef.current) {
          // Add a unique ID for the mermaid container
          const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          setSvgContent(svg);
          setError(false);
        }
      } catch (err) {
        console.error("Failed to render Mermaid chart", err);
        setError(true);
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-xl text-red-400 font-mono text-sm">
        Failed to render chart. Syntax might be incorrect.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex justify-center w-full overflow-x-auto my-8 bg-neutral-900/50 p-6 rounded-2xl border border-white/10"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
