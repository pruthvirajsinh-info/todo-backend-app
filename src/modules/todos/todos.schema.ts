import { z } from "zod";

const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    description: z.string().max(1000).optional(),
    status: z.enum(["pending", "in_progress", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.string().datetime().optional(),
  }),
});

const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    description: z.string().max(1000).optional(),
    status: z.enum(["pending", "in_progress", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.string().datetime().optional(),
  }),
});

const deleteTodoSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export { createTodoSchema, updateTodoSchema, deleteTodoSchema };
