# Folder Structure Standards (`/artifacts/folder-structure.md`)

## Monorepo Split
The root holds two independent sub-projects:
- `todo-backend-app/`
- `todo-frontend-app/`

## Backend (`todo-backend-app/`)
```text
├── prisma/
│   ├── schema.prisma      # DB modeling
│   └── migrations/        # Dev/Prod DB state snapshots
├── src/
│   ├── app.ts             # Express instance, Middlewares
│   ├── index.ts           # Server initialization (if abstracted)
│   ├── config/            # Swagger, environment parsers
│   ├── lib/               # Prisma client instantiation, Logger singleton
│   ├── middlewares/       # Security (auth, RBAC, validators, loggers)
│   ├── utils/             # Reusable pure functions (hashers, error wrappers)
│   └── modules/           # Business Domains (e.g., users, core)
│       └── [domain_name]/
│           ├── [domain].controller.ts  # Req/Res handlers
│           ├── [domain].routes.ts      # Express Router map
│           ├── [domain].service.ts     # Business logic parsing
│           └── [domain].schema.ts      # Zod typings + shapes
```

## Frontend (`todo-frontend-app/`)
```text
├── public/                # Static assets, fonts, svgs
├── src/
│   ├── app/               # Next.js App Router root
│   │   ├── (auth)/        # Public route group (Login/Register)
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/   # Secure authenticated shell
│   │   │   ├── layout.tsx # Injects Sidebar + Topbar
│   │   │   └── [entity]/  # CRUD pages (Roles, Todos, Permissions)
│   │   │       ├── page.tsx          # Data table fetching (AG Grid)
│   │   │       ├── new/page.tsx      # Create form
│   │   │       ├── [id]/page.tsx     # Update form
│   │   │       └── [Entity]Form.tsx  # Shared mutate form (React Hook Form)
│   │   ├── globals.css    # Tailwind base + custom `.glass` classes
│   │   └── layout.tsx     # Inject Redux Providers, Toasters (Sonner)
│   ├── components/        
│   │   ├── layout/        # Sidebar, Navbar, Page Containers
│   │   ├── ui/            # Dumb primitives (Button, Input, AGGridWrapper)
│   │   └── guard/         # ProtectedRoute, AuthRedirectors
│   ├── store/             # Redux State Layer
│   │   ├── store.ts       # Global slice registry
│   │   ├── api/           
│   │   │   └── baseApi.ts # RTK fetchBaseQuery (Injects Bearer Token)
│   │   └── services/      
│   │       └── [api].ts   # .injectEndpoints() slice logic
│   └── lib/               
│       ├── hooks.ts       # Typed `useAppDispatch`, `useAuth`
│       └── utils.ts       # tailwind-merge, clsx
```
