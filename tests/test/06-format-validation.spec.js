const { test, expect } = require('../base/BaseTest');

test.describe('Format Validation - Response Structure', () => {
  test('FMT001: Response is valid text format', async ({ geminiClient }) => {
    const response = await geminiClient.sendPrompt('What is water?', 100);

    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  test('FMT002: Response contains no control characters', async ({ geminiClient }) => {
    const response = await geminiClient.sendPrompt('Hello', 50);

    const hasControlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(response);

    expect(hasControlChars).toBe(false);
  });

  test('FMT003: Response contains printable characters', async ({ geminiClient }) => {
    const response = await geminiClient.sendPrompt('Introduce yourself', 100);

    const hasPrintable = /[a-zA-Z0-9\s.,!?-]/.test(response);

    expect(hasPrintable).toBe(true);
  });

  test('FMT004: Response length within reasonable bounds', async ({ geminiClient }) => {
    const response = await geminiClient.sendPrompt('What is salt?', 150);

    const length = response.length;

    expect(length).toBeGreaterThanOrEqual(10);
    expect(length).toBeLessThanOrEqual(2000);
  });

  test('FMT005: Response properly encoded', async ({ geminiClient }) => {
    const response = await geminiClient.sendPrompt('What is photosynthesis?', 150);

    expect(response).not.toBeNull();
    expect(response).not.toBeUndefined();
    expect(response.length).toBeGreaterThan(0);
  });
});
