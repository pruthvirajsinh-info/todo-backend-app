import { Router } from "express";
import { ModulesController } from "./modules.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createModuleSchema, updateModuleSchema, deleteModuleSchema } from "./modules.schema.js";

const router = Router();

/**
 * @openapi
 * /api/v1/modules:
 *   get:
 *     tags: [Modules]
 *     summary: Get all modules
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of all modules
 */
router.get("/", authMiddleware, rbacMiddleware("modules:read"), ModulesController.getAll);

/**
 * @openapi
 * /api/v1/modules/{id}:
 *   get:
 *     tags: [Modules]
 *     summary: Get a specific module by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module object
 *       404:
 *         description: Module not found
 */
router.get("/:id", authMiddleware, rbacMiddleware("modules:read"), ModulesController.getById);

/**
 * @openapi
 * /api/v1/modules:
 *   post:
 *     tags: [Modules]
 *     summary: Create a new module
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
 *         description: Created module
 */
router.post("/", authMiddleware, rbacMiddleware("modules:create"), validate(createModuleSchema), ModulesController.create);

/**
 * @openapi
 * /api/v1/modules/{id}:
 *   patch:
 *     tags: [Modules]
 *     summary: Update an existing module
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
 *         description: Updated module
 */
router.patch("/:id", authMiddleware, rbacMiddleware("modules:update"), validate(updateModuleSchema), ModulesController.update);

/**
 * @openapi
 * /api/v1/modules/{id}:
 *   delete:
 *     tags: [Modules]
 *     summary: Delete a module
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module deleted successfully
 */
router.delete("/:id", authMiddleware, rbacMiddleware("modules:delete"), validate(deleteModuleSchema), ModulesController.delete);

export default router;
