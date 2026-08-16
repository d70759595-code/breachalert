# Database Migrations & Schema Update for BreachAlert

-- 1. Ensure extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Update users table with password reset, phone, & Stripe fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_hash TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS sms_enabled BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- 3. Update monitored_emails table
ALTER TABLE monitored_emails ADD COLUMN IF NOT EXISTS last_scanned_at TIMESTAMPTZ;

-- 4. Update breach_events table to store AI Risk & Explanation
ALTER TABLE breach_events ADD COLUMN IF NOT EXISTS breach_domain TEXT;
ALTER TABLE breach_events ADD COLUMN IF NOT EXISTS breach_description TEXT;
ALTER TABLE breach_events ADD COLUMN IF NOT EXISTS risk_score INTEGER DEFAULT 0;
ALTER TABLE breach_events ADD COLUMN IF NOT EXISTS risk_level TEXT DEFAULT 'LOW';
ALTER TABLE breach_events ADD COLUMN IF NOT EXISTS ai_explanation JSONB;

-- 5. Ensure UNIQUE constraint on (monitored_email_id, breach_name)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'monitored_email_id_breach_name_unique'
    ) THEN
        ALTER TABLE breach_events ADD CONSTRAINT monitored_email_id_breach_name_unique UNIQUE (monitored_email_id, breach_name);
    END IF;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- Indexes for optimal query performance & IDOR protection checks
CREATE INDEX IF NOT EXISTS idx_monitored_emails_user ON monitored_emails(user_id);
CREATE INDEX IF NOT EXISTS idx_breach_events_email ON breach_events(monitored_email_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
