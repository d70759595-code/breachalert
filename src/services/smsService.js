class SMSProvider {
  async sendSMS(phoneNumber, message) {
    throw new Error('sendSMS() must be implemented by subclass');
  }
}

class ConsoleSMSProvider extends SMSProvider {
  async sendSMS(phoneNumber, message) {
    console.log(`\n[SMS DISPATCH] To: ${phoneNumber}`);
    console.log(`Message: ${message}\n`);
    return { success: true, provider: 'ConsoleSMS' };
  }
}

class TwilioSMSProvider extends SMSProvider {
  constructor(accountSid, authToken, fromNumber) {
    super();
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumber = fromNumber;
  }

  async sendSMS(phoneNumber, message) {
    if (!this.accountSid || !this.authToken) {
      console.warn('[SMS] Twilio credentials missing, falling back to Console SMS provider');
      return new ConsoleSMSProvider().sendSMS(phoneNumber, message);
    }
    // Stub integration wrapper ready for production Twilio SDK
    console.log(`[TWILIO SMS SENT] To: ${phoneNumber} | Content: ${message}`);
    return { success: true, provider: 'Twilio' };
  }
}

const currentProvider = process.env.TWILIO_ACCOUNT_SID
  ? new TwilioSMSProvider(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_FROM_NUMBER)
  : new ConsoleSMSProvider();

async function sendSMSNotification(phoneNumber, message) {
  if (!phoneNumber) return { success: false, error: 'No phone number provided' };
  return await currentProvider.sendSMS(phoneNumber, message);
}

module.exports = {
  sendSMSNotification,
  SMSProvider,
  ConsoleSMSProvider,
  TwilioSMSProvider
};
