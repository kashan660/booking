#!/bin/bash
echo "🚀 Running Prisma migration for updated BlogPost schema..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Create and apply migration
echo "🔄 Creating migration..."
npx prisma migrate dev --name update-blogpost-schema

echo "✅ Prisma migration completed!"
echo "📊 Database schema updated with new BlogPost model."