import { DiagramLayout } from "@/lib/diagram";

export interface CaseStudyFlow {
  label: string;
  wide: DiagramLayout;
  tall: DiagramLayout;
  groups?: { id: string; label: string; step: number }[];
  nodes: {
    id: string;
    label: string;
    sub?: string;
    kind?: "core" | "input" | "store" | "focus";
    step: number;
  }[];
  edges: {
    from: string;
    to: string;
    step: number;
    dashed?: boolean;
    label?: string;
  }[];
  steps: { title: string; text: string }[];
}

export interface CaseStudyStat {
  value: number | string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface CaseStudyChart {
  title: string;
  caption?: string;
  max: number;
  unit?: string;
  reference?: { value: number; label: string };
  bars: {
    label: string;
    value: number;
    display?: string;
    highlight?: boolean;
  }[];
}

export interface CaseStudyData {
  name: string;
  context: string;
  started: string;
  problem: {
    lead: string;
    points: string[];
  };
  approach: { title: string; text: string }[];
  architecture: {
    caption: string;
    flow: CaseStudyFlow;
  };
  results: {
    title?: string;
    caption?: string;
    stats: CaseStudyStat[];
    charts?: CaseStudyChart[];
    notes?: string[];
  };
  closing?: {
    label: string;
    title: string;
    points: string[];
  };
}

export const caseStudies: Record<string, CaseStudyData> = {
  openpumta: {
    name: "OpenPumTa",
    context: "Production Full-Stack & Self-Hosted Infrastructure · 300+ Users",
    started: "Jan 2025",
    problem: {
      lead: "Most study and habit trackers fail under real daily usage in two ways: browser timers drift or desync across devices when tabs sleep, and analytics dashboards hammer the primary relational database on every page load.",
      points: [
        "Orphaned and drifting Pomodoro sessions: a timer started on a laptop must stay accurate to the second on a phone, and recover cleanly if the browser tab crashes.",
        "Expensive streak and heatmap aggregations: computing 21-day habit streaks and study-hour leaderboards across 10,000+ visits directly in PostgreSQL creates unnecessary read amplification.",
        "Managed-cloud sprawl: running split frontend, backend, database, and cache tiers across separate hobby clouds added cross-region latency and unpredictable cold starts.",
      ],
    },
    approach: [
      {
        title: "Server-authoritative WebSocket timer hub",
        text: "Instead of trusting client-side setInterval ticks, the Express + WebSocket gateway stores authoritative start timestamps and state transitions, broadcasting delta-synced updates across all connected devices.",
      },
      {
        title: "30+ REST APIs & 10 Prisma models",
        text: "Structured relational schemas in PostgreSQL for users, 21-day habit chains, Pomodoro sessions, tasks, and daily reflections, guarded by Zod request validation and centralized async error handlers.",
      },
      {
        title: "Redis write-through analytics cache",
        text: "Cached expensive study-time rollups and streak aggregations in Redis with targeted key invalidation on session completion, cutting PostgreSQL read load by 80%.",
      },
      {
        title: "AI daily coaching reviews",
        text: "Synthesized completed habits, task velocity, and focus-session duration into structured prompts to generate personalized daily retrospectives.",
      },
      {
        title: "Consolidated Linux VPS + Prometheus & Grafana",
        text: "Migrated the entire stack into a single Docker Compose network behind Nginx with SSL termination, and instrumented Express, PostgreSQL, and Redis with Prometheus exporters and Grafana dashboards.",
      },
    ],
    architecture: {
      caption:
        "Follow a study session and analytics query through the self-hosted Linux VPS stack.",
      flow: {
        label: "OpenPumTa production architecture",
        wide: {
          width: 760,
          height: 340,
          node: { w: 120, h: 54 },
          nodes: {
            clients: [8, 140],
            nginx: [154, 140],
            nextjs: [300, 40],
            express: [300, 140],
            ws: [300, 240],
            redis: [456, 80],
            postgres: [456, 200],
            grafana: [616, 140],
          },
          groups: {
            vps: { x: 142, y: 16, w: 608, h: 304 },
          },
        },
        tall: {
          width: 300,
          height: 460,
          node: { w: 132, h: 48 },
          nodes: {
            clients: [84, 8],
            nginx: [84, 80],
            nextjs: [8, 160],
            express: [160, 160],
            ws: [8, 240],
            redis: [160, 240],
            postgres: [8, 324],
            grafana: [160, 324],
          },
          groups: {
            vps: { x: 2, y: 68, w: 296, h: 320 },
          },
        },
        groups: [{ id: "vps", label: "DOCKER COMPOSE · LINUX VPS", step: 1 }],
        nodes: [
          {
            id: "clients",
            label: "CLIENTS",
            sub: "Web · Mobile",
            kind: "input",
            step: 0,
          },
          {
            id: "nginx",
            label: "NGINX",
            sub: "TLS · Reverse Proxy",
            step: 1,
          },
          {
            id: "nextjs",
            label: "NEXT.JS",
            sub: "App Router UI",
            step: 2,
          },
          {
            id: "express",
            label: "EXPRESS API",
            sub: "30+ REST · Zod",
            kind: "focus",
            step: 2,
          },
          {
            id: "ws",
            label: "WEBSOCKET HUB",
            sub: "Timer State Sync",
            kind: "focus",
            step: 3,
          },
          {
            id: "redis",
            label: "REDIS",
            sub: "Analytics Cache",
            kind: "store",
            step: 4,
          },
          {
            id: "postgres",
            label: "POSTGRESQL",
            sub: "10 Prisma Models",
            kind: "store",
            step: 4,
          },
          {
            id: "grafana",
            label: "PROMETHEUS",
            sub: "Grafana Metrics",
            step: 5,
          },
        ],
        edges: [
          { from: "clients", to: "nginx", step: 1 },
          { from: "nginx", to: "nextjs", step: 2 },
          { from: "nginx", to: "express", step: 2 },
          { from: "nginx", to: "ws", step: 3 },
          { from: "express", to: "redis", step: 4 },
          { from: "express", to: "postgres", step: 4 },
          { from: "ws", to: "redis", step: 4 },
          { from: "redis", to: "grafana", step: 5, dashed: true },
          { from: "postgres", to: "grafana", step: 5, dashed: true },
        ],
        steps: [
          {
            title: "Clients connect over HTTPS & WSS",
            text: "Desktop and mobile browsers open REST and persistent WebSocket connections to openpumta.com.",
          },
          {
            title: "Nginx terminates TLS on the VPS",
            text: "A single Nginx reverse proxy routes /_next to Next.js, /api to Express, and upgrades /ws connections.",
          },
          {
            title: "30+ Express REST endpoints",
            text: "Zod-validated controllers manage habits, tasks, study logs, and AI daily review generation.",
          },
          {
            title: "Authoritative WebSocket timer sync",
            text: "Pomodoro start, pause, and completion events sync across all active tabs and devices in real time.",
          },
          {
            title: "Redis cache + PostgreSQL persistence",
            text: "Hot dashboard aggregations hit Redis first (cutting DB load by 80%), while 10 Prisma models persist transactional records in PostgreSQL.",
          },
          {
            title: "Prometheus & Grafana observability",
            text: "Request latency, active WebSocket connections, and container memory are scraped continuously into Grafana.",
          },
        ],
      },
    },
    results: {
      title: "Production impact",
      stats: [
        { value: 300, suffix: "+", label: "registered active users" },
        { value: 10000, suffix: "+", label: "total platform visits served" },
        {
          value: 80,
          suffix: "%",
          label: "reduction in PostgreSQL read queries via Redis",
        },
        {
          value: 30,
          suffix: "+",
          label: "validated REST APIs & 10 Prisma models",
        },
      ],
      charts: [
        {
          title: "Analytics endpoint response latency",
          caption:
            "Dashboard study-summary & 21-day streak query latency before and after Redis caching (lower is better).",
          max: 450,
          unit: " ms",
          bars: [
            { label: "Redis Write-Through Cache", value: 38, highlight: true },
            { label: "Direct PostgreSQL Aggregation", value: 390 },
          ],
        },
      ],
      notes: [
        "Consolidating Next.js, Express, PostgreSQL, and Redis onto a single Docker Compose VPS eliminated cross-cloud network hops and kept p95 API latency under 50 ms.",
      ],
    },
  },
  voiceshield: {
    name: "VoiceShield AI",
    context: "Smart India Hackathon · VIT Vellore College Finalist",
    started: "Sep 2025",
    problem: {
      lead: "Voice-cloning deepfakes and high-pressure social-engineering phone scams happen mid-call. Detecting them requires analyzing raw audio and conversational intent within seconds without blocking the live audio stream.",
      points: [
        "WebSocket transport frames arrive in arbitrary sizes, whereas acoustic deepfake models require contiguous 3-second 48 kHz mono PCM16 windows (288,000 bytes).",
        "Synchronous PostgreSQL writes or slow model calls on the ingest thread cause buffer underruns and dropped call frames.",
        "Acoustic models alone miss scripted human scams, while STT + LLM rules alone miss synthetic voice clones.",
      ],
    },
    approach: [
      {
        title: "Byte-conserving 48 kHz PCM16 ring buffer",
        text: "Built a Node.js/TypeScript media gateway that ingests arbitrary WebSocket binary frames, reassembles them into exact 3-second (288 KB) chunks, and verifies a byte-conservation invariant on every emission.",
      },
      {
        title: "Persistent WebSocket bridge to Python ML",
        text: "Streamed assembled chunks over a persistent internal WebSocket to a FastAPI inference worker, avoiding per-chunk HTTP handshake and serialization overhead.",
      },
      {
        title: "Dual-stream acoustic + Whisper analysis",
        text: "Combined RawNet2, WavLM, and SpeechBrain (ECAPA-TDNN) spoof scoring on raw waveforms with OpenAI Whisper transcripts fed into a deterministic scam-risk agent.",
      },
      {
        title: "Off-path PostgreSQL write queue",
        text: "Decoupled database persistence into an asynchronous write queue so disk I/O never stalls audio frame ingestion, while streaming live per-chunk risk scores to a Next.js dashboard via Socket.IO.",
      },
    ],
    architecture: {
      caption:
        "From live 48 kHz PCM16 telephony frames to sub-second Socket.IO scam alerts.",
      flow: {
        label: "VoiceShield AI streaming architecture",
        wide: {
          width: 740,
          height: 300,
          node: { w: 120, h: 52 },
          nodes: {
            call: [8, 120],
            gateway: [152, 120],
            chunker: [296, 120],
            acoustic: [444, 40],
            whisper: [444, 130],
            dbqueue: [444, 220],
            dashboard: [600, 85],
          },
        },
        tall: {
          width: 300,
          height: 440,
          node: { w: 132, h: 48 },
          nodes: {
            call: [84, 8],
            gateway: [84, 80],
            chunker: [84, 152],
            acoustic: [8, 232],
            whisper: [160, 232],
            dbqueue: [8, 316],
            dashboard: [160, 316],
          },
        },
        nodes: [
          {
            id: "call",
            label: "48kHz PCM16",
            sub: "Android · SIP",
            kind: "input",
            step: 0,
          },
          {
            id: "gateway",
            label: "WS GATEWAY",
            sub: "Node.js + TS",
            kind: "focus",
            step: 1,
          },
          {
            id: "chunker",
            label: "3s CHUNKER",
            sub: "Byte-Invariant",
            kind: "focus",
            step: 2,
          },
          {
            id: "acoustic",
            label: "ACOUSTIC ML",
            sub: "RawNet2 · ONNX",
            step: 3,
          },
          {
            id: "whisper",
            label: "WHISPER STT",
            sub: "Scam-Risk Agent",
            step: 3,
          },
          {
            id: "dbqueue",
            label: "ASYNC DB QUEUE",
            sub: "Off-Path PG Write",
            kind: "store",
            step: 4,
          },
          {
            id: "dashboard",
            label: "LIVE UI",
            sub: "Socket.IO Stream",
            kind: "store",
            step: 5,
          },
        ],
        edges: [
          { from: "call", to: "gateway", step: 1 },
          { from: "gateway", to: "chunker", step: 2 },
          { from: "chunker", to: "acoustic", step: 3 },
          { from: "chunker", to: "whisper", step: 3 },
          { from: "chunker", to: "dbqueue", step: 4, dashed: true },
          { from: "acoustic", to: "dashboard", step: 5 },
          { from: "whisper", to: "dashboard", step: 5 },
        ],
        steps: [
          {
            title: "Live 48 kHz mono PCM16 stream",
            text: "Audio frames arrive over WebSockets from the Android CallVault client or SIP bridge.",
          },
          {
            title: "Non-blocking Node.js ingest",
            text: "The TypeScript gateway validates session state and buffers incoming binary frames.",
          },
          {
            title: "Exact 3-second window assembly",
            text: "Frames are sliced and concatenated into ordered 288,000-byte windows with zero dropped or duplicated bytes.",
          },
          {
            title: "Parallel acoustic + transcript inference",
            text: "FastAPI evaluates voice spoof probability alongside Whisper transcription and scam-intent rules.",
          },
          {
            title: "Off-path PostgreSQL persistence",
            text: "Call telemetry and chunk verdicts are queued asynchronously off the real-time audio thread.",
          },
          {
            title: "Real-time Socket.IO dashboard",
            text: "Per-window spoof scores and transcripts stream live to the operator dashboard.",
          },
        ],
      },
    },
    results: {
      title: "Streaming benchmarks",
      stats: [
        {
          value: 1.1,
          decimals: 1,
          suffix: " s",
          label: "median CPU inference per 3-second audio window",
        },
        {
          value: 48,
          suffix: " kHz",
          label: "mono PCM16 sampling rate with 100% byte conservation",
        },
        {
          value: 3,
          suffix: " s",
          label: "ordered sliding audio window (288 KB/chunk)",
        },
        {
          value: 0,
          label: "blocking database writes on the audio ingest path",
        },
      ],
      charts: [
        {
          title: "Processing budget per 3.0s real-time window",
          caption:
            "Median end-to-end CPU processing latency vs the 3.0-second real-time deadline (lower is better).",
          max: 3.0,
          unit: " s",
          reference: { value: 3.0, label: "3.0s real-time budget" },
          bars: [
            {
              label: "VoiceShield CPU Pipeline (Median)",
              value: 1.1,
              display: "1.1s",
              highlight: true,
            },
            { label: "Real-Time Window Budget", value: 3.0, display: "3.0s" },
          ],
        },
      ],
    },
  },
  mossx: {
    name: "Moss X",
    context: "Lead Full-Stack Developer · Production E-Commerce (mossx.in)",
    started: "Apr 2025",
    problem: {
      lead: "Taking an e-commerce store from prototype to 100+ real customers and live Razorpay orders exposed two bottlenecks: 1.5-second catalog queries and webhook retry race conditions.",
      points: [
        "Dynamic category filters and recommendation aggregations in MongoDB took ~1.5s under cold/concurrent requests.",
        "Payment gateway webhooks can arrive before or simultaneously with the client callback, risking duplicate order fulfillment without strict idempotency.",
      ],
    },
    approach: [
      {
        title: "Redis write-aside catalog caching",
        text: "Cached product listing and filter responses in Redis with automatic invalidation on admin inventory mutations, cutting API latency by 90% (from 1.5s to 150ms) and keeping homepage load under 50ms.",
      },
      {
        title: "Idempotent Razorpay webhook pipeline",
        text: "Verified HMAC-SHA256 webhook signatures over raw request payloads and enforced unique payment-order idempotency keys across 20+ real customer transactions.",
      },
      {
        title: "MongoDB aggregation analytics",
        text: "Built multi-stage aggregation pipelines for admin revenue metrics, inventory alerts, and personalized product recommendations.",
      },
      {
        title: "Team leadership & Dockerized deployment",
        text: "Containerized the stack with Docker on Render and led a 3-developer team through PR reviews, schema design, and production releases.",
      },
    ],
    architecture: {
      caption:
        "Modular monolith with Redis catalog caching and idempotent Razorpay verification.",
      flow: {
        label: "Moss X e-commerce architecture",
        wide: {
          width: 700,
          height: 280,
          node: { w: 124, h: 52 },
          nodes: {
            spa: [10, 114],
            api: [168, 114],
            redis: [336, 36],
            mongo: [336, 114],
            razorpay: [336, 192],
            admin: [514, 114],
          },
        },
        tall: {
          width: 300,
          height: 400,
          node: { w: 132, h: 48 },
          nodes: {
            spa: [84, 8],
            api: [84, 84],
            redis: [8, 168],
            mongo: [160, 168],
            razorpay: [8, 256],
            admin: [160, 256],
          },
        },
        nodes: [
          {
            id: "spa",
            label: "REACT SPA",
            sub: "<50ms Homepage",
            kind: "input",
            step: 0,
          },
          {
            id: "api",
            label: "EXPRESS API",
            sub: "Modular Monolith",
            kind: "focus",
            step: 1,
          },
          {
            id: "redis",
            label: "REDIS CACHE",
            sub: "150ms Catalog",
            kind: "store",
            step: 2,
          },
          {
            id: "mongo",
            label: "MONGODB",
            sub: "Aggregations",
            kind: "store",
            step: 3,
          },
          {
            id: "razorpay",
            label: "RAZORPAY",
            sub: "HMAC + Idempotent",
            kind: "focus",
            step: 4,
          },
          {
            id: "admin",
            label: "ADMIN ANALYTICS",
            sub: "Sales & Inventory",
            step: 5,
          },
        ],
        edges: [
          { from: "spa", to: "api", step: 1 },
          { from: "api", to: "redis", step: 2 },
          { from: "api", to: "mongo", step: 3 },
          { from: "api", to: "razorpay", step: 4 },
          { from: "mongo", to: "admin", step: 5 },
        ],
        steps: [
          {
            title: "Sub-50ms storefront",
            text: "Customers browse products, carts, and checkout flows in the React storefront.",
          },
          {
            title: "Express modular monolith",
            text: "Domain modules isolate catalog, cart, auth, payment, and analytics logic.",
          },
          {
            title: "Redis catalog acceleration",
            text: "Product listings resolve from Redis in 150ms instead of hitting MongoDB on every request.",
          },
          {
            title: "MongoDB persistence & pipelines",
            text: "Orders, users, and aggregation pipelines run against indexed collections.",
          },
          {
            title: "HMAC-verified Razorpay webhooks",
            text: "Cryptographic signature verification and idempotency guards prevent duplicate charges.",
          },
          {
            title: "Real-time admin insights",
            text: "Aggregation pipelines power revenue breakdowns and inventory management.",
          },
        ],
      },
    },
    results: {
      title: "Latency & production metrics",
      stats: [
        {
          value: 90,
          suffix: "%",
          label: "reduction in product listing API latency (1.5s → 150ms)",
        },
        {
          value: 50,
          prefix: "<",
          suffix: " ms",
          label: "homepage response latency",
        },
        { value: 100, suffix: "+", label: "registered customers on mossx.in" },
        {
          value: 20,
          suffix: "+",
          label: "live Razorpay orders with zero duplicate charges",
        },
      ],
      charts: [
        {
          title: "Product catalog API response time",
          caption:
            "Mean response time before and after Redis caching (lower is better).",
          max: 1500,
          unit: " ms",
          bars: [
            { label: "With Redis Cache", value: 150, highlight: true },
            { label: "Uncached MongoDB Query", value: 1500 },
          ],
        },
      ],
    },
  },
  crms: {
    name: "CRMS Cloud Control Plane",
    context:
      "Database-Centric Multi-Tenant Cloud & Telemetry Engine · PostgreSQL 16",
    started: "Jan 2026",
    problem: {
      lead: "Application-layer multi-tenancy and check-then-act quota checks break under concurrent requests: a missing WHERE clause leaks tenant rows, and parallel VM provisioning requests bypass vCPU/RAM limits.",
      points: [
        "Check-then-act race conditions allow concurrent API calls to over-allocate organization vCPU and RAM quotas.",
        "Time-series container telemetry quickly grows past 1,000,000 rows, making unindexed B-tree scans slow and bloated.",
        "Exposing the raw Docker socket to a web backend creates a root-privilege escalation vector.",
      ],
    },
    approach: [
      {
        title: "PostgreSQL 16 Row-Level Security (RLS)",
        text: "Wrapped every request in a database transaction setting SET LOCAL app.current_org_id, enforcing tenant isolation directly inside PostgreSQL policies alongside btree_gist temporal exclusion constraints.",
      },
      {
        title: "Pessimistic SELECT FOR UPDATE quota locks",
        text: "Implemented sp_allocate_resource in PL/pgSQL to lock the parent quota row during allocation, serializing concurrent requests and eliminating over-allocation races.",
      },
      {
        title: "1M+ row range partitioning + BRIN & GIN indexes",
        text: "Partitioned usage_metrics by timestamp and indexed with BRIN (block-range) and GIN (JSONB tags), reducing time-range query latency from 42ms to 0.2ms.",
      },
      {
        title: "Read-only Docker proxy & LISTEN/NOTIFY SSE",
        text: "Collected live container CPU/memory every 30s through a restricted tecnativa/docker-socket-proxy and pushed threshold alerts to the React console via PostgreSQL pg_notify and Server-Sent Events.",
      },
    ],
    architecture: {
      caption:
        "All business invariants live inside PostgreSQL 16 triggers, stored procedures, and RLS policies.",
      flow: {
        label: "CRMS PostgreSQL 16 control plane architecture",
        wide: {
          width: 720,
          height: 290,
          node: { w: 126, h: 52 },
          nodes: {
            docker: [10, 40],
            client: [10, 190],
            collector: [170, 40],
            api: [170, 190],
            procs: [340, 40],
            rls: [340, 190],
            partitions: [510, 40],
            sse: [510, 190],
          },
        },
        tall: {
          width: 300,
          height: 440,
          node: { w: 132, h: 48 },
          nodes: {
            docker: [8, 8],
            client: [160, 8],
            collector: [8, 92],
            api: [160, 92],
            procs: [8, 180],
            rls: [160, 180],
            partitions: [8, 268],
            sse: [160, 268],
          },
        },
        nodes: [
          {
            id: "docker",
            label: "DOCKER PROXY",
            sub: "Read-Only Socket",
            kind: "input",
            step: 0,
          },
          {
            id: "client",
            label: "CLOUD CONSOLE",
            sub: "React + DB Lab",
            kind: "input",
            step: 0,
          },
          {
            id: "collector",
            label: "COLLECTOR",
            sub: "30s Telemetry",
            step: 1,
          },
          {
            id: "api",
            label: "EXPRESS API",
            sub: "SET LOCAL org_id",
            step: 2,
          },
          {
            id: "procs",
            label: "PL/pgSQL PROCS",
            sub: "FOR UPDATE Locks",
            kind: "focus",
            step: 3,
          },
          {
            id: "rls",
            label: "PG16 RLS",
            sub: "Tenant Isolation",
            kind: "focus",
            step: 3,
          },
          {
            id: "partitions",
            label: "1M+ PARTITIONS",
            sub: "BRIN · GIN · 0.2ms",
            kind: "store",
            step: 4,
          },
          {
            id: "sse",
            label: "PG_NOTIFY SSE",
            sub: "Live Alerts",
            kind: "store",
            step: 5,
          },
        ],
        edges: [
          { from: "docker", to: "collector", step: 1 },
          { from: "client", to: "api", step: 2 },
          { from: "collector", to: "procs", step: 3 },
          { from: "api", to: "rls", step: 3 },
          { from: "rls", to: "procs", step: 3 },
          { from: "procs", to: "partitions", step: 4 },
          { from: "partitions", to: "sse", step: 5 },
          { from: "sse", to: "client", step: 5, dashed: true },
        ],
        steps: [
          {
            title: "Isolated Docker telemetry & console",
            text: "Container stats are read via a restricted socket proxy while tenants interact through the React console.",
          },
          {
            title: "30-second metric ingestion",
            text: "The collector batches CPU, memory, network, and disk I/O readings into PostgreSQL.",
          },
          {
            title: "Per-request RLS transaction context",
            text: "Every API call sets app.current_org_id locally so PostgreSQL policies filter rows automatically.",
          },
          {
            title: "Transactional stored procedures",
            text: "SELECT ... FOR UPDATE row locks prevent concurrent VM quota over-allocation.",
          },
          {
            title: "Partitioned storage with BRIN & GIN",
            text: "1,000,000+ metric rows are range-partitioned and queried in 0.2ms.",
          },
          {
            title: "Zero-polling LISTEN/NOTIFY stream",
            text: "Threshold triggers fire pg_notify, streaming live alerts to the browser over SSE.",
          },
        ],
      },
    },
    results: {
      title: "Database benchmark (1,000,000+ rows)",
      stats: [
        {
          value: 0.2,
          decimals: 1,
          suffix: " ms",
          label: "indexed time-range query latency (down from 42ms)",
        },
        {
          value: 1000000,
          suffix: "+",
          label: "partitioned telemetry rows benchmarked",
        },
        {
          value: 14,
          label: "3NF/BCNF tables with RLS & exclusion constraints",
        },
        {
          value: 0,
          label: "quota race-condition over-allocations under parallel load",
        },
      ],
      charts: [
        {
          title: "1M-row time-range query execution time",
          caption:
            "PostgreSQL EXPLAIN ANALYZE execution time before and after range partitioning + BRIN/GIN indexing (lower is better).",
          max: 45,
          unit: " ms",
          bars: [
            {
              label: "Partitioned + BRIN / GIN Index",
              value: 0.2,
              display: "0.2 ms",
              highlight: true,
            },
            {
              label: "Unindexed Sequential Scan",
              value: 42.0,
              display: "42.0 ms",
            },
          ],
        },
      ],
    },
  },
  "job-agent": {
    name: "Job Agent",
    context: "Autonomous Job-Discovery, Multi-Resume Scorer & ATS Classifier",
    started: "Feb 2026",
    problem: {
      lead: "Hunting for software engineering internships across dozens of ATS boards and tracking hundreds of recruiter emails manually wastes hours — while naive LLM auto-appliers hallucinate skills and corrupt pipeline state.",
      points: [
        "Different roles (Backend, Full-Stack, AI/ML, Systems) require matching against different resume variants with transparent, reproducible scores.",
        "Recruiter emails arrive out of order (e.g., an auto-ack arriving after an OA invite), which breaks naive status updaters.",
        "Browser automation against live ATS forms must default to safe dry-runs with human review.",
      ],
    },
    approach: [
      {
        title: "8+ ATS collectors & deduplication",
        text: "Aggregated job feeds from Greenhouse, Lever, Ashby, Workday, and curated boards into a unified Prisma/PostgreSQL schema.",
      },
      {
        title: "0–100 deterministic multi-resume scorer",
        text: "Scored every role against multiple uploaded resumes using a deterministic weighted rubric (+35 skills, +20 role match, +15 domain, +10 stack, +10 location, +10 level, minus penalties) before optional LLM explanation.",
      },
      {
        title: "12-class Gmail OAuth state machine",
        text: "Synced recruiter threads via Gmail OAuth and classified emails into 12 categories with strict forward-only stage progression (SAVED → APPLIED → SCREENING → OA → INTERVIEW → OFFER).",
      },
      {
        title: "Guarded Playwright runner with SSE logs",
        text: "Built a dry-run-by-default Playwright automation engine that fills ATS forms, captures screenshots, and streams step-by-step SSE logs to a 7-tab Next.js 16 dashboard.",
      },
    ],
    architecture: {
      caption:
        "From 8+ ATS feeds and Gmail OAuth threads to deterministic resume scoring and guarded Playwright runs.",
      flow: {
        label: "Job Agent pipeline architecture",
        wide: {
          width: 700,
          height: 280,
          node: { w: 126, h: 52 },
          nodes: {
            ats: [10, 44],
            gmail: [10, 184],
            scorer: [184, 44],
            classifier: [184, 184],
            postgres: [364, 114],
            dashboard: [544, 44],
            playwright: [544, 184],
          },
        },
        tall: {
          width: 300,
          height: 420,
          node: { w: 132, h: 48 },
          nodes: {
            ats: [8, 8],
            gmail: [160, 8],
            scorer: [8, 96],
            classifier: [160, 96],
            postgres: [84, 188],
            dashboard: [8, 284],
            playwright: [160, 284],
          },
        },
        nodes: [
          {
            id: "ats",
            label: "8+ ATS FEEDS",
            sub: "Greenhouse · Lever",
            kind: "input",
            step: 0,
          },
          {
            id: "gmail",
            label: "GMAIL OAUTH",
            sub: "Recruiter Threads",
            kind: "input",
            step: 0,
          },
          {
            id: "scorer",
            label: "RESUME SCORER",
            sub: "0–100 Deterministic",
            kind: "focus",
            step: 1,
          },
          {
            id: "classifier",
            label: "12-CLASS NLP",
            sub: "Forward-Only State",
            kind: "focus",
            step: 2,
          },
          {
            id: "postgres",
            label: "POSTGRESQL",
            sub: "Prisma Models",
            kind: "store",
            step: 3,
          },
          {
            id: "dashboard",
            label: "NEXT.JS 16 UI",
            sub: "7-Tab Workspace",
            step: 4,
          },
          {
            id: "playwright",
            label: "PLAYWRIGHT",
            sub: "Dry-Run + SSE",
            kind: "focus",
            step: 5,
          },
        ],
        edges: [
          { from: "ats", to: "scorer", step: 1 },
          { from: "gmail", to: "classifier", step: 2 },
          { from: "scorer", to: "postgres", step: 3 },
          { from: "classifier", to: "postgres", step: 3 },
          { from: "postgres", to: "dashboard", step: 4 },
          { from: "dashboard", to: "playwright", step: 5 },
        ],
        steps: [
          {
            title: "Ingest ATS boards & Gmail",
            text: "Public ATS endpoints and Gmail OAuth threads sync into the Express 5 backend.",
          },
          {
            title: "Deterministic 0–100 multi-resume rubric",
            text: "Each posting is scored against every resume variant to pick the highest-fit CV.",
          },
          {
            title: "12-class email state machine",
            text: "Confirmation, OA, interview, and offer emails advance application stages monotonically.",
          },
          {
            title: "Unified PostgreSQL state",
            text: "Jobs, resume scores, email threads, and run logs persist via Prisma.",
          },
          {
            title: "7-tab Next.js 16 control center",
            text: "Review ranked jobs, inspect score breakdowns, and trigger automation runs.",
          },
          {
            title: "Guarded Playwright execution",
            text: "Browser runners prefill ATS forms in dry-run mode and stream live SSE telemetry.",
          },
        ],
      },
    },
    results: {
      title: "System capabilities",
      stats: [
        {
          value: 100,
          suffix: "-pt",
          label: "deterministic weighted multi-resume scoring rubric",
        },
        { value: 12, label: "Gmail recruiter email classification categories" },
        {
          value: 8,
          suffix: "+",
          label: "ATS job sources aggregated automatically",
        },
        { value: 7, label: "interactive workspace tabs in Next.js 16" },
      ],
    },
  },
  "golang-lake-scanner": {
    name: "GoLakeScanner",
    context: "Concurrent Data-Lake File Classifier & Indexer in Go",
    started: "Jan 2026",
    problem: {
      lead: "Scanning large unstructured data lakes full of nested PDFs, scanned images, and corrupt archives fails when a single hung file parser blocks the entire pipeline or when unchanged files are re-indexed on every run.",
      points: [
        "Re-running deep magic-byte and PDF text-stream probes on unchanged terabyte directories wastes CPU and I/O.",
        "A single malformed PDF or stalled network mount can hang a worker goroutine indefinitely without per-file deadlines.",
      ],
    },
    approach: [
      {
        title: "Phase 1: Streaming SHA-256 state diffing",
        text: "Walked directory trees and computed streaming 64 KB SHA-256 digests against the PostgreSQL catalog to classify every file as New, Modified, or Unchanged before dispatching heavy probes.",
      },
      {
        title: "Phase 2: Generic bounded worker pool",
        text: "Implemented pool.Run[In, Out](ctx, workers, jobs, fn) using Go generics and bounded channels to cap concurrency while propagating cancellation cleanly.",
      },
      {
        title: "Per-file 30s context timeouts & magic-byte probes",
        text: "Wrapped each worker invocation in context.WithTimeout(ctx, 30*time.Second) while inspecting 512-byte magic headers and PDF /Font & /FlateDecode streams to distinguish native PDFs from scanned images.",
      },
      {
        title: "Signal-safe pgx/v5 PostgreSQL catalog",
        text: "Persisted file state transitions via pgx/v5 connection pools and handled SIGINT and SIGTERM so interrupted scans resume from the exact unindexed file.",
      },
    ],
    architecture: {
      caption:
        "Two-phase incremental SHA-256 walker and generic bounded goroutine worker pool.",
      flow: {
        label: "GoLakeScanner concurrent pipeline",
        wide: {
          width: 700,
          height: 250,
          node: { w: 126, h: 52 },
          nodes: {
            fs: [10, 98],
            walker: [176, 98],
            pool: [342, 34],
            probes: [342, 162],
            pg: [528, 98],
          },
        },
        tall: {
          width: 300,
          height: 380,
          node: { w: 136, h: 48 },
          nodes: {
            fs: [82, 8],
            walker: [82, 84],
            pool: [8, 168],
            probes: [156, 168],
            pg: [82, 260],
          },
        },
        nodes: [
          {
            id: "fs",
            label: "DATA LAKE",
            sub: "Nested PDFs · Media",
            kind: "input",
            step: 0,
          },
          {
            id: "walker",
            label: "SHA-256 WALKER",
            sub: "New · Changed · Skip",
            kind: "focus",
            step: 1,
          },
          {
            id: "pool",
            label: "POOL.RUN[IN,OUT]",
            sub: "Bounded Goroutines",
            kind: "focus",
            step: 2,
          },
          {
            id: "probes",
            label: "FILE PROBES",
            sub: "30s Timeout · PDF",
            step: 3,
          },
          {
            id: "pg",
            label: "POSTGRESQL",
            sub: "pgx/v5 Catalog",
            kind: "store",
            step: 4,
          },
        ],
        edges: [
          { from: "fs", to: "walker", step: 1 },
          { from: "walker", to: "pool", step: 2 },
          { from: "pool", to: "probes", step: 3 },
          { from: "probes", to: "pg", step: 4 },
          { from: "walker", to: "pg", step: 4, dashed: true },
        ],
        steps: [
          {
            title: "Walk nested directories",
            text: "Streams files from the target data lake without loading full files into memory.",
          },
          {
            title: "Incremental SHA-256 diffing",
            text: "Unchanged files are skipped immediately; only new or modified files enter Phase 2.",
          },
          {
            title: "Generic bounded worker pool",
            text: "pool.Run[In, Out] dispatches jobs across N worker goroutines with channel backpressure.",
          },
          {
            title: "30s timeout-isolated classification",
            text: "Magic-byte and PDF structure probes classify files without risking a pipeline hang.",
          },
          {
            title: "Resumable pgx/v5 catalog",
            text: "Results commit atomically to PostgreSQL with clean SIGINT/SIGTERM resume support.",
          },
        ],
      },
    },
    results: {
      title: "Engineering guarantees",
      stats: [
        {
          value: 2,
          label: "phases: incremental SHA-256 diffing then bounded deep probes",
        },
        {
          value: 30,
          suffix: " s",
          label: "hard per-file context timeout preventing worker starvation",
        },
        {
          value: "O(1)",
          label: "streaming 64 KB buffer memory footprint per worker",
        },
        {
          value: "100%",
          label: "resumable progress across SIGINT/SIGTERM interrupts",
        },
      ],
    },
  },
  cookoff: {
    name: "Cook Off 10.0",
    context: "CodeChef-VIT Flagship Competitive Coding Portal · 1,000+ Users",
    started: "Sep 2025",
    problem: {
      lead: "During a timed competitive coding contest with 1,000+ participants, a browser refresh or last-minute submission spike can wipe out a contestant's code or drop auth tokens.",
      points: [
        "Hundreds of contestants compiling and submitting simultaneously in the final minutes create 40%+ concurrent load spikes.",
        "Relying only on in-memory React state loses code on accidental tab refresh or network drop.",
      ],
    },
    approach: [
      {
        title: "CodeMirror 6 multi-language IDE",
        text: "Built a low-latency browser code editor supporting C++, Python, Java, and JavaScript with syntax diagnostics and custom keymaps.",
      },
      {
        title: "Triple-layer state persistence",
        text: "Combined Zustand in-memory state with synchronous LocalStorage write-through caching and debounced MongoDB background checkpoints so zero code is lost on refresh.",
      },
      {
        title: "Resilient Axios interceptor pipeline",
        text: "Centralized JWT refresh, request queuing, and test-case execution polling to sustain 40% concurrent contest traffic without dropped submissions.",
      },
    ],
    architecture: {
      caption:
        "Triple-layer persistence from CodeMirror 6 to Zustand, LocalStorage, and MongoDB.",
      flow: {
        label: "Cook Off 10.0 contest portal architecture",
        wide: {
          width: 680,
          height: 250,
          node: { w: 126, h: 52 },
          nodes: {
            editor: [10, 98],
            zustand: [176, 98],
            local: [342, 34],
            axios: [342, 162],
            mongo: [518, 98],
          },
        },
        tall: {
          width: 300,
          height: 380,
          node: { w: 136, h: 48 },
          nodes: {
            editor: [82, 8],
            zustand: [82, 84],
            local: [8, 168],
            axios: [156, 168],
            mongo: [82, 260],
          },
        },
        nodes: [
          {
            id: "editor",
            label: "CODEMIRROR 6",
            sub: "Multi-Language IDE",
            kind: "input",
            step: 0,
          },
          {
            id: "zustand",
            label: "ZUSTAND STORE",
            sub: "In-Memory State",
            kind: "focus",
            step: 1,
          },
          {
            id: "local",
            label: "LOCALSTORAGE",
            sub: "Instant Recovery",
            kind: "store",
            step: 2,
          },
          {
            id: "axios",
            label: "AXIOS PIPELINE",
            sub: "JWT & Retry Queue",
            kind: "focus",
            step: 3,
          },
          {
            id: "mongo",
            label: "MONGODB + JUDGE",
            sub: "1,000+ Contestants",
            kind: "store",
            step: 4,
          },
        ],
        edges: [
          { from: "editor", to: "zustand", step: 1 },
          { from: "zustand", to: "local", step: 2 },
          { from: "zustand", to: "axios", step: 3 },
          { from: "axios", to: "mongo", step: 4 },
        ],
        steps: [
          {
            title: "CodeMirror 6 keystrokes",
            text: "Contestants write and test solutions across languages in real time.",
          },
          {
            title: "Zustand state orchestration",
            text: "Active problem buffers, language selections, and test results update with zero re-render lag.",
          },
          {
            title: "Write-through LocalStorage backup",
            text: "Every edit persists locally so a browser crash or refresh recovers instantaneously.",
          },
          {
            title: "Authenticated Axios submission queue",
            text: "Interceptors attach tokens and handle retries during peak submission bursts.",
          },
          {
            title: "MongoDB checkpoint & judge verdict",
            text: "Submissions are evaluated and persisted for 1,000+ participants.",
          },
        ],
      },
    },
    results: {
      title: "Contest scale",
      stats: [
        {
          value: 1000,
          suffix: "+",
          label: "active contest participants served",
        },
        {
          value: 3,
          label: "persistence layers (Zustand, LocalStorage, MongoDB)",
        },
        {
          value: 40,
          suffix: "%",
          label: "peak concurrent contest load sustained",
        },
        { value: 0, label: "lost code submissions across the event" },
      ],
    },
  },
};
