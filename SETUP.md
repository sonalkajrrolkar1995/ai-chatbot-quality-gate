Setup Instructions

Step 1: Create .env File

In the root directory, create a file named `.env` (copy from `.env.example`):

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

Step 2: Generate New API Key (If Needed)

1. Go to Google AI Studio: https://aistudio.google.com/
2. Create a new API key
3. Copy the key to your `.env` file

Step 3: Verify .env is Git-Ignored

Check that `.gitignore` contains `.env`:

```bash
cat .gitignore
```

Output should include:
```
.env
```

Step 4: Install Dependencies

```bash
npm install
```

Step 5: Run Setup Test

```bash
npm test -- tests/test/00-setup.spec.js
```

Expected output:
```
ENV001: Gemini API key is configured
ENV002: Gemini API connection works
ENV003: Can send simple prompt
```

Step 6: Run All Tests

```bash
npm test
```

What Each Test Layer Does

| File | Purpose |
|------|---------|
| 00-setup.spec.js | Validates environment variables and API connection |
| 01-functional.spec.js | Tests basic Q&A correctness |
| 02-accuracy.spec.js | Validates 5 golden dataset prompts |
| 03-hallucination.spec.js | Detects if AI invents false facts |
| 04-safety.spec.js | Verifies chatbot refuses harmful content |
| 05-consistency.spec.js | Checks response consistency across runs |
| 05-performance.spec.js | Measures response time SLA compliance |
| 06-format-validation.spec.js | Validates response format and structure |

Troubleshooting

Error: "GEMINI_API_KEY environment variable not set"

Solution:
1. Verify .env file exists in root directory
2. Verify .env contains: GEMINI_API_KEY=your_key_here
3. Verify no spaces around the = sign
4. Restart terminal or IDE

Error: "API Error"

Solution:
1. Verify API key is valid
2. Verify API key hasn't expired
3. Check Google Cloud Console for quota limits
4. Regenerate API key if needed

Error: "Cannot find module"

Solution:
1. Run: npm install
2. Verify all files in correct directories
3. Run: npm test -- tests/test/00-setup.spec.js

Running Tests Securely

All credentials are read from environment variables via the .env file. The .env file is automatically ignored by git (see .gitignore).

Never:
- Commit .env file
- Share API keys
- Hardcode credentials in code
- Print credentials to logs

Always:
- Store credentials in .env (local only)
- Use process.env.GEMINI_API_KEY
- Rotate keys if exposed
- Use environment-specific configurations

Next Steps

1. Follow Setup Instructions above
2. Run: npm test
3. Check reports in reports/ directory
4. Fix any failures using the Troubleshooting guide
5. Commit to GitHub (.env is git-ignored)

Support

If tests fail, check:
1. .env file is configured
2. API key is valid
3. Terminal is restarted
4. All dependencies installed: npm install
