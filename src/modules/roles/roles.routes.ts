import { Router } from "express";
import { RolesController } from "./roles.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createRoleSchema, updateRoleSchema, deleteRoleSchema } from "./roles.schema.js";

const router = Router();

router.get("/", authMiddleware, rbacMiddleware("roles:read"), RolesController.getAll);
router.get("/:id", authMiddleware, rbacMiddleware("roles:read"), RolesController.getById);
router.post("/", authMiddleware, rbacMiddleware("roles:create"), validate(createRoleSchema), RolesController.create);
router.patch("/:id", authMiddleware, rbacMiddleware("roles:update"), validate(updateRoleSchema), RolesController.update);
router.delete("/:id", authMiddleware, rbacMiddleware("roles:delete"), validate(deleteRoleSchema), RolesController.delete);

export default router;
