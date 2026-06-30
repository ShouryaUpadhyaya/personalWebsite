# OpenPumTa: The 21-Day Deep Work System

**Stop burning out on sheer willpower.** OpenPumTa is the only productivity system that tracks your focus, forces 21-day consistency, and uses AI to prevent dopamine burnout—all without locking your data in a walled garden.

![OpenPumTa Dashboard](/projects/openpumta.png)

## The Problem
You rely on 5 different apps to study—Yeolpumta for timers, Notion for notes, and scattered habit trackers. None talk to each other. When you drop a habit, you lose momentum. The result? Distraction, burnout, and broken streaks. 

## The Outcome
A single, desktop-first workspace that locks you into deep work and builds unbreakable 21-day streaks. 

## How It Works (The Mechanism)
1. **The 6-Habit Limit:** You are only allowed to track up to 6 habits at a time. This prevents overwhelm and forces you to focus on what matters.
2. **"Bad Day Plans":** Every habit has a minimum baseline (e.g., "Do 1 pushup"). On low-energy days, you do the baseline to keep the streak alive. No zeros.
3. **AI Burnout Coach:** The app uses Groq LLMs to analyze your daily reviews and focus logs, identifying burnout risks before you crash.
4. **Instant Timer Sync:** Next.js and WebSockets guarantee your timer feels instantaneous across devices without crashing the database.

### The Value Stack
* **Frontend:** Next.js, Zustand, Tailwind
* **Backend:** Express, Node.js, WebSockets
* **Data Layer:** PostgreSQL (Prisma), Redis (Stats Caching)
* **Infrastructure:** Docker Compose, Nginx, Prometheus, Grafana

## The Proof
* Successfully served **1,500+ lifetime visitors**.
* Reduced database load by **over 80%** using Redis caching.
* Maintained **zero downtime** with sub-50ms sync latency. 
