# Lugvia Movers - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git installed

### Local Development Setup

1. **Clone and Install**
```bash
cd lugvia.com
npm install
```

2. **Configure Environment**
Create `.env` file:
```env
# Database Connection (Update with your credentials)
DATABASE_URL="postgresql://username:password@localhost:5432/lugvia"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: TravelPayouts (if using travel features)
TRAVELPAYOUTS_TOKEN=""
NEXT_PUBLIC_TRAVELPAYOUTS_MARKER=""
```

3. **Setup Database**
```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed database (optional)
npm run seed

# Seed media gallery
node prisma/seed-media.mjs
```

4. **Create Admin User**
```bash
node create-admin.js
```

5. **Start Development Server**
```bash
npm run dev
```

Visit: http://localhost:3000

## 📦 Production Deployment (Vercel)

### Step 1: Prepare Database
Use a cloud PostgreSQL provider:
- **Vercel Postgres** (recommended)
- **Supabase**
- **Railway**
- **Neon**
- **AWS RDS**

### Step 2: Configure Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Link Project**
```bash
vercel link
```

4. **Set Environment Variables**
```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

Or add via Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env`

### Step 3: Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Step 4: Run Database Migrations

After first deployment:
```bash
# Connect to your production database
DATABASE_URL="your-production-db-url" npx prisma migrate deploy

# Seed data (optional)
DATABASE_URL="your-production-db-url" npm run seed
DATABASE_URL="your-production-db-url" node prisma/seed-media.mjs
```

## 🗄️ Database Setup

### PostgreSQL Local Setup

**Windows:**
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember your password
4. Create database:
```sql
CREATE DATABASE lugvia;
```

**Mac:**
```bash
brew install postgresql
brew services start postgresql
createdb lugvia
```

**Linux:**
```bash
sudo apt-get install postgresql
sudo service postgresql start
sudo -u postgres createdb lugvia
```

### Cloud Database Options

#### Vercel Postgres (Recommended)
```bash
# Install Vercel Postgres
vercel postgres create

# Get connection string
vercel env pull
```

#### Supabase
1. Create project at https://supabase.com
2. Get connection string from Settings → Database
3. Add to `.env`:
```env
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
```

#### Railway
1. Create project at https://railway.app
2. Add PostgreSQL service
3. Copy connection string
4. Add to environment variables

## 🔐 Security Checklist

### Before Deployment
- [ ] Change `NEXTAUTH_SECRET` to a strong random string
- [ ] Update `DATABASE_URL` with production credentials
- [ ] Remove any test/development data
- [ ] Enable HTTPS only
- [ ] Set proper CORS policies
- [ ] Review API route permissions
- [ ] Test authentication flow
- [ ] Verify admin access controls

### Generate Secure Secret
```bash
openssl rand -base64 32
```

## 📁 File Upload Configuration

### Current Setup
- Local uploads to `public/uploads/`
- **Note**: Won't persist on Vercel (serverless)

### Production Solution
Use cloud storage:

#### Vercel Blob (Recommended)
```bash
npm install @vercel/blob
```

Update `src/app/api/upload/route.ts`:
```typescript
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  const blob = await put(file.name, file, {
    access: 'public',
  });
  
  return NextResponse.json({ url: blob.url });
}
```

#### AWS S3
```bash
npm install @aws-sdk/client-s3
```

## 🌐 Domain Configuration

### Custom Domain on Vercel

1. **Add Domain**
   - Go to Project Settings → Domains
   - Add your domain (e.g., lugvia.com)

2. **Configure DNS**
   Add these records to your DNS provider:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes

## 📊 Environment Variables Reference

### Required
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="random-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
```

### Optional
```env
# Google Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Google Tag Manager
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Cloud Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_token"
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="lugvia-uploads"
```

## 🧪 Testing Before Deployment

### Local Testing
```bash
# Build production version
npm run build

# Start production server
npm start
```

### Test Checklist
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Admin panel accessible
- [ ] Database queries work
- [ ] Authentication functions
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] No console errors

## 🔄 Continuous Deployment

### Git Integration
Vercel automatically deploys when you push to Git:

```bash
# Add changes
git add .

# Commit
git commit -m "Your message"

# Push to main branch (triggers deployment)
git push origin main
```

### Branch Deployments
- `main` branch → Production
- Other branches → Preview deployments

## 📈 Post-Deployment

### 1. Verify Deployment
- [ ] Visit your domain
- [ ] Test all major features
- [ ] Check admin panel
- [ ] Submit a test quote
- [ ] Verify email notifications (if configured)

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify domain ownership
- [ ] Set up Google Analytics
- [ ] Configure robots.txt
- [ ] Test structured data

### 3. Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up performance monitoring

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset database (development only!)
npx prisma migrate reset

# View database
npx prisma studio
```

### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Environment Variable Issues
```bash
# Pull latest env vars from Vercel
vercel env pull

# Check current env vars
vercel env ls
```

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🎯 Performance Optimization

### Image Optimization
- Use Next.js Image component
- Serve WebP format
- Implement lazy loading
- Use CDN for static assets

### Caching Strategy
```typescript
// Add to page components
export const revalidate = 3600; // Revalidate every hour
```

### Database Optimization
- Add indexes to frequently queried fields
- Use connection pooling
- Implement query caching
- Optimize N+1 queries

## 🔒 Backup Strategy

### Database Backups
```bash
# Export database
pg_dump -U username -d lugvia > backup.sql

# Import database
psql -U username -d lugvia < backup.sql
```

### Automated Backups
- Use your database provider's backup feature
- Schedule daily backups
- Test restore process regularly

## 📝 Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review and respond to leads
- [ ] Update content regularly
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Backup database weekly
- [ ] Review security updates

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

## 🎉 Launch Checklist

- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] Admin user created
- [ ] Content added (services, cities)
- [ ] Media gallery populated
- [ ] Contact information updated
- [ ] Social media links added
- [ ] Google Analytics configured
- [ ] Domain connected
- [ ] SSL certificate active
- [ ] Sitemap submitted
- [ ] Robots.txt configured
- [ ] Error pages tested
- [ ] Mobile responsiveness verified
- [ ] Performance tested
- [ ] Security headers configured
- [ ] Backup system in place
- [ ] Monitoring enabled

---

**Ready to deploy!** 🚀

For questions or issues, refer to the documentation or check the code comments.
