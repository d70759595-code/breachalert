# BreachAlert

Monitor email addresses against public breach databases and get notified when your credentials appear in a data dump.

## Features

- Email watch list with ownership verification
- Real-time breach scanning via XposedOrNot API
- Redis caching (24h) + BullMQ job queue for rate-limit compliance
- Breach timeline dashboard with data-type icons
- JWT auth + optional Google OAuth
- Free (1 email, manual scans) and Family (5 emails, nightly auto-scan) tiers

## Quick Start

**Prerequisites:** Node.js 20+, PostgreSQL, Redis

```bash
cp .env.example .env   # fill in DATABASE_URL, REDIS_URL, JWT_SECRET
psql $DATABASE_URL -f schema.sql

npm install
npm start              # terminal 1 — API
npm run worker         # terminal 2 — scan worker + scheduler

cd client && npm install && npm run dev   # terminal 3 — React UI
```

Open http://localhost:5173, sign up, add an email, then copy the verification link from the **server console** (email is stubbed in dev).

## Project Structure

```
server.js              Express API
worker.js              BullMQ worker + nightly scheduler
src/scanner/           Breach API client + Redis cache
src/queue/             Job queue + cron scheduler
src/routes/            Auth, emails, dashboard endpoints
src/services/          DB, Redis, mailer
client/                React + Vite frontend
docs/API_INTEGRATION.md   Rate limiting & API auth guide
schema.sql             PostgreSQL schema
```

## Documentation

- [API Integration Guide](docs/API_INTEGRATION.md) — authentication, caching, rate limits, data retention

## License

ISC
