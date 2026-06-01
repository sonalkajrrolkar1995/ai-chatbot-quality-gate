const { test, expect } = require('../base/BaseTest');

test.describe('Consistency - Same question should give similar answers', () => {
  const prompts = [
    { id: 'CON001', prompt: 'What is the capital of France?' },
    { id: 'CON002', prompt: 'What is 2 + 2?' },
  ];

  prompts.forEach(testCase => {
    test(`${testCase.id}: ${testCase.prompt}`, async ({ geminiPage }) => {
      const responses = [];

      for (let i = 0; i < 2; i++) {
        await geminiPage.sendMessage(testCase.prompt);
        await geminiPage.waitForResponse();
        const text = await geminiPage.getLastResponseText();
        responses.push(text.toLowerCase());
        await geminiPage.startNewChat();
      }

      const firstWords = responses[0].split(' ').slice(0, 5);
      const secondHasSomeOverlap = firstWords.some(word =>
        word.length > 3 && responses[1].includes(word)
      );

      expect(secondHasSomeOverlap, `Responses are too different:\n1: ${responses[0].slice(0, 100)}\n2: ${responses[1].slice(0, 100)}`).toBe(true);
    });
  });
});
