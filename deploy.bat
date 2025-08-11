@echo off
echo 🚀 Deploying to Vercel...

REM Install Vercel CLI if not installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

REM Build the client
echo 🔨 Building React app...
cd client
call npm run build
cd ..

REM Deploy to Vercel
echo 🌐 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
pause
