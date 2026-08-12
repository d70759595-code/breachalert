const router = require('express').Router();
const crypto = require('crypto');
const { sendVerificationEmail } = require('../services/mailer');

// Temporary in-memory store — replace with a real database (Step 5) later.
const monitoredEmails = [];

// POST /emails — user submits an email to monitor
router.post('/emails', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = crypto.randomBytes(32).toString('hex');

  const record = {
    id: monitoredEmails.length + 1,
    email,
    verified: false,
    verifyToken: token,
    createdAt: new Date()
  };
  monitoredEmails.push(record);

  await sendVerificationEmail(email, token);

  res.json({ status: 'pending_verification' });
});

// GET /emails/verify/:token — user clicks the link in their inbox
router.get('/emails/verify/:token', (req, res) => {
  const record = monitoredEmails.find(e => e.verifyToken === req.params.token);

  if (!record) {
    return res.status(400).send('Invalid or expired token');
  }

  record.verified = true;
  record.verifyToken = null;

  res.send('Email verified! Monitoring started.');
});

// GET /emails — list what's being monitored (handy for testing)
router.get('/emails', (req, res) => {
  res.json(monitoredEmails);
});

module.exports = router;