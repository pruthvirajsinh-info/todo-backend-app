import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8),
    isActive: z.boolean().optional(),
    roleIds: z.array(z.string()).min(1, "At least one role is required"),
  }),
});

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    isActive: z.boolean().optional(),
    roleIds: z.array(z.string()).optional(),
  }),
});

const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export { createUserSchema, updateUserSchema, deleteUserSchema };
