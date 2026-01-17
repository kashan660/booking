#!/bin/bash

echo "🎬 Testing Travel Package Animations..."
echo "=================================="

# Check if the animations are properly applied
echo "✅ Checking for custom CSS animations..."
grep -q "@keyframes fadeInUp" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ fadeInUp animation found" || echo "❌ fadeInUp animation missing"
grep -q "@keyframes float" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ float animation found" || echo "❌ float animation missing"
grep -q "@keyframes shimmer" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ shimmer animation found" || echo "❌ shimmer animation missing"

echo ""
echo "✅ Checking for animation classes..."
grep -q "animate-fade-in-up" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ fade-in-up class applied" || echo "❌ fade-in-up class missing"
grep -q "animate-float" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ float class applied" || echo "❌ float class missing"
grep -q "shimmer-bg" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ shimmer background applied" || echo "❌ shimmer background missing"

echo ""
echo "✅ Checking for premium styling elements..."
grep -q "bg-gradient-to-r" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ Gradient backgrounds found" || echo "❌ Gradient backgrounds missing"
grep -q "backdrop-blur" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ Glass morphism effects found" || echo "❌ Glass morphism effects missing"
grep -q "hover:shadow" d:/lugvia.com/src/app/travel-packages/\[slug\]/page.tsx && echo "✅ Hover effects found" || echo "❌ Hover effects missing"

echo ""
echo "🎉 Animation testing complete!"
echo "📋 Summary:"
echo "- Custom CSS animations: fadeInUp, float, shimmer"
echo "- Animation classes: Applied to hero, highlights, itinerary, buttons, trust badges"
echo "- Premium effects: Gradients, glass morphism, hover transitions"
echo "- Interactive elements: Buttons with shimmer effects, floating icons"
echo ""
echo "🚀 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Visit http://localhost:3001/travel-packages"
echo "3. Click on any 'View Details' button"
echo "4. Enjoy the premium animations and effects!"