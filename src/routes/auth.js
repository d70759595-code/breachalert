const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('../config/passportGoogle');
const db = require('../services/db');

const SALT_ROUNDS = 10;

// POST /auth/signup
router.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const existing = await db.query('SELECT id FROM users WHERE email=$1', [email]);
  if (existing.rows.length) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await db.query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, plan`,
    [email, passwordHash]
  );

  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user });
});

// POST /auth/login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = result.rows[0];

  if (!user || !user.password_hash) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, plan: user.plan } });
});

// GET /auth/google — kicks off the Google login flow
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

// GET /auth/google/callback — Google redirects here after the user logs in
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Redirect back to the frontend dashboard with the token as a query param.
    // The frontend will read it and store it, then clean up the URL.
    res.redirect(`${process.env.APP_BASE_URL.replace('3000', '5173')}/dashboard?token=${token}`);
  }
);

module.exports = router;