const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('../config/passportGoogle');
const db = require('../services/db');
const requireAuth = require('../middleware/auth');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret';

// POST /auth/signup
router.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  const existing = await db.query('SELECT id FROM users WHERE LOWER(email)=LOWER($1)', [email]);
  if (existing.rows.length) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await db.query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, plan`,
    [email, passwordHash]
  );

  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user });
});

// POST /auth/login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const result = await db.query('SELECT * FROM users WHERE LOWER(email)=LOWER($1)', [email]);
  const user = result.rows[0];

  if (!user || !user.password_hash) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, plan: user.plan } });
});

// GET /auth/me
router.get('/auth/me', requireAuth, async (req, res) => {
  const result = await db.query('SELECT id, email, plan, created_at FROM users WHERE id=$1', [req.user.id]);
  if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
  res.json(result.rows[0]);
});

// POST /auth/forgot-password
router.post('/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const result = await db.query('SELECT id FROM users WHERE LOWER(email)=LOWER($1)', [email]);
  if (!result.rows.length) {
    // Return success message to avoid email enumeration security risk
    return res.json({ message: 'If an account with that email exists, reset instructions have been sent.' });
  }

  const userId = result.rows[0].id;
  const resetToken = crypto.randomBytes(32).toString('hex');

  await db.query(
    `INSERT INTO password_reset_tokens (user_id, token, expires_at)
     VALUES ($1, $2, now() + interval '1 hour')`,
    [userId, resetToken]
  );

  console.log(`\n[PASSWORD RESET] Token for ${email}: ${resetToken}\n`);
  res.json({ message: 'If an account with that email exists, reset instructions have been sent.', token: resetToken });
});

// POST /auth/reset-password
router.post('/auth/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }

  const result = await db.query(
    `SELECT prt.id, prt.user_id FROM password_reset_tokens prt
     WHERE prt.token=$1 AND prt.used=false AND prt.expires_at > now()`,
    [token]
  );

  if (!result.rows.length) {
    return res.status(400).json({ error: 'Invalid or expired password reset token' });
  }

  const { id: tokenId, user_id: userId } = result.rows[0];
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await db.query('UPDATE users SET password_hash=$1 WHERE id=$2', [passwordHash, userId]);
  await db.query('UPDATE password_reset_tokens SET used=true WHERE id=$1', [tokenId]);

  res.json({ message: 'Password reset successful. You may now log in with your new passphrase.' });
});

// POST /auth/change-password
router.post('/auth/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }

  const userRes = await db.query('SELECT password_hash FROM users WHERE id=$1', [req.user.id]);
  const user = userRes.rows[0];

  const matches = await bcrypt.compare(currentPassword, user.password_hash);
  if (!matches) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await db.query('UPDATE users SET password_hash=$1 WHERE id=$2', [passwordHash, req.user.id]);

  res.json({ message: 'Password updated successfully' });
});

// GET /auth/google — kicks off Google OAuth flow
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

// GET /auth/google/callback — Google redirects here after login
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const appUrl = process.env.APP_BASE_URL ? process.env.APP_BASE_URL.replace('3000', '5173') : 'http://localhost:5173';
    res.redirect(`${appUrl}/dashboard?token=${token}`);
  }
);

module.exports = router;