// Prisma migration script for Windows
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function runMigration() {
  try {
    console.log('🚀 Running Prisma migration for updated BlogPost schema...');
    
    // Generate Prisma client
    console.log('📦 Generating Prisma client...');
    await execAsync('npx prisma generate');
    
    // Create and apply migration
    console.log('🔄 Creating migration...');
    await execAsync('npx prisma migrate dev --name update-blogpost-schema');
    
    console.log('✅ Prisma migration completed!');
    console.log('📊 Database schema updated with new BlogPost model.');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();