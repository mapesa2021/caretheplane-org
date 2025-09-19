@echo off
echo 🌱 Setting up CareThePlanet Next.js project...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Visit: https://nodejs.org/
    echo.
    echo    After installing Node.js, run this script again.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo ✅ npm is available
echo.

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
    echo.
    echo 🚀 Starting development server...
    echo    The website will open at: http://localhost:3000
    echo    Press Ctrl+C to stop the server
    echo.
    npm run dev
) else (
    echo ❌ Failed to install dependencies. Please check the error messages above.
    pause
    exit /b 1
) 