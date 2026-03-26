import type { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger.js";

export const rbacMiddleware = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement RBAC check based on user permissions
    logger.info(`RBAC check for: ${permission}`);
    next();
  };
};
