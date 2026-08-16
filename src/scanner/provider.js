const axios = require('axios');

const XON_BASE = 'https://api.xposedornot.com/v1';

function normalizeBreachDate(dateValue) {
  if (!dateValue) return null;
  const str = String(dateValue);
  if (/^\d{4}$/.test(str)) return `${str}-01-01`;
  return str;
}

class BreachProvider {
  async checkEmail(email) {
    throw new Error('Method checkEmail() must be implemented by provider subclass');
  }
}

class XposedOrNotProvider extends BreachProvider {
  constructor() {
    super();
    this.client = axios.create({
      baseURL: XON_BASE,
      timeout: 10000,
      headers: {
        'user-agent': 'BreachAlert-Security-Engine/2.0'
      }
    });
  }

  // Returns array of normalized breach objects
  async checkEmail(email) {
    try {
      const res = await this.client.get('/breach-analytics', {
        params: { email }
      });

      const exposedBreaches = res.data?.ExposedBreaches?.breaches_details || [];

      return exposedBreaches.map(b => ({
        breachName: b.breach || 'Unknown Breach',
        domain: b.domain || '',
        breachDate: normalizeBreachDate(b.xposed_date || b.breachedDate),
        description: b.details || '',
        exposedData: b.xposed_data ? b.xposed_data.split(';') : [],
        source: 'XposedOrNot'
      }));
    } catch (err) {
      if (err.response && err.response.status === 404) return []; // Clean
      if (err.response && err.response.status === 429) {
        throw new Error('RATE_LIMITED');
      }
      throw err;
    }
  }
}

module.exports = {
  BreachProvider,
  XposedOrNotProvider
};
