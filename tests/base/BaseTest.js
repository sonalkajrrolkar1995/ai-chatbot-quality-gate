require('dotenv').config();
const { test: base } = require('@playwright/test');

const test = base.extend({
  geminiClient: async ({}, use) => {
    const GeminiClient = require('../../utils/GeminiClient');
    const client = new GeminiClient();
    await use(client);
  },
});

module.exports = { test, expect: base.expect };
