const axios = require('axios');

// Uses XposedOrNot (spec allows HIBP alternatives). See docs/API_INTEGRATION.md to switch to HIBP.
const XON_BASE = 'https://api.xposedornot.com/v1';

function normalizeBreachDate(dateValue) {
  if (!dateValue) return null;
  const str = String(dateValue);
  if (/^\d{4}$/.test(str)) return `${str}-01-01`; // bare year -> Jan 1 of that year
  return str;
}

class XposedOrNotClient {
  constructor() {
    this.client = axios.create({
      baseURL: XON_BASE,
      headers: {
        'user-agent': 'BreachAlert-Intern-Project'
      }
    });
  }

  // Returns array of breach objects in our normalized shape: { Name, BreachDate, DataClasses }
  async checkEmail(email) {
    try {
      const res = await this.client.get('/breach-analytics', {
        params: { email }
      });

      const exposedBreaches = res.data?.ExposedBreaches?.breaches_details || [];

      return exposedBreaches.map(b => ({
        Name: b.breach,
        BreachDate: normalizeBreachDate(b.xposed_date || b.breachedDate),
        DataClasses: b.xposed_data ? b.xposed_data.split(';') : []
      }));
    } catch (err) {
      if (err.response && err.response.status === 404) return []; // no breaches — good news
      if (err.response && err.response.status === 429) {
        throw new Error('RATE_LIMITED'); // let caller decide retry/backoff
      }
      throw err;
    }
  }
}

module.exports = XposedOrNotClient;