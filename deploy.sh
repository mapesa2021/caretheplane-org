#!/bin/bash

# 🚀 CareThePlanet Deployment Script
# This script builds and prepares your project for production deployment

echo "🌱 CareThePlanet - Building for Production..."
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the caretheplanet directory."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out
rm -f *.zip

# Install dependencies (if needed)
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    # Check if out directory exists
    if [ -d "out" ]; then
        echo "📁 Static export generated successfully!"
        
        # Create production package
        echo "📦 Creating production package..."
        cd out
        zip -r ../caretheplanet-production.zip .
        cd ..
        
        # Get file size
        FILE_SIZE=$(du -h caretheplanet-production.zip | cut -f1)
        
        echo "🎉 Deployment package ready!"
        echo "📁 File: caretheplanet-production.zip"
        echo "📏 Size: $FILE_SIZE"
        echo "📍 Location: $(pwd)/caretheplanet-production.zip"
        echo ""
        echo "🚀 Ready to upload to your hosting provider!"
        echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions."
        
    else
        echo "❌ Error: out directory not found. Build may have failed."
        exit 1
    fi
    
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi

echo ""
echo "✨ Deployment preparation complete!" 