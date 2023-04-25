const { Client } = require('../lib');

describe("Client", () => {
  describe("generatePaymentLink", () => {
    let client;

    beforeEach(() => {
      const client = new Client({ 
        privateKey: 'RtU8r9NgNlgbQval3VlKXKmC7bImTKImWpF07aywR6ScPxyBFx',
        isTest: 1,
        currency: 'MZN',
        returnURL: 'http://example.com/return',
        callbackUrl: 'http://example.com/callback',
      });
    });

    test('should return the checkout url', async () => {
      client = new Client({
        privateKey: "RtU8r9NgNlgbQval3VlKXKmC7bImTKImWpF07aywR6ScPxyBFx",
        isTest: 1,
        currency: 'MZN',
        amout: 100,
        callbackUrl: 'http://localhost:3000/callback',
        returnUrl: 'http://localhost:3000/return',
      });
      
      const result = await client.generatePaymentLink(100, 'Payment for goods');
        
      expect(result).toEqual({
        checkout_url: expect.stringContaining('https://paysuite.co.mz/customer/checkout/'),
      });
    });

    test('throws an error when API request is invalid', async () => {
      client = new Client({
        privateKey: 'RtU8r9NgNlgbQval3VlKXKmC7bImTKImWpF07aywR6ScPxyBF0',
        isTest: 1,
        currency: 'MZN',
        amount: 100,
        callbackUrl: 'http://localhost:3000/callback',
        returnUrl: 'http://localhost:3000/return',
      });
    
      try {
        await client.generatePaymentLink(100, 'Payment for goods');
      } catch (err) {
        expect(err.message).toBe('Invalid request');
      }
    });

    test('throws an error when privateKey is missing', () => {
      expect(() => {
        client = new Client({
          isTest: 1,
          currency: 'MZN',
          amout: 100,
          callbackUrl: 'http://localhost:3000/callback',
          returnUrl: 'http://localhost:3000/return',
        });
      }).toThrow('privateKey is required');
    });

    test('throws an error when privateKey is null', () => {
      expect(() => {
        client = new Client({
          privateKey: null,
          isTest: 1,
          amount: 100,
          currency: 'MZN',
          callbackUrl: 'http://localhost:3000/callback',
          returnUrl: 'http://localhost:3000/return',
        });
        client.generatePaymentLink(100, 'Test purpose');
      }).toThrow('privateKey is required');
    });

    test('throws an error when the length of privateKey is different from 50', () => {
      expect(() => {
        client = new Client({
          privateKey: "RtU8r9NgNlgbQval3VlKXKmC7bImTKImWpF07aywR6ScPxyBFx0",
          isTest: 1,
          amount: 100,
          currency: 'MZN',
          callbackUrl: 'http://localhost:3000/callback',
          returnUrl: 'http://localhost:3000/return',
        });
        client.generatePaymentLink(100, 'Test purpose');
      }).toThrow('privateKey must be 50 characters');
    });
  });
});
