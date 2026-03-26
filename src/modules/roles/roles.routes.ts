import { Router } from "express";
import { RolesController } from "./roles.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createRoleSchema, updateRoleSchema, deleteRoleSchema } from "./roles.schema.js";

const router = Router();

/**
 * @openapi
 * /api/v1/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Get all roles
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of all roles
 */
router.get("/", authMiddleware, rbacMiddleware("roles:read"), RolesController.getAll);

/**
 * @openapi
 * /api/v1/roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Get a specific role by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role object
 *       404:
 *         description: Role not found
 */
router.get("/:id", authMiddleware, rbacMiddleware("roles:read"), RolesController.getById);

/**
 * @openapi
 * /api/v1/roles:
 *   post:
 *     tags: [Roles]
 *     summary: Create a new role
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created role
 */
router.post("/", authMiddleware, rbacMiddleware("roles:create"), validate(createRoleSchema), RolesController.create);

/**
 * @openapi
 * /api/v1/roles/{id}:
 *   patch:
 *     tags: [Roles]
 *     summary: Update an existing role
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated role
 */
router.patch("/:id", authMiddleware, rbacMiddleware("roles:update"), validate(updateRoleSchema), RolesController.update);

/**
 * @openapi
 * /api/v1/roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Delete a role
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 */
router.delete("/:id", authMiddleware, rbacMiddleware("roles:delete"), validate(deleteRoleSchema), RolesController.delete);

export default router;
