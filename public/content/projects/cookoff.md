# Cook-Off 10.0 Portal: Scalable Competitive Coding

**The ultimate real-time competitive programming platform built to handle hundreds of concurrent coders without breaking a sweat.**

![Cook-Off](/projects/cookoff.png)

## The Problem
During live coding contests, hundreds of users submit code, save drafts, and run tests simultaneously in the final 5 minutes. Most platforms crash, lose drafts, or lag out, ruining the contest experience.

## The Outcome
A flawless, real-time contest experience with zero dropped submissions and sub-second compiler feedback for over 1,000 users.

## How It Works (The Mechanism)
1. **Triple-Layer Persistence:** Code state is guaranteed through local Zustand state, fast Redis in-memory caching, and durable MongoDB storage. 
2. **Custom CodeMirror Editor:** Built a customized editor that handles syntax highlighting, auto-completion, and real-time syncing without blocking the main thread.
3. **Auto-Submission:** Code is automatically submitted when the timer runs out, ensuring no participant loses progress.
4. **Optimized Server Actions:** Reduced payload sizes and utilized Next.js Server Components to render the live leaderboard instantly.

### The Value Stack
* **Frontend:** Next.js (App Router), Zustand, Tailwind CSS
* **Code Editor:** CodeMirror
* **Backend & Data:** Node.js, MongoDB, Redis
* **Real-time:** WebSockets

## The Proof
* Sustained **40% concurrent load** across **1,000+ users** without a single dropped submission.
* Maintained **sub-second response times** during peak submission windows.
* Delivered a rock-solid, scalable platform for CodeChef-VIT's premier event.
