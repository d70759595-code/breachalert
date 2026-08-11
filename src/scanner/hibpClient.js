const axios = require('axios');

const HIBP_BASE = 'https://haveibeenpwned.com/api/v3';

class HibpClient {
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: HIBP_BASE,
      headers: {
        'hibp-api-key': apiKey,
        'user-agent': 'BreachAlert-Intern-Project'
      }
    });
  }

  async checkEmail(email) {
    try {
      const res = await this.client.get(
        `/breachedaccount/${encodeURIComponent(email)}`,
        { params: { truncateResponse: false } }
      );
      return res.data;
    } catch (err) {
      if (err.response && err.response.status === 404) return [];
      if (err.response && err.response.status === 429) {
        throw new Error('RATE_LIMITED');
      }
      throw err;
    }
  }
}

module.exports = HibpClient;