import { z } from "zod";

const createRoleSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(255).optional(),
    isActive: z.boolean().optional(),
    permissionIds: z.array(z.string()).optional(),
  }),
});

const updateRoleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    description: z.string().max(255).optional(),
    isActive: z.boolean().optional(),
    permissionIds: z.array(z.string()).optional(),
  }),
});

const deleteRoleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export { createRoleSchema, updateRoleSchema, deleteRoleSchema };
