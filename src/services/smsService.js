const axios = require('axios');

// E.164 Phone Validation Regex (International standard: + followed by 1 to 15 digits)
const E164_REGEX = /^\+[1-9]\d{1,14}$/;

function validateE164Phone(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') return false;
  return E164_REGEX.test(phoneNumber.trim());
}

class TwilioSMSProvider {
  constructor(accountSid, authToken, fromNumber) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumber = fromNumber || '+15005550006'; // Twilio Magic Test Number
  }

  async sendSMS(phoneNumber, message) {
    const isEnabled = process.env.TWILIO_ENABLED === 'true' || process.env.TWILIO_ENABLED === true;

    if (!isEnabled) {
      console.log('[SMS] SMS dispatch skipped: TWILIO_ENABLED is false');
      return { success: false, error: 'SMS notifications disabled (TWILIO_ENABLED is false)' };
    }

    if (!this.accountSid || !this.authToken) {
      console.error('[SMS CONFIG FAIL] TWILIO_ENABLED is true but TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is missing!');
      return {
        success: false,
        error: 'Twilio Configuration Error: TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required when TWILIO_ENABLED is true'
      };
    }

    if (!validateE164Phone(phoneNumber)) {
      console.warn(`[SMS VALIDATION FAIL] Phone number "${phoneNumber}" does not match E.164 standard (+15550199283)`);
      return { success: false, error: 'Invalid phone number format. Must be E.164 standard (e.g. +15550199283)' };
    }

    try {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
      const authHeader = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');

      const params = new URLSearchParams();
      params.append('To', phoneNumber.trim());
      params.append('From', this.fromNumber);
      params.append('Body', message);

      const response = await axios.post(twilioUrl, params.toString(), {
        headers: {
          'Authorization': `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000
      });

      console.log(`[TWILIO REST API SENT] SID: ${response.data?.sid} | Status: ${response.data?.status}`);
      return {
        success: true,
        provider: 'TwilioRestAPI',
        sid: response.data?.sid,
        status: response.data?.status
      };
    } catch (err) {
      const statusCode = err.response?.status;
      const twilioMsg = err.response?.data?.message || err.message;

      console.error(`[TWILIO REST API FAILED] HTTP ${statusCode || 'NET_ERR'}: ${twilioMsg}`);

      return {
        success: false,
        provider: 'TwilioRestAPI',
        statusCode: statusCode || 500,
        error: twilioMsg
      };
    }
  }
}

async function sendSMSNotification(phoneNumber, message) {
  if (!phoneNumber) return { success: false, error: 'No phone number provided' };

  const provider = new TwilioSMSProvider(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_FROM_NUMBER
  );

  return await provider.sendSMS(phoneNumber, message);
}

module.exports = {
  sendSMSNotification,
  TwilioSMSProvider,
  validateE164Phone
};
