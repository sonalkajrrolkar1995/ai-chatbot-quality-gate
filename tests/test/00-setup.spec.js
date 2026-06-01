const { test, expect } = require('../base/BaseTest');

test.describe('Setup - Gemini UI loads correctly', () => {
  test('ENV001: Gemini page opens and chat input is visible', async ({ geminiPage, page }) => {
    await expect(page).toHaveURL(/gemini\.google\.com/);
    await expect(geminiPage.chatInput).toBeVisible();
  });

  test('ENV002: Send button is present', async ({ geminiPage }) => {
    await geminiPage.chatInput.fill('Hello');
    await expect(geminiPage.sendButton).toBeVisible();
  });

  test('ENV003: Can type into the chat input', async ({ geminiPage }) => {
    await geminiPage.chatInput.fill('Test input');
    const value = await geminiPage.chatInput.innerText();
    expect(value).toContain('Test input');
  });
});
