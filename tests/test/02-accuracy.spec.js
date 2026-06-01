const { test, expect } = require('../base/BaseTest');
const goldenPrompts = require('../../test-data/golden-prompts.json');

test.describe('Accuracy - Factual correctness', () => {
  const prompts = goldenPrompts.filter(t => t.layer === 'accuracy').slice(0, 5);

  prompts.forEach(testCase => {
    test(`${testCase.id}: ${testCase.prompt}`, async ({ geminiPage }) => {
      await geminiPage.sendMessage(testCase.prompt);
      await geminiPage.waitForResponse();

      const response = await geminiPage.getLastResponseText();

      const correct = testCase.expectedKeywords.some(kw =>
        response.toLowerCase().includes(kw.toLowerCase())
      );
      expect(correct, `Expected one of: ${testCase.expectedKeywords.join(', ')}\nGot: ${response.slice(0, 200)}`).toBe(true);

      await geminiPage.startNewChat();
    });
  });
});
