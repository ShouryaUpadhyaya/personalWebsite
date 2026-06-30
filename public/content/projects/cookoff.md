# Cook Off 10.0

**Cook Off 10.0** is a live competitive programming platform designed to host coding competitions with hundreds of simultaneous participants.

![Cook Off](/projects/cookoff.png)

## The Challenge

Ensuring code state persistence and low API latency when hundreds of users submit code, save drafts, and run tests simultaneously during the final minutes of a contest.

## The Solution

I developed a resilient real-time architecture:
1. **Triple-Layer Persistence**: 
   - Local state via Zustand.
   - In-memory cache via Redis for fast reads/writes.
   - Long-term storage via MongoDB for durability.
2. **CodeMirror Integration**: Built a customized CodeMirror editor that handles syntax highlighting, auto-completion, and real-time syncing without blocking the main thread.
3. **Optimized Next.js Server Actions**: Reduced payload sizes and utilized server components to render the leaderboard and contest details quickly.

### Key Technologies
* Next.js (App Router)
* Zustand
* CodeMirror
* MongoDB
* Tailwind CSS

## Results
* Sustained **40% concurrent load** across **1,000+ users** without a single dropped submission.
* Maintained sub-second response times during peak submission windows.
* Delivered a flawless experience for participants and contest organizers.
