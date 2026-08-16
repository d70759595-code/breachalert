const router = require('express').Router();
const crypto = require('crypto');
const { body, param, validationResult } = require('express-validator');
const db = require('../services/db');
const requireAuth = require('../middleware/auth');
const { sendVerificationEmail } = require('../services/mailer');
const scanQueue = require('../queue/scanQueue');

// POST /emails — Logged-in user submits email to monitor
router.post('/emails', requireAuth, [
  body('email').isEmail().normalizeEmail().withMessage('Valid email address required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: { message: errors.array()[0].msg } });
  }

  const { email } = req.body;
  const userId = req.user.id;

  try {
    const userResult = await db.query('SELECT plan FROM users WHERE id=$1', [userId]);
    const plan = userResult.rows[0]?.plan || 'free';

    const countResult = await db.query(
      'SELECT COUNT(*) FROM monitored_emails WHERE user_id=$1', [userId]
    );
    const currentCount = parseInt(countResult.rows[0].count, 10);

    const limit = plan === 'family' ? 5 : 1;
    if (currentCount >= limit) {
      return res.status(403).json({ success: false, error: { message: `Plan limit reached (${limit} monitored emails for ${plan} plan)` } });
    }

    const duplicate = await db.query(
      'SELECT id FROM monitored_emails WHERE user_id=$1 AND LOWER(email)=LOWER($2)',
      [userId, email]
    );
    if (duplicate.rows.length) {
      return res.status(409).json({ success: false, error: { message: 'This email is already on your watch list' } });
    }

    const token = crypto.randomBytes(32).toString('hex');

    await db.query(
      `INSERT INTO monitored_emails (user_id, email, verified, verify_token, created_at, verify_token_expires_at)
       VALUES ($1, $2, false, $3, NOW(), NOW() + INTERVAL '24 hours')`,
      [userId, email, token]
    );

    await sendVerificationEmail(email, token);
    res.json({ success: true, status: 'pending_verification', message: 'Verification link sent to target email address.' });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to add monitored email' } });
  }
});

// GET /emails/verify/:token — Inbox email verification link callback
router.get('/emails/verify/:token', async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE monitored_emails SET verified=true, verify_token=null
       WHERE verify_token=$1 AND verify_token_expires_at > NOW()
       RETURNING id, email`,
      [req.params.token]
    );

    if (!result.rowCount) {
      return res.status(400).send('Invalid or expired verification token. Please request a new link.');
    }

    const { id: monitoredEmailId, email } = result.rows[0];

    // Enqueue initial background scan with deterministic job ID to prevent duplicate scan spam
    const jobId = `scan-email-${monitoredEmailId}`;
    await scanQueue.add('scan', { monitoredEmailId, email }, { jobId });

    res.send('Email verified! Automated breach monitoring activated — initial scan queued.');
  } catch (err) {
    res.status(500).send('Internal server error verifying email ownership.');
  }
});

// POST /emails/:id/scan-now — Manually trigger a scan for user's OWN verified email
router.post('/emails/:id/scan-now', requireAuth, [
  param('id').isInt().withMessage('Valid email ID required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: { message: errors.array()[0].msg } });
  }

  const emailId = req.params.id;
  const userId = req.user.id;

  try {
    // Strict IDOR Check: Ensure email belongs to req.user.id
    const result = await db.query(
      `SELECT id, email, verified FROM monitored_emails WHERE id=$1 AND user_id=$2`,
      [emailId, userId]
    );

    if (!result.rowCount) {
      return res.status(404).json({ success: false, error: { message: 'Monitored email not found or access denied.' } });
    }

    const { email, verified } = result.rows[0];

    if (!verified) {
      return res.status(400).json({ success: false, error: { message: 'Email ownership must be verified before scanning' } });
    }

    // Deterministic Job ID prevents user from spamming identical scan jobs simultaneously
    const jobId = `scan-email-${emailId}-${Math.floor(Date.now() / 60000)}`; // 1 min deduplication window
    await scanQueue.add('scan', { monitoredEmailId: emailId, email }, { jobId });

    res.json({ success: true, status: 'scan_queued', message: 'On-demand breach scan enqueued successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to queue scan request' } });
  }
});

// GET /emails — List logged-in user's monitored emails with IDOR protection
router.get('/emails', requireAuth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, email, verified, last_scanned_at, created_at FROM monitored_emails WHERE user_id=$1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ success: true, emails: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to fetch monitored emails' } });
  }
});

module.exports = router;