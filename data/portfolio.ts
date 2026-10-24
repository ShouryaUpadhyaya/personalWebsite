import { 
  Terminal, 
  Code2, 
  Database, 
  Server, 
  Layout,
  GitBranch,
  MonitorSmartphone,
  Cpu,
  Layers,
  Globe,
  Settings
} from "lucide-react";

export const portfolio = {
  personal: {
    name: "Shourya Upadhyaya",
    subtitle: "Backend-Leaning Full-Stack Developer",
    description: "Building production-ready backends, real-time streaming pipelines, and scalable web applications. Smart India Hackathon Finalist.",
    about: "I'm a Computer Science & Engineering student at VIT Vellore (Class of 2028) focused on backend-heavy web products and real-time systems. I build production backends with Node.js, TypeScript, Python, Go, PostgreSQL/MongoDB, and Redis, ship them in Docker behind Nginx, and monitor them with Prometheus and Grafana. From scaling OpenPumTa to 300+ registered users (10,000+ visits), to engineering a 48 kHz real-time audio deepfake detection pipeline (Smart India Hackathon Finalist), to leading backend & payment architecture at Moss X (1.5s to 150ms API latency via Redis), I love owning complex systems end-to-end.",
    email: "shouryaupadhyaya26@gmail.com",
    github: "https://github.com/ShouryaUpadhyaya",
    linkedin: "https://www.linkedin.com/in/shourya-upadhyaya-998535332",
    twitter: "https://x.com/Shourya60756648"
  },
  stats: [
    { label: "Users & Visits", value: "10,000+", delay: 0.1 },
    { label: "Registered Users", value: "300+", delay: 0.2 },
    { label: "REST & WS APIs", value: "30+", delay: 0.3 },
    { label: "Contest Coders", value: "1,000+", delay: 0.4 }
  ],
  projects: [
    {
      title: "OpenPumTa",
      subtitle: "The 21-Day Deep Work & Study OS (300+ Users)",
      image: "/projects/openpumta.png",
      goal: "Build a self-hosted productivity workspace combining Pomodoro focus tracking, 21-day habit streaks, and AI daily reviews.",
      challenge: "Synchronizing real-time Pomodoro timers across concurrent devices and serving analytics across 10,000+ visits without overloading PostgreSQL.",
      result: "Scaled to 300+ registered users and 10,000+ visits across 30+ REST APIs & 10 Prisma models; cut DB load by 80% with Redis caching and monitored via Prometheus & Grafana.",
      tech: ["NEXT.JS", "EXPRESS", "POSTGRESQL", "PRISMA", "REDIS", "WEBSOCKETS", "DOCKER", "PROMETHEUS"],
      year: "Jan. 2025 - Present",
      liveUrl: "https://openpumta.com",
      githubUrl: "https://github.com/ShouryaUpadhyaya/openPumta",
      readmeUrl: "/content/projects/openpumta.md",
      slug: "openpumta",
      mermaidChart: `flowchart TB
    %% Clients
    subgraph Clients["Clients"]
        Browser["🌐 Web Browser"]
        Mobile["📱 Mobile App"]
    end

    %% VPS / Host Server
    subgraph VPS["VPS (Self-Hosted)"]
        Nginx["🛡️ Nginx Reverse Proxy\\n(SSL / Routing)"]

        %% Docker Network
        subgraph Docker["Docker Compose Network"]

            %% Frontend Layer
            NextJS["🖥️ Next.js\\n(Web Frontend)"]

            %% Backend Layer
            subgraph Backend["Backend API Layer"]
                Express["⚙️ Node.js + Express\\n(30+ REST APIs + Zod)"]
                WS["⚡ WebSockets\\n(Real-time Timer Sync)"]
            end

            %% Data Layer
            subgraph DataLayer["Data Layer"]
                Postgres[("🐘 PostgreSQL\\n(10 Prisma Models)")]
                Redis[("🔴 Redis\\n(Analytics Caching)")]
            end

            %% Observability Stack
            subgraph Observability["Observability Stack"]
                Prometheus["📊 Prometheus\\n(Metrics Scraper)"]
                Grafana["📈 Grafana\\n(Monitoring Dashboards)"]
            end

        end
    end

    %% Client Connections
    Browser -->|HTTP/HTTPS| Nginx
    Browser -->|WSS| Nginx
    Mobile -->|HTTP/HTTPS| Nginx
    Mobile -->|WSS| Nginx

    %% Proxy Routing
    Nginx -->|Route /_next| NextJS
    Nginx -->|Route /api| Express
    Nginx -->|WebSocket Connection| WS

    %% Internal Application Logic
    NextJS -->|SSR / CSR API Calls| Express

    %% Database and Caching
    Express -->|Prisma ORM Queries| Postgres
    Express -->|Cache Read/Write| Redis

    %% Monitoring Metrics
    Prometheus -.->|Scrape /metrics| Express
    Prometheus -.->|Scrape /metrics| NextJS
    Prometheus -.->|Scrape Exporter| Postgres
    Prometheus -.->|Scrape Exporter| Redis

    Grafana -->|Query Metrics| Prometheus`
    },
    {
      title: "VoiceShield AI",
      subtitle: "Real-Time Audio Scam & Deepfake Detection (SIH Finalist)",
      image: "/projects/openpumta.png",
      goal: "Detect synthetic voices and social-engineering phone scams in real time during live calls without stalling audio playback.",
      challenge: "Reassembling arbitrary 48 kHz PCM16 WebSocket frames into exact 3-second buffers while isolating slow database writes off the hot audio path.",
      result: "Enforced a strict byte-conservation invariant across 3s audio chunks, queued PostgreSQL writes off-path, and fused Whisper + PyTorch acoustic models at 1.1s median CPU latency.",
      tech: ["NODE.JS", "TYPESCRIPT", "PYTHON", "FASTAPI", "PYTORCH", "WHISPER", "WEBSOCKETS", "POSTGRESQL"],
      year: "Smart India Hackathon Finalist",
      liveUrl: "#",
      githubUrl: "https://github.com/ShouryaUpadhyaya/VoiceShield-AI",
      readmeUrl: "/content/projects/voiceshield.md",
      slug: "voiceshield",
      mermaidChart: `flowchart TB
    subgraph Sources["Telephony Sources"]
        Android["📱 Android CallVault\\n(48kHz Mono PCM16)"]
        SIP["☎️ FreeSWITCH SIP"]
    end

    subgraph Gateway["Node.js + TS Media Gateway"]
        Ingest["⚡ WebSocket Ingest"]
        Chunker["🧱 3s Ring Buffer\\n(Byte-Conservation Check)"]
        AsyncDB["📬 Off-Path Write Queue"]
    end

    subgraph MLEngine["Python / FastAPI ML Engine"]
        Acoustic["🎛️ RawNet2 / WavLM / ONNX"]
        Whisper["🗣️ OpenAI Whisper STT"]
        Agent["🧠 Scam-Risk Agent\\n(1.1s Median CPU)"]
    end

    subgraph Output["Persistence & Live UI"]
        Postgres[("🐘 PostgreSQL")]
        Dashboard["🖥️ Next.js Dashboard\\n(Socket.IO Stream)"]
    end

    Android -->|WSS PCM16| Ingest
    SIP -->|PCM16| Ingest
    Ingest --> Chunker
    Chunker -->|Persistent WS| Acoustic
    Chunker -->|Persistent WS| Whisper
    Chunker -.->|Async Enqueue| AsyncDB
    AsyncDB --> Postgres
    Acoustic --> Agent
    Whisper --> Agent
    Agent -->|Socket.IO| Dashboard`
    },
    {
      title: "Moss X",
      subtitle: "High-Performance E-Commerce Modular Monolith",
      image: "/projects/mossx.png",
      goal: "Build a production e-commerce platform serving 100+ users with sub-50ms homepage load times and zero duplicate payment charges.",
      challenge: "Cutting slow 1.5s catalog queries under traffic spikes and guaranteeing idempotent Razorpay payment verification across network drops.",
      result: "Slashed product listing API latency by 90% (1.5s to 150ms) via Redis caching, kept homepage latency below 50ms, and processed 20+ live Razorpay orders with zero duplicate charges.",
      tech: ["NODE.JS", "EXPRESS", "MONGODB", "REDIS", "RAZORPAY", "REACT", "DOCKER"],
      year: "Apr. 2025 - Oct. 2025",
      liveUrl: "https://mossx.in",
      githubUrl: "https://github.com/Moss-X/Website",
      readmeUrl: "/content/projects/mossx.md",
      slug: "mossx",
      mermaidChart: `graph TD
    Client[React Client SPA] --> API[Express API Gateway]

    API --> Auth[Auth Service]
    API --> Product[Product Service]
    API --> Cart[Cart Service]
    API --> Payment[Payment Service]
    API --> Analytics[Analytics Service]

    Auth --> Mongo[(MongoDB)]
    Product --> Mongo
    Product --> Redis[(Upstash Redis Cache)]
    Cart --> Mongo
    Payment --> Mongo
    Analytics --> Mongo

    Payment --> Stripe[Stripe API]
    Payment --> Razorpay[Razorpay API]

    Product --> Cloudinary[Cloudinary CDN]`
    },
    {
      title: "Cook Off 10.0",
      subtitle: "Scalable Competitive Coding Portal (CodeChef-VIT)",
      image: "/projects/cookoff-portal-10.0/kitchen.jpg",
      goal: "Deliver a flawless, real-time competitive programming IDE with zero dropped submissions for 1,000+ contest participants.",
      challenge: "Preventing code loss and state corruption when hundreds of contestants compile and submit simultaneously in the final 5 minutes.",
      result: "Sustained 40% concurrent load across 1,000+ users on CodeMirror 6 using triple-layer persistence (Zustand, LocalStorage, MongoDB) and Axios auth interceptors.",
      tech: ["NEXT.JS", "TYPESCRIPT", "CODEMIRROR 6", "ZUSTAND", "MONGODB"],
      year: "Sept. 2025 - Feb. 2026",
      liveUrl: "#",
      githubUrl: "https://github.com/CodeChefVIT/cookoff-portal-10.0",
      readmeUrl: "/content/projects/cookoff.md",
      slug: "cookoff"
    },
    {
      title: "CRMS Cloud Control Plane",
      subtitle: "Database-Centric Cloud Resource & Docker Telemetry Engine",
      image: "/projects/openpumta.png",
      goal: "Build a multi-tenant cloud resource, quota, billing, and live Docker monitoring platform where business invariants live directly in PostgreSQL 16.",
      challenge: "Eliminating check-then-act VM quota race conditions and keeping analytical queries fast across 1,000,000+ time-series metric rows.",
      result: "Enforced tenant isolation via PostgreSQL RLS, prevented concurrent quota over-allocation with SELECT FOR UPDATE locking, and cut 1M-row query latency from 42ms to 0.2ms via BRIN/GIN indexing.",
      tech: ["POSTGRESQL 16", "NODE.JS", "TYPESCRIPT", "DOCKER", "REACT", "SSE"],
      year: "2026",
      liveUrl: "#",
      githubUrl: "https://github.com/ShouryaUpadhyaya/DBMS_Cloud_Management_Software",
      readmeUrl: "/content/projects/crms.md",
      slug: "crms",
      mermaidChart: `flowchart LR
    subgraph Collector["Telemetry Collector (30s)"]
        Proxy["🐳 Read-Only Docker Proxy"]
        Worker["📡 Collector Worker"]
    end

    subgraph PG["PostgreSQL 16 Core Engine"]
        Procs["⚙️ Stored Procedures\\n(FOR UPDATE Quota Locks)"]
        RLS["🛡️ Row-Level Security\\n& btree_gist Constraints"]
        Parts[("📊 1M+ Partitioned Rows\\n(BRIN & GIN Indexes)")]
        Notify["🔔 Triggers + pg_notify"]
    end

    subgraph App["Express API & React Console"]
        API["🔒 Per-Request RLS Tx"]
        SSE["⚡ LISTEN / NOTIFY SSE"]
        UI["🖥️ Cloud Console & DB Lab"]
    end

    Proxy --> Worker
    Worker -->|sp_ingest_metrics| Procs
    Procs --> Parts
    Parts --> Notify
    Notify --> SSE
    SSE --> UI
    UI <--> API
    API <--> RLS`
    },
    {
      title: "Job Agent",
      subtitle: "Autonomous Job-Discovery, Multi-Resume Scorer & ATS Classifier",
      image: "/projects/openpumta.png",
      goal: "Automate internship discovery across 8+ public ATS boards, score roles deterministically against multiple resumes, and track Gmail recruiter threads.",
      challenge: "Matching skills without LLM hallucinations, classifying noisy ATS emails into forward-only pipeline stages, and guarding browser auto-apply runs.",
      result: "Built a 7-tab Express 5 + Next.js 16 platform with a 0-100 deterministic multi-resume scorer, 12-class Gmail OAuth state machine, and dry-run-first Playwright runner.",
      tech: ["EXPRESS 5", "NEXT.JS 16", "TYPESCRIPT", "POSTGRESQL", "PRISMA", "PLAYWRIGHT", "GMAIL OAUTH"],
      year: "2026",
      liveUrl: "#",
      githubUrl: "https://github.com/ShouryaUpadhyaya/job_agent",
      readmeUrl: "/content/projects/job-agent.md",
      slug: "job-agent",
      mermaidChart: `flowchart TB
    subgraph Sources["External Feeds"]
        ATS["🌐 8+ Public ATS APIs\\n(Greenhouse, Lever, Ashby)"]
        Gmail["📧 Gmail OAuth Sync"]
    end

    subgraph Engine["Express 5 + Prisma Engine"]
        Scorer["🎯 0-100 Deterministic\\nMulti-Resume Scorer"]
        Classifier["🏷️ 12-Class Email Classifier\\n(Forward-Only Pipeline)"]
        Runner["🎭 Guarded Playwright Runner\\n(Dry-Run Default + SSE)"]
    end

    subgraph Store["Storage & UI"]
        DB[("🐘 PostgreSQL")]
        Web["🖥️ Next.js 16 7-Tab Dashboard"]
    end

    ATS --> Scorer
    Gmail --> Classifier
    Scorer --> DB
    Classifier --> DB
    DB <--> Web
    Web --> Runner`
    },
    {
      title: "GoLakeScanner",
      subtitle: "Concurrent Data-Lake File Classifier & Indexer in Go",
      image: "/projects/openpumta.png",
      goal: "Walk, hash, classify, and index unstructured data lakes into PostgreSQL without re-processing unchanged files or stalling on corrupt inputs.",
      challenge: "Isolating slow or hung file probes across thousands of nested PDFs, scans, and media files while supporting graceful interrupt and resume.",
      result: "Engineered a two-phase SHA-256 incremental walker and generic bounded goroutine worker pool (pool.Run[In, Out]) with 30s per-file context timeouts and pgx/v5 cataloging.",
      tech: ["GO (GOLANG)", "PGX/V5", "POSTGRESQL", "CONCURRENCY", "CLI"],
      year: "2026",
      liveUrl: "#",
      githubUrl: "https://github.com/ShouryaUpadhyaya/GoLang_Lake_Scanner",
      readmeUrl: "/content/projects/golang-lake-scanner.md",
      slug: "golang-lake-scanner",
      mermaidChart: `flowchart LR
    subgraph Lake["Data Lake"]
        FS["📂 Nested Files\\n(PDFs, Scans, Media)"]
    end

    subgraph Phase1["Phase 1: Walker"]
        SHA["#️⃣ SHA-256 Hasher"]
        State["🔄 State Diff\\n(New | Changed | Unchanged)"]
    end

    subgraph Phase2["Phase 2: Go Worker Pool"]
        Pool["⚡ Goroutine Pool\\npool.Run[In, Out] (30s Timeout)"]
        Probe["🔍 Magic-Byte & PDF Probes"]
    end

    subgraph DB["Catalog"]
        PG[("🐘 PostgreSQL (pgx/v5)")]
    end

    FS --> SHA --> State --> PG
    PG -->|Pending Only| Pool --> Probe --> PG`
    }
  ],
  experience: [
    {
      role: "Full-Stack Developer (Backend Lead)",
      company: "Moss X",
      companyUrl: "https://mossx.in",
      githubUrl: "https://github.com/Moss-X/Website",
      period: "Apr. 2025 - Oct. 2025",
      description: "Built e-commerce flows for 100+ users with React, Express.js, MongoDB, and Node.js using aggregation pipelines for analytics and recommendations. Cached the product listing API in Redis (cutting response time by 90% from 1.5s to 150ms and keeping homepage latency below 50ms), integrated Razorpay with webhook verification and idempotency protection, containerized services with Docker on Render, and led 3 developers through PR reviews and delivery.",
      skills: ["Node.js", "Express.js", "MongoDB", "Redis", "Razorpay", "React", "Docker"]
    },
    {
      role: "Frontend Developer Intern",
      company: "Nepbyte Technology",
      period: "Sept. 2024 - Feb. 2025",
      description: "Built production React interfaces with Tailwind CSS, Zustand, and Axios REST interceptors. Improved Core Web Vitals through route-based code splitting, lazy loading, and semantic HTML — cutting Largest Contentful Paint (LCP) by 49% from 3.5s to 1.8s and boosting URLs passing Core Web Vitals from 45% to 85%.",
      skills: ["React", "Zustand", "Tailwind CSS", "Axios", "Web Performance"]
    }
  ],
  education: [
    {
      degree: "B.Tech — Computer Science & Engineering",
      school: "Vellore Institute of Technology (VIT Vellore)",
      period: "Aug. 2024 – May 2028",
      location: "Vellore, Tamil Nadu",
      description: "Smart India Hackathon (SIH) College Finalist · Core Developer at CodeChef-VIT (engineered Cook Off 10.0 for 1,000+ users). Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Operating Systems.",
      skills: ["DSA", "OOP", "DBMS", "Computer Networks", "System Design"]
    }
  ],
  writing: [
    {
      title: "Why I Moved My App from Vercel + Render + Neon to a Single VPS",
      description: "Understanding server infrastructure consolidation and cost efficiency.",
      url: "https://medium.com/@shouryaupadhyaya79/why-i-moved-my-app-from-vercel-render-neon-to-a-single-vps-1591760bb7be",
      date: "June 2026"
    },
    {
      title: "How I Built a Pomodoro Timer That Doesn't Lie to You",
      description: "Orphaned timers, time synchronization, and state management.",
      url: "https://medium.com/@shouryaupadhyaya79/how-i-built-a-pomodoro-timer-that-doesnt-lie-to-you-3bfdf2b157dd",
      date: "May 2026"
    },
    {
      title: "Stop writing boiler plate code! Async Handlers in Express Backend",
      description: "Streamlining backend development with modern patterns.",
      url: "https://medium.com/@shouryaupadhyaya79/stop-writing-boiler-plate-code-async-handlers-in-express-backend-3eac2974f186",
      date: "February 2026"
    }
  ],
  stack: [
    {
      category: "Backend & Streaming",
      icon: Server,
      skills: ["Node.js", "Express.js", "FastAPI", "Go", "Prisma ORM", "REST APIs", "WebSockets", "Socket.IO", "JWT"]
    },
    {
      category: "Databases & Caching",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "Redis", "PL/pgSQL & RLS", "pgx/v5"]
    },
    {
      category: "AI & Audio ML",
      icon: Cpu,
      skills: ["PyTorch", "OpenAI Whisper", "ONNX Runtime", "SpeechBrain", "Groq / Gemini LLMs"]
    },
    {
      category: "Frontend",
      icon: Layout,
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "CodeMirror 6", "Framer Motion"]
    },
    {
      category: "DevOps & Systems",
      icon: Settings,
      skills: ["Docker", "Nginx", "Linux VPS", "Prometheus", "Grafana", "Playwright", "Git"]
    },
    {
      category: "Languages",
      icon: Code2,
      skills: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "C++"]
    }
  ],
  testimonials: [
    {
      name: "Akshaj Khetarpal",
      role: "CEO",
      company: "Moss X",
      image: "/testimonials/akshaj.jpg",
      text: "Shourya was responsible for all of the technical implementation for our business, taking ownership of everything from architecture to deployment. Under his leadership, we successfully acquired over 100 registered customers and generated more than 20 sales. He led a team of engineers effectively, consistently delivering high-quality work and ensuring projects stayed on track. I trusted him completely with the technical side of the business, and he exceeded my expectations through his reliability, technical expertise, and ability to execute."
    },
    {
      name: "Narayan",
      role: "CEO",
      company: "Nepbyte Technology",
      image: "/testimonials/narayan.jpg",
      text: "Working with Shourya at Nepbyte Technology was a great experience. He consistently delivered high-quality frontend solutions with a strong focus on performance, clean architecture, and user experience. He was proactive in solving technical challenges, collaborated effectively with the team, and took ownership of his work from start to finish. His attention to detail and commitment to writing maintainable code made him someone the team could always rely on. I would confidently recommend Shourya to any organization looking for a skilled and dependable full-stack engineer."
    }
  ],
  faq: [
    {
      question: "Do you handle both frontend design and backend deployment?",
      answer: "Yes, I am a full-stack engineer with a strong backend and systems focus. I take projects from zero to production — from React/Next.js interfaces to Node.js, Python/FastAPI, and Go backends, PostgreSQL/Redis architectures, and self-hosted Docker + Nginx + Prometheus/Grafana deployments."
    },
    {
      question: "What is your typical turnaround time?",
      answer: "Turnaround times depend on the scope of the project, but I prioritize fast, iterative delivery. We will establish clear milestones during our discovery call so you know exactly when features will be live."
    },
    {
      question: "Are you open to full-time roles or just contract work?",
      answer: "I am actively looking for backend and full-stack software engineering internships, full-time roles, as well as taking on select high-impact engineering projects."
    },
    {
      question: "What happens if there are bugs after launch?",
      answer: "For all my freelance projects, I provide a 30-day post-launch guarantee. If any bugs arise related to my code within the first 30 days of launch, I will fix them completely free of charge."
    }
  ]
};
