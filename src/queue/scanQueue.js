const { Queue } = require('bullmq');
const { scanEmail } = require('../scanner');
const db = require('../services/db');
const { sendBreachAlert } = require('../services/mailer');

let queue = null;

try {
  if (process.env.REDIS_URL) {
    const connection = { url: process.env.REDIS_URL };
    queue = new Queue('email-scan', { connection });
  }
} catch (err) {
  console.warn('[Queue] BullMQ init warning:', err.message);
}

async function addScanJob(name, data) {
  if (queue) {
    try {
      return await queue.add(name, data);
    } catch (err) {
      console.warn('[Queue] BullMQ enqueue error, running fallback inline scan:', err.message);
    }
  }

  // Resilient Inline Fallback Scan (when Redis queue worker is not connected)
  try {
    const { monitoredEmailId, email } = data;
    console.log(`[Inline Scanner] Running fallback scan for ${email}...`);
    const breaches = await scanEmail(email);

    for (const b of breaches) {
      const { rows } = await db.query(
        `SELECT id FROM breach_events WHERE monitored_email_id=$1 AND breach_name=$2`,
        [monitoredEmailId, b.Name]
      );
      if (rows.length) continue;

      const inserted = await db.query(
        `INSERT INTO breach_events (monitored_email_id, breach_name, breach_date, data_classes)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [monitoredEmailId, b.Name, b.BreachDate, b.DataClasses]
      );

      await sendBreachAlert(email, inserted.rows[0]);
    }
  } catch (err) {
    console.error('[Inline Scanner] Fallback scan error:', err.message);
  }
}

module.exports = {
  add: addScanJob
};