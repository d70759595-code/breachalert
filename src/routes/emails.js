const router = require('express').Router();
const crypto = require('crypto');
const db = require('../services/db');
const requireAuth = require('../middleware/auth');
const { sendVerificationEmail } = require('../services/mailer');
const { scanEmail } = require('../scanner');

// POST /emails — logged-in user submits an email to monitor
router.post('/emails', requireAuth, async (req, res) => {
  const { email } = req.body;
  const userId = req.user.id;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const userResult = await db.query('SELECT plan FROM users WHERE id=$1', [userId]);
  const { plan } = userResult.rows[0];

  const countResult = await db.query(
    'SELECT COUNT(*) FROM monitored_emails WHERE user_id=$1', [userId]
  );
  const currentCount = parseInt(countResult.rows[0].count, 10);

  const limit = plan === 'family' ? 5 : 1;
  if (currentCount >= limit) {
    return res.status(403).json({ error: `Plan limit reached (${limit} emails)` });
  }

  const token = crypto.randomBytes(32).toString('hex');

  await db.query(
    `INSERT INTO monitored_emails (user_id, email, verified, verify_token, created_at)
     VALUES ($1, $2, false, $3, now())`,
    [userId, email, token]
  );

  await sendVerificationEmail(email, token);
  res.json({ status: 'pending_verification' });
});

// GET /emails/verify/:token — user clicks the link in their inbox, this triggers the FIRST scan
router.get('/emails/verify/:token', async (req, res) => {
  const result = await db.query(
    `UPDATE monitored_emails SET verified=true, verify_token=null
     WHERE verify_token=$1 RETURNING id, email`,
    [req.params.token]
  );

  if (!result.rowCount) {
    return res.status(400).send('Invalid or expired token');
  }

  const { id: monitoredEmailId, email } = result.rows[0];

  // Run the first ad-hoc scan now that ownership is confirmed
  const breaches = await scanEmail(email);

  for (const b of breaches) {
    await db.query(
      `INSERT INTO breach_events (monitored_email_id, breach_name, breach_date, data_classes)
       VALUES ($1, $2, $3, $4)`,
      [monitoredEmailId, b.Name, b.BreachDate, b.DataClasses]
    );
  }

  res.send(`Email verified! Monitoring started. Found ${breaches.length} breach(es).`);
});

// GET /emails — list the logged-in user's monitored emails
router.get('/emails', requireAuth, async (req, res) => {
  const result = await db.query(
    'SELECT id, email, verified, created_at FROM monitored_emails WHERE user_id=$1',
    [req.user.id]
  );
  res.json(result.rows);
});

module.exports = router;