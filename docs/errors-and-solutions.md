# Errors & Solutions

This document catalogs the critical errors encountered during development, their root causes, and how we fixed them.

## 1. AG Grid Theming API Conflict (Error #239)
**Error Message:**
> "Theming API and CSS File Themes are both used in the same page. In v33 we released the Theming API... Either pass the string 'legacy' to the theme grid option or remove ag-grid.css from the page."

**When it occurred:** Phase 7 (Rendering the Users table in the frontend).

**Root Cause:** The project imported `ag-grid-community/styles/ag-grid.css` global CSS files in `layout.tsx`, but AG Grid v35 auto-detects this and conflicts with its new internal React Theming API when `<AgGridReact>` is rendered without a strict `theme` fallback.

**Fix Details:**
```tsx
// Inside AGGridTable.tsx
<AgGridReact
  theme="legacy" // <- Added this explicitly
  rowData={rowData}
  // ...
/>
```
**Prevention Tip:** When migrating major versions of UI libraries, thoroughly check their breaking changes regarding CSS and theming engines.

## 2. Empty AG Grid rendering (No Rows To Show)
**Error Message:** None visually, but `rowData` was seemingly empty while the network tab returned an array of 5 users.

**When it occurred:** Phase 8 (Stabilizing frontend data retrieval).

**Root Cause:**
RTK Query endpoints were expecting an array `User[]`, but we had standardized the backend API envelope elsewhere to return `{ status: "success", data: User[] }`. Some backend controllers (like Users and Roles) were still returning `res.json(users)` as raw arrays instead of applying the envelope.

**Fix Details:**
Updated every backend controller to use the standard envelope:
```typescript
res.status(200).json({
  status: "success",
  data: users
});
```
And updated the RTK Query `transformResponse: (res) => res.data`.

**Prevention Tip:** Define API contracts **before** writing the frontend clients. Enforce them structurally.

## 3. Swagger UI Response Rendering Omitted
**Error Message:** Data prints in browser Network tab but Swagger UI says "Response Body: blank/empty" for `200` requests.

**When it occurred:** Phase 10 (Generating API documentation).

**Root Cause:** The JSDoc `@openapi` blocks in `users.routes.ts` were missing the `responses:` keyword definition, so Swagger did not know how to map the raw payload to the visual DOM.

**Fix Details:**
```yaml
# Added to Swagger JSDoc blocks
responses:
  200:
    description: List of all users
```
**Prevention Tip:** Always provide thorough `requestBody` and `responses` YAML tags in Swagger endpoints if you want the visual tester to work correctly.

## 4. Turbopack Build / Module Path Resolution
**Error Message:** `Module not found: Can't resolve '../PermissionForm'`

**When it occurred:** Phase 8 (Frontend production Next.js build).

**Root Cause:** A malformed directory was accidentally created during refactoring named literally `[id` (with a nested `]` folder). Next.js Turbopack tried compiling `src/app/(dashboard)/permissions/[id/]/page.tsx` and the relative import path resolution to `../PermissionForm` failed.

**Fix Details:** 
Deleted the rogue `[id` directory using `rm -rf`, leaving only the correct `[id]` folder.
**Prevention Tip:** When renaming files with brackets, strictly ensure the terminal / IDE does not escape or split the brackets. Run `npm run build` frequently to catch broken dynamic routes.

## 5. Zod DateTime Payload Validation (HTTP 400 Bad Request)
**Error Message:** `{ message: "Validation failed" }` when creating a Todo.

**When it occurred:** Phase 8 (Testing Todo Creation).

**Root Cause:** The backend Zod schema required `.datetime()` which enforces ISO 8601 UTC formats. The frontend `<input type="date">` was sending `"2026-03-26"`.

**Fix Details:**
Formatted the string before RTK Query mutation:
```typescript
payload.dueDate = new Date(payload.dueDate).toISOString(); 
// Becomes "2026-03-26T00:00:00.000Z"
```
**Prevention Tip:** Align input types with backend Zod constraints early. Use `.date()` string fallback coercion if strict datetime is unneeded or serialize carefully.
