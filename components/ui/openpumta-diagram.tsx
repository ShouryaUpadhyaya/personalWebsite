"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { boxFor, DiagramLayout, edgePath } from "@/lib/diagram";

const NODES = [
  {
    id: "web",
    label: "WEB CLIENT",
    sub: "Next.js App",
    info: "Desktop and mobile clients connect over HTTPS for dashboard routes and upgrade to WSS for live Pomodoro timer synchronization.",
  },
  {
    id: "mobile",
    label: "SECOND DEVICE",
    sub: "Cross-device sync",
    info: "A phone or second browser tab subscribes to the user's active focus room and stays synchronized to the server's authoritative clock.",
  },
  {
    id: "nginx",
    label: "NGINX PROXY",
    sub: "TLS · routing",
    info: "Single entry point on the Linux VPS: terminates SSL, routes /api to Express, and upgrades /ws connections with zero cross-cloud hops.",
  },
  {
    id: "ws",
    label: "WS TIMER HUB",
    sub: "stateful rooms",
    info: "Authoritative Pomodoro state machine: broadcasts start, pause, and completion deltas so sleeping browser tabs never drift or lie.",
  },
  {
    id: "express",
    label: "EXPRESS API",
    sub: "30+ REST · Zod",
    info: "30+ Zod-validated REST endpoints handling 21-day habit streaks, study sessions, tasks, and AI-generated daily coaching reviews.",
  },
  {
    id: "redis",
    label: "REDIS CACHE",
    sub: "-80% DB load",
    info: "Write-through analytics cache storing streak heatmaps and study-hour rollups across 10,000+ visits, cutting PostgreSQL read load by 80%.",
  },
  {
    id: "postgres",
    label: "POSTGRESQL",
    sub: "10 Prisma models",
    info: "Primary relational store for 300+ registered users, habit chains, focus logs, and Prometheus-monitored transactional writes.",
  },
];

const LAYOUTS: Record<"wide" | "tall", DiagramLayout> = {
  wide: {
    width: 560,
    height: 380,
    node: { w: 112, h: 56 },
    frame: { x: 140, y: 14, w: 416, h: 262 },
    nodes: {
      web: [8, 40],
      mobile: [8, 200],
      nginx: [152, 120],
      ws: [296, 40],
      express: [296, 200],
      redis: [440, 200],
      postgres: [440, 310],
    },
  },
  tall: {
    width: 300,
    height: 470,
    node: { w: 134, h: 52 },
    frame: { x: 2, y: 84, w: 296, h: 282 },
    nodes: {
      web: [8, 8],
      mobile: [158, 8],
      nginx: [83, 106],
      ws: [8, 206],
      express: [158, 206],
      redis: [158, 306],
      postgres: [158, 410],
    },
  },
};

const EDGES = [
  { id: "web-nginx", from: "web", to: "nginx" },
  { id: "mobile-nginx", from: "mobile", to: "nginx" },
  { id: "nginx-ws", from: "nginx", to: "ws" },
  { id: "nginx-express", from: "nginx", to: "express" },
  { id: "express-redis", from: "express", to: "redis" },
  { id: "redis-postgres", from: "redis", to: "postgres" },
];

const SCENARIOS = {
  analytics: {
    label: "Analytics & Habits",
    summary:
      "Habit completions and study logs pass through Nginx and Express (30+ REST APIs), update the Redis analytics cache (-80% DB load), and persist across 10 Prisma models in PostgreSQL.",
    nodes: ["mobile", "nginx", "express", "redis", "postgres"],
    edges: ["mobile-nginx", "nginx-express", "express-redis", "redis-postgres"],
  },
  timer: {
    label: "WebSocket Timer",
    summary:
      "Starting or pausing a Pomodoro session upgrades through Nginx to the stateful WebSocket Hub, keeping all connected devices synchronized to the second.",
    nodes: ["web", "nginx", "ws"],
    edges: ["web-nginx", "nginx-ws"],
  },
} as const;

type ScenarioKey = keyof typeof SCENARIOS;

const STEP = 0.9;

function Packets({ edges }: { edges: { id: string; d: string }[] }) {
  const cycle = edges.length * STEP + 0.8;

  return (
    <>
      {edges.map((edge, i) => {
        const start = (i * STEP) / cycle;
        const end = ((i + 1) * STEP) / cycle;
        return (
          <circle key={edge.id} r="3" fill="#fff" opacity="0">
            <animateMotion
              dur={`${cycle}s`}
              repeatCount="indefinite"
              path={edge.d}
              keyPoints="0;0;1;1"
              keyTimes={`0;${start};${end};1`}
              calcMode="linear"
            />
            <animate
              attributeName="opacity"
              dur={`${cycle}s`}
              repeatCount="indefinite"
              values="0;1;1;0"
              keyTimes={`0;${start};${end};1`}
              calcMode="discrete"
            />
          </circle>
        );
      })}
    </>
  );
}

export function OpenPumtaDiagram() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isNarrow = useMediaQuery("(max-width: 639px)");
  const layout = LAYOUTS[isNarrow ? "tall" : "wide"];
  const edges = EDGES.map((edge) => ({
    ...edge,
    d: edgePath(
      boxFor(layout, edge.from),
      boxFor(layout, edge.to),
      isNarrow ? "vertical" : "horizontal",
    ),
  }));
  const [scenarioId, setScenarioId] = useState<ScenarioKey>("analytics");
  const [activeId, setActiveId] = useState<string | null>(null);
  const scenario = SCENARIOS[scenarioId];
  const activeNode = NODES.find((node) => node.id === activeId);

  const selectNode = (id: string) => {
    setActiveId(id);
    if (!(scenario.nodes as readonly string[]).includes(id)) {
      const matchingKey = (Object.keys(SCENARIOS) as ScenarioKey[]).find((key) =>
        (SCENARIOS[key].nodes as readonly string[]).includes(id),
      );
      if (matchingKey) setScenarioId(matchingKey);
    }
  };

  return (
    <div className="relative z-10 w-full flex flex-col gap-6">
      <div
        role="group"
        aria-label="Choose a request to trace"
        className="flex flex-wrap gap-2"
      >
        {(Object.entries(SCENARIOS) as [ScenarioKey, (typeof SCENARIOS)[ScenarioKey]][]).map(
          ([id, { label }]) => (
            <button
              key={id}
              type="button"
              aria-pressed={scenarioId === id}
              onClick={() => {
                setScenarioId(id);
                setActiveId(null);
              }}
              className={`px-3 py-1.5 rounded-full border font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer ${
                scenarioId === id
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {label}
            </button>
          ),
        )}
      </div>

      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="w-full h-auto"
        role="group"
        aria-label="OpenPumTa production architecture: Web and mobile clients connect through Nginx to a WebSocket timer hub and Express REST API backed by Redis and PostgreSQL inside a Linux VPS"
        onMouseLeave={() => setActiveId(null)}
      >
        {layout.frame && (
          <>
            <rect
              x={layout.frame.x}
              y={layout.frame.y}
              width={layout.frame.w}
              height={layout.frame.h}
              rx="10"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.12"
              strokeDasharray="3 5"
            />
            <text
              x={layout.frame.x + 12}
              y={layout.frame.y + 18}
              fill="#fff"
              fillOpacity="0.4"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="2"
            >
              DOCKER COMPOSE · LINUX VPS
            </text>
          </>
        )}

        {edges.map((edge, i) => (
          <motion.path
            key={edge.id}
            d={edge.d}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 + i * 0.1 }}
          />
        ))}

        {edges.map((edge) => (
          <path
            key={edge.id}
            d={edge.d}
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeOpacity={
              (scenario.edges as readonly string[]).includes(edge.id) ? 0.55 : 0
            }
            style={{ transition: "stroke-opacity 0.4s" }}
          />
        ))}

        {!prefersReducedMotion && (
          <g key={scenarioId}>
            <Packets
              edges={scenario.edges
                .map((id) => edges.find((edge) => edge.id === id))
                .filter((e): e is NonNullable<typeof e> => Boolean(e))}
            />
          </g>
        )}

        {NODES.map((node, i) => {
          const onRoute = (scenario.nodes as readonly string[]).includes(node.id);
          const isActive = node.id === activeId;
          const box = boxFor(layout, node.id);
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <g
                role="button"
                tabIndex={0}
                aria-label={`${node.label.toLowerCase()}: ${node.info}`}
                aria-pressed={isActive}
                onMouseEnter={() => selectNode(node.id)}
                onFocus={() => selectNode(node.id)}
                onClick={() => selectNode(node.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectNode(node.id);
                  }
                }}
                className="cursor-pointer outline-none"
                style={{ opacity: onRoute ? 1 : 0.4, transition: "opacity 0.4s" }}
              >
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  rx="6"
                  fill={isActive ? "#181818" : "#0E0E0E"}
                  stroke={isActive ? "#fff" : onRoute ? "#666" : "#333"}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: "stroke 0.3s, fill 0.3s" }}
                />
                <text
                  x={box.x + box.w / 2}
                  y={box.y + box.h / 2 - 3}
                  textAnchor="middle"
                  fill="#EEE"
                  fontFamily="monospace"
                  fontSize="10.5"
                >
                  {node.label}
                </text>
                <text
                  x={box.x + box.w / 2}
                  y={box.y + box.h / 2 + 12}
                  textAnchor="middle"
                  fill="#888"
                  fontFamily="monospace"
                  fontSize="9"
                >
                  {node.sub}
                </text>
              </g>
            </motion.g>
          );
        })}
      </svg>

      <div aria-live="polite" className="min-h-[88px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeNode?.id ?? scenarioId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-2">
              {activeNode ? activeNode.label : `Trace · ${scenario.label}`}
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              {activeNode ? activeNode.info : scenario.summary}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
