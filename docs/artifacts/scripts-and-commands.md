# Scripts & Commands (`/artifacts/scripts-and-commands.md`)

Save and run these frequently during development.

## Root Directory Development
To run both simultaneously in a split terminal setup:
```bash
# Terminal 1 - Backend
cd todo-backend-app
npm run dev

# Terminal 2 - Frontend
cd todo-frontend-app
npm run dev
```

## Database / Prisma Core
If you change `schema.prisma` in the backend, ALWAYS run:
```bash
npx prisma format           # Validates schema
npx prisma migrate dev      # Generates migration and pushes to DB
npx prisma generate         # Updates the @prisma/client typings for TS
```

To seed the initial databases (Superadmins, Core roles, Modules):
```bash
npx tsx src/seed.ts
```

## Frontend Code Gen & Verification
```bash
npm run build       # Next.js Turbopack check + TS type safety check
npm run lint        # ESLint strict check
```

## Backend Environment Prep
```bash
npm run build       # tsc compiler check
```
