# BreachAlert — API Integration Guide

## Breach Data Source

BreachAlert uses the **XposedOrNot** public API as its breach data source. The project spec allows alternatives to Have I Been Pwned (HIBP); XposedOrNot is keyless and suitable for development and demos.

| Item | Detail |
|------|--------|
| Base URL | `https://api.xposedornot.com/v1` |
| Endpoint | `GET /breach-analytics?email={email}` |
| Auth | None (public API) |
| Rate limit | ~2 requests/second (enforced client-side) |
| 404 response | Email not found in any breach (empty result) |
| 429 response | Rate limited — worker retries with backoff |

Implementation lives in `src/scanner/hibpClient.js` (historical filename; class is `XposedOrNotClient`).

### Switching to HIBP

To use the official Have I Been Pwned API instead:

1. Obtain an API key from [haveibeenpwned.com/API/Key](https://haveibeenpwned.com/API/Key)
2. Set `HIBP_API_KEY` in `.env`
3. Replace the client in `src/scanner/hibpClient.js` with HIBP endpoints:
   - `GET https://haveibeenpwned.com/api/v3/breachedaccount/{email}`
   - Header: `hibp-api-key: {key}`
4. Normalize HIBP breach objects to `{ Name, BreachDate, DataClasses }`

## Rate Limiting Strategy

Three layers prevent API abuse:

### 1. Redis cache (24 hours)

```
Key:   breach:{email}
TTL:   86400 seconds
Value: JSON array of normalized breach objects
```

Implemented in `src/scanner/index.js`. Repeated scans for the same email within 24h return cached data without calling the external API.

### 2. BullMQ worker limiter

```javascript
limiter: { max: 2, duration: 1000 }  // 2 jobs per second
```

Configured in `worker.js`. Queued scan jobs are processed at a safe rate for the upstream API.

### 3. Express rate limiting

- General API: 100 requests / 15 minutes
- Auth routes: 10 requests / 15 minutes

Configured in `server.js` via `express-rate-limit`.

### Retry on 429

When the breach API returns HTTP 429, the worker retries up to 3 times with exponential backoff (2s, 4s, 6s).

## Scan Triggers

| Trigger | When | Who |
|---------|------|-----|
| Verification | User clicks email verify link | All plans |
| Manual | User clicks "Scan Now" on dashboard | All plans |
| Scheduled | Nightly cron at 02:00 UTC | Family plan only |

Free plan users get manual scans only. Family plan users also receive automated nightly re-scans.

## Data Retention Policy

- **User emails**: Stored in PostgreSQL for account management and verification.
- **Breach metadata**: Only breach name, date, and data-class labels are stored — not actual passwords or leaked credentials.
- **API cache**: Redis entries expire after 24 hours.
- **Raw API responses**: Not persisted; only normalized metadata is written to `breach_events`.

## Environment Variables

See `.env.example` for the full list. Minimum required:

```
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
APP_BASE_URL=http://localhost:3000
```

## Running Locally

```bash
# 1. Create database
psql $DATABASE_URL -f schema.sql

# 2. Install and start backend
npm install
npm start          # API on :3000

# 3. Start worker (separate terminal)
npm run worker

# 4. Start frontend
cd client && npm install && npm run dev   # UI on :5173

# 5. Smoke-test scanner against live API
npm run test:scanner
```

On Windows, if Node.js TLS errors occur (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`), the npm scripts already pass `--use-system-ca`.
