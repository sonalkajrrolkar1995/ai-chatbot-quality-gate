AI Chatbot Quality Gate

Production-grade AI output verification framework for comprehensive chatbot quality testing across 10 layers using Playwright and Gemini API.

What This Tests

| Layer | Coverage | Tests |
|-------|----------|-------|
| Setup | Environment validation | 3 tests |
| Functional | Basic Q&A correctness | 5 tests |
| Accuracy | Golden dataset validation | 5 tests |
| Hallucination | Fake fact detection | 5 tests |
| Safety | Harmful content refusal | 5 tests |
| Consistency | Deterministic responses | 2 tests |
| Format | Response structure | 5 tests |
| Performance | Response time SLA | 4 tests |

Total: 34 automated tests

Prerequisites

- Node.js 18+
- Playwright 1.40+
- Google Gemini API key
- .env file with credentials (never commit)

Quick Setup

1. Install Dependencies

```bash
npm install
```

2. Create .env File

Copy `.env.example` to `.env` and add your Gemini API key:

```bash
cp .env.example .env
```

Edit `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

3. Verify Setup

```bash
npm test -- tests/test/00-setup.spec.js
```

4. Run All Tests

```bash
npm test
```

Project Structure

```
tests/
  base/
    BaseTest.js
  test/
    00-setup.spec.js
    01-functional.spec.js
    02-accuracy.spec.js
    03-hallucination.spec.js
    04-safety.spec.js
    05-consistency.spec.js
    05-performance.spec.js
    06-format-validation.spec.js
utils/
  GeminiClient.js
  config.js
pages/
  ChatbotPage.js
test-data/
  golden-prompts.json
  hallucination-prompts.json
  safety-prompts.json
manual-testing/
  test-plan.md
.github/workflows/
  ci.yml
.env.example
.gitignore
playwright.config.js
package.json
README.md
```

Test Commands

Run all tests:
```bash
npm test
```

Run specific layer:
```bash
npx playwright test tests/test/01-functional.spec.js
```

Run with headed browser:
```bash
npm run test:headed
```

Run in debug mode:
```bash
npm run test:debug
```

View HTML report:
```bash
npm run test:report
```

Test Data

Golden Prompts — test-data/golden-prompts.json
20 factual Q&A pairs for accuracy validation.

Hallucination Cases — test-data/hallucination-prompts.json
10 prompts to detect invented facts.

Safety Cases — test-data/safety-prompts.json
10 harmful requests to test refusal.

Gemini API Integration

Uses Google Gemini 2.0 Flash model via REST API.
Credentials are required in .env file — never commit to git.
Utility: utils/GeminiClient.js

Performance Thresholds

| Metric | Acceptable | Fail |
|--------|-----------|------|
| Response time | < 15s | > 20s |
| Availability | 99%+ | < 95% |

CI/CD Pipeline

GitHub Actions workflow in .github/workflows/ci.yml

Runs on push to main/develop, pull requests, and daily schedule.
Artifacts: HTML report, JSON results.

Security

- API keys stored in .env (git-ignored)
- No credentials in code
- Use process.env.GEMINI_API_KEY
- Rotate keys if exposed

Manual Testing

See manual-testing/test-plan.md for exploratory testing, bias detection, and security procedures.

Debugging

1. Check .env is configured
2. Run setup test: npm test -- tests/test/00-setup.spec.js
3. Review error in test output
4. Check API key validity
5. Review trace files in test-results/

Standards

- Pattern: Page Object Model + API Client
- Language: JavaScript (CommonJS)
- Test Runner: Playwright
- API: Google Gemini 2.0 Flash

Author

Sonal Kajrolkar
Quality Automation Engineer
