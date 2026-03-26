import { Router } from "express";
import { SidebarTabsController } from "./sidebar_tabs.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createSidebarTabSchema, updateSidebarTabSchema, deleteSidebarTabSchema } from "./sidebar_tabs.schema.js";

const router = Router();

/**
 * @openapi
 * /api/v1/sidebar-tabs:
 *   get:
 *     tags: [Sidebar Tabs]
 *     summary: Get all sidebar tabs (filtered for authenticated user)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of sidebar tabs available to the user
 */
// Allow ALL authenticated users to fetch sidebar tabs (service handles filtering)
router.get("/", authMiddleware, SidebarTabsController.getAll);

// Admin-only management routes

/**
 * @openapi
 * /api/v1/sidebar-tabs/{id}:
 *   get:
 *     tags: [Sidebar Tabs]
 *     summary: Get a specific sidebar tab by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sidebar tab object
 *       404:
 *         description: Tab not found
 */
router.get("/:id", authMiddleware, rbacMiddleware("sidebar_tabs:read"), SidebarTabsController.getById);

/**
 * @openapi
 * /api/v1/sidebar-tabs:
 *   post:
 *     tags: [Sidebar Tabs]
 *     summary: Create a new sidebar tab mapping
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, moduleId]
 *             properties:
 *               userId:
 *                 type: string
 *               moduleId:
 *                 type: string
 *               order:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Created sidebar tab
 */
router.post("/", authMiddleware, rbacMiddleware("sidebar_tabs:create"), validate(createSidebarTabSchema), SidebarTabsController.create);

/**
 * @openapi
 * /api/v1/sidebar-tabs/{id}:
 *   patch:
 *     tags: [Sidebar Tabs]
 *     summary: Update a sidebar tab
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
 *               order:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated sidebar tab
 */
router.patch("/:id", authMiddleware, rbacMiddleware("sidebar_tabs:update"), validate(updateSidebarTabSchema), SidebarTabsController.update);

/**
 * @openapi
 * /api/v1/sidebar-tabs/{id}:
 *   delete:
 *     tags: [Sidebar Tabs]
 *     summary: Delete a sidebar tab
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sidebar tab deleted successfully
 */
router.delete("/:id", authMiddleware, rbacMiddleware("sidebar_tabs:delete"), validate(deleteSidebarTabSchema), SidebarTabsController.delete);

export default router;
