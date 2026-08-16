const { XposedOrNotProvider } = require('./provider');
const redisClient = require('../services/redisClient');

const provider = new XposedOrNotProvider();
const CACHE_TTL_SECONDS = 86400; // 24h cache

async function scanEmail(email) {
  const cacheKey = `scan:${email.toLowerCase()}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.warn('[scanner] Redis cache read failed, proceeding with direct provider query:', err.message);
  }

  const breaches = await provider.checkEmail(email);

  try {
    await redisClient.set(cacheKey, JSON.stringify(breaches), 'EX', CACHE_TTL_SECONDS);
  } catch (err) {
    console.warn('[scanner] Redis cache write failed:', err.message);
  }

  return breaches;
}

module.exports = { scanEmail, provider };