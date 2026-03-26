# Environment Configurations (`/artifacts/env-config.md`)

This file details the required environment contexts across both applications.

## Backend `.env`

```env
# Server Config
PORT=4001
NODE_ENV=development

# Database URIs
# DIRECT_URL is used by Prisma CLI for migrations
DIRECT_URL="postgresql://postgres.[db-ref]:[db-pass]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
# DATABASE_URL is used by Prisma Client (pooler/transaction mode)
DATABASE_URL="postgresql://postgres.[db-ref]:[db-pass]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Security
JWT_SECRET="your_very_long_secure_secret_key"
CORS_ORIGIN="http://localhost:3000" # Or production vercel URL
```

## Frontend `.env.local`

```env
# API Connectivity
# Points to localhost during dev; Render URL during production
NEXT_PUBLIC_API_URL="http://localhost:4001/api/v1"
```
