/**
 * Hybrid Security Risk Analysis Engine
 * Calculates deterministic risk score (0-100) and risk level (LOW, MEDIUM, HIGH, CRITICAL)
 * Generates actionable security recommendations & AI explanations without inventing unverified breach facts.
 */

function calculateDeterministicRisk(dataClasses = [], breachDateStr = null) {
  let score = 0;
  const classes = dataClasses.map(c => c.toLowerCase());

  // Data sensitivity scoring
  if (classes.some(c => c.includes('password'))) score += 35;
  if (classes.some(c => c.includes('credit card') || c.includes('financial') || c.includes('bank'))) score += 30;
  if (classes.some(c => c.includes('ssn') || c.includes('social security') || c.includes('passport') || c.includes('government'))) score += 25;
  if (classes.some(c => c.includes('phone') || c.includes('mobile'))) score += 15;
  if (classes.some(c => c.includes('address') || c.includes('location'))) score += 10;
  if (classes.some(c => c.includes('date of birth') || c.includes('dob'))) score += 10;

  // Recency multiplier
  if (breachDateStr) {
    const breachYear = new Date(breachDateStr).getFullYear();
    const currentYear = new Date().getFullYear();
    if (!isNaN(breachYear)) {
      const ageInYears = currentYear - breachYear;
      if (ageInYears <= 1) score += 15;
      else if (ageInYears <= 3) score += 10;
    }
  }

  const normalizedScore = Math.min(100, Math.max(10, score || 15));

  let level = 'LOW';
  if (normalizedScore >= 75) level = 'CRITICAL';
  else if (normalizedScore >= 50) level = 'HIGH';
  else if (normalizedScore >= 25) level = 'MEDIUM';

  return { score: normalizedScore, level };
}

function generateRiskExplanation(breachName, dataClasses = [], riskScore, riskLevel) {
  const classes = dataClasses.map(c => c.toLowerCase());
  const reasons = [];
  const recommendations = [];

  if (classes.some(c => c.includes('password'))) {
    reasons.push('Plaintext or hashed credentials were included in this breach dump.');
    recommendations.push('Change your password immediately on the breached platform and any other accounts reusing it.');
    recommendations.push('Enable a password manager to generate unique, strong passphrases.');
  }

  if (classes.some(c => c.includes('credit card') || c.includes('financial'))) {
    reasons.push('Financial records or credit card details were exposed.');
    recommendations.push('Notify your bank/card issuer immediately to request replacement cards.');
    recommendations.push('Monitor bank statements for unauthorized transactions.');
  }

  if (classes.some(c => c.includes('phone'))) {
    reasons.push('Mobile phone numbers were exposed, increasing risk of targeted SMS phishing or SIM-swap attacks.');
    recommendations.push('Enable SIM-swap security pins with your mobile carrier.');
  }

  if (classes.some(c => c.includes('ssn') || c.includes('government') || c.includes('passport'))) {
    reasons.push('High-value government identity identifiers were compromised.');
    recommendations.push('Place a fraud alert/credit freeze on major credit bureaus (Equifax, Experian, TransUnion).');
  }

  if (reasons.length === 0) {
    reasons.push('Account email metadata was listed in an unauthorized external database archive.');
    recommendations.push('Ensure two-factor authentication (2FA) is enabled on your primary email account.');
  }

  return {
    summary: `Risk Level ${riskLevel} (${riskScore}/100): ${reasons.join(' ')}`,
    reasons,
    recommendations: Array.from(new Set(recommendations))
  };
}

module.exports = {
  calculateDeterministicRisk,
  generateRiskExplanation
};
