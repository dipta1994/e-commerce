@echo off
echo 🚀 Deploying E-commerce App to Production...
echo.

echo 📦 Building client...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)
cd ..

echo ✅ Build completed successfully!
echo.
echo 📋 Next steps:
echo 1. Deploy backend to Render: https://render.com
echo 2. Deploy frontend to Netlify: https://netlify.com
echo 3. Update netlify.toml with your backend URL
echo 4. Set environment variables in your hosting platform
echo.
echo 📖 See PRODUCTION_FIX_GUIDE.md for detailed instructions
echo.
pause
