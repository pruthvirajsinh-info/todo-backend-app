# Phase-Wise Development: Backend API & Auth (Phases 1-5)

## Phase 1: Project Foundation
**Goal:** Initialize twin repositories, strict ESLinting, and base Prisma structures.
**Steps:**
1. Created `todo-backend-app` with Express, Prisma, and Zod.
2. Created `todo-frontend-app` with Next.js 16 (App Router) App router, Tailwind.
3. Designed the core `schema.prisma` spanning `User`, `Role`, `Permission`, `Action`, `Module`, and `Todo`.
**Output:** Connected efficiently to Supabase connection pool.

## Phase 2: Advanced Role-Based Architecture
**Goal:** Establish dynamic seedings and middlewares.
**Steps:**
1. Created `seed.ts` to statically inject foundational tables (Modules: `users`, `todos`; Actions: `create`, `read`; Roles: `superadmin`).
2. Created `auth.middleware.ts` to decode JWTs and attach `req.user`.
3. Created `rbac.middleware.ts` dynamic factory (`rbacMiddleware("users:create")`) that intercepts queries, checks the user's roles against standard matrices in Postgres.

## Phase 3: Backend CRUD Modules
**Goal:** Finish the standard REST endpoints for Users, Roles, Permissions.
**Steps:**
1. Created `/src/modules/users` through `/src/modules/sidebar_tabs`.
2. Drafted Zod `.schema.ts` schemas (e.g. `z.string().uuid()`).
3. Applied `{ status: "success", data: ... }` response envelopes dynamically.
**Output:** 6 functional resource endpoints with security parity.

## Phase 4: Backend Todo Module
**Goal:** Core product functionality.
**Steps:**
1. Tied logic so `Todos` strictly belong to the `$user.id` creating them.
2. Formatted Date structures via Zod `.datetime()` constraints.

## Phase 5: Frontend Library Setup
**Goal:** Setup caching API endpoints on the client.
**Steps:**
1. Configured `@reduxjs/toolkit/query/react`.
2. Created `baseApi.ts` injecting Bearer logic into `fetchBaseQuery` headers via the root Redux schema.
3. Added strict tagging `tagTypes: ["User", "Todo"]` for automated cache invalidation upon mutations.
