require('dotenv').config();
const { scanEmail } = require('./src/scanner');

async function run() {
  const email = 'test@example.com';
  const breaches = await scanEmail(email);
  console.log('Breaches found:', breaches);
  process.exit(0);
}

run();