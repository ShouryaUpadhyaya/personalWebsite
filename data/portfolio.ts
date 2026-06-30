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
    subtitle: "Full-stack Developer",
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
      title: "OpenPumTa",
      subtitle: "Production productivity platform",
      image: "/projects/openpumta.png",
      goal: "Build a scalable, real-time productivity platform to serve thousands of users across devices.",
      challenge: "Handling concurrent real-time timer syncs and heavy analytics queries without crashing the database.",
      result: "Reduced database load by utilizing Redis caching and WebSocket syncs, successfully serving 1,500+ lifetime visitors with zero downtime.",
      tech: ["NEXT.JS", "POSTGRESQL", "REDIS", "DOCKER"],
      year: "Jan. 2025 - Present",
      liveUrl: "https://openpumta.com",
      githubUrl: "https://github.com/ShouryaUpadhyaya/ProductivitySystemPersonalUse-",
    },
    {
      title: "Moss X",
      subtitle: "Modular monolithic e-commerce platform",
      image: "/projects/mossx.png",
      goal: "Engineer a reliable monolithic e-commerce backend with secure payments and fast product queries.",
      challenge: "Preventing duplicate payment charges during network failures and keeping product feeds fast under load.",
      result: "Implemented Razorpay idempotency for secure checkout and reduced homepage latency to under 50ms using Redis, delivering a flawless shopping experience.",
      tech: ["NODE.JS", "REDIS", "RAZORPAY"],
      year: "Apr. 2025 - Oct. 2025",
      liveUrl: "https://mossx.in",
      githubUrl: "https://github.com/Moss-X/Website",
    },
    {
      title: "Cook Off 10.0",
      subtitle: "Live competitive programming platform",
      image: "/projects/cookoff.png",
      goal: "Develop a live competitive programming platform capable of sustaining high traffic spikes.",
      challenge: "Ensuring code state persistence and low API latency when hundreds of users submit code simultaneously.",
      result: "Sustained 40% concurrent load across 1,000+ users without data loss, utilizing a triple-layer persistence system.",
      tech: ["NEXT.JS", "ZUSTAND", "CODEMIRROR", "MONGODB"],
      year: "Sept. 2025 - Feb. 2026",
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
      name: "Client/Manager Name",
      role: "Founder",
      company: "Nepbyte Technology",
      text: "Shourya dramatically improved our frontend performance. The 40% increase in our Lighthouse score directly impacted our SEO and conversion rates. Highly recommended."
    }
  ],
  faq: [
    {
      question: "Do you handle both frontend design and backend deployment?",
      answer: "Yes, I am a true full-stack developer. I take projects from zero to production, handling everything from React/Next.js interfaces to complex Node.js/PostgreSQL database architectures and Docker deployments."
    },
    {
      question: "What is your typical turnaround time?",
      answer: "Turnaround times depend on the scope of the project, but I prioritize fast, iterative delivery. We will establish clear milestones during our discovery call so you know exactly when features will be live."
    },
    {
      question: "Are you open to full-time roles or just contract work?",
      answer: "I am actively looking for full-stack internships, full-time roles, as well as taking on select high-impact freelance gigs."
    },
    {
      question: "What happens if there are bugs after launch?",
      answer: "For all my freelance projects, I provide a 30-day post-launch guarantee. If any bugs arise related to my code within the first 30 days of launch, I will fix them completely free of charge."
    }
  ]
};
