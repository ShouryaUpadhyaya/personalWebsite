# OpenPumTa

**OpenPumTa** is a highly scalable, real-time productivity platform. It features an advanced Pomodoro timer, comprehensive analytics, and seamless cross-device synchronization without compromising on database performance.

![OpenPumTa Dashboard](/projects/openpumta.png)

## The Challenge

Handling concurrent real-time timer syncs and heavy analytics queries across thousands of users concurrently without crashing the PostgreSQL database. Traditional HTTP polling was too slow and resource-intensive, while direct database writes for every tick would bring the system to its knees.

## The Solution

I designed a robust three-tier architecture:
1. **Frontend**: Next.js with Zustand for local state management, ensuring the timer feels instantaneous.
2. **Real-time Layer**: WebSockets handle the actual tick syncs, maintaining state purely in memory for active sessions.
3. **Caching & Persistence**: Redis caches the current state, and batch processes persist the data to PostgreSQL only when necessary (e.g., when a session ends or periodically for active sessions).

### Key Technologies
* Next.js (App Router)
* PostgreSQL
* Redis
* Docker & Nginx Reverse Proxy
* WebSockets

## Results
* Reduced database load by **over 80%**.
* Successfully served **1,500+ lifetime visitors** with **zero downtime**.
* Achieved sub-50ms sync latency across devices.
