import { Router } from "express";
import { PermissionsController } from "./permissions.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createPermissionSchema, updatePermissionSchema, deletePermissionSchema } from "./permissions.schema.js";

const router = Router();

/**
 * @openapi
 * /api/v1/permissions:
 *   get:
 *     tags: [Permissions]
 *     summary: Get all permissions
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of all permissions
 */
router.get("/", authMiddleware, rbacMiddleware("permissions:read"), PermissionsController.getAll);

/**
 * @openapi
 * /api/v1/permissions/{id}:
 *   get:
 *     tags: [Permissions]
 *     summary: Get a specific permission by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission object
 *       404:
 *         description: Permission not found
 */
router.get("/:id", authMiddleware, rbacMiddleware("permissions:read"), PermissionsController.getById);

/**
 * @openapi
 * /api/v1/permissions:
 *   post:
 *     tags: [Permissions]
 *     summary: Create a new permission
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [roleId, actionId, moduleId]
 *             properties:
 *               roleId:
 *                 type: string
 *               actionId:
 *                 type: string
 *               moduleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created permission
 */
router.post("/", authMiddleware, rbacMiddleware("permissions:create"), validate(createPermissionSchema), PermissionsController.create);

/**
 * @openapi
 * /api/v1/permissions/{id}:
 *   patch:
 *     tags: [Permissions]
 *     summary: Update an existing permission
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
 *               roleId:
 *                 type: string
 *               actionId:
 *                 type: string
 *               moduleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated permission
 */
router.patch("/:id", authMiddleware, rbacMiddleware("permissions:update"), validate(updatePermissionSchema), PermissionsController.update);

/**
 * @openapi
 * /api/v1/permissions/{id}:
 *   delete:
 *     tags: [Permissions]
 *     summary: Delete a permission
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 */
router.delete("/:id", authMiddleware, rbacMiddleware("permissions:delete"), validate(deletePermissionSchema), PermissionsController.delete);

export default router;
