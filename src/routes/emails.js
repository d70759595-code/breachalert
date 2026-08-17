const router = require('express').Router();
const crypto = require('crypto');
const db = require('../services/db');
const requireAuth = require('../middleware/auth');
const { sendVerificationEmail } = require('../services/mailer');
const scanQueue = require('../queue/scanQueue');

// POST /emails — logged-in user submits an email to monitor
router.post('/emails', requireAuth, async (req, res) => {
  const { email } = req.body;
  const userId = req.user.id;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  const userResult = await db.query('SELECT plan FROM users WHERE id=$1', [userId]);
  if (!userResult.rows.length) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { plan } = userResult.rows[0];

  const countResult = await db.query(
    'SELECT COUNT(*) FROM monitored_emails WHERE user_id=$1', [userId]
  );
  const currentCount = parseInt(countResult.rows[0].count, 10);

  const limit = plan === 'family' ? 5 : 1;
  if (currentCount >= limit) {
    return res.status(403).json({ error: `Plan limit reached (${limit} email${limit > 1 ? 's' : ''})` });
  }

  const duplicate = await db.query(
    'SELECT id FROM monitored_emails WHERE user_id=$1 AND LOWER(email)=LOWER($2)',
    [userId, email]
  );
  if (duplicate.rows.length) {
    return res.status(409).json({ error: 'This email is already on your watch list' });
  }

  const token = crypto.randomBytes(32).toString('hex');

  await db.query(
    `INSERT INTO monitored_emails (user_id, email, verified, verify_token, created_at, verify_token_expires_at)
     VALUES ($1, $2, false, $3, now(), now() + interval '24 hours')`,
    [userId, email, token]
  );

  await sendVerificationEmail(email, token);
  res.json({ status: 'pending_verification', verifyToken: token });
});

// GET /emails/verify/:token — user clicks verification link
router.get('/emails/verify/:token', async (req, res) => {
  const result = await db.query(
    `UPDATE monitored_emails SET verified=true, verify_token=null
     WHERE verify_token=$1 AND verify_token_expires_at > now()
     RETURNING id, email, user_id`,
    [req.params.token]
  );

  if (!result.rowCount) {
    return res.status(400).send('Invalid or expired verification token. Please request a new link.');
  }

  const { id: monitoredEmailId, email, user_id: userId } = result.rows[0];

  // Create in-app notification
  await db.query(
    `INSERT INTO notifications (user_id, title, message, type)
     VALUES ($1, $2, $3, $4)`,
    [userId, 'Email Verified', `Target identity ${email} verified successfully. Initial scan triggered.`, 'success']
  );

  // Enqueue initial scan
  await scanQueue.add('scan', { monitoredEmailId, email });

  res.send('Email verified! Monitoring started — your initial breach scan is in progress.');
});

// POST /emails/:id/scan-now — manually trigger a scan for user's verified email
router.post('/emails/:id/scan-now', requireAuth, async (req, res) => {
  const emailId = req.params.id;
  const userId = req.user.id;

  // Strict Authorization Check (Prevents IDOR)
  const result = await db.query(
    `SELECT id, email, verified FROM monitored_emails WHERE id=$1 AND user_id=$2`,
    [emailId, userId]
  );

  if (!result.rowCount) {
    return res.status(404).json({ error: 'Monitored email identity not found or access denied' });
  }

  const { email, verified } = result.rows[0];

  if (!verified) {
    return res.status(400).json({ error: 'Email identity is not verified yet. Verification link required.' });
  }

  await scanQueue.add('scan', { monitoredEmailId: emailId, email });

  res.json({ status: 'scan_queued', email });
});

// DELETE /emails/:id — delete monitored identity
router.delete('/emails/:id', requireAuth, async (req, res) => {
  const emailId = req.params.id;
  const userId = req.user.id;

  const result = await db.query(
    `DELETE FROM monitored_emails WHERE id=$1 AND user_id=$2 RETURNING id, email`,
    [emailId, userId]
  );

  if (!result.rowCount) {
    return res.status(404).json({ error: 'Monitored email identity not found or access denied' });
  }

  res.json({ status: 'deleted', email: result.rows[0].email });
});

// GET /emails — list the logged-in user's monitored emails
router.get('/emails', requireAuth, async (req, res) => {
  const result = await db.query(
    'SELECT id, email, verified, created_at FROM monitored_emails WHERE user_id=$1 ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json(result.rows);
});

module.exports = router;