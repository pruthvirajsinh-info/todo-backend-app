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
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/", authMiddleware, rbacMiddleware("users:read"), UsersController.getAll);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, rbacMiddleware("users:read"), UsersController.getById);

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags: [Users]
 *     summary: Create new user
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Created user
 */
router.post("/", authMiddleware, rbacMiddleware("users:create"), validate(createUserSchema), UsersController.create);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.patch("/:id", authMiddleware, rbacMiddleware("users:update"), validate(updateUserSchema), UsersController.update);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/:id", authMiddleware, rbacMiddleware("users:delete"), validate(deleteUserSchema), UsersController.delete);

export default router;
