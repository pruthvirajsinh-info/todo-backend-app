import { z } from "zod";

const createSidebarTabSchema = z.object({
  body: z.object({
    moduleId: z.string().uuid(),
    label: z.string().min(2).max(50),
    icon: z.string().min(1),
    path: z.string().startsWith("/"),
    order: z.number().int().min(1),
  }),
});

const updateSidebarTabSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    moduleId: z.string().uuid().optional(),
    label: z.string().min(2).max(50).optional(),
    icon: z.string().min(1).optional(),
    path: z.string().startsWith("/").optional(),
    order: z.number().int().min(1).optional(),
  }),
});

const deleteSidebarTabSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export { createSidebarTabSchema, updateSidebarTabSchema, deleteSidebarTabSchema };
