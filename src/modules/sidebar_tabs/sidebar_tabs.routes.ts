import { Router } from "express";
import { SidebarTabsController } from "./sidebar_tabs.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbacMiddleware } from "../../middlewares/rbac.middleware.js";
import { createSidebarTabSchema, updateSidebarTabSchema, deleteSidebarTabSchema } from "./sidebar_tabs.schema.js";

const router = Router();

router.get("/", authMiddleware, rbacMiddleware("sidebar_tabs:read"), SidebarTabsController.getAll);
router.get("/:id", authMiddleware, rbacMiddleware("sidebar_tabs:read"), SidebarTabsController.getById);
router.post("/", authMiddleware, rbacMiddleware("sidebar_tabs:create"), validate(createSidebarTabSchema), SidebarTabsController.create);
router.patch("/:id", authMiddleware, rbacMiddleware("sidebar_tabs:update"), validate(updateSidebarTabSchema), SidebarTabsController.update);
router.delete("/:id", authMiddleware, rbacMiddleware("sidebar_tabs:delete"), validate(deleteSidebarTabSchema), SidebarTabsController.delete);

export default router;
