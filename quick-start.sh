#!/bin/bash

echo "🚀 Visionary IP Labs - Quick Start Setup"
echo "========================================"
echo ""

# Check if running in /app directory
if [ ! -f "README.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Setting up Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and configure your MongoDB URL"
fi

cd ..

echo ""
echo "📦 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing Node dependencies..."
if command -v yarn &> /dev/null; then
    yarn install
else
    echo "Installing yarn..."
    npm install -g yarn
    yarn install
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env and configure your MongoDB URL"
echo "2. Start backend: cd backend && source venv/bin/activate && uvicorn server:app --reload --port 8001"
echo "3. Start frontend: cd frontend && yarn start"
echo ""
echo "🌐 Access your app:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8001"
echo "   API Docs: http://localhost:8001/docs"
echo ""
echo "📚 For more help, see:"
echo "   - SETUP_GUIDE.md (photos, logos, submissions)"
echo "   - DEPLOYMENT_GUIDE.md (deploy to production)"
echo ""
