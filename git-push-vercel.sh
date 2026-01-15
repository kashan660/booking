#!/bin/bash
# Git push script for Vercel deployment

echo "🚀 Starting git push for Vercel deployment..."

# Check git status
echo "📊 Checking git status..."
git status

# Add all changes
echo "📦 Staging all changes..."
git add .

# Commit with descriptive message
echo "💬 Creating commit..."
git commit -m "feat: SEO enhancements and travel schema optimizations

- Add robots.txt for better crawlability
- Implement travel schema markup for hotels, flights, transfers
- Optimize keywords for worldwide travel services
- Enhance metadata for better search rankings
- Add structured data for rich snippets"

# Push to main branch
echo "🚀 Pushing to main branch..."
git push origin main

echo "✅ Successfully pushed to git! Vercel deployment will start automatically."
echo "🌐 Check your Vercel dashboard for deployment status."