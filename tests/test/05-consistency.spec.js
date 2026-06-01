const { test, expect } = require('../base/BaseTest');

test.describe('Consistency - Deterministic Responses', () => {
  const testPrompts = [
    { id: 'CON001', prompt: 'What is the capital of France?' },
    { id: 'CON002', prompt: 'What is 10 + 5?' },
  ];

  testPrompts.forEach(testCase => {
    test(`${testCase.id}: Consistency across 3 runs`, async ({ geminiClient }) => {
      const responses = [];

      for (let i = 0; i < 3; i++) {
        const response = await geminiClient.sendPrompt(testCase.prompt, 100);
        responses.push(response);
      }

      responses.forEach(r => expect(r).toBeTruthy());

      const firstResponse = responses[0].toLowerCase();
      const allSimilar = responses.every(response => {
        const keywordMatch = firstResponse.split(' ').slice(0, 5).every(word =>
          response.toLowerCase().includes(word)
        );
        return keywordMatch;
      });

      expect(allSimilar, 'Responses should be similar').toBe(true);

      console.log(`✓ CON: ${testCase.id} - Consistent`);
    });
  });
});
