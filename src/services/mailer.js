const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { 
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS 
  }
});

function getActionableAdvice(dataClasses = []) {
  const classes = dataClasses.map(c => c.toLowerCase());
  const advice = [];

  if (classes.some(c => c.includes('password'))) {
    advice.push('Change your password immediately and enable a password manager (Bitwarden, 1Password).');
  }
  if (classes.some(c => c.includes('credit card') || c.includes('partial credit'))) {
    advice.push('Contact your card issuer and consider freezing credit with Equifax, Experian, and TransUnion.');
  }
  if (classes.some(c => c.includes('phone'))) {
    advice.push('Enable SIM-swap protection with your mobile carrier and watch for SMS phishing.');
  }
  if (classes.some(c => c.includes('government') || c.includes('ssn') || c.includes('social security'))) {
    advice.push('Monitor credit reports and consider an identity-theft protection service.');
  }
  if (classes.some(c => c.includes('date of birth') || c.includes('physical address'))) {
    advice.push('Be alert for targeted phishing that uses personal details to appear legitimate.');
  }
  if (!advice.length) {
    advice.push('Review account security settings and enable two-factor authentication where available.');
  }

  return advice;
}

async function sendVerificationEmail(email, token) {
  const verifyUrl = `${process.env.APP_BASE_URL || 'http://localhost:3000'}/emails/verify/${token}`;
  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"BreachAlert" <no-reply@breachalert.app>',
    to: email,
    subject: 'Verify your email — BreachAlert',
    html: `<p>Click to verify: <a href="${verifyUrl}">${verifyUrl}</a></p>`
  });
}

async function sendBreachAlert(email, breachEvent) {
  const advice = getActionableAdvice(breachEvent.data_classes || []);
  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"BreachAlert" <no-reply@breachalert.app>',
    to: email,
    subject: `⚠ Breach Alert: ${breachEvent.breach_name}`,
    html: `<p><strong>Breach:</strong> ${breachEvent.breach_name}</p>
           <p><strong>Data exposed:</strong> ${(breachEvent.data_classes || []).join(', ')}</p>
           <ul>${advice.map(a => `<li>${a}</li>`).join('')}</ul>`
  });
}

async function sendPasswordResetEmail(email, token) {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"BreachAlert" <no-reply@breachalert.app>',
    to: email,
    subject: 'Password Reset Request — BreachAlert',
    html: `<p>You requested a password reset.</p>
           <p>Click here to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>
           <p>If you did not request this, please ignore this email.</p>`
  });
}

module.exports = { sendVerificationEmail, sendBreachAlert, sendPasswordResetEmail, getActionableAdvice };