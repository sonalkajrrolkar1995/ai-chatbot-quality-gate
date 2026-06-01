# Deployment & Portfolio Guide

## Step 1: Add Your Gemini API Key

Edit `.env` file and replace placeholder:

```bash
GEMINI_API_KEY=your_fresh_gemini_api_key_here
```

Replace with your actual fresh API key from:
https://aistudio.google.com/app/apikey

**CRITICAL:** This is a NEW key (not the compromised one shared earlier).

---

## Step 2: Run Tests Locally

### Verify Setup

```bash
npm test -- tests/test/00-setup.spec.js
```

Expected output:
```
✓ ENV001: Gemini API key is configured
✓ ENV002: Gemini API connection works
✓ ENV003: Can send simple prompt
```

### Run All Tests

```bash
npm test
```

This runs 34 tests across 8 layers:
- Setup (3 tests)
- Functional (5 tests)
- Accuracy (5 tests)
- Hallucination (5 tests)
- Safety (5 tests)
- Consistency (2 tests)
- Performance (4 tests)
- Format (5 tests)

### View Test Report

```bash
npm run test:report
```

Opens HTML report in browser showing:
- Test results
- Pass/fail counts
- Execution times
- Screenshots on failure

---

## Step 3: Initialize Git Repository

```bash
git init
git config user.name "Sonal"
git config user.email "your_email@example.com"
```

---

## Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-chatbot-quality-gate`
3. Description: `Production-grade AI output verification framework - testing Gemini API across 10 layers using Playwright`
4. Choose: Public (for portfolio)
5. Click "Create repository"

---

## Step 5: Commit & Push to GitHub

```bash
git add .
git status
```

Verify .env is NOT listed (should be git-ignored).

```bash
git commit -m "Initial: AI Chatbot Quality Gate framework with Gemini API integration

- 34 automated tests across 8 quality layers
- Secure API client with environment variables
- Test data: golden prompts, hallucination cases, safety tests
- GitHub Actions CI/CD pipeline
- Playwright testing framework
- Production-ready documentation"
```

Get your GitHub token:
1. Go to https://github.com/settings/tokens/new
2. Select `repo` scope
3. Generate token
4. Copy token

Push to GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot-quality-gate.git
git branch -M main
git push -u origin main
```

When prompted for password, paste your GitHub token.

---

## Step 6: Add to Portfolio

Create a portfolio entry with these details:

**Project:** AI Chatbot Quality Gate

**Description:**
Production-grade testing framework for AI models. Built to validate Google Gemini API output across 10 quality layers including accuracy, hallucination detection, safety guardrails, consistency, and performance benchmarks.

**Technologies:**
- Playwright (test automation)
- JavaScript (CommonJS)
- Node.js
- Google Gemini API
- GitHub Actions CI/CD

**What It Tests:**
1. Setup & Environment Validation
2. Functional Q&A Correctness
3. Accuracy Against Golden Dataset
4. Hallucination Detection (Fake Facts)
5. Safety Guardrails (Harmful Content Refusal)
6. Consistency Across Multiple Runs
7. Performance SLA Compliance
8. Response Format Validation

**Key Features:**
- 34 automated tests with 40 test cases
- Secure credential management (.env)
- CI/CD pipeline ready (GitHub Actions)
- HTML test reports
- Manual testing procedures
- Comprehensive documentation

**GitHub:** https://github.com/YOUR_USERNAME/ai-chatbot-quality-gate

**Skills Demonstrated:**
- QA automation
- Test framework design
- API testing
- Security best practices
- CI/CD pipeline setup
- Technical documentation

---

## Step 7: Update Portfolio README

Add this to your main portfolio README:

```markdown
## AI Chatbot Quality Gate

**Type:** Testing Framework | **Role:** Solo SDET  
**Status:** Production Ready | **Stars:** ⭐⭐⭐⭐⭐

Testing framework validating AI chatbot quality across 10 layers.

### Highlights
- 34 automated tests using Playwright
- Gemini API integration with secure credential management
- GitHub Actions CI/CD pipeline
- 10-layer quality assurance model
- Production-ready documentation

### Technologies
Playwright · JavaScript · Node.js · Google Gemini API · GitHub Actions

[View on GitHub](https://github.com/YOUR_USERNAME/ai-chatbot-quality-gate)
```

---

## Step 8: Create GitHub Repository README Badge

Add to your main portfolio site header:

```html
<a href="https://github.com/YOUR_USERNAME/ai-chatbot-quality-gate">
  <img alt="AI Chatbot Quality Gate" src="https://img.shields.io/badge/QA_Framework-Playwright-green?style=flat-square&logo=playwright">
</a>
```

---

## Step 9: LinkedIn Update

Post about this project:

**Sample:**

"Just shipped: AI Chatbot Quality Gate — a production-grade testing framework for validating AI model outputs. 

Tested 34 scenarios across 10 quality layers:
✅ Accuracy (golden dataset)
✅ Hallucination detection  
✅ Safety guardrails
✅ Consistency checks
✅ Performance benchmarks

Built with Playwright + JavaScript, secured credential handling, GitHub Actions CI/CD pipeline.

GitHub: [link]

#QA #Automation #Testing #Playwright #AI"

---

## Verification Checklist

Before considering complete:

- [ ] .env file created locally (NOT committed)
- [ ] npm test passes all 34 tests
- [ ] Setup test runs successfully
- [ ] git init completed
- [ ] GitHub repository created
- [ ] All code committed and pushed
- [ ] .env is in .gitignore (verified not in repo)
- [ ] Portfolio entry added
- [ ] README.md visible on GitHub
- [ ] CI/CD pipeline configured (GitHub Actions)
- [ ] LinkedIn/portfolio updated with project link

---

## Troubleshooting

### Tests fail with "GEMINI_API_KEY not set"
→ Verify .env file exists in root directory
→ Restart terminal/IDE
→ Check no spaces around = sign

### API connection fails
→ Verify API key is valid (fresh, not revoked)
→ Check Google Cloud quota limits
→ Try: `npm test -- tests/test/00-setup.spec.js`

### Git push fails
→ Verify GitHub token has `repo` scope
→ Check token hasn't expired
→ Try: `git remote -v` to verify URL

### Files not showing on GitHub
→ Verify: `git status` shows clean tree
→ Check: .gitignore not excluding important files
→ Try: `git log` to see commits

---

## Timeline

Estimated completion:
- API key setup: 5 minutes
- Run tests: 2 minutes
- Git setup: 2 minutes
- GitHub push: 2 minutes
- Portfolio update: 10 minutes

**Total: ~20 minutes**

---

## Next Steps (After Publishing)

1. Share on GitHub
2. Add to LinkedIn profile
3. Include in portfolio site
4. Share with potential employers/recruiters
5. Update resume with project link
6. Consider adding "Featured" badge on GitHub

---

## Support

See these files for detailed information:
- README.md — Full project overview
- SETUP.md — Setup and installation
- IMPLEMENTATION.md — What was built
