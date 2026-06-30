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
    subtitle: "Lead Full-Stack Developer",
    description: "Building production-ready scalable systems and beautiful user interfaces. Passionate about solving complex engineering problems with modern tech.",
    email: "shouryaupadhyaya26@gmail.com",
    github: "https://github.com/ShouryaUpadhyaya",
    linkedin: "https://www.linkedin.com/in/shourya-upadhyaya-998535332",
    twitter: "https://x.com/Shourya60756648"
  },
  stats: [
    { label: "Users Served", value: "1,500+", delay: 0.1 },
    { label: "API Uptime", value: "99.9%", delay: 0.2 },
    { label: "REST APIs", value: "30+", delay: 0.3 },
    { label: "Concurrent Load", value: "40%", delay: 0.4 }
  ],
  projects: [
    {
      title: "Moss X",
      subtitle: "Modular monolithic e-commerce platform",
      image: "/projects/mossx.png",
      features: [
        "Razorpay idempotency",
        "Dynamic pricing",
        "Redis caching",
        "Docker",
        "MongoDB",
        "Node.js"
      ],
      tech: ["NODE.JS", "REDIS", "RAZORPAY"],
      year: "2025",
      liveUrl: "https://mossx.in",
      githubUrl: "https://github.com/Moss-X/Website",
    },
    {
      title: "OpenPumTa",
      subtitle: "Production productivity platform",
      image: "/projects/openpumta.png",
      features: [
        "1500+ users",
        "30 REST APIs",
        "Redis",
        "Docker",
        "Linux VPS",
        "PostgreSQL"
      ],
      tech: ["NEXT.JS", "POSTGRESQL", "REDIS", "DOCKER"],
      year: "2024",
      liveUrl: "https://openpumta.com",
      githubUrl: "https://github.com/ShouryaUpadhyaya/ProductivitySystemPersonalUse-",
    },
    {
      title: "Cook Off 10.0",
      subtitle: "Live competitive programming platform",
      image: "/projects/cookoff.png",
      features: [
        "1000+ concurrent users",
        "CodeMirror 6 editor",
        "Zustand state management",
        "Next.js App Router",
        "MongoDB",
        "Tailwind CSS"
      ],
      tech: ["NEXT.JS", "ZUSTAND", "CODEMIRROR", "MONGODB"],
      year: "2024",
      liveUrl: "#",
      githubUrl: "https://github.com/CodeChefVIT/cookoff-portal-10.0",
    }
  ],
  experience: [
    {
      role: "Lead Full-Stack Developer",
      company: "Moss X",
      companyUrl: "https://mossx.in",
      githubUrl: "https://github.com/Moss-X/Website",
      period: "Apr. 2025 - Oct. 2025",
      description: "Designed modular monolithic backend, reduced database read pressure via Redis caching, and integrated Razorpay with idempotency.",
      skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker"]
    },
    {
      role: "Frontend Developer",
      company: "Nepbyte Technology",
      period: "Sept. 2024 - Feb. 2025",
      description: "Built production React applications, integrated REST APIs, and improved SEO through lazy loading, raising Lighthouse scores by 40%.",
      skills: ["React", "Zustand", "Tailwind CSS", "Axios"]
    }
  ],
  writing: [
    {
      title: "Why I moved my app from Vercel/Render/Neon to a single VPS",
      description: "Understanding server infrastructure consolidation and cost efficiency.",
      url: "#",
      date: "May 2026"
    },
    {
      title: "How I built a Pomodoro timer that doesn't lie to you",
      description: "Orphaned timers, time synchronization, and state management.",
      url: "#",
      date: "March 2026"
    },
    {
      title: "Stop writing boiler plate code: Async handlers in Express",
      description: "Streamlining backend development with modern patterns.",
      url: "#",
      date: "January 2026"
    }
  ],
  stack: [
    {
      category: "Backend",
      icon: Server,
      skills: ["Node.js", "Express.js", "Prisma", "REST APIs", "JWT", "Redis", "WebSockets"]
    },
    {
      category: "Frontend",
      icon: Layout,
      skills: ["React.js", "Next.js", "Tailwind CSS", "Zustand", "Framer Motion"]
    },
    {
      category: "Database",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "Redis"]
    },
    {
      category: "DevOps",
      icon: Settings,
      skills: ["Docker", "Nginx", "Linux", "Prometheus", "Grafana", "Render"]
    },
    {
      category: "Languages",
      icon: Code2,
      skills: ["JavaScript", "TypeScript", "Python", "SQL", "C++"]
    }
  ]
};
