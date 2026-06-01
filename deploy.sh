#!/bin/bash

echo "🚀 AI Chatbot Quality Gate - Deployment Script"
echo "=============================================="
echo ""

echo "📋 STEP 1: Add API Key"
echo "Edit .env file with your fresh Gemini API key:"
echo "  nano .env"
echo "  (Replace: GEMINI_API_KEY=your_fresh_gemini_api_key_here)"
echo ""
read -p "Press Enter after adding API key... "

echo "✅ STEP 2: Run Setup Test"
npm test -- tests/test/00-setup.spec.js
if [ $? -ne 0 ]; then
  echo "❌ Setup test failed. Check .env file and API key."
  exit 1
fi

echo ""
echo "✅ STEP 3: Run All Tests"
npm test
if [ $? -ne 0 ]; then
  echo "⚠️  Some tests failed. Review test report:"
  npm run test:report
  exit 1
fi

echo ""
echo "✅ STEP 4: Initialize Git"
git init
git config user.name "Sonal"
git config user.email "your_email@example.com"

echo ""
echo "✅ STEP 5: Verify .env is Git-Ignored"
if git check-ignore .env > /dev/null; then
  echo "✓ .env is properly ignored"
else
  echo "❌ .env is NOT ignored. Check .gitignore"
  exit 1
fi

echo ""
echo "✅ STEP 6: Add Files to Git"
git add .
git status

echo ""
echo "📝 STEP 7: First Commit"
git commit -m "Initial: AI Chatbot Quality Gate framework with Gemini API integration

- 34 automated tests across 8 quality layers
- Secure API client with environment variables
- Test data: golden prompts, hallucination cases, safety tests
- GitHub Actions CI/CD pipeline
- Playwright testing framework
- Production-ready documentation"

echo ""
echo "🔗 STEP 8: Connect to GitHub"
echo "Get your GitHub token: https://github.com/settings/tokens/new"
echo "Then run:"
echo "  git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot-quality-gate.git"
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""

echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📚 Next Steps:"
echo "1. View test report: npm run test:report"
echo "2. Read deployment guide: DEPLOY_TO_PORTFOLIO.md"
echo "3. Add to portfolio on sonalkajrrolkar1995.github.io"
echo "4. Share on LinkedIn"
