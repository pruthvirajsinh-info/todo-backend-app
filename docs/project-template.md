# Project Boilerplate Template

To bootstrap a new instance of this architecture, follow this exact structure.

## 1. Initial Setup Commands
```bash
# Create directories
mkdir new-project
cd new-project

# Initialize Express backend
mkdir backend && cd backend
npm init -y
npm i express cors helmet dotenv jsonwebtoken bcryptjs zod prisma @prisma/client swagger-ui-express swagger-jsdoc
npm i -D typescript @types/node @types/express tsx nodemon
npx tsc --init
npx prisma init

# Initialize Next.js frontend
cd ..
npx create-next-app@latest frontend
# Select: TypeScript, ESLint, Tailwind, src/ directory, App Router, standard import alias (@/*)
cd frontend
npm i @reduxjs/toolkit react-redux lucide-react framer-motion sonner ag-grid-react ag-grid-community react-hook-form @hookform/resolvers zod
```

## 2. Base Folder Structure
### Backend Map
```text
backend/
├── prisma/
│   └── schema.prisma      # DB definitions
├── src/
│   ├── app.ts             # Express entry point
│   ├── config/            # Swagger, env configs
│   ├── middlewares/       # Auth, RBAC, Validation
│   ├── modules/           # Feature folders
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── users.schema.ts
│   │   │   └── users.service.ts
│   └── lib/               # Prisma client, logger utility
└── package.json
```

### Frontend Map
```text
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/        # Public pages (Login)
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/   # Secure app shell
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── <entity>/page.tsx
│   │   ├── layout.tsx     # Root Redux Providers
│   │   └── globals.css    # Tailwind + Glassmorphism base
│   ├── components/
│   │   ├── layout/        # Sidebar, Topbar
│   │   └── ui/            # AGGridTable, Buttons
│   ├── store/
│   │   ├── store.ts       # Redux config
│   │   ├── api/baseApi.ts # RTK Query instantiation
│   │   └── services/      # Injected API slices
│   └── lib/               # Redux hooks, utils
└── package.json
```

## 3. Recommended Stack Versions
Deploy ensuring these minimums:
- **Node.js**: v18+ (v20 LTS recommended)
- **Next.js**: 14+ (App Router specifically)
- **React**: 18+ (19 works)
- **TypeScript**: 5.x
- **Tailwind**: 3.4+

## 4. Boilerplate Config Highlights
**Backend `tsconfig.json` requirements:**
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "esnext",
    "target": "es2022",
    "outDir": "dist",
    "esModuleInterop": true
  }
}
```
Add `"type": "module"` to `package.json`.
