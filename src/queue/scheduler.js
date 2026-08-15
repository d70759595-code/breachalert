const cron = require('node-cron');
const db = require('../services/db');
const scanQueue = require('./scanQueue');

// Runs every 15 minutes — enqueues a scan for every verified email, regardless of plan.
// Safe to run this often because scanEmail() caches results in Redis for 24h,
// so repeated sweeps mostly hit the cache instead of re-calling the real API.
function startScheduler() {
  cron.schedule('*/15 * * * *', async () => {
    console.log('[scheduler] Running scheduled scan sweep...');

    const { rows } = await db.query(
      `SELECT id, email FROM monitored_emails WHERE verified = true`
    );

    for (const row of rows) {
      await scanQueue.add('scan', { monitoredEmailId: row.id, email: row.email });
    }

    console.log(`[scheduler] Enqueued ${rows.length} scan(s).`);
  });

  console.log('Scheduler registered (runs every 15 minutes for all verified emails).');
}

module.exports = startScheduler;