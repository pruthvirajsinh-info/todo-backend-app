import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.js";
import { logger } from "../lib/logger.js";

export const rbacMiddleware = (requiredPermission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const { permissions, roles } = req.user;

    // Superadmin has all permissions
    if (roles.includes("superadmin")) {
      return next();
    }

    if (!permissions.includes(requiredPermission)) {
      logger.warn(`Access denied: User ${req.user.email} missing permission ${requiredPermission}`);
      res.status(403).json({ message: `Access denied: missing permission ${requiredPermission}` });
      return;
    }

    next();
  };
};
