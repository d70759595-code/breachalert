const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const passport = require('../config/passportGoogle');
const db = require('../services/db');
const requireAuth = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/mailer');
const { sendSMSNotification, validateE164Phone } = require('../services/smsService');

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '7d';
const isProduction = process.env.NODE_ENV === 'production';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Helper: Set HttpOnly cookie & return clean user payload
function sendAuthResponse(res, user, statusCode = 200) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'fallback_secret_for_dev_only',
    { expiresIn: TOKEN_EXPIRY }
  );

  res.cookie('token', token, COOKIE_OPTIONS);
  return res.status(statusCode).json({
    success: true,
    user: { id: user.id, email: user.email, plan: user.plan }
  });
}

// GET /auth/me — Check auth state using HttpOnly cookie
router.get('/auth/me', requireAuth, async (req, res) => {
  try {
    const result = await db.query('SELECT id, email, plan, phone_number, phone_verified, sms_enabled, created_at FROM users WHERE id = $1', [req.user.id]);
    if (!result.rowCount) {
      return res.status(404).json({ success: false, error: { message: 'User not found' } });
    }
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Server error checking authentication status' } });
  }
});

// POST /auth/signup
router.post('/auth/signup', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: { message: errors.array()[0].msg } });
  }

  const { email, password } = req.body;

  try {
    const existing = await db.query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rows.length) {
      return res.status(409).json({ success: false, error: { message: 'An account with that email already exists' } });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await db.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, plan`,
      [email, passwordHash]
    );

    const user = result.rows[0];
    sendAuthResponse(res, user, 201);
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Internal server error during registration' } });
  }
});

// POST /auth/login
router.post('/auth/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: { message: 'Invalid credentials provided' } });
  }

  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];

    // Generic error message to prevent account enumeration
    if (!user || !user.password_hash) {
      return res.status(401).json({ success: false, error: { message: 'Invalid email or password' } });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ success: false, error: { message: 'Invalid email or password' } });
    }

    sendAuthResponse(res, user);
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Internal server error during login' } });
  }
});

// POST /auth/logout
router.post('/auth/logout', (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET /auth/google — Google OAuth start
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

// GET /auth/google/callback — Google OAuth Callback with HttpOnly cookie redirect
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed` }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_for_dev_only',
      { expiresIn: TOKEN_EXPIRY }
    );

    res.cookie('token', token, COOKIE_OPTIONS);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`);
  }
);

// POST /auth/forgot-password
router.post('/auth/forgot-password', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, error: { message: 'Email is required' } });

  try {
    const userRes = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userRes.rowCount > 0) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

      await db.query(
        `UPDATE users SET reset_token_hash = $1, reset_token_expires_at = NOW() + INTERVAL '1 hour' WHERE id = $2`,
        [resetTokenHash, userRes.rows[0].id]
      );

      await sendPasswordResetEmail(email, resetToken);
    }

    res.json({ success: true, message: 'If an account exists with that email, a password reset link has been dispatched.' });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Error processing password reset' } });
  }
});

// POST /auth/reset-password
router.post('/auth/reset-password', [
  body('token').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ success: false, error: { message: 'Token and new password are required' } });
  }

  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const userRes = await db.query(
      `SELECT id FROM users WHERE reset_token_hash = $1 AND reset_token_expires_at > NOW()`,
      [tokenHash]
    );

    if (!userRes.rowCount) {
      return res.status(400).json({ success: false, error: { message: 'Invalid or expired password reset token' } });
    }

    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await db.query(
      `UPDATE users SET password_hash = $1, reset_token_hash = NULL, reset_token_expires_at = NULL WHERE id = $2`,
      [newHash, userRes.rows[0].id]
    );

    res.json({ success: true, message: 'Password updated successfully. You may now log in.' });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to reset password' } });
  }
});

// POST /auth/phone/send-otp — Sends 6-digit phone verification OTP code
router.post('/auth/phone/send-otp', requireAuth, [
  body('phoneNumber').notEmpty().withMessage('Phone number required')
], async (req, res) => {
  const { phoneNumber } = req.body;

  if (!validateE164Phone(phoneNumber)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid phone format. Phone number must follow E.164 standard (e.g. +15550199283).' }
    });
  }

  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = crypto.createHash('sha256').update(otpCode).digest('hex');

    await db.query(
      `UPDATE users 
       SET phone_number = $1, phone_verified = false, phone_verify_token = $2, phone_verify_token_expires_at = NOW() + INTERVAL '10 minutes'
       WHERE id = $3`,
      [phoneNumber.trim(), otpHash, req.user.id]
    );

    const smsRes = await sendSMSNotification(phoneNumber.trim(), `BreachAlert Verification Code: ${otpCode}. Expires in 10 minutes.`);

    res.json({
      success: true,
      message: 'Verification OTP sent to mobile number.',
      smsStatus: smsRes
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to send phone verification OTP' } });
  }
});

// POST /auth/phone/verify-otp — Verifies 6-digit OTP code & activates SMS alert eligibility
router.post('/auth/phone/verify-otp', requireAuth, [
  body('otpCode').isLength({ min: 6, max: 6 }).withMessage('6-digit OTP code required')
], async (req, res) => {
  const { otpCode } = req.body;
  const otpHash = crypto.createHash('sha256').update(otpCode).digest('hex');

  try {
    const result = await db.query(
      `UPDATE users 
       SET phone_verified = true, sms_enabled = true, phone_verify_token = NULL, phone_verify_token_expires_at = NULL
       WHERE id = $1 AND phone_verify_token = $2 AND phone_verify_token_expires_at > NOW()
       RETURNING id, phone_number`,
      [req.user.id, otpHash]
    );

    if (!result.rowCount) {
      return res.status(400).json({ success: false, error: { message: 'Invalid or expired OTP code' } });
    }

    res.json({
      success: true,
      message: 'Mobile phone number verified successfully! SMS alert eligibility activated.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to verify phone OTP' } });
  }
});

module.exports = router;