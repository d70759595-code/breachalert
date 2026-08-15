const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../services/db');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const googleId = profile.id;

    // Check if this Google account is already linked to a user
    let result = await db.query('SELECT * FROM users WHERE google_id=$1', [googleId]);
    let user = result.rows[0];

    if (!user) {
      // No user with this Google ID yet — check if the email already has a password-based account
      const existingByEmail = await db.query('SELECT * FROM users WHERE email=$1', [email]);

      if (existingByEmail.rows.length) {
        // Link the Google ID to their existing account
        const updated = await db.query(
          `UPDATE users SET google_id=$1 WHERE email=$2 RETURNING *`,
          [googleId, email]
        );
        user = updated.rows[0];
      } else {
        // Brand new user, signing up via Google for the first time
        const inserted = await db.query(
          `INSERT INTO users (email, google_id, password_hash) VALUES ($1, $2, NULL) RETURNING *`,
          [email, googleId]
        );
        user = inserted.rows[0];
      }
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport;