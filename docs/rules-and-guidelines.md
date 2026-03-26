# Engineering Rules & Guidelines

This document serves as the playbook for building scalable codebases mirroring this architecture. Adhere to these principles for all future projects.

## 1. Project Setup & Organization
- **Monorepo / Split Repo:** Maintain separate directories (`frontend-app`, `backend-app`) to ensure decoupled deployments.
- **Environment Variables:** Never commit `.env` files. Provide an `.env.example` in both directories.
- **Absolute Imports:** Use Next.js path aliases (`@/components`) in the frontend, and relative imports (`../../`) or strict alias setups in the backend.

## 2. API Design Rules
- **Standard Envelope:** ALL API responses must follow the envelope standard:
  - **Success:** `res.status(200).json({ status: "success", data: payload })`
  - **Error:** `res.status(400).json({ status: "error", message: "Validation failed" })`
- **HTTP Methods:** 
  - `GET` for retrieval (No request bodies allowed).
  - `POST` for creation.
  - `PATCH` for partial updates (prefer over `PUT`).
  - `DELETE` for removal.
- **Plural Nouns:** Route names must be plural nouns (e.g., `/users`, `/todos`).

## 3. Component & Folder Structure Standards
**Frontend (`src/`):**
- `app/`: Strictly for Next.js routing and defining `page.tsx`/`layout.tsx`. Keep logic minimal here.
- `components/ui/`: Dumb, stateless, highly reusable components (`Button`, `AGGridTable`).
- `components/layout/`: Structural shells (`Sidebar`, `Topbar`).
- `store/services/`: RTK Query API slices.

**Backend (`src/`):**
- `modules/<entity>/`: Self-contained domain folders containing:
  - `<entity>.routes.ts`: Express router setup.
  - `<entity>.controller.ts`: Request parsing and response formatting.
  - `<entity>.schema.ts`: Zod validation constraints.
  - `<entity>.service.ts` (Optional): Heavy business logic.

## 4. Error Handling & Validation
- **Zod Everywhere:** All incoming request bodies and parameters MUST be validated via Zod schemas and a unified `validate.middleware.ts`.
- **Global Error Catcher:** Do not let the Node.js server crash on unhandled promises.
- **Frontend Toasts:** Catch RTK Query rejections (`.unwrap().catch()`) and display human-readable `sonner` toast notifications.

## 5. Security & RBAC Guidelines
- **Zero Trust:** The frontend UI hiding a button is purely cosmetic. The backend MUST independently assume every request is malicious and verify permissions via `rbacMiddleware()`.
- **JWT Storage:** Store tokens securely. Handle token expiration gracefully by logging the user out and redirecting to `/login`.
- **Sanitization:** Ensure Prisma queries do not implicitly leak sensitive fields (delete `password` from the User payload before sending it to the client).

## 6. Styling & CSS Rules
- **Tailwind Only:** Avoid writing custom `.css` unless creating complex root variables (e.g., glassmorphism utilities matching `index.css`).
- **Standardized Classes:** Use predefined utility classes like `.glass` or `.glass-hover` rather than rewriting backdrop blur strings in every component.

## 7. Performance Best Practices
- **Pagination:** Implement offset/limit parameters in APIs if data scales over 1000 rows.
- **Tree Shaking:** Only import exactly what you need. (e.g., `import { ArrowLeft } from "lucide-react"`).
- **Client Directives:** Use `'use client'` strictly at the boundary where hooks are required. Do not place it at the top of layout trees unnecessarily.
