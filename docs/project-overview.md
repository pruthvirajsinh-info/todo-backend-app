# Project Overview: Aura Todo with RBAC

## 🎯 Project Goal
Aura Todo is a production-grade, full-stack task management application designed with a deeply integrated Role-Based Access Control (RBAC) system. It demonstrates how to build a scalable, multi-tenant-like administrative dashboard where features (Modules) and operations (Actions) are dynamically granted to users via assignable roles, ultimately dictating UI visibility and API access.

## 🛠 Tech Stack

**Frontend Framework:**
- **Next.js 16 (App Router)** - React 19 framework
- **Redux Toolkit & RTK Query** - State management and data fetching
- **Tailwind CSS** - Utility-first styling with custom glassmorphic aesthetics
- **AG Grid v35** - High-performance enterprise data tables
- **React Hook Form & Zod** - Form validation
- **Framer Motion & Lucide React** - Animations and iconography

**Backend & Database:**
- **Node.js & Express.js** - RESTful API server
- **TypeScript** - End-to-end type safety
- **Prisma ORM** - Database schema mapping and migrations
- **PostgreSQL (Supabase)** - Primary relational database with connection pooling
- **JSON Web Tokens (JWT) & bcryptjs** - Authentication and password hashing
- **Swagger (OpenAPI 3.0)** - Automated API documentation

## 🏗 High-Level Architecture
1. **Client Tier**: A Next.js single-page application deployed to Vercel. Route grouping `(auth)` and `(dashboard)` separates public login vs. secure authenticated shells.
2. **API Tier**: A stateless Node.js/Express.js backend deployed to Render. Routes are protected by an `authMiddleware` (JWT verification) and a dynamic `rbacMiddleware` (intercepts the request, checks the user's roles, and validates permissions against the Requested Action + Module).
3. **Data Tier**: A Supabase PostgreSQL instance strictly queried through Prisma interacting with 7 core models: `User`, `Role`, `Permission`, `Module`, `Action`, `Todo`, and `UserSidebarTab`.

## ✨ Key Features
- **Dynamic RBAC Middleware**: Routes like `GET /users` require `users:read` permission. The system evaluates the JWT role against database-stored Permission matrices in real-time.
- **Glassmorphic UI Engine**: A consistent, premium user interface relying on heavy backdrop-filters, subtle gradients, and Framer Motion micro-animations.
- **Dynamic Sidebar Generation**: Users only see sidebar navigation tabs for modules they have explicitly been granted `read` access to, driven by the `UserSidebarTab` model mapping.
- **Enterprise Data Grids**: Client-side sorting, pagination, and multi-selection implemented via AG Grid.
- **Unified API Envelopes**: Every API response adheres to a strict `{ status: "success", data: ... }` contract for predictable RTK Query parsing.
