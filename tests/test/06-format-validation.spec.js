const { test, expect } = require('../base/BaseTest');

test.describe('Format - Response text is valid', () => {
  test('FMT001: Response is non-empty text', async ({ geminiPage }) => {
    await geminiPage.sendMessage('What is water?');
    await geminiPage.waitForResponse();
    const response = await geminiPage.getLastResponseText();
    expect(typeof response).toBe('string');
    expect(response.trim().length).toBeGreaterThan(10);
    await geminiPage.startNewChat();
  });

  test('FMT002: Response contains no strange control characters', async ({ geminiPage }) => {
    await geminiPage.sendMessage('Say hello');
    await geminiPage.waitForResponse();
    const response = await geminiPage.getLastResponseText();
    const hasControlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(response);
    expect(hasControlChars).toBe(false);
    await geminiPage.startNewChat();
  });

  test('FMT003: Response has readable characters', async ({ geminiPage }) => {
    await geminiPage.sendMessage('Introduce yourself briefly');
    await geminiPage.waitForResponse();
    const response = await geminiPage.getLastResponseText();
    const hasReadable = /[a-zA-Z]{3,}/.test(response);
    expect(hasReadable, 'Response should contain readable words').toBe(true);
    await geminiPage.startNewChat();
  });

  test('FMT004: Response length is reasonable', async ({ geminiPage }) => {
    await geminiPage.sendMessage('What is salt?');
    await geminiPage.waitForResponse();
    const response = await geminiPage.getLastResponseText();
    expect(response.length).toBeGreaterThan(10);
    expect(response.length).toBeLessThan(5000);
    await geminiPage.startNewChat();
  });

  test('FMT005: Response is visible in the UI', async ({ geminiPage, page }) => {
    await geminiPage.sendMessage('What is the sun?');
    await geminiPage.waitForResponse();
    const lastResponse = page.locator('model-response .markdown').last();
    await expect(lastResponse).toBeVisible();
    await geminiPage.startNewChat();
  });
});
