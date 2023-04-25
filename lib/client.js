const api = require("./utils/axios.js")

class Client {
  constructor({ privateKey, isTest, returnUrl, callbackUrl, currency }) {
    if (!privateKey) {
      throw new Error('privateKey is required');
    }

    if (privateKey && privateKey.length != 50) {
      throw new Error('privateKey must be 50 characters');
    }

    if (isTest != 0 && isTest != 1) {
      throw new Error('isTest must be 1 (yes) or 0 (no)');
    }

    if (!currency) {
      throw new Error('currency is required');
    }

    this.privateKey = privateKey;
    this.isTest = isTest;
    this.currency = currency;
    this.returnUrl = returnUrl || "";
    this.callbackUrl = callbackUrl || "";
  }


  generatePaymentLink(amount, purpose) {
    if (typeof amount != "number") {
      throw new Error('amount must be a number');
    }

    if (!purpose) {
      throw new Error('purpose is required');
    }
      
    return api.post("", {
        private_key: this.privateKey,
        currency: this.currency,
        is_test: this.isTest,
        amount,
        purpose,
        callback_url: this.callbackUrl,
        return_url: this.return_url
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(res => {
        if (res.status == 200) {
          return { checkout_url: res.data.checkout_url };
        } else {
          throw new Error('Invalid request');
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          throw new Error('Invalid request');
        } else {
          throw new Error('Unexpected error occurred');
        }
      });
  }
}

module.exports = Client;
