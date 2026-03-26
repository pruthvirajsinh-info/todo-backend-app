import { z } from "zod";

const createModuleSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(255).optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateModuleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    description: z.string().max(255).optional(),
    isActive: z.boolean().optional(),
  }),
});

const deleteModuleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export { createModuleSchema, updateModuleSchema, deleteModuleSchema };
