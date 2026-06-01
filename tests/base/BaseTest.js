require('dotenv').config();
const { test: base } = require('@playwright/test');
const GeminiPage = require('../../pages/GeminiPage');

const test = base.extend({
  geminiPage: async ({ page }, use) => {
    const gemini = new GeminiPage(page);
    await gemini.navigate();
    await use(gemini);
  },
});

module.exports = { test, expect: base.expect };
