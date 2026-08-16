require('dotenv').config();
const { Worker } = require('bullmq');
const { scanEmail } = require('./src/scanner');
const db = require('./src/services/db');
const { sendBreachAlert } = require('./src/services/mailer');
const { sendSMSNotification } = require('./src/services/smsService');
const { calculateDeterministicRisk, generateRiskExplanation } = require('./src/services/riskEngine');
const startScheduler = require('./src/queue/scheduler');

const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };

async function scanWithRetry(email, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await scanEmail(email);
    } catch (err) {
      if (err.message === 'RATE_LIMITED' && attempt < maxRetries - 1) {
        const delayMs = 2000 * (attempt + 1);
        console.log(`[worker] Rate limited on ${email}, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }
      throw err;
    }
  }
}

const worker = new Worker('email-scan', async job => {
  const { monitoredEmailId, email } = job.data;
  console.log(`[worker] Scanning ${email} (job ${job.id})...`);

  const breaches = await scanWithRetry(email);
  let newBreachCount = 0;

  // Fetch owner user details to check plan and SMS options
  const userRes = await db.query(
    `SELECT u.plan, u.phone_number, u.sms_enabled 
     FROM users u 
     JOIN monitored_emails me ON me.user_id = u.id 
     WHERE me.id = $1`,
    [monitoredEmailId]
  );
  const owner = userRes.rows[0] || {};

  for (const b of breaches) {
    const breachName = b.breachName || b.Name;
    const breachDate = b.breachDate || b.BreachDate;
    const dataClasses = b.exposedData || b.DataClasses || [];
    const domain = b.domain || '';
    const description = b.description || '';

    // Calculate AI risk analysis score & explanations
    const { score, level } = calculateDeterministicRisk(dataClasses, breachDate);
    const aiExplanation = generateRiskExplanation(breachName, dataClasses, score, level);

    // Use ON CONFLICT DO NOTHING to prevent duplicate alerts safely
    const inserted = await db.query(
      `INSERT INTO breach_events 
        (monitored_email_id, breach_name, breach_date, data_classes, breach_domain, breach_description, risk_score, risk_level, ai_explanation)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (monitored_email_id, breach_name) DO NOTHING
       RETURNING *`,
      [monitoredEmailId, breachName, breachDate, dataClasses, domain, description, score, level, JSON.stringify(aiExplanation)]
    );

    if (inserted.rowCount > 0) {
      // 1. Email Alert
      await sendBreachAlert(email, inserted.rows[0]);

      // 2. Family Plan SMS Alert Trigger (if enabled)
      if (owner.plan === 'family' && owner.phone_number && owner.sms_enabled) {
        await sendSMSNotification(
          owner.phone_number,
          `SECURITY BREACH ALERT: ${email} was detected in ${breachName}. Risk: ${level} (${score}/100). Take immediate action.`
        );
      }

      newBreachCount++;
    }
  }

  // Update last_scanned_at timestamp on monitored_emails table
  await db.query(
    'UPDATE monitored_emails SET last_scanned_at = NOW() WHERE id = $1',
    [monitoredEmailId]
  );

  console.log(`[worker] Done with ${email}: ${newBreachCount} new breach(es) found.`);
}, {
  connection,
  concurrency: 2,
  limiter: { max: 2, duration: 1000 }
});

worker.on('failed', (job, err) => {
  console.error(`[worker] Job ${job?.id} failed:`, err.message);
});

console.log('Worker started — waiting for scan jobs...');
startScheduler();