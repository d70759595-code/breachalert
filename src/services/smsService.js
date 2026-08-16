const axios = require('axios');

class SMSProvider {
  async sendSMS(phoneNumber, message) {
    throw new Error('sendSMS() must be implemented by subclass');
  }
}

class ConsoleSMSProvider extends SMSProvider {
  async sendSMS(phoneNumber, message) {
    console.log(`\n[SMS MOCK DISPATCH] To: ${phoneNumber}`);
    console.log(`Message: ${message}\n`);
    return { success: true, provider: 'ConsoleSMS', status: 'MOCK_DELIVERED' };
  }
}

class TwilioSMSProvider extends SMSProvider {
  constructor(accountSid, authToken, fromNumber) {
    super();
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumber = fromNumber || '+15005550006'; // Twilio Magic Test Number
  }

  async sendSMS(phoneNumber, message) {
    if (!this.accountSid || !this.authToken) {
      console.warn('[SMS] Twilio API keys omitted in environment; operating via provider adapter in mock mode.');
      return new ConsoleSMSProvider().sendSMS(phoneNumber, message);
    }

    try {
      // Real Twilio REST API HTTPS Request
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
      const authHeader = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');

      const params = new URLSearchParams();
      params.append('To', phoneNumber);
      params.append('From', this.fromNumber);
      params.append('Body', message);

      const response = await axios.post(twilioUrl, params.toString(), {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000
      });

      console.log(`[TWILIO REST API REAL DISPATCH SUCCESS] SID: ${response.data?.sid}`);
      return {
        success: true,
        provider: 'TwilioRestAPI',
        sid: response.data?.sid,
        status: response.data?.status
      };
    } catch (err) {
      console.error('[TWILIO REST API DISPATCH FAILED]', err.response?.data || err.message);
      return {
        success: false,
        provider: 'TwilioRestAPI',
        error: err.response?.data?.message || err.message
      };
    }
  }
}

function getSMSProvider() {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    return new TwilioSMSProvider(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_FROM_NUMBER);
  }
  return new ConsoleSMSProvider();
}

async function sendSMSNotification(phoneNumber, message) {
  if (!phoneNumber) return { success: false, error: 'No phone number provided' };
  const provider = getSMSProvider();
  return await provider.sendSMS(phoneNumber, message);
}

module.exports = {
  sendSMSNotification,
  SMSProvider,
  ConsoleSMSProvider,
  TwilioSMSProvider,
  getSMSProvider
};
