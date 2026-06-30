# MossX: High-Performance Modular Monolith

**A lightning-fast E-Commerce platform that guarantees zero duplicate charges and sub-50ms catalog load times.**

![MossX](/projects/mossx.png)

## The Problem
Modern retail platforms either bloat your codebase or crash during high-traffic checkout events, leading to duplicate charges, lost carts, and furious customers. 

## The Outcome
A seamless, production-ready monolithic platform handling guest cart merging, secure multi-gateway payments, and real-time analytics. Shoppers get a frictionless experience, and administrators get full control.

## How It Works (The Mechanism)
1. **Zero Duplicate Charges:** Integrated Razorpay and Stripe with custom idempotency logic to guarantee that users are never charged twice, even if their network drops mid-request.
2. **Instant Product Loading:** Intelligent Redis caching for the product catalog and user sessions drastically reduces read pressure on MongoDB.
3. **Frictionless Shopping:** Intelligent cart merging allows users to build a cart anonymously and seamlessly sync it upon login.
4. **Bulletproof Security:** Dual-Token Authentication (JWT + HttpOnly refresh tokens) mitigates CSRF and XSS risks.

### The Value Stack
* **Frontend:** React 18, Vite, Zustand
* **Backend:** Node.js, Express
* **Database & Caching:** MongoDB, Upstash Redis
* **Payments & Storage:** Stripe, Razorpay, Cloudinary

## The Proof
* Reduced homepage and product catalog latency to **under 50ms**.
* Achieved **100% reliable checkouts** with zero duplicate charges reported.
* Scaled effortlessly during peak traffic events without the overhead of microservices.
