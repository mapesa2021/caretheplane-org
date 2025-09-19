#!/bin/bash

echo "🚀 CareThePlanet - Netlify Deployment Script"
echo "=============================================="

# Check if git is configured
if ! git config --get user.name > /dev/null 2>&1; then
    echo "❌ Git user not configured. Please run:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your.email@example.com'"
    exit 1
fi

# Check if remote origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/caretheplanet-website.git"
    exit 1
fi

echo "✅ Git repository is ready"
echo ""

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Update: $(date)"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub!"
    echo ""
    echo "🌐 Next steps:"
    echo "1. Go to https://netlify.com"
    echo "2. Sign up/Login with your GitHub account"
    echo "3. Click 'New site from Git'"
    echo "4. Choose your repository"
    echo "5. Set build command: npm run build"
    echo "6. Set publish directory: .next"
    echo "7. Click 'Deploy site'"
    echo ""
    echo "🎉 Your site will be live in a few minutes!"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi 