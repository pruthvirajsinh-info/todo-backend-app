import { Router } from "express";
import { ModulesController } from "./modules.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createModuleSchema, updateModuleSchema, deleteModuleSchema } from "./modules.schema.js";

const router = Router();

router.get("/", authMiddleware, rbacMiddleware("modules:read"), ModulesController.getAll);
router.get("/:id", authMiddleware, rbacMiddleware("modules:read"), ModulesController.getById);
router.post("/", authMiddleware, rbacMiddleware("modules:create"), validate(createModuleSchema), ModulesController.create);
router.patch("/:id", authMiddleware, rbacMiddleware("modules:update"), validate(updateModuleSchema), ModulesController.update);
router.delete("/:id", authMiddleware, rbacMiddleware("modules:delete"), validate(deleteModuleSchema), ModulesController.delete);

export default router;
