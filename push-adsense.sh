#!/bin/bash
echo "🚀 Pushing ads.txt changes for AdSense verification..."

# Add the changes
git add .

# Commit with AdSense-specific message
git commit -m "feat: Add ads.txt for Google AdSense verification

- Move ads.txt to public directory for Next.js static serving
- Enable Google AdSense verification for monetization
- Prepare site for ad integration"

# Push to main branch
git push origin main

echo "✅ Successfully pushed ads.txt changes!"
echo "🌐 Vercel deployment will start automatically."
echo "📊 AdSense verification will be available at: https://lugvia.com/ads.txt"