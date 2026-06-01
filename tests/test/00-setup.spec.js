const { test, expect } = require('../base/BaseTest');

test.describe('Setup - Environment Verification', () => {
  test('ENV001: Gemini API key is configured', async ({ geminiClient }) => {
    expect(process.env.GEMINI_API_KEY).toBeTruthy();
  });

  test('ENV002: Gemini API connection works', async ({ geminiClient }) => {
    const isConnected = await geminiClient.testConnection();
    expect(isConnected).toBe(true);
  });

  test('ENV003: Can send simple prompt', async ({ geminiClient }) => {
    const response = await geminiClient.sendPrompt('Say hello', 50);
    expect(response).toBeTruthy();
    expect(response.length).toBeGreaterThan(0);
  });
});
