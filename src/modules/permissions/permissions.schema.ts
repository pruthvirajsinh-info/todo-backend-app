import { z } from "zod";

const createPermissionSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100), // e.g. "users:read"
    description: z.string().max(255).optional(),
  }),
});

const updatePermissionSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().max(255).optional(),
  }),
});

const deletePermissionSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export { createPermissionSchema, updatePermissionSchema, deletePermissionSchema };
