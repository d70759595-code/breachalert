// Stub mailer — logs instead of sending real email.
// Set SENDGRID_API_KEY or MAILGUN_API_KEY and wire nodemailer/SendGrid SDK for production.

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
  console.log(`\n[STUB EMAIL] Verification link for ${email}:`);
  console.log(verifyUrl, '\n');
}

async function sendBreachAlert(email, breachEvent) {
  const advice = getActionableAdvice(breachEvent.data_classes || []);
  console.log(`\n[STUB EMAIL] Breach alert for ${email}:`);
  console.log(`  Breach: ${breachEvent.breach_name}`);
  console.log(`  Data exposed: ${(breachEvent.data_classes || []).join(', ')}`);
  console.log('  Recommended actions:');
  advice.forEach(line => console.log(`    - ${line}`));
  console.log('');
}

module.exports = { sendVerificationEmail, sendBreachAlert, getActionableAdvice };