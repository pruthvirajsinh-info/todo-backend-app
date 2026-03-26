import { Router } from "express";
import { PermissionsController } from "./permissions.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createPermissionSchema, updatePermissionSchema, deletePermissionSchema } from "./permissions.schema.js";

const router = Router();

router.get("/", authMiddleware, rbacMiddleware("permissions:read"), PermissionsController.getAll);
router.get("/:id", authMiddleware, rbacMiddleware("permissions:read"), PermissionsController.getById);
router.post("/", authMiddleware, rbacMiddleware("permissions:create"), validate(createPermissionSchema), PermissionsController.create);
router.patch("/:id", authMiddleware, rbacMiddleware("permissions:update"), validate(updatePermissionSchema), PermissionsController.update);
router.delete("/:id", authMiddleware, rbacMiddleware("permissions:delete"), validate(deletePermissionSchema), PermissionsController.delete);

export default router;
