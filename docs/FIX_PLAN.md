# FIX PLAN — BREACHALERT PRODUCTION OPTIMIZATION

## Priority Matrix

| Priority | Issue / Enhancement | Component | Proposed Resolution | Status |
|:---|:---|:---|:---|:---|
| **P0** | HttpOnly Cookie Auth Security | Backend Auth | Replace URL JWT query param redirects with HttpOnly cookies. | **COMPLETED** |
| **P0** | IDOR Ownership Protections | Express Routes | Add strict `user_id = req.user.id` checks across all `/emails` routes. | **COMPLETED** |
| **P1** | Duplicate Scan Job Prevention | Queue Worker | Implement deterministic BullMQ job IDs (`scan-email-{id}`). | **COMPLETED** |
| **P1** | Duplicate Breach Database Event Prevention | PostgreSQL Schema | Add `ON CONFLICT (monitored_email_id, breach_name) DO NOTHING` constraint. | **COMPLETED** |
| **P1** | Hybrid AI Risk Engine Implementation | Risk Service | Create deterministic scoring (0-100) with AI risk explanations. | **COMPLETED** |
| **P2** | Obsolete UI Removal | React Frontend | Delete unused legacy starter CSS (`App.css`) and assets. | **COMPLETED** |
| **P2** | System Telemetry & Health Endpoint | API Infrastructure | Create `GET /health` verifying PostgreSQL & Redis connectivity. | **COMPLETED** |
| **P3** | Documentation & CI Pipeline | DevOps | Create `SECURITY.md`, `DATA_RETENTION_POLICY.md`, and `.github/workflows/ci.yml`. | **COMPLETED** |
