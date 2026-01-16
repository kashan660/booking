#!/bin/bash
# Build verification script
echo "🔍 Testing Next.js build after TypeScript fix..."
echo "📦 Installing dependencies..."
npm install
echo "🏗️  Running build..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful! TypeScript error has been resolved."
    echo "🚀 Ready for deployment to Vercel."
else
    echo "❌ Build failed. There may be additional TypeScript errors."
    echo "🔍 Check the error output above for details."
fi