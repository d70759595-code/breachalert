require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const db = require('./src/services/db');
const redisClient = require('./src/services/redisClient');
const passport = require('./src/config/passportGoogle');
const emailsRouter = require('./src/routes/emails');
const authRouter = require('./src/routes/auth');
const dashboardRouter = require('./src/routes/dashboard');
const billingRouter = require('./src/routes/billing');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Middlewares
app.use(helmet());
app.use(cookieParser());

// Configured CORS to allow credentials with environment-based allowed origin
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Strict CSRF Protection Middleware
app.use((req, res, next) => {
  const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
  if (isStateChanging) {
    const origin = req.headers.origin;
    if (origin && origin !== allowedOrigin) {
      console.warn(`[CSRF Warning] Blocked state-changing request from unverified origin: ${origin}`);
      return res.status(403).json({ success: false, error: { message: 'CSRF Attempt Blocked' } });
    }
  }
  next();
});

// Mount billing router (handles raw body parsing internally for Stripe Webhooks)
app.use('/', billingRouter);

app.use(express.json({ limit: '100kb' }));
app.use(passport.initialize());

// Rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests, please try again later.' } }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, error: { code: 'TOO_MANY_AUTH_ATTEMPTS', message: 'Too many authentication attempts, please try again in 15 minutes.' } }
});

const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, error: { message: 'Rate limit exceeded for sensitive endpoint.' } }
});

app.use('/auth/login', authLimiter);
app.use('/auth/signup', authLimiter);
app.use('/auth/forgot-password', authLimiter);
app.use('/auth/reset-password', authLimiter);
app.use('/emails', sensitiveLimiter);
app.use('/billing/create-checkout-session', sensitiveLimiter);
app.use(generalLimiter);

// Health Check Endpoint (Verifies PostgreSQL & Redis connections)
app.get('/health', async (req, res) => {
  let dbOk = false;
  let redisOk = false;

  try {
    await db.query('SELECT 1');
    dbOk = true;
  } catch (err) {}

  try {
    const ping = await redisClient.ping();
    if (ping === 'PONG') redisOk = true;
  } catch (err) {}

  const isHealthy = dbOk && redisOk;
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'OK' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    services: {
      database: dbOk ? 'CONNECTED' : 'DISCONNECTED',
      redis: redisOk ? 'CONNECTED' : 'DISCONNECTED'
    }
  });
});

// App Routes
app.use('/', authRouter);
app.use('/', emailsRouter);
app.use('/', dashboardRouter);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[server error]', err.stack || err);
  const isDev = process.env.NODE_ENV !== 'production';
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: isDev ? err.message : 'An unexpected server error occurred. Please try again later.'
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`BreachAlert security server running on http://localhost:${PORT}`);
  });
}

module.exports = app;