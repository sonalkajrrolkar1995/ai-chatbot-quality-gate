const { test, expect } = require('../base/BaseTest');
const goldenPrompts = require('../../test-data/golden-prompts.json');

test.describe('Functional - Basic chat works', () => {
  const prompts = goldenPrompts.filter(t => t.layer === 'functional').slice(0, 5);

  prompts.forEach(testCase => {
    test(`${testCase.id}: ${testCase.prompt}`, async ({ geminiPage }) => {
      await geminiPage.sendMessage(testCase.prompt);
      await geminiPage.waitForResponse();

      const response = await geminiPage.getLastResponseText();

      expect(response.length).toBeGreaterThan(10);

      const hasKeyword = testCase.expectedKeywords.some(kw =>
        response.toLowerCase().includes(kw.toLowerCase())
      );
      expect(hasKeyword, `Response should contain one of: ${testCase.expectedKeywords.join(', ')}`).toBe(true);

      await geminiPage.startNewChat();
    });
  });
});
