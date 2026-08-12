require('dotenv').config();
const express = require('express');
const emailsRouter = require('./src/routes/emails');
const authRouter = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // lets us read JSON request bodies

app.get('/', (req, res) => {
  res.send('BreachAlert server is running!');
});

app.use('/', authRouter);   // adds POST /auth/signup, POST /auth/login
app.use('/', emailsRouter); // adds POST /emails, GET /emails/verify/:token, GET /emails

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});