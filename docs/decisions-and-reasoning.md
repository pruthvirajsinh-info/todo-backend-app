# Decisions & Reasoning

## 1. Tech Stack Choices

### Prisma ORM over TypeORM or Raw SQL
**Why:** Prisma's type-safety generation deeply integrates with TypeScript, minimizing runtime errors associated with malformed SQL queries. Its schema file (`schema.prisma`) acts as a highly readable single source of truth for the intricate RBAC relations.
**Trade-off:** Slightly higher cold-start overhead and bundle size compared to pure SQL drivers like `pg`, but developer velocity and type safety vastly outweigh this for standard CRUD applications.

### Redux Toolkit (RTK Query) over React Query
**Why:** RTK Query provides an all-in-one solution for caching, polling, and optimistic updates. Since the application already required Redux for cross-component state (like global UI themes, toggles, or user session data), keeping API caching within the same ecosystem reduced the need for multiple heavy libraries.
**Alternative Considered:** React Query (TanStack) is excellent but would require a separate global state manager (like Zustand or Context API) for non-API state.

### AG Grid over Custom Tables or Material UI DataGrid
**Why:** The user required enterprise-level features: filtering, multi-row selection, and high performance. AG Grid is the industry standard for dense data rendering.
**Trade-off:** AG Grid comes with a larger bundle size and complex CSS theming requirements (Error #239 Theming API conflicts), but it saves weeks of engineering time when building advanced pagination and sorting.

### JWT vs Session Cookies
**Why:** We opted for Bearer JSON Web Tokens (JWT) stored in LocalStorage. This allowed the Express API to remain completely stateless and seamlessly detached from the Next.js frontend domain, preventing complex CORS credentials configurations.
**Alternative Considered:** HttpOnly cookies are theoretically more secure against XSS, but they complicate cross-domain API architecture when the frontend and backend operate on different root domains (Vercel vs. Render).

## 2. Architectural Decisions

### Unified `{ status, data }` Response Envelope
**Problem:** Inconsistent backend responses (`[]` vs `{ data: [] }` vs `{ message: ... }`) caused frontend RTK Query transformations to break, resulting in empty AG Grids.
**Decision:** We enforced a universal wrapper for all 2xx and 4xx responses. Every successful request returns `{ status: "success", data: <payload> }`. This strict contract allows the frontend to blindly trust `.data` mapping.

### Explicit Routing vs Catch-All `[...slug]`
**Why:** We explicitly defined `/(dashboard)/users`, `/(dashboard)/roles`, etc. This makes Next.js structural layouts easier to reason about and allows tailored forms (like `UserForm` vs `TodoForm`) instead of a giant generic catch-all CRUD component that becomes unmaintainable.

### Backend-Enforced Sidebar Filtering
**Why:** Rather than sending all Sidebar tabs to the client and letting the client hide them, the backend `/sidebar-tabs` endpoint aggressively filters the payload based on the authenticated user's permissions. This strictly adheres to the Principle of Least Privilege.
