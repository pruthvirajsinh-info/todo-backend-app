# API Contracts (`/artifacts/api-contracts.md`)

This application enforces a strict JSON envelope pattern for all endpoints to align seamlessly with frontend RTK Query transformations.

## Standard Envelope Format
All successful responses (2xx) and managed errors (4xx) return:

```ts
interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string; // Present only if status === "error" OR if an informational success needs a message
}
```

## Example: GET `/api/v1/users`
**Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "bfda20bd-2506-49a8-b466-e942bb8b60b7",
      "name": "System Admin",
      "email": "admin@aura.com",
      "roles": ["superadmin"]
    }
  ]
}
```

## Example: POST `/api/v1/auth/login`
**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "bfda20bd-2506-49a8-b466-e942bb8b60b7",
      "name": "Aura Admin",
      "email": "admin@aura.com"
    }
  }
}
```

## Error Handling
**Response (400 Bad Request / 403 Forbidden / 404 Not Found):**
```json
{
  "status": "error",
  "message": "Resource not found or validation failed."
}
```

> **Note:** Real-time interactive documentation of every endpoint payload is automatically generated via Swagger and explicitly accessible in lower environments at `/docs`.
