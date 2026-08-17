const router = require('express').Router();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key');
const db = require('../services/db');
const requireAuth = require('../middleware/auth');

// POST /billing/create-checkout-session — Initiates Stripe Checkout for Family Plan ($10/mo)
router.post('/billing/create-checkout-session', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRes = await db.query('SELECT email, plan, stripe_customer_id FROM users WHERE id = $1', [userId]);
    const user = userRes.rows[0];

    const domain = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Mock/Test Session Mode when Stripe test keys are absent
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.json({
        success: true,
        mode: 'mock',
        url: `${domain}/dashboard?billing_status=success`
      });
    }

    let customerId = user ? user.stripe_customer_id : null;
    if (!customerId && user) {
      const customer = await stripe.customers.create({ email: user.email, metadata: { userId: String(userId) } });
      customerId = customer.id;
      await db.query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [customerId, userId]).catch(() => {});
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId || undefined,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'BreachAlert Family Plan', description: 'Surveillance for up to 5 email identities + SMS alerts' },
          unit_amount: 1000,
          recurring: { interval: 'month' }
        },
        quantity: 1
      }],
      success_url: `${domain}/dashboard?billing_status=success`,
      cancel_url: `${domain}/pricing?billing_status=cancelled`,
      metadata: { userId: String(userId) }
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error('[stripe checkout error]', err.message);
    res.status(500).json({ success: false, error: { message: 'Failed to initiate Stripe checkout session' } });
  }
});

// POST /billing/cancel-subscription — Downgrades Family Plan to Free Plan
router.post('/billing/cancel-subscription', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    await db.query(
      `UPDATE users SET plan = 'free', stripe_subscription_id = NULL WHERE id = $1`,
      [userId]
    ).catch(() => {});
    res.json({ success: true, message: 'Subscription cancelled. Downgraded to Free Plan (1 email max).' });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to cancel subscription' } });
  }
});

router.post('/billing/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('[webhook] STRIPE_WEBHOOK_SECRET is missing. Rejecting webhook.');
      return res.status(400).send('Webhook Configuration Error');
    }
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook signature failed]', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription;

        if (userId) {
          await db.query(
            `UPDATE users SET plan = 'family', stripe_subscription_id = $1 WHERE id = $2`,
            [subscriptionId, userId]
          ).catch(err => console.warn('[webhook db update warn]', err.message));
          console.log(`[stripe webhook] Upgraded user ${userId} to Family Plan`);
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;

        await db.query(
          `UPDATE users SET plan = 'free', stripe_subscription_id = NULL WHERE stripe_subscription_id = $1`,
          [subscriptionId]
        ).catch(err => console.warn('[webhook db update warn]', err.message));
        console.log(`[stripe webhook] Expired/Cancelled subscription ${subscriptionId}`);
        break;
      }
    }
    res.json({ received: true });
  } catch (err) {
    console.error('[webhook handler error]', err.message);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

module.exports = router;
