@echo off
echo 🚀 E-commerce Website Deployment Script
echo ======================================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit"
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Please add your GitHub remote origin:
    echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    echo    Then run this script again.
    pause
    exit /b 1
)

echo 📦 Building the application...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed. Please check for errors.
    pause
    exit /b 1
) else (
    echo ✅ Build successful
)

echo 📤 Pushing to GitHub...
git add .
git commit -m "Deploy to production - %date% %time%"
git push origin main

if errorlevel 1 (
    echo ❌ Failed to push to GitHub. Please check your credentials.
    pause
    exit /b 1
) else (
    echo ✅ Code pushed to GitHub successfully
    echo.
    echo 🎯 Next Steps:
    echo 1. Go to https://render.com and sign up
    echo 2. Create a new Web Service
    echo 3. Connect your GitHub repository
    echo 4. Set environment variables:
    echo    - NODE_ENV: production
    echo    - JWT_SECRET: [generate a random string]
    echo    - PORT: 10000
    echo 5. Deploy!
    echo.
    echo 🌐 Your app will be available at: https://your-app-name.onrender.com
)

pause
