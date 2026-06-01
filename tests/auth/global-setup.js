const { chromium } = require('@playwright/test');
const path = require('path');

module.exports = async function globalSetup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://accounts.google.com/ServiceLogin?continue=https://gemini.google.com/');

  await page.locator('#identifierId').fill(process.env.GOOGLE_EMAIL);
  await page.locator('#identifierNext').click();

  await page.locator('input[type="password"]').waitFor({ timeout: 10000 });
  await page.locator('input[type="password"]').fill(process.env.GOOGLE_PASSWORD);
  await page.locator('#passwordNext').click();

  await page.waitForURL('https://gemini.google.com/**', { timeout: 30000 });
  await page.waitForSelector('div[contenteditable="true"]', { timeout: 20000 });

  await context.storageState({ path: path.join(__dirname, '.auth.json') });
  await browser.close();
};
