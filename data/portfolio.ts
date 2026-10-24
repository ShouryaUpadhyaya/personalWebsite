export const RESUME_URL =
  "https://drive.google.com/file/d/1X7UxzF6CNNbTws2D9CG-nS70IheNkCee/view?usp=drive_link";

export const profile = {
  name: "Shourya Upadhyaya",
  role: "Software Engineer",
  tagline:
    "Software engineer specializing in distributed backend architectures, real-time audio & ML pipelines, and high-performance full-stack systems.",
  location: "Vellore, India",
  education: {
    institution: "Vellore Inst. of Technology",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2024 — 2028",
  },
  email: "shouryaupadhyaya26@gmail.com",
  github: "https://github.com/ShouryaUpadhyaya",
  linkedin: "https://www.linkedin.com/in/shourya-upadhyaya-998535332",
  twitter: "https://x.com/Shourya60756648",
  resume: RESUME_URL,
  bio: "Second-year Computer Science undergraduate at VIT Vellore focused on backend-heavy web products, real-time streaming pipelines, and database-centric systems. I build production services with Node.js, TypeScript, Python, Go, PostgreSQL, and Redis, deploy them in Docker behind Nginx, and instrument them with Prometheus and Grafana.",
};

export const domains = ["Backend", "AI / ML", "Full-Stack", "Systems"] as const;

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  domains: string[];
  featured: boolean;
  tagline: string;
  description: string;
  goal: string;
  challenge: string;
  result: string;
  metrics: string[];
  tech: string[];
  year: string;
  github: string;
  githubUrl: string;
  live?: string;
  liveUrl?: string;
  image: string;
  readmeUrl: string;
}

export const projects: ProjectItem[] = [
  {
    id: "openpumta",
    slug: "openpumta",
    title: "OpenPumTa",
    subtitle: "The 21-Day Deep Work & Study OS (300+ Users)",
    type: "Production Full-Stack & Real-Time Architecture",
    domains: ["Backend", "Full-Stack", "Systems"],
    featured: true,
    tagline:
      "Self-hosted productivity platform serving 300+ registered users and 10,000+ visits with cross-device WebSocket timer synchronization and Redis-cached analytics.",
    description:
      "Architected 30+ REST APIs and 10 Prisma ORM models backed by PostgreSQL. Built a stateful WebSocket hub for sub-second cross-device Pomodoro timer synchronization, added Redis caching that reduced analytics database load by 80%, integrated AI daily habit reviews, and deployed a multi-container Docker Compose stack on a Linux VPS behind Nginx with Prometheus and Grafana observability.",
    goal: "Build a self-hosted productivity workspace combining Pomodoro focus tracking, 21-day habit streaks, and AI daily reviews.",
    challenge:
      "Synchronizing real-time Pomodoro timers across concurrent devices and serving analytics across 10,000+ visits without overloading PostgreSQL.",
    result:
      "Scaled to 300+ registered users and 10,000+ visits across 30+ REST APIs & 10 Prisma models; cut DB load by 80% with Redis caching and monitored via Prometheus & Grafana.",
    metrics: [
      "300+ Registered Users & 10K+ Visits",
      "80% DB Load Cut via Redis Cache",
      "30+ REST APIs & WebSocket Sync",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "WebSockets",
      "Docker",
      "Nginx",
      "Prometheus",
      "Grafana",
    ],
    year: "Jan 2025 — Present",
    github: "https://github.com/ShouryaUpadhyaya/openPumta",
    githubUrl: "https://github.com/ShouryaUpadhyaya/openPumta",
    live: "https://openpumta.com",
    liveUrl: "https://openpumta.com",
    image: "/projects/openpumta.png",
    readmeUrl: "/content/projects/openpumta.md",
  },
  {
    id: "voiceshield",
    slug: "voiceshield",
    title: "VoiceShield AI",
    subtitle: "Real-Time Audio Scam & Deepfake Detection (SIH Finalist)",
    type: "Real-Time Audio ML & Streaming Systems",
    domains: ["AI / ML", "Backend", "Systems"],
    featured: false,
    tagline:
      "Low-latency 48 kHz PCM16 audio gateway and multi-model deepfake & scam-risk engine built for Smart India Hackathon (VIT Vellore Finalist).",
    description:
      "Engineered a Node.js/TypeScript WebSocket media gateway ingesting live 48 kHz mono PCM16 call streams, reassembling arbitrary network frames into ordered 3-second sliding windows while enforcing a strict byte-conservation invariant. Routed chunks over a persistent WebSocket to a FastAPI ML engine running RawNet2/WavLM acoustic deepfake models and OpenAI Whisper STT, achieving ~1.1s median CPU latency while queuing PostgreSQL writes off the hot audio path.",
    goal: "Detect synthetic voices and social-engineering phone scams in real time during live calls without stalling audio playback.",
    challenge:
      "Reassembling arbitrary 48 kHz PCM16 WebSocket frames into exact 3-second buffers while isolating slow database writes off the hot audio path.",
    result:
      "Enforced a strict byte-conservation invariant across 3s audio chunks, queued PostgreSQL writes off-path, and fused Whisper + PyTorch acoustic models at 1.1s median CPU latency.",
    metrics: [
      "~1.1s Median CPU Inference / 3s Chunk",
      "48 kHz PCM16 Byte-Conserving Buffer",
      "SIH College Finalist · Off-Path DB Queue",
    ],
    tech: [
      "Node.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PyTorch",
      "OpenAI Whisper",
      "ONNX Runtime",
      "WebSockets",
      "PostgreSQL",
      "Next.js",
    ],
    year: "2025",
    github: "https://github.com/ShouryaUpadhyaya/VoiceShield-AI",
    githubUrl: "https://github.com/ShouryaUpadhyaya/VoiceShield-AI",
    image: "/projects/openpumta.png",
    readmeUrl: "/content/projects/voiceshield.md",
  },
  {
    id: "mossx",
    slug: "mossx",
    title: "Moss X",
    subtitle: "High-Performance E-Commerce Modular Monolith",
    type: "Backend Architecture & Payment Systems",
    domains: ["Backend", "Full-Stack"],
    featured: false,
    tagline:
      "Production e-commerce platform serving 100+ users with sub-50ms homepage latency, Redis catalog caching, and idempotent Razorpay webhooks.",
    description:
      "Built the full-stack e-commerce platform for 100+ registered users using React, Express.js, and MongoDB aggregation pipelines for sales analytics and product recommendations. Cached the catalog API in Redis to slash latency by 90% (1.5s to 150ms) and keep homepage load below 50ms. Integrated Razorpay with HMAC webhook signature verification and idempotency keys, processing 20+ live orders with zero duplicate charges.",
    goal: "Build a production e-commerce platform serving 100+ users with sub-50ms homepage load times and zero duplicate payment charges.",
    challenge:
      "Cutting slow 1.5s catalog queries under traffic spikes and guaranteeing idempotent Razorpay payment verification across network drops.",
    result:
      "Slashed product listing API latency by 90% (1.5s to 150ms) via Redis caching, kept homepage latency below 50ms, and processed 20+ live Razorpay orders with zero duplicate charges.",
    metrics: [
      "1.5s → 150ms API Latency (-90%)",
      "<50ms Homepage Load · 100+ Users",
      "Idempotent HMAC Razorpay Webhooks",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "React",
      "Tailwind CSS",
      "Docker",
    ],
    year: "Apr 2025 — Oct 2025",
    github: "https://github.com/Moss-X/Website",
    githubUrl: "https://github.com/Moss-X/Website",
    live: "https://mossx.in",
    liveUrl: "https://mossx.in",
    image: "/projects/mossx.png",
    readmeUrl: "/content/projects/mossx.md",
  },
  {
    id: "crms",
    slug: "crms",
    title: "CRMS Cloud Control Plane",
    subtitle: "Database-Centric Cloud Resource & Docker Telemetry Engine",
    type: "Database Internals & Cloud Systems",
    domains: ["Backend", "Systems"],
    featured: false,
    tagline:
      "Multi-tenant cloud quota, billing, and live Docker telemetry platform enforced inside PostgreSQL 16 via Row-Level Security, PL/pgSQL locks, and BRIN partitioning.",
    description:
      "Designed a 14-table 3NF/BCNF PostgreSQL 16 control plane where multi-tenant isolation is enforced at the database engine via Row-Level Security (`app.current_org_id`) and `btree_gist` temporal exclusion constraints. Eliminated check-then-act VM quota race conditions using `SELECT ... FOR UPDATE` inside transactional stored procedures, and partitioned a 1,000,000+ row telemetry table with BRIN & GIN indexes to cut time-range query latency from 42ms to 0.2ms.",
    goal: "Build a multi-tenant cloud resource, quota, billing, and live Docker monitoring platform where business invariants live directly in PostgreSQL 16.",
    challenge:
      "Eliminating check-then-act VM quota race conditions and keeping analytical queries fast across 1,000,000+ time-series metric rows.",
    result:
      "Enforced tenant isolation via PostgreSQL RLS, prevented concurrent quota over-allocation with SELECT FOR UPDATE locking, and cut 1M-row query latency from 42ms to 0.2ms via BRIN/GIN indexing.",
    metrics: [
      "42ms → 0.2ms on 1M+ Partitioned Rows",
      "PostgreSQL 16 RLS & FOR UPDATE Locks",
      "Live LISTEN/NOTIFY SSE Docker Stream",
    ],
    tech: [
      "PostgreSQL",
      "TypeScript",
      "Node.js",
      "Express.js",
      "React",
      "Docker",
    ],
    year: "2026",
    github: "https://github.com/ShouryaUpadhyaya/DBMS_Cloud_Management_Software",
    githubUrl:
      "https://github.com/ShouryaUpadhyaya/DBMS_Cloud_Management_Software",
    image: "/projects/openpumta.png",
    readmeUrl: "/content/projects/crms.md",
  },
  {
    id: "job-agent",
    slug: "job-agent",
    title: "Job Agent",
    subtitle: "Autonomous Job-Discovery, Multi-Resume Scorer & ATS Classifier",
    type: "Automation & Applied AI Pipeline",
    domains: ["Full-Stack", "Backend", "AI / ML"],
    featured: false,
    tagline:
      "End-to-end internship discovery platform aggregating 8+ ATS feeds, deterministic 0–100 multi-resume scoring, 12-class Gmail OAuth sync, and guarded Playwright runners.",
    description:
      "Built an Express 5 + Next.js 16 platform that ingests roles from Greenhouse, Lever, Ashby, and Workday, scores each posting against multiple LaTeX/PDF resumes using a deterministic 0–100 weighted rubric (+35 skills, +20 role, +15 domain) before optional LLM refinement, classifies recruiter emails via a 12-class Gmail OAuth state machine with forward-only pipeline transitions, and executes dry-run-first Playwright application workflows.",
    goal: "Automate internship discovery across 8+ public ATS boards, score roles deterministically against multiple resumes, and track Gmail recruiter threads.",
    challenge:
      "Matching skills without LLM hallucinations, classifying noisy ATS emails into forward-only pipeline stages, and guarding browser auto-apply runs.",
    result:
      "Built a 7-tab Express 5 + Next.js 16 platform with a 0-100 deterministic multi-resume scorer, 12-class Gmail OAuth state machine, and dry-run-first Playwright runner.",
    metrics: [
      "0–100 Deterministic Multi-Resume Scorer",
      "12-Class Gmail OAuth State Machine",
      "8+ ATS Collectors & Guarded Playwright",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Playwright",
    ],
    year: "2026",
    github: "https://github.com/ShouryaUpadhyaya/job_agent",
    githubUrl: "https://github.com/ShouryaUpadhyaya/job_agent",
    image: "/projects/openpumta.png",
    readmeUrl: "/content/projects/job-agent.md",
  },
  {
    id: "golang-lake-scanner",
    slug: "golang-lake-scanner",
    title: "GoLakeScanner",
    subtitle: "Concurrent Data-Lake File Classifier & Indexer in Go",
    type: "Concurrent Systems & CLI Tooling",
    domains: ["Systems", "Backend"],
    featured: false,
    tagline:
      "Two-phase incremental data-lake scanner in Go with a generic bounded worker pool, SHA-256 change detection, per-file context timeouts, and pgx/v5 PostgreSQL cataloging.",
    description:
      "Engineered a dependency-inverted Go CLI and library that walks nested data lakes, computes streaming SHA-256 hashes to classify files as new, modified, or unchanged, and dispatches pending files through a generic bounded worker pool (`pool.Run[In, Out]`) with 30-second per-file `context.WithTimeout` isolation and signal-aware graceful shutdown (`SIGINT`/`SIGTERM`).",
    goal: "Walk, hash, classify, and index unstructured data lakes into PostgreSQL without re-processing unchanged files or stalling on corrupt inputs.",
    challenge:
      "Isolating slow or hung file probes across thousands of nested PDFs, scans, and media files while supporting graceful interrupt and resume.",
    result:
      "Engineered a two-phase SHA-256 incremental walker and generic bounded goroutine worker pool (pool.Run[In, Out]) with 30s per-file context timeouts and pgx/v5 cataloging.",
    metrics: [
      "Generic Bounded Pool pool.Run[In, Out]",
      "SHA-256 Incremental State Diffing",
      "30s Per-File Timeout & pgx/v5 Catalog",
    ],
    tech: ["Go", "PostgreSQL"],
    year: "2026",
    github: "https://github.com/ShouryaUpadhyaya/GoLang_Lake_Scanner",
    githubUrl: "https://github.com/ShouryaUpadhyaya/GoLang_Lake_Scanner",
    image: "/projects/openpumta.png",
    readmeUrl: "/content/projects/golang-lake-scanner.md",
  },
  {
    id: "cookoff",
    slug: "cookoff",
    title: "Cook Off 10.0",
    subtitle: "Scalable Competitive Coding Portal (CodeChef-VIT)",
    type: "High-Concurrency Frontend & State Engineering",
    domains: ["Full-Stack"],
    featured: false,
    tagline:
      "Competitive programming IDE built on Next.js and CodeMirror 6 serving 1,000+ contest participants with triple-layer state persistence.",
    description:
      "Engineered the real-time competitive coding portal for CodeChef-VIT's flagship contest with 1,000+ active participants. Built a multi-language CodeMirror 6 IDE backed by triple-layer state persistence (Zustand in-memory store, LocalStorage write-through cache, and debounced MongoDB sync) and Axios auth/retry interceptors to guarantee zero lost submissions under 40% peak concurrent load.",
    goal: "Deliver a flawless, real-time competitive programming IDE with zero dropped submissions for 1,000+ contest participants.",
    challenge:
      "Preventing code loss and state corruption when hundreds of contestants compile and submit simultaneously in the final 5 minutes.",
    result:
      "Sustained 40% concurrent load across 1,000+ users on CodeMirror 6 using triple-layer persistence (Zustand, LocalStorage, MongoDB) and Axios auth interceptors.",
    metrics: [
      "1,000+ Active Contest Participants",
      "Triple-Layer Persistence (0 Data Loss)",
      "40% Peak Concurrent Traffic Sustained",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "MongoDB",
    ],
    year: "Sep 2025 — Feb 2026",
    github: "https://github.com/CodeChefVIT/cookoff-portal-10.0",
    githubUrl: "https://github.com/CodeChefVIT/cookoff-portal-10.0",
    image: "/projects/cookoff-portal-10.0/kitchen.jpg",
    readmeUrl: "/content/projects/cookoff.md",
  },
];

export const experience = [
  {
    id: "mossx-exp",
    role: "Full-Stack Developer (Team Lead)",
    company: "Moss X",
    period: "Apr 2025 — Oct 2025",
    caseStudy: "mossx",
    description:
      "Architected full-stack e-commerce flows for 100+ users using React, Express.js, and MongoDB aggregation pipelines. Cached the product catalog API in Redis to cut response latency by 90% (1.5s to 150ms) and keep homepage latency under 50ms. Integrated Razorpay payments with HMAC webhook verification and idempotency keys across 20+ live orders, containerized services with Docker, and led 3 developers through PR reviews and delivery.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "React",
      "Tailwind CSS",
      "Docker",
    ],
  },
  {
    id: "nepbyte-exp",
    role: "Frontend Engineering Intern",
    company: "Nepbyte Technology",
    period: "Sep 2024 — Feb 2025",
    description:
      "Built responsive React interfaces with Tailwind CSS, Zustand state management, and Axios REST interceptors. Improved Core Web Vitals through route-based code splitting, lazy asset loading, and semantic HTML — reducing Largest Contentful Paint (LCP) by 49% from 3.5s to 1.8s and raising URLs passing Core Web Vitals from 45% to 85%.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
  },
];

export const skills: Record<string, string[]> = {
  languages: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "C++"],
  backend: [
    "Node.js",
    "Express.js",
    "FastAPI",
    "Prisma",
    "WebSockets",
    "REST APIs",
  ],
  databases: ["PostgreSQL", "MongoDB", "Redis", "PL/pgSQL & RLS"],
  ai: ["PyTorch", "OpenAI Whisper", "ONNX Runtime", "SpeechBrain"],
  frontend: ["Next.js", "React", "Tailwind CSS", "Zustand", "CodeMirror 6"],
  devops: ["Docker", "Nginx", "Prometheus", "Grafana", "Playwright", "Linux"],
};

export const writing = [
  {
    title: "Why I Moved My App from Vercel + Render + Neon to a Single VPS",
    description:
      "Consolidating Next.js, Express, PostgreSQL, and Redis onto a single Docker Compose Linux VPS behind Nginx.",
    url: "https://medium.com/@shouryaupadhyaya79/why-i-moved-my-app-from-vercel-render-neon-to-a-single-vps-1591760bb7be",
    date: "2025",
  },
  {
    title: "How I Built a Pomodoro Timer That Doesn't Lie to You",
    description:
      "Solving orphaned timers, client tab drift, and cross-device WebSocket synchronization in OpenPumTa.",
    url: "https://medium.com/@shouryaupadhyaya79/how-i-built-a-pomodoro-timer-that-doesnt-lie-to-you-3bfdf2b157dd",
    date: "2025",
  },
  {
    title: "Stop Writing Boilerplate Code! Async Handlers in Express Backend",
    description:
      "Centralizing error propagation and Zod request validation across 30+ Express REST endpoints.",
    url: "https://medium.com/@shouryaupadhyaya79/stop-writing-boiler-plate-code-async-handlers-in-express-backend-3eac2974f186",
    date: "2025",
  },
];

export const portfolio = {
  personal: {
    name: profile.name,
    subtitle: profile.role,
    description: profile.tagline,
    about: profile.bio,
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    resume: profile.resume,
  },
  projects,
  experience,
  writing,
};
