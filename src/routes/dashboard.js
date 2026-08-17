const router = require('express').Router();
const db = require('../services/db');
const requireAuth = require('../middleware/auth');

// GET /dashboard — logged-in user's monitored emails + breach timeline + notifications + profile
router.get('/dashboard', requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const userRes = await db.query(
      `SELECT id, email, plan, created_at FROM users WHERE id=$1`,
      [userId]
    );

    const emails = await db.query(
      `SELECT id, email, verified, verify_token, created_at FROM monitored_emails WHERE user_id=$1 ORDER BY created_at DESC`,
      [userId]
    );

    const events = await db.query(
      `SELECT be.* FROM breach_events be
       JOIN monitored_emails me ON me.id = be.monitored_email_id
       WHERE me.user_id=$1
       ORDER BY be.discovered_at DESC`,
      [userId]
    );

    const notifications = await db.query(
      `SELECT id, title, message, type, read_at, created_at FROM notifications
       WHERE user_id=$1 ORDER BY created_at DESC LIMIT 20`,
      [userId]
    );

    res.json({
      user: userRes.rows[0] || null,
      emails: emails.rows,
      timeline: events.rows,
      notifications: notifications.rows
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Internal server error fetching dashboard telemetry' });
  }
});

module.exports = router;