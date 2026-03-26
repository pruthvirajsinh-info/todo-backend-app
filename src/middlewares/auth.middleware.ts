import type { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement JWT verification
  logger.info(`Auth middleware - Path: ${req.path}`);
  next();
};
