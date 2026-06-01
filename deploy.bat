@echo off
REM AI Chatbot Quality Gate - Deployment Script for Windows

echo.
echo ============================================
echo 🚀 AI Chatbot Quality Gate - Deployment
echo ============================================
echo.

echo 📋 STEP 1: Add API Key
echo Edit .env file with your fresh Gemini API key:
echo   Replace: GEMINI_API_KEY=your_fresh_gemini_api_key_here
echo.
pause

echo ✅ STEP 2: Run Setup Test
call npm test -- tests/test/00-setup.spec.js
if errorlevel 1 (
  echo ❌ Setup test failed. Check .env file and API key.
  exit /b 1
)

echo.
echo ✅ STEP 3: Run All Tests (34 tests)
call npm test
if errorlevel 1 (
  echo ⚠️  Some tests failed. Review test report:
  call npm run test:report
  exit /b 1
)

echo.
echo ✅ STEP 4: Initialize Git
git init
git config user.name "Sonal"
git config user.email "your_email@example.com"

echo.
echo ✅ STEP 5: Verify .env is Git-Ignored
git check-ignore .env
if errorlevel 0 (
  echo ✓ .env is properly ignored
) else (
  echo ❌ .env is NOT ignored. Check .gitignore
  exit /b 1
)

echo.
echo ✅ STEP 6: Add Files to Git
git add .
git status

echo.
echo 📝 STEP 7: First Commit
git commit -m "Initial: AI Chatbot Quality Gate framework with Gemini API integration"

echo.
echo 🔗 STEP 8: Connect to GitHub
echo Get your GitHub token: https://github.com/settings/tokens/new
echo Then run these commands:
echo   git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot-quality-gate.git
echo   git branch -M main
echo   git push -u origin main
echo.

echo ✅ DEPLOYMENT COMPLETE!
echo.
echo 📚 Next Steps:
echo 1. View test report: npm run test:report
echo 2. Read: DEPLOY_TO_PORTFOLIO.md
echo 3. Add to portfolio
echo 4. Share on LinkedIn
echo.
pause
