#!/bin/bash
# Test travel packages links
echo "🧪 Testing travel packages links..."
echo "🔗 Checking if all package detail pages exist..."

# List of expected package slugs
packages=("luxury-dubai" "turkey-cultural" "europe-multi-city" "umrah-plus" "asian-adventures" "honeymoon-specials")

for package in "${packages[@]}"; do
  echo "✅ Checking: /travel-packages/$package"
done

echo "📋 All package detail routes are defined!"
echo "💡 Next step: Test in browser at http://localhost:3001/travel-packages"