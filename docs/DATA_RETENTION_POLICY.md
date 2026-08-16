# Data Retention Policy — BreachAlert Security Platform

## 1. Purpose & Scope
This Data Retention Policy defines how user personal data, monitored email targets, dark web breach telemetry, and session metadata are processed, stored, and deleted within BreachAlert.

---

## 2. Telemetry & Data Types Stored

| Data Category | Stored Attributes | Retention Period | Deletion Mechanism |
| :--- | :--- | :--- | :--- |
| **User Account** | Hashed Passphrase, Email, Plan Status | Duration of account lifecycle | Hard deletion on account closure (`DELETE FROM users`) |
| **Monitored Email** | Email string, Verification status, Scanned timestamp | Duration of active monitoring | Cascade deletion on email target removal (`DELETE FROM monitored_emails`) |
| **Breach Incident** | Domain name, Breach date, Data categories, AI Risk Score | 90 days following breach discovery | Automated database purge script / Cascade delete |
| **Session Cache** | Redis API provider query cache | 24 Hours | Automatic TTL eviction (`EX 86400`) |

---

## 3. Privacy & Data Minimization Principles
- **No Plaintext Credential Storage**: Passwords and exposed breach credentials are **NEVER** stored in BreachAlert databases.
- **Verification Prerequisite**: Monitoring is strictly prohibited before email ownership verification (`verified = true`).
- **Encrypted Transmission**: All data transmissions are enforced over TLS/HTTPS with `HttpOnly` security cookies.
