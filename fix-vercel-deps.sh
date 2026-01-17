#!/bin/bash
# Fix Vercel deployment with dependency conflicts
echo "🔧 Fixing dependency conflicts for Vercel deployment..."
echo "📦 Updating nodemailer to version 7.0.7..."
npm install nodemailer@^7.0.7
echo "🔍 Verifying package.json..."
cat package.json | grep nodemailer
echo "🚀 Ready for Vercel deployment!"
echo "💡 Next step: git push to trigger Vercel deployment"