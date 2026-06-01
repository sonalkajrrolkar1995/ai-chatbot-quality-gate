const { test, expect } = require('../base/BaseTest');
const goldenPrompts = require('../../test-data/golden-prompts.json');

test.describe('Accuracy - Golden Dataset Validation', () => {
  const accuracyTests = goldenPrompts.filter(t => t.layer === 'accuracy').slice(0, 5);

  accuracyTests.forEach(testCase => {
    test(`${testCase.id}: ${testCase.prompt}`, async ({ geminiClient }) => {
      const response = await geminiClient.sendPrompt(testCase.prompt, 150);

      expect(response).toBeTruthy();

      const matchesExpected = testCase.expectedKeywords.some(keyword =>
        response.toLowerCase().includes(keyword.toLowerCase())
      );

      expect(matchesExpected, `Response should contain: ${testCase.expectedKeywords.join(', ')}`).toBe(true);

      console.log(`✓ ACC: ${testCase.id}`);
    });
  });
});
