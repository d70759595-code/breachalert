require('dotenv').config();
const { Worker } = require('bullmq');
const { scanEmail } = require('./src/scanner');
const db = require('./src/services/db');
const { sendBreachAlert } = require('./src/services/mailer');

const connection = { url: process.env.REDIS_URL };

const worker = new Worker('email-scan', async job => {
  const { monitoredEmailId, email } = job.data;
  console.log(`[worker] Scanning ${email} (job ${job.id})...`);

  const breaches = await scanEmail(email);
  let newBreachCount = 0;

  for (const b of breaches) {
    // Only insert if this breach hasn't already been recorded for this email — avoids duplicate alerts
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
    newBreachCount++;
  }

  console.log(`[worker] Done with ${email}: ${newBreachCount} new breach(es) found.`);
}, {
  connection,
  limiter: { max: 2, duration: 1000 } // respect XposedOrNot's 2 req/sec limit
});

worker.on('failed', (job, err) => {
  console.error(`[worker] Job ${job.id} failed:`, err.message);
});

console.log('Worker started — waiting for scan jobs...');