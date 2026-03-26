import type { Request, Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

import { AuthService } from "./auth.service.js";
import { logger } from "../../lib/logger.js";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({
        message: "User registered successfully",
        data: userWithoutPassword,
      });
    } catch (error: any) {
      logger.error(`Registration error: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      logger.error(`Login error: ${error.message}`);
      res.status(401).json({ message: error.message });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const token = await AuthService.forgotPassword(req.body);
      res.status(200).json({
        message: "Password reset token generated (Check server logs in this demo)",
        token, // In a real app, don't return the token in response
      });
    } catch (error: any) {
      logger.error(`Forgot password error: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      await AuthService.resetPassword(req.body);
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error: any) {
      logger.error(`Reset password error: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  static async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getMe(req.user!.id);
      res.status(200).json({
        message: "User context retrieved",
        data: user,
      });
    } catch (error: any) {
      logger.error(`GetMe error: ${error.message}`);
      res.status(401).json({ message: error.message });
    }
  }
}

