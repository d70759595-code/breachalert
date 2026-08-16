const cron = require('node-cron');
const db = require('../services/db');
const scanQueue = require('./scanQueue');

// Nightly sweep for Family-plan users only (Free tier = manual scans).
// scanEmail() caches results in Redis for 24h, so repeat jobs mostly hit cache.
function startScheduler() {
  cron.schedule('0 2 * * *', async () => {
    console.log('[scheduler] Running nightly scan sweep for Family-plan emails...');

    const { rows } = await db.query(
      `SELECT me.id, me.email
       FROM monitored_emails me
       JOIN users u ON u.id = me.user_id
       WHERE me.verified = true AND u.plan = 'family'`
    );

    for (const row of rows) {
      await scanQueue.add('scan', { monitoredEmailId: row.id, email: row.email });
    }

    console.log(`[scheduler] Enqueued ${rows.length} scan(s).`);
  });

  console.log('Scheduler registered (nightly at 02:00 UTC for Family-plan verified emails).');
}

module.exports = startScheduler;