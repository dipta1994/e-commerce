#!/bin/bash

echo "🚀 E-commerce Website Deployment Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Please add your GitHub remote origin:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo "   Then run this script again."
    exit 1
fi

echo "📦 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy to production - $(date)"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully"
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Go to https://render.com and sign up"
    echo "2. Create a new Web Service"
    echo "3. Connect your GitHub repository"
    echo "4. Set environment variables:"
    echo "   - NODE_ENV: production"
    echo "   - JWT_SECRET: [generate a random string]"
    echo "   - PORT: 10000"
    echo "5. Deploy!"
    echo ""
    echo "🌐 Your app will be available at: https://your-app-name.onrender.com"
else
    echo "❌ Failed to push to GitHub. Please check your credentials."
    exit 1
fi
