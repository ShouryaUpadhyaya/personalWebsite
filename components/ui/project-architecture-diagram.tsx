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

export const PROJECT_DIAGRAMS: Record<string, ProjectDiagramConfig> = {
  openpumta: {
    ariaLabel:
      "OpenPumTa production architecture: Web and mobile clients connect through Nginx to a WebSocket timer hub and Express REST API backed by Redis and PostgreSQL inside a Linux VPS",
    frameLabel: "DOCKER COMPOSE · LINUX VPS",
    defaultScenario: "analytics",
    layouts: {
      wide: {
        width: 580,
        height: 360,
        node: { w: 118, h: 54 },
        frame: { x: 142, y: 12, w: 430, h: 336 },
        nodes: {
          web: [8, 64],
          mobile: [8, 224],
          nginx: [154, 144],
          ws: [300, 46],
          express: [300, 224],
          redis: [444, 136],
          postgres: [444, 268],
        },
      },
      tall: {
        width: 300,
        height: 470,
        node: { w: 132, h: 50 },
        frame: { x: 4, y: 82, w: 292, h: 380 },
        nodes: {
          web: [8, 10],
          mobile: [160, 10],
          nginx: [84, 104],
          ws: [8, 198],
          express: [160, 198],
          redis: [160, 296],
          postgres: [160, 394],
        },
      },
    },
    edges: [
      { id: "web-nginx", from: "web", to: "nginx" },
      { id: "mobile-nginx", from: "mobile", to: "nginx" },
      { id: "nginx-ws", from: "nginx", to: "ws" },
      { id: "nginx-express", from: "nginx", to: "express" },
      { id: "ws-redis", from: "ws", to: "redis" },
      { id: "express-redis", from: "express", to: "redis" },
      { id: "express-postgres", from: "express", to: "postgres" },
    ],
    nodes: [
      {
        id: "web",
        label: "WEB CLIENT",
        sub: "Next.js App",
        info: "Desktop and mobile clients connect over HTTPS for dashboard routes and upgrade to WSS for live Pomodoro timer synchronization.",
      },
      {
        id: "mobile",
        label: "SECOND DEVICE",
        sub: "Cross-tab sync",
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
    ],
    scenarios: {
      analytics: {
        label: "Analytics & Habits",
        summary:
          "Habit completions and study logs pass through Nginx and Express (30+ REST APIs), update the Redis analytics cache (-80% DB load), and persist across 10 Prisma models in PostgreSQL.",
        nodes: ["mobile", "nginx", "express", "redis", "postgres"],
        edges: ["mobile-nginx", "nginx-express", "express-redis", "express-postgres"],
      },
      timer: {
        label: "WebSocket Timer",
        summary:
          "Starting or pausing a Pomodoro session upgrades through Nginx to the stateful WebSocket Hub and caches live room state in Redis so all connected devices stay synchronized.",
        nodes: ["web", "nginx", "ws", "redis"],
        edges: ["web-nginx", "nginx-ws", "ws-redis"],
      },
    },
  },

  voiceshield: {
    ariaLabel:
      "VoiceShield AI real-time audio pipeline: 48 kHz PCM16 frames pass through the byte-conserving 3s ring buffer into parallel acoustic deepfake and Whisper scam-risk inference while queuing PostgreSQL writes off-path",
    frameLabel: "STREAMING GATEWAY · FASTAPI ML",
    defaultScenario: "inference",
    layouts: {
      wide: {
        width: 580,
        height: 360,
        node: { w: 118, h: 54 },
        frame: { x: 142, y: 12, w: 430, h: 336 },
        nodes: {
          stream: [8, 144],
          ring: [154, 144],
          acoustic: [300, 38],
          whisper: [300, 144],
          dbqueue: [300, 268],
          agent: [444, 90],
          ui: [444, 210],
        },
      },
      tall: {
        width: 300,
        height: 470,
        node: { w: 132, h: 50 },
        frame: { x: 4, y: 78, w: 292, h: 384 },
        nodes: {
          stream: [84, 10],
          ring: [84, 96],
          acoustic: [8, 190],
          whisper: [160, 190],
          agent: [84, 286],
          dbqueue: [8, 386],
          ui: [160, 386],
        },
      },
    },
    edges: [
      { id: "stream-ring", from: "stream", to: "ring" },
      { id: "ring-acoustic", from: "ring", to: "acoustic" },
      { id: "ring-whisper", from: "ring", to: "whisper" },
      { id: "ring-db", from: "ring", to: "dbqueue" },
      { id: "acoustic-agent", from: "acoustic", to: "agent" },
      { id: "whisper-agent", from: "whisper", to: "agent" },
      { id: "agent-ui", from: "agent", to: "ui" },
    ],
    nodes: [
      {
        id: "stream",
        label: "48kHz PCM16",
        sub: "CallVault · SIP",
        info: "Android CallVault client and FreeSWITCH SIP bridge stream live 48 kHz mono 16-bit PCM call frames over binary WebSockets.",
      },
      {
        id: "ring",
        label: "3s RING BUFFER",
        sub: "byte-invariant",
        info: "Reassembles arbitrary network frames into exact 3-second (288,000-byte) ordered windows and verifies 100% byte conservation.",
      },
      {
        id: "acoustic",
        label: "ACOUSTIC ML",
        sub: "RawNet2 · ONNX",
        info: "Evaluates raw 3-second audio waveforms with RawNet2, WavLM, and SpeechBrain (ECAPA-TDNN) to detect synthetic voice clones.",
      },
      {
        id: "whisper",
        label: "WHISPER STT",
        sub: "live transcript",
        info: "Transcribes each 3-second window over a persistent FastAPI WebSocket to extract urgency, coercion, and financial scam cues.",
      },
      {
        id: "dbqueue",
        label: "ASYNC DB QUEUE",
        sub: "off-path write",
        info: "Decouples PostgreSQL audit and telemetry writes off the hot audio thread so disk I/O never drops or delays call frames.",
      },
      {
        id: "agent",
        label: "SCAM AGENT",
        sub: "1.1s median CPU",
        info: "Fuses acoustic deepfake probabilities and transcript intent rules to compute a calibrated scam-risk verdict in ~1.1s on CPU.",
      },
      {
        id: "ui",
        label: "SOCKET.IO UI",
        sub: "Next.js alert",
        info: "Streams per-window spoof probabilities, transcripts, and scam alerts live to the operator dashboard.",
      },
    ],
    scenarios: {
      inference: {
        label: "Dual-Model Scam Trace",
        summary:
          "48 kHz PCM16 audio is assembled into 3-second byte-verified chunks, evaluated in parallel by RawNet2/ONNX and Whisper in ~1.1s on CPU, and streamed to the Next.js dashboard.",
        nodes: ["stream", "ring", "acoustic", "whisper", "agent", "ui"],
        edges: [
          "stream-ring",
          "ring-acoustic",
          "ring-whisper",
          "acoustic-agent",
          "whisper-agent",
          "agent-ui",
        ],
      },
      offpath: {
        label: "Off-Path DB Queue",
        summary:
          "As each 3-second window leaves the ring buffer, call metadata and chunk audit logs are queued asynchronously to PostgreSQL off the real-time audio path.",
        nodes: ["stream", "ring", "dbqueue"],
        edges: ["stream-ring", "ring-db"],
      },
    },
  },

  mossx: {
    ariaLabel:
      "Moss X e-commerce architecture: storefront and Razorpay webhooks route through the Express API gateway to Redis catalog cache, HMAC payment verifier, and MongoDB aggregation pipelines",
    frameLabel: "EXPRESS MODULAR MONOLITH",
    defaultScenario: "checkout",
    layouts: {
      wide: {
        width: 580,
        height: 360,
        node: { w: 118, h: 54 },
        frame: { x: 142, y: 12, w: 430, h: 336 },
        nodes: {
          spa: [8, 68],
          razorpay: [8, 232],
          gateway: [154, 150],
          redis: [300, 44],
          guard: [300, 232],
          mongo: [444, 136],
          analytics: [444, 268],
        },
      },
      tall: {
        width: 300,
        height: 470,
        node: { w: 132, h: 50 },
        frame: { x: 4, y: 82, w: 292, h: 380 },
        nodes: {
          spa: [8, 10],
          razorpay: [160, 10],
          gateway: [84, 104],
          redis: [8, 198],
          guard: [160, 198],
          mongo: [160, 296],
          analytics: [160, 394],
        },
      },
    },
    edges: [
      { id: "spa-gateway", from: "spa", to: "gateway" },
      { id: "rzp-gateway", from: "razorpay", to: "gateway" },
      { id: "gateway-redis", from: "gateway", to: "redis" },
      { id: "gateway-guard", from: "gateway", to: "guard" },
      { id: "guard-mongo", from: "guard", to: "mongo" },
      { id: "mongo-analytics", from: "mongo", to: "analytics" },
    ],
    nodes: [
      {
        id: "spa",
        label: "STOREFRONT",
        sub: "<50ms React SPA",
        info: "React storefront serving 100+ users with sub-50ms homepage load times, dynamic catalog filters, and cart flows.",
      },
      {
        id: "razorpay",
        label: "RAZORPAY",
        sub: "signed webhook",
        info: "Razorpay dispatches payment capture webhooks signed with HMAC-SHA256 alongside client checkout callbacks.",
      },
      {
        id: "gateway",
        label: "API GATEWAY",
        sub: "Express · Auth",
        info: "Central Express gateway routing catalog queries, cart mutations, and payment webhooks across isolated domain services.",
      },
      {
        id: "redis",
        label: "REDIS CACHE",
        sub: "1.5s → 150ms",
        info: "Caches filtered product listings and catalog aggregations in Redis, slashing response latency by 90% (from 1.5s to 150ms).",
      },
      {
        id: "guard",
        label: "WEBHOOK GUARD",
        sub: "HMAC · idempotent",
        info: "Verifies cryptographic HMAC signatures and enforces unique order idempotency keys so retries never double-charge.",
      },
      {
        id: "mongo",
        label: "MONGODB",
        sub: "orders · catalog",
        info: "Persists transactional order states, customer accounts, and product inventory across indexed collections.",
      },
      {
        id: "analytics",
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
        nodes: ["razorpay", "gateway", "guard", "mongo", "analytics"],
        edges: ["rzp-gateway", "gateway-guard", "guard-mongo", "mongo-analytics"],
      },
      catalog: {
        label: "Cached Catalog",
        summary:
          "Storefront product listing requests hit the Redis write-aside cache through the Express gateway, returning in 150ms instead of 1.5s.",
        nodes: ["spa", "gateway", "redis"],
        edges: ["spa-gateway", "gateway-redis"],
      },
    },
  },

  crms: {
    ariaLabel:
      "CRMS Cloud Control Plane architecture: tenant API calls and Docker telemetry flow through PostgreSQL 16 Row-Level Security, SELECT FOR UPDATE stored procedures, and 1M+ row BRIN-indexed partitions",
    frameLabel: "POSTGRESQL 16 ENGINE · 3NF/BCNF",
    defaultScenario: "telemetry",
    layouts: {
      wide: {
        width: 580,
        height: 360,
        node: { w: 118, h: 54 },
        frame: { x: 142, y: 12, w: 430, h: 336 },
        nodes: {
          console: [8, 52],
          docker: [8, 240],
          rls: [154, 52],
          ingest: [154, 240],
          quota: [300, 52],
          partitions: [300, 240],
          sse: [444, 146],
        },
      },
      tall: {
        width: 300,
        height: 470,
        node: { w: 132, h: 50 },
        frame: { x: 4, y: 82, w: 292, h: 380 },
        nodes: {
          console: [8, 10],
          docker: [160, 10],
          rls: [8, 108],
          ingest: [160, 108],
          quota: [8, 212],
          partitions: [160, 212],
          sse: [84, 326],
        },
      },
    },
    edges: [
      { id: "console-rls", from: "console", to: "rls" },
      { id: "rls-quota", from: "rls", to: "quota" },
      { id: "docker-ingest", from: "docker", to: "ingest" },
      { id: "ingest-partitions", from: "ingest", to: "partitions" },
      { id: "partitions-sse", from: "partitions", to: "sse" },
      { id: "quota-sse", from: "quota", to: "sse" },
    ],
    nodes: [
      {
        id: "console",
        label: "CLOUD CONSOLE",
        sub: "Tenant API req",
        info: "Multi-tenant React console issuing VM provisioning, quota allocation, and SQL lab requests.",
      },
      {
        id: "docker",
        label: "DOCKER PROXY",
        sub: "30s container",
        info: "Read-only tecnativa/docker-socket-proxy streaming live container CPU, memory, and I/O stats every 30 seconds.",
      },
      {
        id: "rls",
        label: "RLS CONTEXT",
        sub: "SET LOCAL org_id",
        info: "Wraps every transaction with SET LOCAL app.current_org_id so PostgreSQL 16 Row-Level Security isolates tenants at the engine level.",
      },
      {
        id: "quota",
        label: "QUOTA LOCK",
        sub: "SELECT FOR UPDATE",
        info: "PL/pgSQL sp_allocate_resource locks the parent organization quota row, preventing concurrent check-then-act over-allocation races.",
      },
      {
        id: "ingest",
        label: "INGEST PROC",
        sub: "sp_ingest_metrics",
        info: "Transactional stored procedure validating and routing incoming container telemetry into time-range partitions.",
      },
      {
        id: "partitions",
        label: "1M+ PARTITIONS",
        sub: "BRIN · GIN 0.2ms",
        info: "Range-partitioned usage_metrics table (1,000,000+ rows) indexed with BRIN and GIN to cut time-range query latency from 42ms to 0.2ms.",
      },
      {
        id: "sse",
        label: "PG_NOTIFY SSE",
        sub: "live alert push",
        info: "Database triggers fire pg_notify on quota/CPU spikes, streaming zero-polling Server-Sent Events straight to the React UI.",
      },
    ],
    scenarios: {
      telemetry: {
        label: "1M-Row Telemetry",
        summary:
          "Live Docker stats ingest via PL/pgSQL into 1M+ BRIN/GIN-indexed partitions (queried in 0.2ms vs 42ms) and push real-time alerts via pg_notify SSE.",
        nodes: ["docker", "ingest", "partitions", "sse"],
        edges: ["docker-ingest", "ingest-partitions", "partitions-sse"],
      },
      quota: {
        label: "RLS & Quota Lock",
        summary:
          "Tenant provisioning calls set app.current_org_id for Row-Level Security, acquire a pessimistic SELECT FOR UPDATE lock, and emit live quota events.",
        nodes: ["console", "rls", "quota", "sse"],
        edges: ["console-rls", "rls-quota", "quota-sse"],
      },
    },
  },

  "job-agent": {
    ariaLabel:
      "Job Agent architecture: 8+ ATS feeds and Gmail OAuth threads flow through the Express 5 hub into the 12-class email classifier, 0-100 deterministic multi-resume scorer, Prisma PostgreSQL store, and guarded Playwright runner",
    frameLabel: "EXPRESS 5 · PRISMA · PLAYWRIGHT",
    defaultScenario: "discovery",
    layouts: {
      wide: {
        width: 580,
        height: 360,
        node: { w: 118, h: 54 },
        frame: { x: 142, y: 12, w: 430, h: 336 },
        nodes: {
          ats: [8, 52],
          gmail: [8, 240],
          scorer: [154, 52],
          nlp: [154, 240],
          postgres: [300, 146],
          ui: [444, 52],
          playwright: [444, 240],
        },
      },
      tall: {
        width: 300,
        height: 470,
        node: { w: 132, h: 50 },
        frame: { x: 4, y: 82, w: 292, h: 380 },
        nodes: {
          ats: [8, 10],
          gmail: [160, 10],
          scorer: [8, 108],
          nlp: [160, 108],
          postgres: [84, 212],
          ui: [8, 326],
          playwright: [160, 326],
        },
      },
    },
    edges: [
      { id: "ats-scorer", from: "ats", to: "scorer" },
      { id: "gmail-nlp", from: "gmail", to: "nlp" },
      { id: "scorer-pg", from: "scorer", to: "postgres" },
      { id: "nlp-pg", from: "nlp", to: "postgres" },
      { id: "pg-ui", from: "postgres", to: "ui" },
      { id: "ui-pw", from: "ui", to: "playwright" },
    ],
    nodes: [
      {
        id: "ats",
        label: "8+ ATS FEEDS",
        sub: "Greenhouse · Lever",
        info: "Polls Greenhouse, Lever, Ashby, Workday, and curated boards, normalizing postings into a unified schema.",
      },
      {
        id: "gmail",
        label: "GMAIL OAUTH",
        sub: "recruiter threads",
        info: "Syncs inbound recruiter and ATS emails via Gmail OAuth incremental history tokens.",
      },
      {
        id: "scorer",
        label: "RESUME SCORER",
        sub: "0–100 rubric",
        info: "Evaluates each job against multiple LaTeX/PDF resumes using a deterministic rubric (+35 skills, +20 role, +15 domain) to select the best CV.",
      },
      {
        id: "nlp",
        label: "12-CLASS NLP",
        sub: "monotonic state",
        info: "Classifies recruiter emails into 12 categories (OA, Interview, Offer, Rejection) and enforces forward-only stage transitions.",
      },
      {
        id: "postgres",
        label: "POSTGRESQL",
        sub: "Prisma state",
        info: "Unified relational store persisting deduplicated jobs, per-resume score breakdowns, and recruiter email threads.",
      },
      {
        id: "ui",
        label: "NEXT.JS 16 UI",
        sub: "7-tab workspace",
        info: "Interactive 7-tab control center for inspecting match rationales, pipeline stages, and automation queues.",
      },
      {
        id: "playwright",
        label: "PLAYWRIGHT",
        sub: "dry-run · SSE",
        info: "Guarded browser automation runner that prefills ATS forms in dry-run mode by default and streams live SSE execution logs.",
      },
    ],
    scenarios: {
      discovery: {
        label: "Score & Auto-Apply",
        summary:
          "Postings from 8+ ATS boards are scored 0–100 deterministically against multiple resumes, stored in PostgreSQL, reviewed in Next.js 16, and executed via dry-run Playwright.",
        nodes: ["ats", "scorer", "postgres", "ui", "playwright"],
        edges: ["ats-scorer", "scorer-pg", "pg-ui", "ui-pw"],
      },
      gmail: {
        label: "Gmail State Sync",
        summary:
          "Inbound Gmail OAuth threads pass through the 12-class classifier into PostgreSQL, advancing application stages strictly forward in the Next.js workspace.",
        nodes: ["gmail", "nlp", "postgres", "ui"],
        edges: ["gmail-nlp", "nlp-pg", "pg-ui"],
      },
    },
  },

  "golang-lake-scanner": {
    ariaLabel:
      "GoLakeScanner concurrent pipeline: nested data lake files pass through the streaming SHA-256 walker, skipping unchanged files and dispatching modified files to a generic bounded Go worker pool with 30s context timeouts and pgx/v5 PostgreSQL cataloging",
    frameLabel: "GO CONCURRENCY · POOL.RUN[IN, OUT]",
    defaultScenario: "worker",
    layouts: {
      wide: {
        width: 580,
        height: 360,
        node: { w: 118, h: 54 },
        frame: { x: 142, y: 12, w: 430, h: 336 },
        nodes: {
          lake: [8, 146],
          walker: [154, 146],
          skip: [300, 44],
          pool: [300, 232],
          probes: [444, 232],
          catalog: [444, 44],
        },
      },
      tall: {
        width: 300,
        height: 440,
        node: { w: 132, h: 50 },
        frame: { x: 4, y: 80, w: 292, h: 348 },
        nodes: {
          lake: [84, 10],
          walker: [84, 96],
          skip: [8, 196],
          pool: [160, 196],
          probes: [160, 286],
          catalog: [84, 368],
        },
      },
    },
    edges: [
      { id: "lake-walker", from: "lake", to: "walker" },
      { id: "walker-skip", from: "walker", to: "skip" },
      { id: "skip-catalog", from: "skip", to: "catalog" },
      { id: "walker-pool", from: "walker", to: "pool" },
      { id: "pool-probes", from: "pool", to: "probes" },
      { id: "probes-catalog", from: "probes", to: "catalog" },
    ],
    nodes: [
      {
        id: "lake",
        label: "DATA LAKE",
        sub: "PDFs · scans",
        info: "Nested directory trees containing thousands of unstructured PDFs, scanned documents, and binary media files.",
      },
      {
        id: "walker",
        label: "SHA-256 WALKER",
        sub: "64KB stream hash",
        info: "Phase 1 incremental walker: computes streaming 64 KB SHA-256 hashes in O(1) memory and diffs state against PostgreSQL.",
      },
      {
        id: "skip",
        label: "FAST SKIP",
        sub: "unchanged digest",
        info: "Files whose SHA-256 digest matches the catalog bypass heavy parsing in milliseconds.",
      },
      {
        id: "pool",
        label: "WORKER POOL",
        sub: "pool.Run[In,Out]",
        info: "Generic bounded goroutine pool with channel backpressure and SIGINT/SIGTERM signal propagation.",
      },
      {
        id: "probes",
        label: "FILE PROBES",
        sub: "30s ctx timeout",
        info: "Magic-byte and PDF /Font & /FlateDecode stream probes isolated inside a 30-second context.WithTimeout deadline.",
      },
      {
        id: "catalog",
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
        nodes: ["lake", "walker", "pool", "probes", "catalog"],
        edges: ["lake-walker", "walker-pool", "pool-probes", "probes-catalog"],
      },
      skip: {
        label: "Phase 1: Incremental Skip",
        summary:
          "Files whose streaming SHA-256 hash matches the catalog short-circuit in Phase 1, avoiding redundant parsing across large data lakes.",
        nodes: ["lake", "walker", "skip", "catalog"],
        edges: ["lake-walker", "walker-skip", "skip-catalog"],
      },
    },
  },

  cookoff: {
    ariaLabel:
      "Cook Off 10.0 competitive coding portal architecture: CodeMirror 6 keystrokes and submissions flow through the Zustand store to instant LocalStorage persistence and the authenticated Axios judge pipeline",
    frameLabel: "CODEMIRROR 6 · 3-LAYER PERSISTENCE",
    defaultScenario: "submit",
    layouts: {
      wide: {
        width: 580,
        height: 360,
        node: { w: 118, h: 54 },
        frame: { x: 142, y: 12, w: 430, h: 336 },
        nodes: {
          editor: [8, 146],
          zustand: [154, 146],
          local: [300, 44],
          axios: [300, 232],
          mongo: [444, 146],
          judge: [444, 268],
        },
      },
      tall: {
        width: 300,
        height: 440,
        node: { w: 132, h: 50 },
        frame: { x: 4, y: 80, w: 292, h: 348 },
        nodes: {
          editor: [84, 10],
          zustand: [84, 96],
          local: [8, 196],
          axios: [160, 196],
          mongo: [160, 286],
          judge: [84, 368],
        },
      },
    },
    edges: [
      { id: "editor-zustand", from: "editor", to: "zustand" },
      { id: "zustand-local", from: "zustand", to: "local" },
      { id: "zustand-axios", from: "zustand", to: "axios" },
      { id: "axios-mongo", from: "axios", to: "mongo" },
      { id: "axios-judge", from: "axios", to: "judge" },
    ],
    nodes: [
      {
        id: "editor",
        label: "CODEMIRROR 6",
        sub: "C++ · PY · JS",
        info: "1,000+ contestants write C++, Python, Java, and JS solutions inside a custom CodeMirror 6 IDE.",
      },
      {
        id: "zustand",
        label: "ZUSTAND STORE",
        sub: "in-memory state",
        info: "Central in-memory store coordinating active problem buffers, language selection, and execution status.",
      },
      {
        id: "local",
        label: "LOCALSTORAGE",
        sub: "0ms recovery",
        info: "Synchronous local write-through cache that recovers code buffers immediately if a browser tab refreshes or crashes.",
      },
      {
        id: "axios",
        label: "AXIOS PIPELINE",
        sub: "JWT · retry queue",
        info: "Request/response interceptors handling silent JWT refresh, rate-limit backoff, and payload serialization.",
      },
      {
        id: "mongo",
        label: "MONGODB SYNC",
        sub: "cloud checkpoint",
        info: "Persists contestant code checkpoints and submission records in MongoDB with zero data loss.",
      },
      {
        id: "judge",
        label: "JUDGE VERDICT",
        sub: "40% peak load",
        info: "Streams test-case execution verdicts, memory/time metrics, and leaderboard updates back to the IDE.",
      },
    ],
    scenarios: {
      submit: {
        label: "Contest Submission",
        summary:
          "Submissions pass from CodeMirror 6 and Zustand through authenticated Axios retry interceptors, checkpoint to MongoDB, and return live judge verdicts under 40% concurrent load.",
        nodes: ["editor", "zustand", "axios", "mongo", "judge"],
        edges: ["editor-zustand", "zustand-axios", "axios-mongo", "axios-judge"],
      },
      autosave: {
        label: "Zero-Loss Autosave",
        summary:
          "Every keystroke in CodeMirror 6 updates the Zustand store and writes through to LocalStorage, guaranteeing instant recovery on tab reload.",
        nodes: ["editor", "zustand", "local"],
        edges: ["editor-zustand", "zustand-local"],
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
  const [focusedId, setFocusedId] = useState<string | null>(null);
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
              style={{ fontFamily: "var(--font-mono)" }}
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
          const isFocused = node.id === focusedId;
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
                onFocus={() => {
                  setFocusedId(node.id);
                  selectNode(node.id);
                }}
                onBlur={() => setFocusedId(null)}
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
                {isFocused && (
                  <rect
                    x={box.x - 3}
                    y={box.y - 3}
                    width={box.w + 6}
                    height={box.h + 6}
                    rx="8"
                    fill="none"
                    stroke="#fff"
                    strokeOpacity="0.65"
                    strokeDasharray="3 2"
                  />
                )}
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
                  style={{ fontFamily: "var(--font-mono)" }}
                  fontSize="10"
                >
                  {node.label}
                </text>
                <text
                  x={box.x + box.w / 2}
                  y={box.y + box.h / 2 + 12}
                  textAnchor="middle"
                  fill="#888"
                  style={{ fontFamily: "var(--font-mono)" }}
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
