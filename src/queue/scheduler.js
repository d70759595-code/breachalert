const cron = require('node-cron');
const db = require('../services/db');
const scanQueue = require('./scanQueue');

// Runs every 6 hours — enqueues a scan for every verified email, regardless of plan.
// (Originally spec'd as family-plan-only nightly scans; extended per updated requirements
// to cover all verified emails at a shorter interval.)
function startScheduler() {
  cron.schedule('0 */6 * * *', async () => {
    console.log('[scheduler] Running scheduled scan sweep...');

    const { rows } = await db.query(
      `SELECT id, email FROM monitored_emails WHERE verified = true`
    );

    for (const row of rows) {
      await scanQueue.add('scan', { monitoredEmailId: row.id, email: row.email });
    }

    console.log(`[scheduler] Enqueued ${rows.length} scan(s).`);
  });

  console.log('Scheduler registered (runs every 6 hours for all verified emails).');
}

module.exports = startScheduler;