import { Router } from "express";
import { TodosController } from "./todos.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createTodoSchema, updateTodoSchema, deleteTodoSchema } from "./todos.schema.js";

const router = Router();

router.get("/", authMiddleware, rbacMiddleware("todos:read"), TodosController.getAll);
router.get("/:id", authMiddleware, rbacMiddleware("todos:read"), TodosController.getById);
router.post("/", authMiddleware, rbacMiddleware("todos:create"), validate(createTodoSchema), TodosController.create);
router.patch("/:id", authMiddleware, rbacMiddleware("todos:update"), validate(updateTodoSchema), TodosController.update);
router.delete("/:id", authMiddleware, rbacMiddleware("todos:delete"), validate(deleteTodoSchema), TodosController.delete);

export default router;
