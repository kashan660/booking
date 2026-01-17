#!/bin/bash
# Test build and check for errors
echo "🧪 Testing local build..."
npm run build 2>&1 | tee build.log
echo "📊 Build test completed!"
echo "🔍 Checking for errors..."
grep -i "error\|failed" build.log || echo "✅ No errors found in build log"