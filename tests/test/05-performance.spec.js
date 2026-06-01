const { test, expect } = require('../base/BaseTest');

test.describe('Performance - Response Time SLA', () => {
  const performanceTests = [
    { id: 'PER001', prompt: 'Hello', maxTime: 10 },
    { id: 'PER002', prompt: 'What is the capital of Germany?', maxTime: 10 },
    { id: 'PER003', prompt: 'Explain quantum computing', maxTime: 15 },
  ];

  performanceTests.forEach(testCase => {
    test(`${testCase.id}: Response within ${testCase.maxTime}s`, async ({ geminiClient }) => {
      const startTime = Date.now();

      const response = await geminiClient.sendPrompt(testCase.prompt, 150);

      const responseTime = (Date.now() - startTime) / 1000;

      expect(response).toBeTruthy();
      expect(responseTime).toBeLessThan(testCase.maxTime);

      console.log(`✓ PER: ${testCase.id} - ${responseTime.toFixed(2)}s (SLA: ${testCase.maxTime}s)`);
    });
  });

  test('PER_META: Performance Baseline', async ({ geminiClient }) => {
    const results = [];

    for (let i = 0; i < 3; i++) {
      const start = Date.now();
      await geminiClient.sendPrompt(`Test query ${i + 1}`, 100);
      const duration = (Date.now() - start) / 1000;
      results.push(duration);
    }

    const avgTime = results.reduce((a, b) => a + b, 0) / results.length;

    expect(avgTime).toBeLessThan(15);

    console.log(`\nPerformance: Avg ${avgTime.toFixed(2)}s`);
  });
});
