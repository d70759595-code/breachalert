require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passport = require('./src/config/passportGoogle');
const emailsRouter = require('./src/routes/emails');
const authRouter = require('./src/routes/auth');
const dashboardRouter = require('./src/routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); // sets security-related HTTP headers
app.use(cors()); // allows the React frontend (different port) to call this API
app.use(express.json()); // lets us read JSON request bodies
app.use(passport.initialize()); // sets up Google OAuth handling

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later.' }
});

app.use(generalLimiter);

app.get('/', (req, res) => {
  res.send('BreachAlert server is running!');
});

app.use('/auth/login', authLimiter);
app.use('/auth/signup', authLimiter);

app.use('/', authRouter);      // adds POST /auth/signup, POST /auth/login, GET /auth/google(/callback)
app.use('/', emailsRouter);    // adds POST /emails, GET /emails/verify/:token, GET /emails
app.use('/', dashboardRouter); // adds GET /dashboard

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});