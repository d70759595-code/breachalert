require('dotenv').config();
console.log('Step 1: starting');

const { scanEmail } = require('./src/scanner');
console.log('Step 2: scanner module loaded');

async function run() {
  console.log('Step 3: calling scanEmail');
  const email = 'test@example.com';
  const breaches = await scanEmail(email);
  console.log('Step 4: got result');
  console.log('Breaches found:', breaches);
  process.exit(0);
}

run();