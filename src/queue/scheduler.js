const cron = require('node-cron');
const db = require('../services/db');
const scanQueue = require('./scanQueue');

// Runs every night at 2am — enqueues a scan for every verified email on the family plan.
// Free tier stays manual-only, per the spec.
function startScheduler() {
  cron.schedule('0 2 * * *', async () => {
    console.log('[scheduler] Running nightly scan sweep...');

    const { rows } = await db.query(
      `SELECT me.id, me.email FROM monitored_emails me
       JOIN users u ON u.id = me.user_id
       WHERE me.verified = true AND u.plan = 'family'`
    );

    for (const row of rows) {
      await scanQueue.add('scan', { monitoredEmailId: row.id, email: row.email });
    }

    console.log(`[scheduler] Enqueued ${rows.length} scan(s).`);
  });

  console.log('Nightly scheduler registered (runs at 2:00 AM daily).');
}

module.exports = startScheduler;