# FINAL BUG REPORT — BREACHALERT PRODUCTION HARDENING

## Summary of Discovered & Resolved Issues

- **Total Issues Found**: 8
- **Critical Severity**: 1 (JWT Token exposed in URL query string)
- **High Severity**: 3 (Insecure CORS origin, IDOR access risk on `/emails`, Missing Password Recovery)
- **Medium Severity**: 4 (Scan job duplication spam, Account enumeration, Database event race conditions, Untrusted external breach text prompt injection)
- **Low Severity**: 0

---

## Issue Resolution Detail

| Issue | Severity | Discovery Method | Root Cause | Fix Applied | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-01: JWT in URL Query String** | CRITICAL | Code Review & Audit | OAuth callback redirected via query string (`/dashboard?token=...`) | Replaced with `HttpOnly`, `SameSite=Lax` cookies. | **RESOLVED** |
| **BUG-02: Wildcard CORS Credentials** | HIGH | Security Scan | `cors()` permitted wildcard origins (`*`) with credentials | Restricted CORS origin to `process.env.FRONTEND_URL`. | **RESOLVED** |
| **BUG-03: IDOR Access Risk** | HIGH | Auth Testing | Missing user ownership validation on scan endpoints | Added strict `user_id = req.user.id` checks. | **RESOLVED** |
| **BUG-04: Unhandled Password Reset** | HIGH | UI Audit | UI link existed without backend route implementation | Built SHA-256 hashed token reset workflow with expiration. | **RESOLVED** |
| **BUG-05: Job Duplication Spam** | MEDIUM | Rapid Click Test | Rapid button clicks spawned duplicate BullMQ jobs | Introduced deterministic job keys (`scan-email-{id}`). | **RESOLVED** |
| **BUG-06: Account Enumeration** | MEDIUM | Auth Audit | Verbose error messages revealed existing email accounts | Standardized generic user-safe error messages. | **RESOLVED** |
| **BUG-07: Duplicate Breach Database Events** | MEDIUM | Chaos Test | Database race conditions created duplicate event rows | Added `ON CONFLICT (monitored_email_id, breach_name) DO NOTHING`. | **RESOLVED** |
| **BUG-08: Prompt Injection Risk** | MEDIUM | Security Audit | Unescaped breach descriptions passed to risk engine | Implemented deterministic hybrid risk calculation rules. | **RESOLVED** |

---

## Remaining Known Limitations

- **Live SendGrid/SMTP Credentials**: The system utilizes a log mailer transport adapter (`mailer.js`). To dispatch live emails over TLS, populate `SENDGRID_API_KEY` or `SMTP_URL` in `.env`.
- **Live Stripe Keys**: `src/routes/billing.js` runs in Stripe test/mock session mode when `STRIPE_SECRET_KEY` is not provided in environment variables.
