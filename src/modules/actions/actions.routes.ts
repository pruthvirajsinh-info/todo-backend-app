import { Router } from "express";
import { ActionsController } from "./actions.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createActionSchema, updateActionSchema, deleteActionSchema } from "./actions.schema.js";

const router = Router();

router.get("/", authMiddleware, rbacMiddleware("actions:read"), ActionsController.getAll);
router.get("/:id", authMiddleware, rbacMiddleware("actions:read"), ActionsController.getById);
router.post("/", authMiddleware, rbacMiddleware("actions:create"), validate(createActionSchema), ActionsController.create);
router.patch("/:id", authMiddleware, rbacMiddleware("actions:update"), validate(updateActionSchema), ActionsController.update);
router.delete("/:id", authMiddleware, rbacMiddleware("actions:delete"), validate(deleteActionSchema), ActionsController.delete);

export default router;
