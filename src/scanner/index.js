require('dotenv').config();
const XposedOrNotClient = require('./hibpClient');
const redis = require('../services/redisClient');

const xon = new XposedOrNotClient();
const CACHE_TTL_SECONDS = 24 * 60 * 60; // 24h, per project spec

async function scanEmail(email) {
  const cacheKey = `breach:${email.toLowerCase()}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const breaches = await xon.checkEmail(email);

  await redis.set(cacheKey, JSON.stringify(breaches), { EX: CACHE_TTL_SECONDS });
  return breaches;
}

module.exports = { scanEmail };