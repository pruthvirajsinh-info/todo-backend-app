import { z } from "zod";

const createActionSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50), // create, read, update, delete, all
    description: z.string().max(255).optional(),
  }),
});

const updateActionSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    description: z.string().max(255).optional(),
  }),
});

const deleteActionSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export { createActionSchema, updateActionSchema, deleteActionSchema };
