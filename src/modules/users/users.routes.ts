import { Router } from "express";
import { UsersController } from "./users.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createUserSchema, updateUserSchema, deleteUserSchema } from "./users.schema.js";

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", authMiddleware, rbacMiddleware("users:read"), UsersController.getAll);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.get("/:id", authMiddleware, rbacMiddleware("users:read"), UsersController.getById);

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags: [Users]
 *     summary: Create new user
 */
router.post("/", authMiddleware, rbacMiddleware("users:create"), validate(createUserSchema), UsersController.create);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user
 */
router.patch("/:id", authMiddleware, rbacMiddleware("users:update"), validate(updateUserSchema), UsersController.update);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 */
router.delete("/:id", authMiddleware, rbacMiddleware("users:delete"), validate(deleteUserSchema), UsersController.delete);

export default router;
