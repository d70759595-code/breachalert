# Security Architecture & Security Policy

## Overview
BreachAlert is a proactive cybersecurity identity surveillance platform. This document outlines the security architecture, threat model, authentication mechanisms, secret handling policies, and responsible disclosure process.

---

## 1. Security Architecture & Threat Model

### 1.1 Authentication & Cookie Security
- **HttpOnly Cookies**: JWT authentication tokens are transmitted via `HttpOnly`, `SameSite=Lax` cookies (`token`), preventing client-side JavaScript access and eliminating Cross-Site Scripting (XSS) token theft.
- **URL Sanitization**: Authentication tokens are never exposed in URL query parameters (`/dashboard?token=...`), preventing token leakage in browser history, HTTP Referer headers, or proxy logs.
- **Generic Error Responses**: Authentication endpoints (`/auth/login`, `/auth/signup`) return generic user-safe error messages to prevent account enumeration.

### 1.2 Authorization & IDOR Protection
- Every protected route verifies resource ownership (`user_id = req.user.id`).
- Attempting to query or scan identities belonging to other user accounts results in immediate `404 Not Found` or `401 Unauthorized` responses.

### 1.3 CORS & Security Headers
- CORS is restricted via `process.env.FRONTEND_URL` with `credentials: true`. Wildcard origins (`origin: '*'`) with credentials are strictly prohibited.
- HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`) are enforced via `helmet`.

---

## 2. Secrets Management
- Production secrets (`JWT_SECRET`, `DATABASE_URL`, `REDIS_URL`, `GOOGLE_CLIENT_SECRET`) must be provided via environment variables.
- `.env` files are excluded from source control via `.gitignore`. A sanitized template `.env.example` is provided for local setup.

---

## 3. Rate Limiting & Job Deduplication
- **Auth Rate Limits**: `/auth/login`, `/auth/signup`, and password recovery routes are throttled to 15 requests per 15 minutes to prevent brute-force attacks.
- **Scan Deduplication**: BullMQ background jobs use deterministic job keys (`scan-email-{monitoredEmailId}-{timeWindow}`) to prevent duplicate scan job spam.

---

## 4. Responsible Disclosure
If you discover a potential security vulnerability in BreachAlert, please contact the security maintainers at `security@breachalert.net` or submit an issue on the private repository.
