const { test, expect } = require('../base/BaseTest');

test.describe('Performance - Response time in the UI', () => {
  const cases = [
    { id: 'PER001', prompt: 'Hi', maxSeconds: 15 },
    { id: 'PER002', prompt: 'What is the capital of Japan?', maxSeconds: 15 },
    { id: 'PER003', prompt: 'Explain how photosynthesis works', maxSeconds: 20 },
  ];

  cases.forEach(testCase => {
    test(`${testCase.id}: Response within ${testCase.maxSeconds}s - "${testCase.prompt}"`, async ({ geminiPage }) => {
      const start = Date.now();

      await geminiPage.sendMessage(testCase.prompt);
      await geminiPage.waitForResponse();

      const elapsed = (Date.now() - start) / 1000;

      console.log(`PER: ${testCase.id} - ${elapsed.toFixed(2)}s`);
      expect(elapsed).toBeLessThan(testCase.maxSeconds);

      await geminiPage.startNewChat();
    });
  });

  test('PER_META: Average response time across 2 simple prompts', async ({ geminiPage }) => {
    const times = [];
    const prompts = ['What is 5 + 3?', 'Name a planet'];

    for (const prompt of prompts) {
      const start = Date.now();
      await geminiPage.sendMessage(prompt);
      await geminiPage.waitForResponse();
      times.push((Date.now() - start) / 1000);
      await geminiPage.startNewChat();
    }

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    console.log(`Average response time: ${avg.toFixed(2)}s`);
    expect(avg).toBeLessThan(20);
  });
});
