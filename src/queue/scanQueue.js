const { Queue } = require('bullmq');

const connection = { url: process.env.REDIS_URL };

const scanQueue = new Queue('email-scan', { connection });

module.exports = scanQueue;