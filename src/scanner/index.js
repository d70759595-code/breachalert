require('dotenv').config();
const HibpClient = require('./hibpClient');
const redis = require('../services/redisClient');

const hibp = new HibpClient(process.env.HIBP_API_KEY);
const CACHE_TTL_SECONDS = 24 * 60 * 60;

const USE_STUB = true;

const FAKE_BREACHES = [
  {
    Name: 'FakeCorpLeak2023',
    BreachDate: '2023-06-15',
    DataClasses: ['Email addresses', 'Passwords', 'Phone numbers']
  }
];

async function scanEmail(email) {
  const cacheKey = `hibp:${email.toLowerCase()}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const breaches = USE_STUB ? FAKE_BREACHES : await hibp.checkEmail(email);

  await redis.set(cacheKey, JSON.stringify(breaches), { EX: CACHE_TTL_SECONDS });
  return breaches;
}

module.exports = { scanEmail };