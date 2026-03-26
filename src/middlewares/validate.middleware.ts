import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { z } from "zod";
import { logger } from "../lib/logger.js";

export const validate = (schema: z.ZodSchema<any>) => {
  return async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      logger.error(`Validation error: ${JSON.stringify(error.errors)}`);
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
  };
};
