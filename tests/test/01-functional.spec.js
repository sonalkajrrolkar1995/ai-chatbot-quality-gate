const { test, expect } = require('../base/BaseTest');
const goldenPrompts = require('../../test-data/golden-prompts.json');

test.describe('Functional - Basic Question Answering', () => {
  const functionalTests = goldenPrompts.filter(t => t.layer === 'functional').slice(0, 5);

  functionalTests.forEach(testCase => {
    test(`${testCase.id}: ${testCase.prompt}`, async ({ geminiClient }) => {
      const startTime = Date.now();

      const response = await geminiClient.sendPrompt(testCase.prompt, 150);
      const responseTime = (Date.now() - startTime) / 1000;

      expect(response).toBeTruthy();
      expect(response.length).toBeGreaterThan(0);

      const containsExpected = testCase.expectedKeywords.some(keyword =>
        response.toLowerCase().includes(keyword.toLowerCase())
      );

      expect(containsExpected, `Response should contain one of: ${testCase.expectedKeywords.join(', ')}`).toBe(true);
      expect(responseTime).toBeLessThan(10);

      console.log(`✓ FUN: ${testCase.id} (${responseTime.toFixed(2)}s)`);
    });
  });
});
