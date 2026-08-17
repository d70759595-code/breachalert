const { createClient } = require('redis');

let client = null;
let isConnected = false;
const memoryCache = new Map();

if (process.env.REDIS_URL) {
  client = createClient({ url: process.env.REDIS_URL });

  client.on('error', (err) => {
    console.warn('[Redis] Connection warning:', err.message);
    isConnected = false;
  });

  client.on('ready', () => {
    console.log('[Redis] Connected and ready.');
    isConnected = true;
  });

  client.connect().catch((err) => {
    console.warn('[Redis] Unable to connect on startup, using in-memory cache fallback.');
    isConnected = false;
  });
}

module.exports = {
  async get(key) {
    if (isConnected && client) {
      try {
        return await client.get(key);
      } catch (err) {
        console.warn('[Redis] Get error, falling back to memory:', err.message);
      }
    }
    const item = memoryCache.get(key);
    if (!item) return null;
    if (item.expiresAt && Date.now() > item.expiresAt) {
      memoryCache.delete(key);
      return null;
    }
    return item.value;
  },

  async set(key, value, options = {}) {
    if (isConnected && client) {
      try {
        return await client.set(key, value, options);
      } catch (err) {
        console.warn('[Redis] Set error, falling back to memory:', err.message);
      }
    }
    const ttlMs = (options.EX || 86400) * 1000;
    memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs
    });
  }
};