# Architecture Design

## 1. System Design
Aura Todo follows a decoupled **Client-Server Architecture**. 
- The **Frontend** acts as an API consumer utilizing RTK Query to manage local cache lifecycles.
- The **Backend** acts as a RESTful resource server conforming to a standard layered architecture (Router -> Controller -> Service -> ORM).

## 2. Backend Architecture
The Express API is structured around modular domains. Each folder inside `src/modules/` represents a discrete business domain:
- `auth`: JWT token generation, password hashing, and login/register flows.
- `users`: User entity management and relation to `Role`s.
- `roles`: Role definitions (e.g., `superadmin`, `manager`, `user`).
- `modules`: System feature flags (e.g., `todos`, `users`, `dashboard`).
- `actions`: Permissible verbs (e.g., `create`, `read`, `update`, `delete`, `all`).
- `permissions`: The junction table linking `Role`, `Module`, and `Action`.
- `sidebar_tabs`: User-specific UI navigation mappings.
- `todos`: The core task management entity, linked to the creator `User`.

### Middleware Pipeline
1. `helmet()` & `cors()` -> Security headers and cross-origin controls.
2. `httpLogger` -> Request tracing.
3. `authMiddleware` -> Extracts JWT from `Authorization` header, queries DB to attach `req.user` context (including nested `.roles`).
4. `rbacMiddleware("module:action")` -> Parses the required string, queries to see if the user's role has the matching Permission. If not, `403 Forbidden`.
5. `validate(schema)` -> Zod schema validation for `req.body` and `req.params`.
6. **Controller** -> Invokes Service.

## 3. Frontend Architecture
Next.js App Router is used exclusively for routing, while keeping components highly interactive via `'use client'`.

### Directory Strategy
- `src/app/(auth)`: Unauthenticated routes (`/login`).
- `src/app/(dashboard)`: Authenticated layout wrapped in a `<ProtectedRoute>`. Contains the universal `<Sidebar>` and `<Topbar>`.
- `src/store/`: Redux store configuration.
- `src/store/api/`: Base RTK Query setup and interceptors.
- `src/store/services/`: Domain-specific API injections (e.g., `todoService.ts`).
- `src/components/ui/`: Reusable, stateless UI primitives (`AGGridTable`, `<Loader>`).

## 4. Multi-Tenant & RBAC Data Flow
1. **Database Schema**: 
    - `Role` has many `Permission`s.
    - `Permission` joins `Role`, `Module`, and `Action`.
2. **Login Flow**: When a user logs in, the backend issues a JWT containing their `id` and `roles`.
3. **Frontend Hydration**: On load, the frontend hits `/auth/me` to fetch the user profile, their explicit permissions array, and renders the UI according to what they are allowed to see.
4. **API Enforcement**: Even if a user alters the frontend to show a forbidden button, clicking it sends a request to the backend. The backend `rbacMiddleware` re-validates the database permissions on every sensitive request, ensuring airtight security.
