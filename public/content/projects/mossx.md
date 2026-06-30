# Moss X

**Moss X** is a modular monolithic e-commerce platform built to handle high traffic and secure transactions without compromising on speed.

![Moss X](/projects/mossx.png)

## The Challenge

Preventing duplicate payment charges during network failures (a common issue in e-commerce) and keeping product feeds fast under load.

## The Solution

I engineered a reliable monolithic backend architecture:
1. **Idempotency Keys**: Integrated Razorpay with custom idempotency logic to guarantee that users are never charged twice for the same transaction, even if their network drops mid-request.
2. **Redis Caching**: Implemented intelligent Redis caching for the product catalog and user sessions, drastically reducing read pressure on the primary database.
3. **Modular Monolith**: Kept the architecture simple yet scalable by separating domains internally without the overhead of microservices.

### Key Technologies
* Node.js & Express
* MongoDB
* Redis
* Razorpay API
* Docker

## Results
* Reduced homepage and product catalog latency to **under 50ms**.
* Achieved **100% reliable checkouts** with zero duplicate charges reported.
* Scaled effortlessly during peak traffic events.
