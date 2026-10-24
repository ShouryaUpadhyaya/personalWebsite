"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { boxFor, DiagramLayout, edgePath } from "@/lib/diagram";

interface DiagramNodeSpec {
  id: string;
  label: string;
  sub: string;
  info: string;
}

interface DiagramEdgeSpec {
  id: string;
  from: string;
  to: string;
}

interface DiagramScenarioSpec {
  label: string;
  summary: string;
  nodes: string[];
  edges: string[];
}

interface ProjectDiagramConfig {
  ariaLabel: string;
  frameLabel: string;
  layouts: Record<"wide" | "tall", DiagramLayout>;
  nodes: DiagramNodeSpec[];
  edges: DiagramEdgeSpec[];
  scenarios: Record<string, DiagramScenarioSpec>;
  defaultScenario: string;
}

const SHARED_LAYOUTS: Record<"wide" | "tall", DiagramLayout> = {
  wide: {
    width: 560,
    height: 380,
    node: { w: 112, h: 56 },
    frame: { x: 140, y: 14, w: 416, h: 262 },
    nodes: {
      n1: [8, 40],
      n2: [8, 200],
      n3: [152, 120],
      n4: [296, 40],
      n5: [296, 200],
      n6: [440, 200],
      n7: [440, 310],
    },
  },
  tall: {
    width: 300,
    height: 470,
    node: { w: 134, h: 52 },
    frame: { x: 2, y: 84, w: 296, h: 282 },
    nodes: {
      n1: [8, 8],
      n2: [158, 8],
      n3: [83, 106],
      n4: [8, 206],
      n5: [158, 206],
      n6: [158, 306],
      n7: [158, 410],
    },
  },
};

const SHARED_EDGES: DiagramEdgeSpec[] = [
  { id: "e1", from: "n1", to: "n3" },
  { id: "e2", from: "n2", to: "n3" },
  { id: "e3", from: "n3", to: "n4" },
  { id: "e4", from: "n3", to: "n5" },
  { id: "e5", from: "n5", to: "n6" },
  { id: "e6", from: "n6", to: "n7" },
];

export const PROJECT_DIAGRAMS: Record<string, ProjectDiagramConfig> = {
  openpumta: {
    ariaLabel:
      "OpenPumTa production architecture: Web and mobile clients connect through Nginx to a WebSocket timer hub and Express REST API backed by Redis and PostgreSQL inside a Linux VPS",
    frameLabel: "DOCKER COMPOSE · LINUX VPS",
    layouts: SHARED_LAYOUTS,
    edges: SHARED_EDGES,
    defaultScenario: "analytics",
    nodes: [
      {
        id: "n1",
        label: "WEB CLIENT",
        sub: "Next.js App",
        info: "Desktop and mobile clients connect over HTTPS for dashboard routes and upgrade to WSS for live Pomodoro timer synchronization.",
      },
      {
        id: "n2",
        label: "SECOND DEVICE",
        sub: "Cross-device sync",
        info: "A phone or second browser tab subscribes to the user's active focus room and stays synchronized to the server's authoritative clock.",
      },
      {
        id: "n3",
        label: "NGINX PROXY",
        sub: "TLS · routing",
        info: "Single entry point on the Linux VPS: terminates SSL, routes /api to Express, and upgrades /ws connections with zero cross-cloud hops.",
      },
      {
        id: "n4",
        label: "WS TIMER HUB",
        sub: "stateful rooms",
        info: "Authoritative Pomodoro state machine: broadcasts start, pause, and completion deltas so sleeping browser tabs never drift or lie.",
      },
      {
        id: "n5",
        label: "EXPRESS API",
        sub: "30+ REST · Zod",
        info: "30+ Zod-validated REST endpoints handling 21-day habit streaks, study sessions, tasks, and AI-generated daily coaching reviews.",
      },
      {
        id: "n6",
        label: "REDIS CACHE",
        sub: "-80% DB load",
        info: "Write-through analytics cache storing streak heatmaps and study-hour rollups across 10,000+ visits, cutting PostgreSQL read load by 80%.",
      },
      {
        id: "n7",
        label: "POSTGRESQL",
        sub: "10 Prisma models",
        info: "Primary relational store for 300+ registered users, habit chains, focus logs, and Prometheus-monitored transactional writes.",
      },
    ],
    scenarios: {
      analytics: {
        label: "Analytics & Habits",
        summary:
          "Habit completions and study logs pass through Nginx and Express (30+ REST APIs), update the Redis analytics cache (-80% DB load), and persist across 10 Prisma models in PostgreSQL.",
        nodes: ["n2", "n3", "n5", "n6", "n7"],
        edges: ["e2", "e4", "e5", "e6"],
      },
      timer: {
        label: "WebSocket Timer",
        summary:
          "Starting or pausing a Pomodoro session upgrades through Nginx to the stateful WebSocket Hub, keeping all connected devices synchronized to the second.",
        nodes: ["n1", "n3", "n4"],
        edges: ["e1", "e3"],
      },
    },
  },
  voiceshield: {
    ariaLabel:
      "VoiceShield AI real-time audio pipeline: 48 kHz PCM16 frames pass through the Node.js WebSocket gateway and byte-conserving 3s ring buffer into parallel acoustic deepfake and Whisper scam-risk inference while queuing PostgreSQL writes off-path",
    frameLabel: "STREAMING GATEWAY · FASTAPI ML",
    layouts: SHARED_LAYOUTS,
    edges: SHARED_EDGES,
    defaultScenario: "inference",
    nodes: [
      {
        id: "n1",
        label: "CALLVAULT",
        sub: "48kHz PCM16",
        info: "Android CallVault client streams live 48 kHz mono 16-bit PCM call frames over a binary WebSocket connection.",
      },
      {
        id: "n2",
        label: "SIP STREAM",
        sub: "FreeSWITCH",
        info: "Telephony SIP bridge feeds raw call audio into the same Node.js/TypeScript media ingest gateway.",
      },
      {
        id: "n3",
        label: "3s RING BUFFER",
        sub: "byte-invariant",
        info: "Reassembles arbitrary network frames into exact 3-second (288,000-byte) ordered windows and verifies 100% byte conservation.",
      },
      {
        id: "n4",
        label: "ASYNC DB QUEUE",
        sub: "off-path write",
        info: "Decouples PostgreSQL audit and telemetry writes off the hot audio thread so disk I/O never drops or delays call frames.",
      },
      {
        id: "n5",
        label: "WHISPER + ML",
        sub: "RawNet2 · ONNX",
        info: "Persistent WebSocket worker running acoustic spoof scoring (RawNet2/WavLM) in parallel with OpenAI Whisper transcription.",
      },
      {
        id: "n6",
        label: "SCAM AGENT",
        sub: "1.1s median CPU",
        info: "Fuses acoustic deepfake probabilities and transcript intent rules to compute a calibrated scam-risk verdict in ~1.1s on CPU.",
      },
      {
        id: "n7",
        label: "SOCKET.IO UI",
        sub: "Next.js live alert",
        info: "Streams per-window spoof probabilities, transcripts, and scam alerts live to the operator dashboard.",
      },
    ],
    scenarios: {
      inference: {
        label: "Live Scam Trace",
        summary:
          "48 kHz PCM16 audio is assembled into 3-second byte-verified chunks, evaluated by RawNet2/ONNX + Whisper in ~1.1s on CPU, and streamed to the Next.js dashboard via Socket.IO.",
        nodes: ["n2", "n3", "n5", "n6", "n7"],
        edges: ["e2", "e4", "e5", "e6"],
      },
      offpath: {
        label: "Off-Path Persistence",
        summary:
          "As each 3-second window is emitted by the ring buffer, call metadata and chunk audit logs are queued asynchronously to PostgreSQL off the real-time audio path.",
        nodes: ["n1", "n3", "n4"],
        edges: ["e1", "e3"],
      },
    },
  },
  mossx: {
    ariaLabel:
      "Moss X e-commerce architecture: storefront and Razorpay webhooks route through the Express API gateway to Redis catalog cache, HMAC payment verifier, and MongoDB aggregation pipelines",
    frameLabel: "EXPRESS MODULAR MONOLITH",
    layouts: SHARED_LAYOUTS,
    edges: SHARED_EDGES,
    defaultScenario: "checkout",
    nodes: [
      {
        id: "n1",
        label: "STOREFRONT",
        sub: "<50ms React SPA",
        info: "React storefront serving 100+ users with sub-50ms homepage load times, dynamic catalog filters, and cart flows.",
      },
      {
        id: "n2",
        label: "RAZORPAY",
        sub: "signed webhook",
        info: "Razorpay dispatches payment capture webhooks signed with HMAC-SHA256 alongside client checkout callbacks.",
      },
      {
        id: "n3",
        label: "API GATEWAY",
        sub: "Express · Auth",
        info: "Central Express gateway routing catalog queries, cart mutations, and payment webhooks across isolated domain services.",
      },
      {
        id: "n4",
        label: "REDIS CACHE",
        sub: "1.5s → 150ms",
        info: "Caches filtered product listings and catalog aggregations in Redis, slashing response latency by 90% (from 1.5s to 150ms).",
      },
      {
        id: "n5",
        label: "WEBHOOK GUARD",
        sub: "HMAC · idempotent",
        info: "Verifies cryptographic HMAC signatures and enforces unique order idempotency keys so retries never double-charge.",
      },
      {
        id: "n6",
        label: "MONGODB",
        sub: "orders · catalog",
        info: "Persists transactional order states, customer accounts, and product inventory across indexed collections.",
      },
      {
        id: "n7",
        label: "AGGREGATIONS",
        sub: "sales analytics",
        info: "Multi-stage MongoDB aggregation pipelines computing real-time admin revenue breakdowns and product recommendations.",
      },
    ],
    scenarios: {
      checkout: {
        label: "Idempotent Payment",
        summary:
          "Razorpay webhooks are verified via HMAC-SHA256 and idempotency keys in the Express gateway, committed once to MongoDB, and rolled up into admin sales analytics.",
        nodes: ["n2", "n3", "n5", "n6", "n7"],
        edges: ["e2", "e4", "e5", "e6"],
      },
      catalog: {
        label: "Cached Catalog",
        summary:
          "Storefront product listing requests hit the Redis write-aside cache through the Express gateway, returning in 150ms instead of 1.5s.",
        nodes: ["n1", "n3", "n4"],
        edges: ["e1", "e3"],
      },
    },
  },
  crms: {
    ariaLabel:
      "CRMS Cloud Control Plane architecture: tenant API calls and Docker telemetry flow through PostgreSQL 16 Row-Level Security, SELECT FOR UPDATE stored procedures, and 1M+ row BRIN-indexed partitions",
    frameLabel: "POSTGRESQL 16 ENGINE · 3NF/BCNF",
    layouts: SHARED_LAYOUTS,
    edges: SHARED_EDGES,
    defaultScenario: "telemetry",
    nodes: [
      {
        id: "n1",
        label: "CLOUD CONSOLE",
        sub: "Tenant API req",
        info: "Multi-tenant React console issuing VM provisioning, quota allocation, and SQL lab requests.",
      },
      {
        id: "n2",
        label: "DOCKER PROXY",
        sub: "30s container stat",
        info: "Read-only tecnativa/docker-socket-proxy streaming live container CPU, memory, and I/O stats every 30 seconds.",
      },
      {
        id: "n3",
        label: "RLS GATEWAY",
        sub: "SET LOCAL org_id",
        info: "Wraps every transaction with SET LOCAL app.current_org_id so PostgreSQL 16 Row-Level Security isolates tenants at the engine level.",
      },
      {
        id: "n4",
        label: "QUOTA LOCK",
        sub: "SELECT FOR UPDATE",
        info: "PL/pgSQL sp_allocate_resource locks the parent organization quota row, preventing concurrent check-then-act over-allocation races.",
      },
      {
        id: "n5",
        label: "INGEST PROC",
        sub: "sp_ingest_metrics",
        info: "Transactional stored procedure validating and routing incoming container telemetry into time-range partitions.",
      },
      {
        id: "n6",
        label: "1M+ PARTITIONS",
        sub: "BRIN · GIN · 0.2ms",
        info: "Range-partitioned usage_metrics table (1,000,000+ rows) indexed with BRIN and GIN to cut time-range query latency from 42ms to 0.2ms.",
      },
      {
        id: "n7",
        label: "PG_NOTIFY SSE",
        sub: "live alert stream",
        info: "Database triggers fire pg_notify on quota/CPU spikes, streaming zero-polling Server-Sent Events straight to the React UI.",
      },
    ],
    scenarios: {
      telemetry: {
        label: "1M-Row Telemetry",
        summary:
          "Live Docker stats ingest via PL/pgSQL into 1M+ BRIN/GIN-indexed partitions (queried in 0.2ms vs 42ms) and push real-time alerts via pg_notify SSE.",
        nodes: ["n2", "n3", "n5", "n6", "n7"],
        edges: ["e2", "e4", "e5", "e6"],
      },
      quota: {
        label: "RLS & Quota Lock",
        summary:
          "Tenant provisioning calls set app.current_org_id for Row-Level Security and acquire a pessimistic SELECT FOR UPDATE lock so parallel requests never exceed vCPU/RAM quotas.",
        nodes: ["n1", "n3", "n4"],
        edges: ["e1", "e3"],
      },
    },
  },
  "job-agent": {
    ariaLabel:
      "Job Agent architecture: 8+ ATS feeds and Gmail OAuth threads flow through the Express 5 hub into the 12-class email classifier, 0-100 deterministic multi-resume scorer, Prisma PostgreSQL store, and guarded Playwright runner",
    frameLabel: "EXPRESS 5 · PRISMA · PLAYWRIGHT",
    layouts: SHARED_LAYOUTS,
    edges: SHARED_EDGES,
    defaultScenario: "discovery",
    nodes: [
      {
        id: "n1",
        label: "GMAIL OAUTH",
        sub: "recruiter threads",
        info: "Syncs inbound recruiter and ATS emails via Gmail OAuth incremental history tokens.",
      },
      {
        id: "n2",
        label: "8+ ATS FEEDS",
        sub: "Greenhouse · Lever",
        info: "Polls Greenhouse, Lever, Ashby, Workday, and curated boards, normalizing postings into a unified schema.",
      },
      {
        id: "n3",
        label: "INGEST HUB",
        sub: "Express 5 · dedup",
        info: "Deduplicates job postings and correlates email threads against existing application records.",
      },
      {
        id: "n4",
        label: "12-CLASS NLP",
        sub: "forward-only state",
        info: "Classifies recruiter emails into 12 categories (OA, Interview, Offer, Rejection) and enforces monotonic stage transitions.",
      },
      {
        id: "n5",
        label: "RESUME SCORER",
        sub: "0–100 deterministic",
        info: "Evaluates each job against multiple LaTeX/PDF resumes using a deterministic rubric (+35 skills, +20 role, +15 domain) to select the best CV.",
      },
      {
        id: "n6",
        label: "POSTGRES + UI",
        sub: "Next.js 16 · 7 tabs",
        info: "Persists ranked matches and score breakdowns in PostgreSQL and surfaces them in a 7-tab Next.js 16 control center.",
      },
      {
        id: "n7",
        label: "PLAYWRIGHT",
        sub: "dry-run · SSE logs",
        info: "Guarded browser automation runner that prefills ATS forms in dry-run mode by default and streams live SSE execution logs.",
      },
    ],
    scenarios: {
      discovery: {
        label: "Score & Auto-Apply",
        summary:
          "Postings from 8+ ATS boards are deduplicated, scored 0–100 deterministically against multiple resumes, reviewed in the Next.js 16 UI, and executed via dry-run Playwright.",
        nodes: ["n2", "n3", "n5", "n6", "n7"],
        edges: ["e2", "e4", "e5", "e6"],
      },
      gmail: {
        label: "Gmail State Sync",
        summary:
          "Inbound Gmail OAuth threads pass through the 12-class classifier, advancing application pipeline stages strictly forward without regression.",
        nodes: ["n1", "n3", "n4"],
        edges: ["e1", "e3"],
      },
    },
  },
  "golang-lake-scanner": {
    ariaLabel:
      "GoLakeScanner concurrent pipeline: nested data lake files pass through the streaming SHA-256 walker, skipping unchanged files and dispatching modified files to a generic bounded Go worker pool with 30s context timeouts and pgx/v5 PostgreSQL cataloging",
    frameLabel: "GO CONCURRENCY · POOL.RUN[IN, OUT]",
    layouts: SHARED_LAYOUTS,
    edges: SHARED_EDGES,
    defaultScenario: "worker",
    nodes: [
      {
        id: "n1",
        label: "UNCHANGED",
        sub: "matching digest",
        info: "Files whose streaming SHA-256 digest matches the PostgreSQL catalog bypass deep inspection immediately.",
      },
      {
        id: "n2",
        label: "NEW / MODIFIED",
        sub: "PDFs · scans · raw",
        info: "Newly discovered or modified files in the nested data lake are queued for Phase 2 deep classification.",
      },
      {
        id: "n3",
        label: "SHA-256 WALKER",
        sub: "64KB stream hash",
        info: "Phase 1 incremental walker: computes streaming 64 KB SHA-256 hashes in O(1) memory and diffs state against PostgreSQL.",
      },
      {
        id: "n4",
        label: "FAST SKIP",
        sub: "0 probe overhead",
        info: "Marks unchanged files as verified in milliseconds so subsequent runs over terabyte lakes only process deltas.",
      },
      {
        id: "n5",
        label: "WORKER POOL",
        sub: "pool.Run[In, Out]",
        info: "Generic bounded goroutine pool with channel backpressure and SIGINT/SIGTERM signal propagation.",
      },
      {
        id: "n6",
        label: "FILE PROBES",
        sub: "30s ctx timeout",
        info: "Magic-byte and PDF /Font & /FlateDecode stream probes isolated inside a 30-second context.WithTimeout deadline.",
      },
      {
        id: "n7",
        label: "PGX/V5 CATALOG",
        sub: "PostgreSQL state",
        info: "Commits file classifications atomically via pgx/v5 connection pools with 100% resumable progress on interrupt.",
      },
    ],
    scenarios: {
      worker: {
        label: "Phase 2: Worker Pool",
        summary:
          "New and modified files flow from the SHA-256 walker into the generic pool.Run[In, Out] goroutine pool, run 30s timeout-isolated PDF/magic-byte probes, and commit to PostgreSQL.",
        nodes: ["n2", "n3", "n5", "n6", "n7"],
        edges: ["e2", "e4", "e5", "e6"],
      },
      skip: {
        label: "Phase 1: Incremental Skip",
        summary:
          "Files whose streaming SHA-256 hash matches the catalog short-circuit in Phase 1, avoiding redundant parsing across large data lakes.",
        nodes: ["n1", "n3", "n4"],
        edges: ["e1", "e3"],
      },
    },
  },
  cookoff: {
    ariaLabel:
      "Cook Off 10.0 competitive coding portal architecture: CodeMirror 6 keystrokes and submissions flow through the Zustand store to instant LocalStorage persistence and the authenticated Axios judge pipeline",
    frameLabel: "CODEMIRROR 6 · 3-LAYER PERSISTENCE",
    layouts: SHARED_LAYOUTS,
    edges: SHARED_EDGES,
    defaultScenario: "submit",
    nodes: [
      {
        id: "n1",
        label: "KEYSTROKES",
        sub: "CodeMirror 6 IDE",
        info: "1,000+ contestants write C++, Python, Java, and JS solutions inside a custom CodeMirror 6 editor.",
      },
      {
        id: "n2",
        label: "RUN / SUBMIT",
        sub: "40% peak burst",
        info: "Contestants trigger sample test runs and final problem submissions during high-concurrency contest windows.",
      },
      {
        id: "n3",
        label: "ZUSTAND STORE",
        sub: "state orchestrator",
        info: "Central in-memory store coordinating active problem buffers, language selection, and execution status.",
      },
      {
        id: "n4",
        label: "LOCALSTORAGE",
        sub: "write-through sync",
        info: "Synchronous local write-through cache that recovers code buffers in 0ms if a browser tab refreshes or crashes.",
      },
      {
        id: "n5",
        label: "AXIOS PIPELINE",
        sub: "JWT · retry queue",
        info: "Request/response interceptors handling silent JWT refresh, rate-limit backoff, and payload serialization.",
      },
      {
        id: "n6",
        label: "MONGODB SYNC",
        sub: "cloud checkpoint",
        info: "Persists contestant code checkpoints and submission records in MongoDB with zero data loss.",
      },
      {
        id: "n7",
        label: "JUDGE VERDICT",
        sub: "live scoreboard",
        info: "Streams test-case execution verdicts, memory/time metrics, and leaderboard updates back to the IDE.",
      },
    ],
    scenarios: {
      submit: {
        label: "Contest Submission",
        summary:
          "Submissions pass from Zustand through authenticated Axios retry interceptors, checkpoint to MongoDB, and return live judge verdicts under 40% concurrent load.",
        nodes: ["n2", "n3", "n5", "n6", "n7"],
        edges: ["e2", "e4", "e5", "e6"],
      },
      autosave: {
        label: "Zero-Loss Autosave",
        summary:
          "Every keystroke in CodeMirror 6 updates the Zustand store and writes through to LocalStorage, guaranteeing instant recovery on tab reload.",
        nodes: ["n1", "n3", "n4"],
        edges: ["e1", "e3"],
      },
    },
  },
};

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

export function ProjectArchitectureDiagram({ slug }: { slug: string }) {
  const config = PROJECT_DIAGRAMS[slug] ?? PROJECT_DIAGRAMS.openpumta;
  const prefersReducedMotion = usePrefersReducedMotion();
  const isNarrow = useMediaQuery("(max-width: 639px)");
  const layout = config.layouts[isNarrow ? "tall" : "wide"];
  const edges = config.edges.map((edge) => ({
    ...edge,
    d: edgePath(
      boxFor(layout, edge.from),
      boxFor(layout, edge.to),
      isNarrow ? "vertical" : "horizontal",
    ),
  }));

  const [scenarioId, setScenarioId] = useState<string>(config.defaultScenario);
  const [activeId, setActiveId] = useState<string | null>(null);
  const scenario =
    config.scenarios[scenarioId] ??
    config.scenarios[config.defaultScenario];
  const activeNode = config.nodes.find((node) => node.id === activeId);

  const selectNode = (id: string) => {
    setActiveId(id);
    if (!scenario.nodes.includes(id)) {
      const matchingKey = Object.keys(config.scenarios).find((key) =>
        config.scenarios[key].nodes.includes(id),
      );
      if (matchingKey) setScenarioId(matchingKey);
    }
  };

  return (
    <div className="relative z-10 w-full flex flex-col gap-6">
      <div
        role="group"
        aria-label={`Choose a request to trace in ${slug}`}
        className="flex flex-wrap gap-2"
      >
        {Object.entries(config.scenarios).map(([id, { label }]) => (
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
        ))}
      </div>

      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="w-full h-auto"
        role="group"
        aria-label={config.ariaLabel}
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
              {config.frameLabel}
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
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.2 + i * 0.1,
            }}
          />
        ))}

        {edges.map((edge) => (
          <path
            key={edge.id}
            d={edge.d}
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeOpacity={scenario.edges.includes(edge.id) ? 0.55 : 0}
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

        {config.nodes.map((node, i) => {
          const onRoute = scenario.nodes.includes(node.id);
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
                style={{
                  opacity: onRoute ? 1 : 0.4,
                  transition: "opacity 0.4s",
                }}
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
                  fontSize="10"
                >
                  {node.label}
                </text>
                <text
                  x={box.x + box.w / 2}
                  y={box.y + box.h / 2 + 12}
                  textAnchor="middle"
                  fill="#888"
                  fontFamily="monospace"
                  fontSize="8.5"
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
