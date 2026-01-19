#!/bin/bash

# Array of files and directories to delete
files_to_delete=(
  "src/app/admin"
  "src/app/api/admin"
  "src/app/api/auth"
  "src/app/api/user"
  "src/app/api/setup-admin"
  "src/app/api/upload"
  "src/app/api/blog/[id]"
  "src/app/api/blog/route.ts"
  "src/app/api/pages"
  "src/app/admin-login"
  "src/app/login"
  "src/app/signup"
  "src/app/profile"
  "src/components/admin"
  "src/components/user"
  "src/components/ui/image-upload.tsx"
  "src/components/ui/rich-text-editor.tsx"
  "src/lib/blog-data.ts"
  "src/lib/mail.ts"
  "src/lib/prisma.ts"
  "src/lib/stats-api.ts"
  "src/lib/travelpayouts-stats.ts"
  "src/types/next-auth.d.ts"
  "src/auth.config.ts"
  "src/auth.ts"
  "prisma"
)

# Loop through the array and delete each file/directory
for file in "${files_to_delete[@]}"; do
  if [ -e "$file" ]; then
    rm -rf "$file"
    echo "Deleted: $file"
  else
    echo "File not found: $file"
  fi
done

echo "Cleanup complete."
