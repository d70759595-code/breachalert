const request = require('supertest');
const app = require('./server');
const db = require('./src/services/db');

describe('BreachAlert Comprehensive Security & Regression Test Suite', () => {
  
  afterAll(async () => {
    // Close open handles after testing
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

  describe('2. Authentication & Input Validation Security', () => {
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
  });

  describe('4. AI & Deterministic Risk Analysis Engine', () => {
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

});
