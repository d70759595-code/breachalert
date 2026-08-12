const router = require('express').Router();
const db = require('../services/db');
const requireAuth = require('../middleware/auth');

// GET /dashboard — logged-in user's monitored emails + breach timeline
router.get('/dashboard', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const emails = await db.query(
    `SELECT id, email, verified FROM monitored_emails WHERE user_id=$1`,
    [userId]
  );

  const events = await db.query(
    `SELECT be.* FROM breach_events be
     JOIN monitored_emails me ON me.id = be.monitored_email_id
     WHERE me.user_id=$1
     ORDER BY be.discovered_at DESC`,
    [userId]
  );

  res.json({ emails: emails.rows, timeline: events.rows });
});

module.exports = router;