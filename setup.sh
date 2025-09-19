#!/bin/bash

echo "🌱 Setting up CareThePlanet Next.js project..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    echo ""
    echo "   After installing Node.js, run this script again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "   Please update Node.js and run this script again."
    exit 1
fi

echo "✅ Node.js $(node -v) is installed"
echo "✅ npm $(npm -v) is available"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Starting development server..."
    echo "   The website will open at: http://localhost:3000"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    npm run dev
else
    echo "❌ Failed to install dependencies. Please check the error messages above."
    exit 1
fi 