# BreachAlert — Automated Identity Breach Surveillance Platform

BreachAlert is a production-hardened cybersecurity monitoring platform designed to provide automated breach surveillance, identity threat intelligence, and hybrid AI-powered risk scoring.

---

## 🌟 Key Features

- **Automated Breach Surveillance**: Monitor email identities against public dark web breach archives via scheduled sweeps & on-demand scans.
- **HttpOnly Cookie Authentication**: Secure session management supporting Email/Passphrase, Google OAuth 2.0, and Password Recovery.
- **Hybrid AI Risk Engine**: Deterministic threat scoring (0-100) paired with structured AI explanations and actionable security recommendations.
- **Deduplicated Background Processing**: Redis & BullMQ queue architecture preventing duplicate scan jobs and respecting provider rate limits.
- **Vetra Dark Cybersecurity Theme**: Glassmorphism dashboard with real-time health scores and breach incident timelines.

---

## 🏗️ Target Architecture

```
React Frontend (Vite + Tailwind CSS)
       │ (HttpOnly Cookie / Credentials)
       ▼
Express REST API (Security Headers, Rate Limiting)
  ├── PostgreSQL (Users, Monitored Emails, Breach Events, Risk Scores)
  └── Redis + BullMQ (Scan Worker & Nightly Cron Scheduler)
            │
            ▼
   External Breach Intelligence Provider (XposedOrNot)
```

---

## 🚀 Environment Variables (`.env.example`)

Copy `.env.example` to `.env`:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgres://postgres:password@localhost:5432/breachalert
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🛠️ Local Installation & Running

### 1. Backend Server
```bash
npm install
npm start
```

### 2. Scan Worker
```bash
npm run worker
```

### 3. React Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Running Tests
```bash
npx jest server.test.js
```

---

## 🔒 Security Architecture
Read [SECURITY.md](SECURITY.md) for full technical documentation on HttpOnly cookie handling, IDOR authorization protections, rate limiting, and secrets management.
