import { Router } from "express";
import { TodosController } from "./todos.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createTodoSchema, updateTodoSchema, deleteTodoSchema } from "./todos.schema.js";

const router = Router();

/**
 * @openapi
 * /api/v1/todos:
 *   get:
 *     tags: [Todos]
 *     summary: Get all todos for current user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get("/", authMiddleware, rbacMiddleware("todos:read"), TodosController.getAll);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   get:
 *     tags: [Todos]
 *     summary: Get a specific todo by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo object
 *       404:
 *         description: Todo not found
 */
router.get("/:id", authMiddleware, rbacMiddleware("todos:read"), TodosController.getById);

/**
 * @openapi
 * /api/v1/todos:
 *   post:
 *     tags: [Todos]
 *     summary: Create a new todo
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Created todo
 */
router.post("/", authMiddleware, rbacMiddleware("todos:create"), validate(createTodoSchema), TodosController.create);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   patch:
 *     tags: [Todos]
 *     summary: Update an existing todo
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Updated todo
 */
router.patch("/:id", authMiddleware, rbacMiddleware("todos:update"), validate(updateTodoSchema), TodosController.update);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   delete:
 *     tags: [Todos]
 *     summary: Delete a todo
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
router.delete("/:id", authMiddleware, rbacMiddleware("todos:delete"), validate(deleteTodoSchema), TodosController.delete);

export default router;
