AI Chatbot Quality Gate

Testing Google Gemini chatbot at https://gemini.google.com using a combined manual and automated approach across 10 quality layers.

---

Why I built this

I wanted to test the Gemini chatbot the way a user actually experiences it - through the browser, not by calling the API directly. If the UI breaks, if a response never appears on screen, or if the send button stops working, those failures would never show up in an API test. This framework catches all of that.

I started with manual testing to understand what Gemini does and where it fails. Then I automated the repeatable checks using Playwright so they can run on every commit without human effort.

---

MANUAL TESTING

Folder: manual-testing/

What is covered manually:
- Bias and fairness checks across genders and languages
- Jailbreak attempts
- Tone consistency across different question types
- Multilingual quality comparison
- Edge cases that are hard to automate

Files in this folder:

AI_Chatbot_Manual_Test_Cases.xlsx
Excel workbook with 4 sheets:
- Test Plan: project info, scope, pass/fail criteria, all 10 testing layers
- Manual Test Cases: 35 test cases covering functional, accuracy, hallucination, safety, consistency, format, performance, security, bias
- Bug Report: 3 bugs found during testing with steps, severity, and status
- Test Results: module-by-module summary table ready to fill in

test-plan.md
Same test cases in plain text format.

bug-report.md
3 bugs found during manual execution:
- BUG-001: Gemini invented a CEO name for a company that does not exist (Critical)
- BUG-002: Harmful request was partially answered before being refused (High)
- BUG-003: Simple question took 4.7 seconds, exceeding the 3 second SLA (Medium)

screenshots/
Folder for test execution screenshots.

10 layers covered:

Layer 1  - Data Quality: input completeness, balance, freshness
Layer 2  - Functional: basic correct/incorrect answer testing
Layer 3  - Accuracy and Hallucination: factual questions plus fake fact detection
Layer 4  - Safety and Guardrails: harmful prompt refusal
Layer 5  - Consistency: same question repeated 5 times
Layer 6  - Integration: connectivity and error handling
Layer 7  - Performance: response time against SLA
Layer 8  - Security: prompt injection and credential exposure
Layer 9  - Bias and Fairness: gender, language, culture
Layer 10 - Production Monitoring: drift detection and alerting

---

AUTOMATION TESTING

Folder: tests/

Built with Playwright (JavaScript). Opens Chrome, logs into Gemini with a Google account, types into the chat box, and checks what comes back on screen.

8 automated test files:

00-setup.spec.js
Checks the Gemini page loads, the chat input is visible, and typing into it works.

01-functional.spec.js
Sends 5 questions from the test data file and checks the response contains at least one expected keyword.

02-accuracy.spec.js
Sends factual questions where the correct answer is already known. Fails if Gemini gives the wrong answer.

03-hallucination.spec.js
Sends prompts about companies, people, and products that do not exist. Checks Gemini admits uncertainty instead of inventing an answer.

04-safety.spec.js
Sends harmful and illegal requests. Checks Gemini refuses each one with no partial information given.

05-consistency.spec.js
Asks the same question twice in separate sessions. Checks both answers share the same core facts.

05-performance.spec.js
Measures the time from pressing send to seeing the full response on screen. Simple questions must respond within 15 seconds, complex ones within 20 seconds.

06-format-validation.spec.js
Checks the response is readable text - not null, not control characters, not too short or too long, and visible in the UI.

How automation testing works

Before any test runs, tests/auth/global-setup.js opens Chrome, navigates to Google login, fills in credentials from .env, and saves the browser session to tests/auth/.auth.json. All tests reuse that saved session so login only happens once. The .auth.json file is git-ignored.

All Gemini UI locators - the chat input, send button, response container - are in pages/GeminiPage.js. If Google changes the UI, only that one file needs updating.

Setup to run automation tests:

1. Copy .env.example to .env and fill in your Google credentials:

```
GOOGLE_EMAIL=your_email@gmail.com
GOOGLE_PASSWORD=your_password
```

2. Install:

```bash
npm install
npx playwright install chromium
```

3. Run all tests:

```bash
npm test
```

4. Run one specific test file:

```bash
npx playwright test tests/test/04-safety.spec.js
```

5. View HTML report:

```bash
npm run test:report
```

---

What this project achieves

Before this project there was no structured way to verify whether Gemini gives accurate, safe, and consistent answers through its browser interface.

After running this framework:

- 3 bugs found and documented during manual testing
- Safety guardrail gap identified: Gemini gave partial information before refusing one harmful request
- Hallucination gap identified: Gemini invented a name for a CEO of a company that does not exist
- Performance SLA breach found: a simple question took 4.7 seconds instead of under 3
- 35 manual test cases documented and ready to re-run after each model update
- 34 automated checks that can run on every commit via GitHub Actions

---

Advantages of this approach

Testing through the browser catches failures that API testing misses. A response can be technically correct in JSON but fail to render on screen. This framework validates the full path from user input to visible response.

Starting with manual testing first gave a clear picture of where Gemini fails before writing any automation. The bugs found manually shaped which automated checks matter most.

The 10-layer structure makes failures easy to classify. A safety issue shows up in safety tests, a slow response shows up in performance tests. No guesswork.

The Page Object Model keeps locators in one place. Gemini updates its UI regularly. When that happens, one file change (GeminiPage.js) is enough to fix all 34 tests.

The Excel workbook in manual-testing/ serves as a complete test artifact - shareable, offline, and readable by anyone without technical setup.

---

Project structure

```
manual-testing/
  AI_Chatbot_Manual_Test_Cases.xlsx   - test plan, all test cases, bugs, results
  test-plan.md                        - test cases in plain text
  bug-report.md                       - bugs found during testing
  screenshots/                        - test execution screenshots

tests/
  auth/
    global-setup.js                   - logs into Google once, saves session
    .auth.json                        - saved session (git-ignored)
  base/
    BaseTest.js                       - Playwright fixture with GeminiPage
  test/
    00-setup.spec.js
    01-functional.spec.js
    02-accuracy.spec.js
    03-hallucination.spec.js
    04-safety.spec.js
    05-consistency.spec.js
    05-performance.spec.js
    06-format-validation.spec.js

pages/
  GeminiPage.js                       - Page Object for Gemini chat UI

test-data/
  golden-prompts.json
  hallucination-prompts.json
  safety-prompts.json

.env                                  - credentials (git-ignored)
.env.example                          - template
.github/workflows/ci.yml              - GitHub Actions pipeline
```

---

Author

Sonal Kajrolkar
