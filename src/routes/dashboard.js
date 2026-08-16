const router = require('express').Router();
const db = require('../services/db');
const requireAuth = require('../middleware/auth');

// GET /dashboard — Logged-in user's dashboard statistics, monitored emails, and breach events
router.get('/dashboard', requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const emailsRes = await db.query(
      `SELECT id, email, verified, last_scanned_at, created_at 
       FROM monitored_emails 
       WHERE user_id=$1 
       ORDER BY created_at DESC`,
      [userId]
    );

    const eventsRes = await db.query(
      `SELECT be.id, be.monitored_email_id, be.breach_name, be.breach_date, be.data_classes, 
              be.breach_domain, be.breach_description, be.risk_score, be.risk_level, 
              be.ai_explanation, be.discovered_at
       FROM breach_events be
       JOIN monitored_emails me ON me.id = be.monitored_email_id
       WHERE me.user_id=$1
       ORDER BY be.discovered_at DESC`,
      [userId]
    );

    const emails = emailsRes.rows;
    const timeline = eventsRes.rows;

    const verifiedEmails = emails.filter(e => e.verified);
    const verifiedCount = verifiedEmails.length;
    const breachedEmailIds = new Set(timeline.map(ev => ev.monitored_email_id));
    const breachedCount = verifiedEmails.filter(e => breachedEmailIds.has(e.id)).length;

    // Calculate deterministic security score
    const healthScore = verifiedCount === 0
      ? 100
      : Math.round(((verifiedCount - breachedCount) / verifiedCount) * 100);

    // Compute highest risk level
    let highestRiskLevel = 'LOW';
    if (timeline.some(e => e.risk_level === 'CRITICAL')) highestRiskLevel = 'CRITICAL';
    else if (timeline.some(e => e.risk_level === 'HIGH')) highestRiskLevel = 'HIGH';
    else if (timeline.some(e => e.risk_level === 'MEDIUM')) highestRiskLevel = 'MEDIUM';

    res.json({
      success: true,
      emails,
      timeline,
      stats: {
        totalMonitored: emails.length,
        verifiedCount,
        breachedCount,
        totalBreaches: timeline.length,
        healthScore: Math.max(0, Math.min(100, healthScore)),
        highestRiskLevel
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to load command center dashboard data' } });
  }
});

module.exports = router;