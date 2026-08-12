// Stub mailer — logs the verification link instead of sending a real email.
// Swap this out for real SendGrid/Mailgun code once you have an API key.

async function sendVerificationEmail(email, token) {
  const verifyUrl = `${process.env.APP_BASE_URL || 'http://localhost:3000'}/emails/verify/${token}`;
  console.log(`\n[STUB EMAIL] Verification link for ${email}:`);
  console.log(verifyUrl, '\n');
}

async function sendBreachAlert(email, breachEvent) {
  console.log(`\n[STUB EMAIL] Breach alert for ${email}:`);
  console.log(breachEvent, '\n');
}

module.exports = { sendVerificationEmail, sendBreachAlert };