const request = require('supertest');
const app = require('../server');

describe('Security Regression Tests', () => {
  // Mock external dependencies if necessary or rely on integration
  
  describe('1. Unauthorized Access', () => {
    it('should reject unauthenticated access to /dashboard', async () => {
      const res = await request(app).get('/dashboard');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('2. CSRF Rejection', () => {
    it('should reject state-changing requests with malicious origin', async () => {
      const res = await request(app)
        .post('/auth/login')
        .set('Origin', 'https://evil-attacker.com')
        .send({ email: 'test@example.com', password: 'password123' });
      
      expect(res.statusCode).toBe(403);
      expect(res.body.error.message).toBe('CSRF Attempt Blocked');
    });

    it('should allow state-changing requests with correct origin', async () => {
      const expectedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
      const res = await request(app)
        .post('/auth/login')
        .set('Origin', expectedOrigin)
        .send({ email: 'nonexistent@example.com', password: 'password123' });
      
      // Should pass CSRF and fail auth
      expect(res.statusCode).toBe(401); 
    });
  });

  describe('3. Stripe Webhook Forgery', () => {
    it('should reject webhooks without a signature', async () => {
      const res = await request(app)
        .post('/billing/webhook')
        .send({ type: 'checkout.session.completed' });
      
      expect(res.statusCode).toBe(400);
      expect(res.text).toMatch(/Webhook Configuration Error|Webhook Error/);
    });
  });

});
