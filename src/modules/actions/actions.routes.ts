import { Router } from "express";
import { ActionsController } from "./actions.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createActionSchema, updateActionSchema, deleteActionSchema } from "./actions.schema.js";

const router = Router();

/**
 * @openapi
 * /api/v1/actions:
 *   get:
 *     tags: [Actions]
 *     summary: Get all actions
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of all actions
 */
router.get("/", authMiddleware, rbacMiddleware("actions:read"), ActionsController.getAll);

/**
 * @openapi
 * /api/v1/actions/{id}:
 *   get:
 *     tags: [Actions]
 *     summary: Get a specific action by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action object
 *       404:
 *         description: Action not found
 */
router.get("/:id", authMiddleware, rbacMiddleware("actions:read"), ActionsController.getById);

/**
 * @openapi
 * /api/v1/actions:
 *   post:
 *     tags: [Actions]
 *     summary: Create a new action
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
 *         description: Created action
 */
router.post("/", authMiddleware, rbacMiddleware("actions:create"), validate(createActionSchema), ActionsController.create);

/**
 * @openapi
 * /api/v1/actions/{id}:
 *   patch:
 *     tags: [Actions]
 *     summary: Update an existing action
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
 *         description: Updated action
 */
router.patch("/:id", authMiddleware, rbacMiddleware("actions:update"), validate(updateActionSchema), ActionsController.update);

/**
 * @openapi
 * /api/v1/actions/{id}:
 *   delete:
 *     tags: [Actions]
 *     summary: Delete an action
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action deleted successfully
 */
router.delete("/:id", authMiddleware, rbacMiddleware("actions:delete"), validate(deleteActionSchema), ActionsController.delete);

export default router;
