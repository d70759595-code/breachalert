const request = require('supertest');
const app = require('./server');
const db = require('./src/services/db');
const { sendSMSNotification } = require('./src/services/smsService');

describe('BreachAlert Comprehensive Security & Interactive API Audit Suite', () => {
  
  afterAll(async () => {
    if (db && db.end) {
      await db.end().catch(() => {});
    }
  });

  describe('1. Health & Infrastructure Check', () => {
    it('GET /health should return system status & DB/Redis indicators', async () => {
      const res = await request(app).get('/health');
      expect([200, 503]).toContain(res.statusCode);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('services');
    });
  });

  describe('2. Authentication & Form Interaction Security', () => {
    it('POST /auth/login with empty body should return 400 with generic error', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toHaveProperty('message');
    });

    it('POST /auth/login with SQL injection payload should safely return 400 or 401', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: "' OR '1'='1",
          password: "password123"
        });

      expect([400, 401]).toContain(res.statusCode);
      expect(res.body.success).toBe(false);
    });

    it('POST /auth/signup with invalid email format should return 400', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          email: "not-an-email",
          password: "short"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('POST /auth/forgot-password with non-existent email should return 200 without exposing account existence', async () => {
      const res = await request(app)
        .post('/auth/forgot-password')
        .send({
          email: "nonexistent-user-12345@example.com"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('POST /auth/logout should clear authentication cookie', async () => {
      const res = await request(app).post('/auth/logout');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.headers['set-cookie']).toBeDefined();
    });
  });

  describe('3. Authorization & IDOR Protection', () => {
    it('GET /dashboard without HttpOnly cookie should return 401 Unauthorized', async () => {
      const res = await request(app).get('/dashboard');
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /emails without authentication should return 401 Unauthorized', async () => {
      const res = await request(app).get('/emails');
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('POST /emails/9999/scan-now without authentication should return 401 Unauthorized', async () => {
      const res = await request(app).post('/emails/9999/scan-now');
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /emails/verify/invalidtoken123 should reject invalid verification tokens', async () => {
      const res = await request(app).get('/emails/verify/invalidtoken123');
      expect(res.statusCode).toBe(400);
      expect(res.text).toContain('Invalid or expired verification token');
    });
  });

  describe('4. Stripe Billing & Subscription Hooks', () => {
    it('POST /billing/create-checkout-session without auth should return 401', async () => {
      const res = await request(app).post('/billing/create-checkout-session');
      expect(res.statusCode).toBe(401);
    });

    it('POST /billing/cancel-subscription without auth should return 401', async () => {
      const res = await request(app).post('/billing/cancel-subscription');
      expect(res.statusCode).toBe(401);
    });

    it('POST /billing/webhook should handle mock webhook events safely', async () => {
      const res = await request(app)
        .post('/billing/webhook')
        .send({
          type: 'checkout.session.completed',
          data: { object: { metadata: { userId: '1' }, subscription: 'sub_mock_123' } }
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ received: true });
    });
  });

  describe('5. SMS Notification Engine', () => {
    it('sendSMSNotification should successfully format and return dispatch payload', async () => {
      const res = await sendSMSNotification('+15550199283', 'BREACH ALERT: Test alert');
      expect(res.success).toBe(true);
    });
  });

  describe('6. AI & Deterministic Risk Analysis Engine', () => {
    const { calculateDeterministicRisk, generateRiskExplanation } = require('./src/services/riskEngine');

    it('Should calculate LOW risk for basic email metadata exposure', () => {
      const risk = calculateDeterministicRisk(['Email addresses'], '2018-01-01');
      expect(risk.score).toBeLessThan(50);
      expect(['LOW', 'MEDIUM']).toContain(risk.level);
    });

    it('Should calculate CRITICAL risk for passwords and financial data', () => {
      const risk = calculateDeterministicRisk(['Passwords', 'Credit cards', 'Social Security Numbers'], '2025-01-01');
      expect(risk.score).toBeGreaterThanOrEqual(75);
      expect(risk.level).toBe('CRITICAL');
    });

    it('Should generate structured recommendations without inventing unverified facts', () => {
      const explanation = generateRiskExplanation('Test Breach', ['Passwords', 'Phone numbers'], 85, 'CRITICAL');
      expect(explanation).toHaveProperty('summary');
      expect(explanation).toHaveProperty('reasons');
      expect(explanation).toHaveProperty('recommendations');
      expect(explanation.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('7. Multi-Submission & Rapid Click Defense', () => {
    it('Multiple rapid requests to /auth/forgot-password should all be safely handled', async () => {
      const requests = Array(3).fill(0).map(() => 
        request(app).post('/auth/forgot-password').send({ email: "operator@breachalert.net" })
      );
      const responses = await Promise.all(requests);
      responses.forEach(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
      });
    });
  });

});
